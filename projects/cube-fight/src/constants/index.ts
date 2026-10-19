import type {
  CubeId,
  CubeSkin,
  Position,
  SkinTexturePaths,
} from "../types/index";

const FIELD_SIZE = 800;
const CUBE_SIZE = 200;
const HALF_CUBE_SIZE = CUBE_SIZE / 2;
const FIELD_LIMIT = FIELD_SIZE / 2 - HALF_CUBE_SIZE;
const CUBES_IDS: CubeId[] = ["first", "second"];
const CUBES_COLORS = ["white", "blue", "red"];
const SNAP_DISTANCE = 20;
const SNAP_STEP = 5;
const PLATFORM_HEIGHT = 100;
const SIDE_EXTENSION = 200;
const DESKTOP_QUERY = "(min-width: 1024px)";

const CUBES_INITIAL_POSITION: Record<CubeId, Position> = {
  first: [-250, 250, HALF_CUBE_SIZE],
  second: [250, -250, HALF_CUBE_SIZE],
};

const CUBES_SKINS: CubeSkin[] = ["skin-blue", "skin-red", "skin-yellow"];

const SKIN_TEXTURE_PATHS: Record<CubeSkin, SkinTexturePaths> = {
  "skin-blue": [
    "/textures/cubes/skin-blue/top.webp",
    "/textures/cubes/skin-blue/front.webp",
    "/textures/cubes/skin-blue/back.webp",
    "/textures/cubes/skin-blue/left.webp",
    "/textures/cubes/skin-blue/right.webp",
  ],
  "skin-red": [
    "/textures/cubes/skin-red/top.webp",
    "/textures/cubes/skin-red/front.webp",
    "/textures/cubes/skin-red/back.webp",
    "/textures/cubes/skin-red/left.webp",
    "/textures/cubes/skin-red/right.webp",
  ],
  "skin-yellow": [
    "/textures/cubes/skin-yellow/top.webp",
    "/textures/cubes/skin-yellow/front.webp",
    "/textures/cubes/skin-yellow/back.webp",
    "/textures/cubes/skin-yellow/left.webp",
    "/textures/cubes/skin-yellow/right.webp",
  ],
};

const RING_TEXTURE_PATHS = {
  ring: [
    "/textures/ring/platform-side.webp",
    "/textures/ring/platform-top.webp",
    "/textures/ring/platform-ropes.webp",
  ],
};

// рамка при выборе куба
const h = (CUBE_SIZE + 10) / 2;
const OUTLINE_POINTS: [number, number, number][] = [
  // рёбра по x
  [-h, -h, -h],
  [h, -h, -h],
  [-h, h, -h],
  [h, h, -h],
  [-h, -h, h],
  [h, -h, h],
  [-h, h, h],
  [h, h, h],
  // рёбра по y
  [-h, -h, -h],
  [-h, h, -h],
  [h, -h, -h],
  [h, h, -h],
  [-h, -h, h],
  [-h, h, h],
  [h, -h, h],
  [h, h, h],
  // рёбра по z
  [-h, -h, -h],
  [-h, -h, h],
  [h, -h, -h],
  [h, -h, h],
  [-h, h, -h],
  [-h, h, h],
  [h, h, -h],
  [h, h, h],
];

export {
  CUBE_SIZE,
  CUBES_COLORS,
  CUBES_IDS,
  CUBES_INITIAL_POSITION,
  CUBES_SKINS,
  DESKTOP_QUERY,
  FIELD_LIMIT,
  FIELD_SIZE,
  HALF_CUBE_SIZE,
  OUTLINE_POINTS,
  PLATFORM_HEIGHT,
  RING_TEXTURE_PATHS,
  SIDE_EXTENSION,
  SKIN_TEXTURE_PATHS,
  SNAP_DISTANCE,
  SNAP_STEP,
};
