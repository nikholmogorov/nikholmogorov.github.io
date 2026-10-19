import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

import { FIELD_SIZE, PLATFORM_HEIGHT, RING_TEXTURE_PATHS, SIDE_EXTENSION } from "../constants";

import { rotateTexture, changeBase } from "../utils";

export default function Platform() {
  const [sideTexture, topTexture, ropesTexture] = useTexture(RING_TEXTURE_PATHS.ring.map(changeBase));

  const sideTexture90 = useMemo(() => rotateTexture(sideTexture, Math.PI / 2), [sideTexture]);
  const ropesTexture90 = useMemo(() => rotateTexture(ropesTexture, Math.PI / 2), [ropesTexture]);
  const ropesTexture270 = useMemo(() => rotateTexture(ropesTexture, Math.PI * 1.5), [ropesTexture]);

  return (
    <>
      <mesh position={[0, 0, -PLATFORM_HEIGHT / 2]}>
        <boxGeometry args={[FIELD_SIZE, FIELD_SIZE, PLATFORM_HEIGHT]} />
        <meshStandardMaterial
          attach="material-0"
          map={sideTexture90}
        />
        <meshStandardMaterial
          attach="material-1"
          map={sideTexture90}
        />
        <meshStandardMaterial
          attach="material-2"
          map={sideTexture}
        />
        <meshStandardMaterial
          attach="material-3"
          map={sideTexture}
        />
        <meshStandardMaterial
          attach="material-4"
          map={topTexture}
        />
      </mesh>
      <mesh
        // управление приоритетом рендера
        renderOrder={10}
        position={[0, -(FIELD_SIZE / 2 + 0.1), SIDE_EXTENSION / 2]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <planeGeometry args={[SIDE_EXTENSION, FIELD_SIZE]} />
        <meshBasicMaterial
          map={ropesTexture270}
          transparent
          depthWrite={false}
          // отключение проверки глубины
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        // управление приоритетом рендера
        renderOrder={10}
        position={[FIELD_SIZE / 2 + 0.1, 0, SIDE_EXTENSION / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[SIDE_EXTENSION, FIELD_SIZE]} />
        <meshBasicMaterial
          map={ropesTexture90}
          transparent
          depthWrite={false}
          // отключение проверки глубины
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-(FIELD_SIZE / 2 + 0.1), 0, SIDE_EXTENSION / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[SIDE_EXTENSION, FIELD_SIZE]} />
        <meshBasicMaterial
          map={ropesTexture90}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[0, FIELD_SIZE / 2 + 0.1, SIDE_EXTENSION / 2]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <planeGeometry args={[SIDE_EXTENSION, FIELD_SIZE]} />
        <meshBasicMaterial
          map={ropesTexture270}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
