import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

import {
  FACE_DETECTION_GRACE_MS,
  FACE_LOSS_TIMEOUT_MS,
  MODEL_URL,
  RECALIBRATION_DELAY_MS,
  WASM_URL,
} from "../constants";

import type { HeadTrackingProps } from "../types";

export function useHeadTracking(props: HeadTrackingProps) {
  const { debug = false, onPositionChange, onCameraPermissionSettled } = props;

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState("Подготовка");
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const isRunningRef = useRef(false);
  const debugRef = useRef(debug);
  const onPositionChangeRef = useRef(onPositionChange);
  const onCameraPermissionSettledRef = useRef(onCameraPermissionSettled);
  const baselineXRef = useRef<number | null>(null);
  const baselineYRef = useRef<number | null>(null);
  const baselineFaceWidthRef = useRef<number | null>(null);
  const faceLostAtRef = useRef<number | null>(null);
  const recenteredAfterFaceLossRef = useRef(false);
  const calibrationStartedAtRef = useRef<number | null>(null);
  const calibrationSumXRef = useRef(0);
  const calibrationSumYRef = useRef(0);
  const calibrationSumWidthRef = useRef(0);
  const calibrationSampleCountRef = useRef(0);
  const lastVideoTimeRef = useRef(-1);
  const lastUiUpdateRef = useRef(0);

  useEffect(() => {
    debugRef.current = debug;
  }, [debug]);

  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    onCameraPermissionSettledRef.current = onCameraPermissionSettled;
  }, [onCameraPermissionSettled]);

  useEffect(() => {
    let cancelled = false;
    let frameId: number | null = null;
    let localStream: MediaStream | null = null;
    let localLandmarker: FaceLandmarker | null = null;
    let permissionRequestStarted = false;
    let permissionDecisionReported = false;
    const notifyCameraPermissionSettled = () => {
      if (permissionDecisionReported) return;
      permissionDecisionReported = true;
      onCameraPermissionSettledRef.current?.();
    };
    const resetCalibration = () => {
      calibrationStartedAtRef.current = null;
      calibrationSumXRef.current = 0;
      calibrationSumYRef.current = 0;
      calibrationSumWidthRef.current = 0;
      calibrationSampleCountRef.current = 0;
    };
    const resetBaseline = () => {
      baselineXRef.current = null;
      baselineYRef.current = null;
      baselineFaceWidthRef.current = null;
    };
    const sendCenterPosition = () => {
      onPositionChangeRef.current?.({
        x: 0,
        y: 0,
        z: 0,
      });
      setPositionX(0);
      setPositionY(0);
      setPositionZ(0);
    };

    const returnToCenter = () => {
      resetBaseline();
      resetCalibration();
      recenteredAfterFaceLossRef.current = true;
      sendCenterPosition();
      if (debugRef.current) {
        setStatus("Лицо потеряно — возврат к центру");
      }
    };

    const dispose = () => {
      isRunningRef.current = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      if (localStream) {
        const stream = localStream;
        localStream = null;
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        if (streamRef.current === stream) {
          streamRef.current = null;
        }
        const video = videoRef.current;
        if (video?.srcObject === stream) {
          video.pause();
          video.srcObject = null;
        }
      }
      if (localLandmarker) {
        const landmarker = localLandmarker;
        localLandmarker = null;
        if (landmarkerRef.current === landmarker) {
          landmarkerRef.current = null;
        }
        landmarker.close();
      }
    };

    const formatError = (error: unknown): string => {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          return "Доступ запрещён";
        }
        if (error.name === "NotFoundError") {
          return "Не найдена камера";
        }
        if (error.name === "NotReadableError") {
          return "Камера занята";
        }
      }
      return error instanceof Error
        ? error.message
        : "Не удалось запустить распознавание";
    };
    const processFrame = () => {
      if (cancelled || !isRunningRef.current) return;
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;
      if (
        video &&
        landmarker &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.currentTime !== lastVideoTimeRef.current
      ) {
        const now = performance.now();
        const result = landmarker.detectForVideo(video, now);
        lastVideoTimeRef.current = video.currentTime;
        const landmarks = result.faceLandmarks[0];
        const leftEye = landmarks?.[33];
        const rightEye = landmarks?.[263];
        const leftCheek = landmarks?.[234];
        const rightCheek = landmarks?.[454];
        let faceDetected = false;
        if (
          leftEye &&
          rightEye &&
          leftCheek &&
          rightCheek &&
          video.videoWidth > 0 &&
          video.videoHeight > 0
        ) {
          const faceCenterX = (leftEye.x + rightEye.x) / 2;
          const faceCenterY = (leftEye.y + rightEye.y) / 2;
          const faceWidth = Math.hypot(
            (leftCheek.x - rightCheek.x) * video.videoWidth,
            (leftCheek.y - rightCheek.y) * video.videoHeight,
          );
          if (faceWidth > 0) {
            faceDetected = true;
            const previousLossAt = faceLostAtRef.current;
            const previousLossDuration =
              previousLossAt === null ? 0 : now - previousLossAt;
            const hasBaseline =
              baselineXRef.current !== null &&
              baselineYRef.current !== null &&
              baselineFaceWidthRef.current !== null;
            if (
              hasBaseline &&
              previousLossDuration >= FACE_LOSS_TIMEOUT_MS &&
              !recenteredAfterFaceLossRef.current
            ) {
              returnToCenter();
            }
            if (
              previousLossDuration >= FACE_DETECTION_GRACE_MS &&
              baselineXRef.current === null
            ) {
              resetCalibration();
            }
            faceLostAtRef.current = null;
            const baselineX = baselineXRef.current;
            const baselineY = baselineYRef.current;
            const baselineWidth = baselineFaceWidthRef.current;
            if (
              baselineX !== null &&
              baselineY !== null &&
              baselineWidth !== null
            ) {
              recenteredAfterFaceLossRef.current = false;
              resetCalibration();
              const x = (baselineX - faceCenterX) * 2;
              const y = (baselineY - faceCenterY) * 2;
              const z = baselineWidth / faceWidth - 1;
              onPositionChangeRef.current?.({ x, y, z });
              if (debugRef.current && now - lastUiUpdateRef.current >= 80) {
                setPositionX(x);
                setPositionY(y);
                setPositionZ(z);
                setIsFaceDetected(true);
                setStatus("Лицо обнаружено");
                lastUiUpdateRef.current = now;
              }
            } else {
              if (calibrationStartedAtRef.current === null) {
                calibrationStartedAtRef.current = now;
                calibrationSumXRef.current = 0;
                calibrationSumYRef.current = 0;
                calibrationSumWidthRef.current = 0;
                calibrationSampleCountRef.current = 0;
              }
              calibrationSumXRef.current += faceCenterX;
              calibrationSumYRef.current += faceCenterY;
              calibrationSumWidthRef.current += faceWidth;
              calibrationSampleCountRef.current += 1;
              const calibrationDuration = now - calibrationStartedAtRef.current;
              if (
                calibrationDuration >= RECALIBRATION_DELAY_MS &&
                calibrationSampleCountRef.current > 0
              ) {
                const sampleCount = calibrationSampleCountRef.current;
                baselineXRef.current = calibrationSumXRef.current / sampleCount;
                baselineYRef.current = calibrationSumYRef.current / sampleCount;
                baselineFaceWidthRef.current =
                  calibrationSumWidthRef.current / sampleCount;
                resetCalibration();
                recenteredAfterFaceLossRef.current = false;
                sendCenterPosition();
                if (debugRef.current) {
                  setIsFaceDetected(true);
                  setStatus("Центр зафиксирован");
                  lastUiUpdateRef.current = now;
                }
              } else if (
                debugRef.current &&
                now - lastUiUpdateRef.current >= 80
              ) {
                setPositionX(0);
                setPositionY(0);
                setPositionZ(0);
                setIsFaceDetected(true);
                setStatus(
                  `Калибровка положения: ${RECALIBRATION_DELAY_MS / 1000} сек.`,
                );
                lastUiUpdateRef.current = now;
              }
            }
          }
        }
        if (!faceDetected) {
          if (faceLostAtRef.current === null) {
            faceLostAtRef.current = now;
          }
          const faceLostDuration = now - faceLostAtRef.current;
          if (
            faceLostDuration >= FACE_DETECTION_GRACE_MS &&
            baselineXRef.current === null &&
            calibrationStartedAtRef.current !== null
          ) {
            resetCalibration();
          }
          if (
            faceLostDuration >= FACE_LOSS_TIMEOUT_MS &&
            !recenteredAfterFaceLossRef.current
          ) {
            returnToCenter();
          }
          if (debugRef.current && now - lastUiUpdateRef.current >= 300) {
            setIsFaceDetected(false);
            setStatus(
              recenteredAfterFaceLossRef.current
                ? "Лицо отсутствует — центрирование"
                : "Лицо не обнаружено",
            );
            lastUiUpdateRef.current = now;
          }
        }
      }
      frameId = requestAnimationFrame(processFrame);
    };
    const startCamera = async () => {
      if (cancelled) return;
      setIsError(false);
      setStatus("Запрашиваем доступ к камере");
      try {
        if (!window.isSecureContext) {
          throw new Error("Для доступа к камере требуется HTTPS");
        }
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Браузер не поддерживает доступ к камере");
        }
        permissionRequestStarted = true;
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });
        if (!cancelled) {
          notifyCameraPermissionSettled();
        }
        localStream = stream;
        if (cancelled) {
          dispose();
          return;
        }
        streamRef.current = stream;
        setIsCameraOn(true);
        setStatus("Камера включена — загружаем модель");
        const video = videoRef.current;
        if (!video) {
          throw new Error("Не найден видеоэлемент");
        }
        video.srcObject = stream;
        await video.play();
        if (cancelled) {
          dispose();
          return;
        }
        const vision = await FilesetResolver.forVisionTasks(WASM_URL);
        if (cancelled) {
          dispose();
          return;
        }
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
          },
          runningMode: "VIDEO",
          numFaces: 1,
          minFaceDetectionConfidence: 0.5,
          minFacePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        localLandmarker = landmarker;
        if (cancelled) {
          dispose();
          return;
        }
        landmarkerRef.current = landmarker;
        resetBaseline();
        resetCalibration();
        faceLostAtRef.current = null;
        recenteredAfterFaceLossRef.current = false;
        lastVideoTimeRef.current = -1;
        lastUiUpdateRef.current = 0;
        isRunningRef.current = true;
        setIsActive(true);
        setStatus("Ищем лицо");
        frameId = requestAnimationFrame(processFrame);
      } catch (error) {
        if (permissionRequestStarted && !cancelled) {
          notifyCameraPermissionSettled();
        }
        dispose();
        if (cancelled) return;
        setIsCameraOn(false);
        setIsActive(false);
        setIsFaceDetected(false);
        setIsError(true);
        setStatus(formatError(error));
        onPositionChangeRef.current?.({
          x: 0,
          y: 0,
          z: 0,
        });
      }
    };
    queueMicrotask(() => {
      void startCamera();
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);
  return {
    videoRef,
    isCameraOn,
    isActive,
    isFaceDetected,
    isError,
    status,
    positionX,
    positionY,
    positionZ,
  };
}
