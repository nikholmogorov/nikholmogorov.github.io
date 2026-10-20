import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera } from "three";

import {
  CAMERA_FOV,
  CAMERA_SMOOTHING,
  HEAD_SENSITIVITY_X,
  HEAD_SENSITIVITY_Y,
  HEAD_SENSITIVITY_Z,
  INITIAL_CAMERA_Z,
  MAX_CAMERA_Z,
  MIN_CAMERA_Z,
  SCREEN_PLANE_Z,
} from "../constants";

import type { HeadCameraControllerProps } from "../types";

export default function HeadCameraController(props: HeadCameraControllerProps) {
  const { headPositionRef } = props;

  const camera = useThree((state) => state.camera);

  const smoothedX = useRef(0);
  const smoothedY = useRef(0);
  const smoothedZ = useRef(0);

  useFrame((_, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    const head = headPositionRef.current;
    const targetX = MathUtils.clamp(head.x * HEAD_SENSITIVITY_X, -3, 3);
    const targetY = MathUtils.clamp(head.y * HEAD_SENSITIVITY_Y, -2.5, 2.5);
    const targetZ = MathUtils.clamp(
      -head.z * HEAD_SENSITIVITY_Z,
      MIN_CAMERA_Z - INITIAL_CAMERA_Z,
      MAX_CAMERA_Z - INITIAL_CAMERA_Z,
    );
    smoothedX.current = MathUtils.damp(
      smoothedX.current,
      targetX,
      CAMERA_SMOOTHING,
      delta,
    );
    smoothedY.current = MathUtils.damp(
      smoothedY.current,
      targetY,
      CAMERA_SMOOTHING,
      delta,
    );
    smoothedZ.current = MathUtils.damp(
      smoothedZ.current,
      targetZ,
      CAMERA_SMOOTHING,
      delta,
    );
    camera.position.set(
      smoothedX.current,
      smoothedY.current,
      MathUtils.clamp(
        INITIAL_CAMERA_Z + smoothedZ.current,
        MIN_CAMERA_Z,
        MAX_CAMERA_Z,
      ),
    );
    const screenDistance = camera.position.z - SCREEN_PLANE_Z;
    if (screenDistance <= 0) return;
    const initialScreenDistance = INITIAL_CAMERA_Z - SCREEN_PLANE_Z;
    const halfHeightAtScreen =
      initialScreenDistance * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2));
    const halfWidthAtScreen = halfHeightAtScreen * camera.aspect;
    const near = camera.near;
    const left =
      (near * (-halfWidthAtScreen - camera.position.x)) / screenDistance;
    const right =
      (near * (halfWidthAtScreen - camera.position.x)) / screenDistance;
    const top =
      (near * (halfHeightAtScreen - camera.position.y)) / screenDistance;
    const bottom =
      (near * (-halfHeightAtScreen - camera.position.y)) / screenDistance;
    camera.projectionMatrix.makePerspective(
      left,
      right,
      top,
      bottom,
      near,
      camera.far,
    );
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    camera.updateMatrixWorld();
  });
  return null;
}
