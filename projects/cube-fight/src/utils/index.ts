import * as THREE from "three";

import {
  CUBE_SIZE,
  CUBES_IDS,
  CUBES_INITIAL_POSITION,
  FIELD_LIMIT,
  HALF_CUBE_SIZE,
  SNAP_DISTANCE,
  SNAP_STEP,
} from "../constants";

import type { CubeId, CubesDisposition, Position } from "../types";

export function rotateTexture(texture: THREE.Texture, rotation: number = Math.PI) {
  const clone = texture.clone();
  clone.center.set(0.5, 0.5);
  clone.rotation = rotation;
  return clone;
}

export function getNextCubesDisposition(
  prev: CubesDisposition,
  id: CubeId,
  nextPosition: Position,
  isSnapped: boolean,
): CubesDisposition {
  if (prev.isCubesConnected) {
    // предыдущая позиция выбранного куба
    const prevPosition = prev.positions[id];
    // необходимое перемещения по оси x и y
    const requestedDx = nextPosition[0] - prevPosition[0];
    const requestedDy = nextPosition[1] - prevPosition[1];
    // допустимый диапазон граппового перемещения
    let minDx = -FIELD_LIMIT;
    let maxDx = FIELD_LIMIT;
    let minDy = -FIELD_LIMIT;
    let maxDy = FIELD_LIMIT;
    // для каждого куба
    for (const cubeId of CUBES_IDS) {
      // получаем позицию
      const pos = prev.positions[cubeId];
      // допустимый диапазон смещения в направлении -x
      minDx = Math.max(minDx, -FIELD_LIMIT - pos[0]);
      // допустимый диапазон смещения в направлении x
      maxDx = Math.min(maxDx, FIELD_LIMIT - pos[0]);
      // допустимый диапазон смещения в направлении -y
      minDy = Math.max(minDy, -FIELD_LIMIT - pos[1]);
      // допустимый диапазон смещения в направлении y
      maxDy = Math.min(maxDy, FIELD_LIMIT - pos[1]);
    }
    // изменение перемещения по оси x и y
    const dx = THREE.MathUtils.clamp(requestedDx, minDx, maxDx);
    const dy = THREE.MathUtils.clamp(requestedDy, minDy, maxDy);
    return {
      ...prev,
      positions: {
        // к предыдущей координате x или y прибавляем изменение перемещения по оси x или y
        first: [prev.positions.first[0] + dx, prev.positions.first[1] + dy, HALF_CUBE_SIZE],
        second: [prev.positions.second[0] + dx, prev.positions.second[1] + dy, HALF_CUBE_SIZE],
      },
    };
  }

  return {
    positions: {
      ...prev.positions,
      [id]: nextPosition,
    },
    isCubesConnected: isSnapped,
  };
}

export function findSnapPosition(pos: Position, reqPos: Position, oth: Position): Position | null {
  // изменение перемещения по оси x и y
  const dx = reqPos[0] - pos[0];
  const dy = reqPos[1] - pos[1];
  //  максимальное перемещение по оси x или y
  const distance = Math.max(Math.abs(dx), Math.abs(dy));
  //  кол-во промежуточных позиций
  const steps = Math.max(1, Math.ceil(distance / SNAP_STEP));
  // для каждой промежуточной позиции
  for (let i = 1; i <= steps; i++) {
    // доля пройденного пути
    const t = i / steps;
    //  промежуточные координаты x и y
    const x = THREE.MathUtils.lerp(pos[0], reqPos[0], t);
    const y = THREE.MathUtils.lerp(pos[1], reqPos[1], t);
    // координата центра левой грани статичного куба
    const leftX = oth[0] - CUBE_SIZE;
    if (
      // проверка премещения вправо
      dx >= 0 &&
      // проверка перекрытия по y
      Math.abs(y - oth[1]) < CUBE_SIZE &&
      // проверка входа в зону прилипания
      x >= leftX - SNAP_DISTANCE &&
      // проверка подхода с левой стороны
      x <= leftX &&
      // ограничение прилипания границами площадки
      Math.abs(leftX) <= FIELD_LIMIT
    ) {
      // координаты прилипания
      return [leftX, y, HALF_CUBE_SIZE];
    }
    const rightX = oth[0] + CUBE_SIZE;
    if (
      dx <= 0 &&
      Math.abs(y - oth[1]) < CUBE_SIZE &&
      x <= rightX + SNAP_DISTANCE &&
      x >= rightX &&
      Math.abs(rightX) <= FIELD_LIMIT
    ) {
      return [rightX, y, HALF_CUBE_SIZE];
    }
    const bottomY = oth[1] - CUBE_SIZE;
    if (
      dy >= 0 &&
      Math.abs(x - oth[0]) < CUBE_SIZE &&
      y >= bottomY - SNAP_DISTANCE &&
      y <= bottomY &&
      Math.abs(bottomY) <= FIELD_LIMIT
    ) {
      return [x, bottomY, HALF_CUBE_SIZE];
    }
    const topY = oth[1] + CUBE_SIZE;
    if (
      dy <= 0 &&
      Math.abs(x - oth[0]) < CUBE_SIZE &&
      y <= topY + SNAP_DISTANCE &&
      y >= topY &&
      Math.abs(topY) <= FIELD_LIMIT
    ) {
      return [x, topY, HALF_CUBE_SIZE];
    }
  }
  return null;
}

export function generateDisconnectedPositions(): Record<CubeId, Position> {
  // 100 попыток
  for (let i = 0; i < 100; i++) {
    // случайные координаты для первого и второго
    const first: Position = [
      THREE.MathUtils.randFloat(-FIELD_LIMIT, FIELD_LIMIT),
      THREE.MathUtils.randFloat(-FIELD_LIMIT, FIELD_LIMIT),
      HALF_CUBE_SIZE,
    ];
    const second: Position = [
      THREE.MathUtils.randFloat(-FIELD_LIMIT, FIELD_LIMIT),
      THREE.MathUtils.randFloat(-FIELD_LIMIT, FIELD_LIMIT),
      HALF_CUBE_SIZE,
    ];
    // расстояния меж центрами
    const dx = Math.abs(first[0] - second[0]);
    const dy = Math.abs(first[1] - second[1]);
    // проверка комбинации новых расстояний
    if (dx > CUBE_SIZE + SNAP_DISTANCE || dy > CUBE_SIZE + SNAP_DISTANCE) {
      return { first, second };
    }
  }
  // фоллбэк
  return CUBES_INITIAL_POSITION;
}

export function changeBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
