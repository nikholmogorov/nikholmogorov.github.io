import { Line, useTexture } from "@react-three/drei";
import { type ThreeEvent, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { CUBE_SIZE, FIELD_LIMIT, HALF_CUBE_SIZE, OUTLINE_POINTS, SKIN_TEXTURE_PATHS } from "../constants";
import type { CubeProps, PointerCaptureTarget, Position } from "../types/index";
import { findSnapPosition, rotateTexture, changeBase } from "../utils";

// плоскость
const plane = new THREE.Plane(
  // нормаль плоскости идёт по Z
  new THREE.Vector3(0, 0, 1),
  // плоскость поднята на высоту половины куба, на 100 вверх
  -HALF_CUBE_SIZE,
);

export default function DraggableCube(props: CubeProps) {
  const { id, skin, position, otherPosition, isAttached, isSelected, onSelect, onPositionChange } = props;

  const isDragging = useRef(false);

  const dragOffset = useMemo(() => new THREE.Vector2(), []);
  const intersectionPoint = useMemo(() => new THREE.Vector3(), []);

  const [topTexture, frontTexture, backTexture, leftTexture, rightTexture] = useTexture(
    SKIN_TEXTURE_PATHS[skin].map(changeBase),
  );

  // поворот текстур для второго куба
  const [secondTopTexture, secondFrontTexture, secondLeftTexture, secondRightTexture] = useMemo(
    () => [
      rotateTexture(topTexture),
      rotateTexture(frontTexture),
      rotateTexture(leftTexture),
      rotateTexture(rightTexture),
    ],
    [topTexture, frontTexture, leftTexture, rightTexture],
  );

  // добавляем cursor: pointer; из nes.css
  const { gl } = useThree();
  function handlePointerOver() {
    gl.domElement.classList.add("nes-pointer");
  }
  function handlePointerOut() {
    gl.domElement.classList.remove("nes-pointer");
  }

  const snapAudio = useRef<HTMLAudioElement | null>(null);
  const snapSoundPlayed = useRef(false);

  useEffect(() => {
    const audio = new Audio(changeBase("/sounds/fight.mp3"));
    audio.preload = "auto";
    audio.load();
    snapAudio.current = audio;
    return () => {
      audio.pause();
      snapAudio.current = null;
    };
  }, []);

  useEffect(() => {
    if (isAttached) return;
    const audio = snapAudio.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    snapSoundPlayed.current = false;
  }, [isAttached]);

  useEffect(() => {
    const textures = [
      topTexture,
      frontTexture,
      backTexture,
      leftTexture,
      rightTexture,
      secondTopTexture,
      secondFrontTexture,
      secondLeftTexture,
      secondRightTexture,
    ];

    for (const texture of textures) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [
    topTexture,
    frontTexture,
    backTexture,
    leftTexture,
    rightTexture,
    secondTopTexture,
    secondFrontTexture,
    secondLeftTexture,
    secondRightTexture,
  ]);

  useEffect(() => {
    return () => {
      secondTopTexture.dispose();
      secondFrontTexture.dispose();
      secondLeftTexture.dispose();
      secondRightTexture.dispose();
    };
  }, [secondTopTexture, secondFrontTexture, secondLeftTexture, secondRightTexture]);

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    snapSoundPlayed.current = false;
    // остановка всплытия для бокового вида
    e.stopPropagation();
    onSelect(id);
    // точка пересечения плоскости и луча из камеры в курсор
    const point = e.ray.intersectPlane(plane, intersectionPoint);
    if (!point) return;
    dragOffset.set(point.x - position[0], point.y - position[1]);
    isDragging.current = true;
    const target = e.target as PointerCaptureTarget | null;
    target?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (!isDragging.current) return;
    // при перемещении точку необходимо пересчитывать
    const point = e.ray.intersectPlane(plane, intersectionPoint);
    if (!point) return;
    // вычисление x центра куба с учётом смещения
    const x = THREE.MathUtils.clamp(point.x - dragOffset.x, -FIELD_LIMIT, FIELD_LIMIT);
    // вычисление y центра куба с учётом смещения
    const y = THREE.MathUtils.clamp(point.y - dragOffset.y, -FIELD_LIMIT, FIELD_LIMIT);
    const requestedPosition: Position = [x, y, HALF_CUBE_SIZE];
    if (isAttached) {
      onPositionChange(id, requestedPosition);
      return;
    }
    const snappedPosition = findSnapPosition(position, requestedPosition, otherPosition);
    if (snappedPosition) {
      onPositionChange(id, snappedPosition, true);
      if (!snapSoundPlayed.current) {
        snapSoundPlayed.current = true;
        const audio = snapAudio.current;
        if (audio) {
          audio.currentTime = 0;
          void audio.play();
        }
      }
      return;
    }
    onPositionChange(id, requestedPosition);
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    isDragging.current = false;
    const target = e.target as PointerCaptureTarget | null;
    target?.releasePointerCapture(e.pointerId);
  }

  return (
    <group position={position}>
      <mesh
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        {/*  лево first, право second */}
        <meshBasicMaterial
          attach="material-0"
          map={id === "first" ? leftTexture : secondRightTexture}
        />
        {/* право first, лево second */}
        <meshBasicMaterial
          attach="material-1"
          map={id === "first" ? rightTexture : secondLeftTexture}
        />
        {/*   зад first, перед second*/}
        <meshBasicMaterial
          attach="material-2"
          map={id === "first" ? backTexture : secondFrontTexture}
        />
        {/*  перед first, зад second */}
        <meshBasicMaterial
          attach="material-3"
          map={id === "first" ? frontTexture : backTexture}
        />
        {/*  верх first и second */}
        <meshBasicMaterial
          attach="material-4"
          map={id === "first" ? topTexture : secondTopTexture}
        />
        {/* низ first и second */}
        <meshBasicMaterial
          attach="material-5"
          color="#000000"
        />
      </mesh>
      {isSelected && (
        <Line
          points={OUTLINE_POINTS}
          segments
          color="#ff0000"
          lineWidth={2}
          raycast={() => {}}
        />
      )}
    </group>
  );
}
