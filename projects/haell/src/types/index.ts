type HeadPosition = {
  x: number;
  y: number;
  z: number;
};

type HeadTrackingProps = {
  debug?: boolean;
  onPositionChange?: (position: HeadPosition) => void;
};

type HeadPositionRef = {
  current: HeadPosition;
};

type TexturePlaneProps = {
  src: string;
  position: [number, number, number];
  width: number;
  color: string;
  opacity?: number;
  alphaTest?: number;
  onClick?: () => void;
};

type HaellProps = {
  accentColor: string;
  isHeartMode: boolean;
  canToggleTheme: boolean;
  onToggleTheme: () => void;
};

type FogValues = {
  near: number;
  far: number;
};

interface HeadCameraControllerProps {
  headPositionRef: HeadPositionRef;
}

export type {
  FogValues,
  HaellProps,
  HeadCameraControllerProps,
  HeadPosition,
  HeadPositionRef,
  HeadTrackingProps,
  TexturePlaneProps,
};
