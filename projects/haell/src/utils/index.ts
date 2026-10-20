import {
  FOG_BREATH_PERIOD,
  FOG_FAR_AMPLITUDE,
  FOG_NEAR_AMPLITUDE,
  FOG_START_FAR,
  FOG_START_NEAR,
} from "../constants";

import type { FogValues } from "../types";

export function getBreathingFogValues(time: number): FogValues {
  const wave = Math.sin((time / FOG_BREATH_PERIOD) * Math.PI * 2);

  return {
    near: FOG_START_NEAR + wave * FOG_NEAR_AMPLITUDE,
    far: FOG_START_FAR + wave * FOG_FAR_AMPLITUDE,
  };
}

export function changeBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
