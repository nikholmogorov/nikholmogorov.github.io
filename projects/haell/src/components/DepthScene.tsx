import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide, MathUtils, PlaneGeometry, SRGBColorSpace } from "three";

import {
  CAMERA_FOV,
  COLOR_IMAGE,
  DEPTH_IMAGE,
  DEPTH_STRENGTH,
  INITIAL_CAMERA_Z,
  INVERT_DEPTH,
  SEGMENTS_X,
  VIEW_SCALE,
} from "../constants";

import { changeBase } from "../utils";

export default function DepthScene() {
  const [loadedColorTexture, depthTexture] = useTexture([
    changeBase(COLOR_IMAGE),
    changeBase(DEPTH_IMAGE),
  ]);

  const colorTexture = useMemo(() => {
    const texture = loadedColorTexture.clone();
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [loadedColorTexture]);

  colorTexture.colorSpace = SRGBColorSpace;

  const colorImage = colorTexture.image as HTMLImageElement;
  const depthImage = depthTexture.image as HTMLImageElement;

  const imageWidth = colorImage.naturalWidth || colorImage.width;
  const imageHeight = colorImage.naturalHeight || colorImage.height;

  const aspect = imageWidth / imageHeight;

  const planeHeight =
    2 * INITIAL_CAMERA_Z * MathUtils.degToRad(CAMERA_FOV / 2) * VIEW_SCALE;

  const planeWidth = planeHeight * aspect;

  const geometry = useMemo(() => {
    const segmentsX = SEGMENTS_X;
    const segmentsY = Math.max(2, Math.round(segmentsX / aspect));
    const geometry = new PlaneGeometry(
      planeWidth,
      planeHeight,
      segmentsX,
      segmentsY,
    );

    const canvas = document.createElement("canvas");
    canvas.width = segmentsX + 1;
    canvas.height = segmentsY + 1;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      console.error("Не удалось создать Canvas 2D для карты глубины");
      return geometry;
    }

    context.drawImage(depthImage, 0, 0, canvas.width, canvas.height);

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

    const positions = geometry.attributes.position;
    const uvs = geometry.attributes.uv;

    for (let i = 0; i < positions.count; i += 1) {
      const u = uvs.getX(i);
      const v = uvs.getY(i);

      const x = Math.min(canvas.width - 1, Math.round(u * (canvas.width - 1)));

      const y = Math.min(
        canvas.height - 1,
        Math.round((1 - v) * (canvas.height - 1)),
      );

      const pixelIndex = (y * canvas.width + x) * 4;

      let depth = pixels[pixelIndex] / 255;

      if (INVERT_DEPTH) {
        depth = 1 - depth;
      }

      const displacement = (depth - 0.5) * DEPTH_STRENGTH;

      positions.setZ(i, displacement);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    return geometry;
  }, [depthImage, aspect, planeWidth, planeHeight]);

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshBasicMaterial
        map={colorTexture}
        side={DoubleSide}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}
