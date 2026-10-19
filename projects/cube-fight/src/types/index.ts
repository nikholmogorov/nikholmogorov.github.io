import type { ReactNode } from "react";

type CubeId = "first" | "second";
type Position = [x: number, y: number, z: number];
type CubeSkin = "skin-blue" | "skin-red" | "skin-yellow";
type CubesSkins = Record<CubeId, CubeSkin>;
type SkinTexturePaths = [
  top: string,
  front: string,
  back: string,
  left: string,
  right: string,
];

type PointerCaptureTarget = EventTarget & {
  setPointerCapture(pointerId: number): void;
  releasePointerCapture(pointerId: number): void;
};

interface CubeProps {
  id: CubeId;
  skin: CubeSkin;
  position: Position;
  otherPosition: Position;
  isAttached: boolean;
  isSelected: boolean;
  onSelect: (id: CubeId) => void;
  onPositionChange: (
    id: CubeId,
    position: Position,
    isSnapped?: boolean,
  ) => void;
}

interface CubesDisposition {
  positions: Record<CubeId, Position>;
  isCubesConnected: boolean;
}

interface PanelProps {
  selectedSkin: CubeSkin | null;
  sideView: boolean;
  isCubesConnected: boolean;
  onSetSkin: (skin: CubeSkin) => void;
  onChangeView: () => void;
  onDisconnectCubes: () => void;
}

interface DesktopOnlyGuardProps {
  children: ReactNode;
}

export type {
  CubeId,
  CubeProps,
  CubeSkin,
  CubesDisposition,
  CubesSkins,
  DesktopOnlyGuardProps,
  PanelProps,
  PointerCaptureTarget,
  Position,
  SkinTexturePaths,
};
