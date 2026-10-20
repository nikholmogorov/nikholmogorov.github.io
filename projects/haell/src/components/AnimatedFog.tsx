import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Fog } from "three";
import {
  FOG_END_FAR,
  FOG_END_NEAR,
  FOG_TRANSITION_SECONDS,
  FOG_WAIT_SECONDS,
} from "../constants";

import { getBreathingFogValues } from "../utils";

export default function AnimatedFog() {
  const startTimeRef = useRef<number | null>(null);
  useFrame((state) => {
    const fog = state.scene.fog;
    if (!(fog instanceof Fog)) return;
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    if (elapsed < FOG_WAIT_SECONDS) {
      const values = getBreathingFogValues(elapsed);
      fog.near = values.near;
      fog.far = values.far;
      return;
    }
    const transitionProgress = Math.min(
      (elapsed - FOG_WAIT_SECONDS) / FOG_TRANSITION_SECONDS,
      1,
    );
    const eased =
      transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
    const transitionStart = getBreathingFogValues(FOG_WAIT_SECONDS);
    fog.near =
      transitionStart.near + (FOG_END_NEAR - transitionStart.near) * eased;
    fog.far = transitionStart.far + (FOG_END_FAR - transitionStart.far) * eased;
  });
  return null;
}
