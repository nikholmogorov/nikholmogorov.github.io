import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";

import AnimatedFog from "./components/AnimatedFog";
import HeadCameraController from "./components/CameraController";
// import Haell from "./components/Haell";
import DepthScene from "./components/DepthScene";
import HeadTracking from "./components/HeadTracking";

import {
  ACCENT_COLOR,
  ALTERNATE_ACCENT_COLOR,
  CAMERA_FOV,
  DEBUG,
  FOG_START_FAR,
  FOG_START_NEAR,
  FOG_TRANSITION_SECONDS,
  FOG_WAIT_SECONDS,
  HEART_FAVICON,
  HEART_PAGE_TITLE,
  INITIAL_CAMERA_Z,
  SKULL_FAVICON,
  SKULL_PAGE_TITLE,
} from "./constants";
import type { HeadPosition } from "./types";
import { changeBase } from "./utils";

export default function App() {
  const [isHeartMode, setIsHeartMode] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [hasCameraPermissionDecision, setHasCameraPermissionDecision] = useState(false);

  const initialTitleRef = useRef<string | null>(null);
  const headPositionRef = useRef<HeadPosition>({
    x: 0,
    y: 0,
    z: 0,
  });

  const accentColor = isHeartMode ? ALTERNATE_ACCENT_COLOR : ACCENT_COLOR;

  const handleCameraPermissionSettled = useCallback(() => {
    setHasCameraPermissionDecision(true);
  }, []);

  useEffect(() => {
    if (!hasCameraPermissionDecision) return;
    const lockDelayMs = (FOG_WAIT_SECONDS + FOG_TRANSITION_SECONDS) * 1000;
    const timeoutId = window.setTimeout(() => {
      setIsInteractionLocked(true);
    }, lockDelayMs);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasCameraPermissionDecision]);

  useEffect(() => {
    if (initialTitleRef.current === null) {
      initialTitleRef.current = document.title;
    }
    let favicon = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.type = "image/png";
    favicon.href = changeBase(isHeartMode ? HEART_FAVICON : SKULL_FAVICON);
    document.title = isHeartMode ? HEART_PAGE_TITLE : SKULL_PAGE_TITLE;
  }, [isHeartMode]);
  const handleHeadPositionChange = useCallback((position: HeadPosition) => {
    headPositionRef.current = position;
  }, []);

  // @ts-ignore — функция используется только в режиме 3D-коридора
  const handleToggleTheme = useCallback(() => {
    if (isInteractionLocked) return;
    setIsHeartMode((current) => !current);
  }, [isInteractionLocked]);

  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <Canvas
        className="absolute inset-0"
        camera={{
          position: [0, 0, INITIAL_CAMERA_Z],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <fog
          attach="fog"
          args={[accentColor, FOG_START_NEAR, FOG_START_FAR]}
        />
        <AnimatedFog isStarted={hasCameraPermissionDecision} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 7, 5]}
          intensity={2}
        />
        {/* <Haell
          accentColor={accentColor}
          isHeartMode={isHeartMode}
          canToggleTheme={!isInteractionLocked}
          onToggleTheme={handleToggleTheme}
        /> */}
        <DepthScene />
        <HeadCameraController headPositionRef={headPositionRef} />
      </Canvas>
      <HeadTracking
        debug={DEBUG}
        onPositionChange={handleHeadPositionChange}
        onCameraPermissionSettled={handleCameraPermissionSettled}
      />
    </main>
  );
}
