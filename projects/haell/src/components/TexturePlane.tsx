import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { DoubleSide, SRGBColorSpace } from "three";
import type { TexturePlaneProps } from "../types";
import { changeBase } from "../utils";

export default function TexturePlane(props: TexturePlaneProps) {
  const {
    src,
    position,
    width,
    color,
    opacity = 1,
    alphaTest = 0.01,
    onClick,
  } = props;

  const cachedTexture = useTexture(changeBase(src));
  const { gl } = useThree();

  const texture = useMemo(() => {
    const clone = cachedTexture.clone();
    clone.colorSpace = SRGBColorSpace;
    return clone;
  }, [cachedTexture]);

  const image = texture.image as HTMLImageElement;
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const aspectRatio = imageWidth / imageHeight;
  const height = width / aspectRatio;

  useEffect(() => {
    if (!onClick) {
      gl.domElement.style.cursor = "";
    }
    return () => {
      gl.domElement.style.cursor = "";
    };
  }, [gl, onClick]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: React Three Fiber mesh is an intentionally interactive 3D object.
    <mesh
      position={position}
      onClick={
        onClick
          ? (event) => {
              event.stopPropagation();
              onClick();
            }
          : undefined
      }
      onPointerOver={
        onClick
          ? () => {
              gl.domElement.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={
        onClick
          ? () => {
              gl.domElement.style.cursor = "";
            }
          : undefined
      }
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={opacity}
        alphaTest={alphaTest}
        depthWrite={false}
        side={DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
