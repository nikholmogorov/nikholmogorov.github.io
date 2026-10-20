import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide, SRGBColorSpace } from "three";
import {
  BASE_COLOR,
  CENTER_Z,
  FRAME_THICKNESS,
  FRAME_Z_POSITIONS,
  HAELL_HEIGHT,
  HAELL_LENGTH,
  HAELL_WIDTH,
  HALF_HEIGHT,
  HALF_WIDTH,
  HEART_IMAGE,
  IMAGE_WIDTH,
  IMAGE_X,
  IMAGE_Y,
  IMAGE_Z_OFFSET,
  SKULL_IMAGE,
  WALL_THICKNESS,
} from "../constants";
import type { HaellProps } from "../types";
import { changeBase } from "../utils";
import TexturePlane from "./TexturePlane";

export default function Haell(props: HaellProps) {
  const { accentColor, isHeartMode, canToggleTheme, onToggleTheme } = props;

  const [cachedSkullTexture, cachedHeartTexture] = useTexture([
    changeBase(SKULL_IMAGE),
    changeBase(HEART_IMAGE),
  ]);

  const [skullTexture, heartTexture] = useMemo(() => {
    const skull = cachedSkullTexture.clone();
    skull.colorSpace = SRGBColorSpace;

    const heart = cachedHeartTexture.clone();
    heart.colorSpace = SRGBColorSpace;

    return [skull, heart] as const;
  }, [cachedSkullTexture, cachedHeartTexture]);

  const backgroundTexture = isHeartMode ? heartTexture : skullTexture;
  const backgroundImage = backgroundTexture.image as HTMLImageElement;
  const imageAspect =
    backgroundImage.naturalWidth / backgroundImage.naturalHeight;
  const imageHeight = IMAGE_WIDTH / imageAspect;
  const backWallZ = CENTER_Z - HAELL_LENGTH / 2;
  const imageZ = backWallZ + WALL_THICKNESS / 2 + IMAGE_Z_OFFSET;

  return (
    <group>
      <mesh position={[0, -HALF_HEIGHT, CENTER_Z]}>
        <boxGeometry args={[HAELL_WIDTH, WALL_THICKNESS, HAELL_LENGTH]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.9} />
      </mesh>
      <mesh position={[0, HALF_HEIGHT, CENTER_Z]}>
        <boxGeometry args={[HAELL_WIDTH, WALL_THICKNESS, HAELL_LENGTH]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.9} />
      </mesh>
      <mesh position={[-HALF_WIDTH, 0, CENTER_Z]}>
        <boxGeometry args={[WALL_THICKNESS, HAELL_HEIGHT, HAELL_LENGTH]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[HALF_WIDTH, 0, CENTER_Z]}>
        <boxGeometry args={[WALL_THICKNESS, HAELL_HEIGHT, HAELL_LENGTH]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, CENTER_Z - HAELL_LENGTH / 2]}>
        <boxGeometry args={[HAELL_WIDTH, HAELL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[IMAGE_X, IMAGE_Y, imageZ]}>
        <planeGeometry args={[IMAGE_WIDTH, imageHeight]} />
        <meshBasicMaterial
          map={backgroundTexture}
          transparent
          alphaTest={0.01}
          side={DoubleSide}
          toneMapped={false}
          fog={false}
        />
      </mesh>
      <TexturePlane
        src="/chain-1.png"
        position={[3, 1.39, -7]}
        width={0.5}
        color={accentColor}
        onClick={canToggleTheme ? onToggleTheme : undefined}
      />
      <TexturePlane
        src="/chain-2.png"
        position={[-3.75, 6, -15]}
        width={0.5}
        color={accentColor}
      />
      <TexturePlane
        src="/chain-3.png"
        position={[3.5, 1, -31]}
        width={0.25}
        color={accentColor}
      />
      {FRAME_Z_POSITIONS.map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[-HALF_WIDTH + FRAME_THICKNESS / 6, 0, 0]}>
            <boxGeometry
              args={[FRAME_THICKNESS, HAELL_HEIGHT, FRAME_THICKNESS]}
            />
            <meshStandardMaterial color={accentColor} roughness={0.6} />
          </mesh>
          <mesh position={[HALF_WIDTH - FRAME_THICKNESS / 6, 0, 0]}>
            <boxGeometry
              args={[FRAME_THICKNESS, HAELL_HEIGHT, FRAME_THICKNESS]}
            />
            <meshStandardMaterial color={accentColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, HALF_HEIGHT - FRAME_THICKNESS / 6, 0]}>
            <boxGeometry
              args={[HAELL_WIDTH, FRAME_THICKNESS, FRAME_THICKNESS]}
            />
            <meshStandardMaterial color={accentColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, -HALF_HEIGHT + FRAME_THICKNESS / 6, 0]}>
            <boxGeometry
              args={[HAELL_WIDTH, FRAME_THICKNESS, FRAME_THICKNESS]}
            />
            <meshStandardMaterial color={accentColor} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
