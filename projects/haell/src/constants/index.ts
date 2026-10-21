const DEBUG = false;

const BASE_COLOR = "#000000";
const ACCENT_COLOR = "#ff0000";
const ALTERNATE_ACCENT_COLOR = "#ff0090";

const SKULL_IMAGE = "/skull.png";
const HEART_IMAGE = "/heart.png";

const SKULL_FAVICON = "/favicon-skull.png";
const HEART_FAVICON = "/favicon-heart.png";

const SKULL_PAGE_TITLE = "hæll";
const HEART_PAGE_TITLE = "heart";

const IMAGE_WIDTH = 2;
const IMAGE_X = 0;
const IMAGE_Y = 0;

const IMAGE_Z_OFFSET = 0.05;

const INITIAL_CAMERA_Z = 7;
const CAMERA_FOV = 70;
const SCREEN_PLANE_Z = 0;

// для 3D лучше подходит чувствительность 1.5
// для 2.5D parallax with depth map лучше подходит чувствительность 5
const HEAD_SENSITIVITY_X = 5;
const HEAD_SENSITIVITY_Y = 5;
const HEAD_SENSITIVITY_Z = 5;

const CAMERA_SMOOTHING = 6;

const MIN_CAMERA_Z = 2.5;
const MAX_CAMERA_Z = 14;

const FACE_LOSS_TIMEOUT_MS = 5000;
const RECALIBRATION_DELAY_MS = 2000;
const FACE_DETECTION_GRACE_MS = 250;

const HAELL_WIDTH = 10;
const HAELL_HEIGHT = 7;
const HAELL_LENGTH = 48;

const HALF_WIDTH = HAELL_WIDTH / 2;
const HALF_HEIGHT = HAELL_HEIGHT / 2;

const CENTER_Z = -15;

const WALL_THICKNESS = 0.18;
const FRAME_THICKNESS = 0.14;

const FRAME_Z_POSITIONS = [1, -3, -7, -11, -15, -19, -23, -27, -31, -35];

const FOG_WAIT_SECONDS = 19;
const FOG_TRANSITION_SECONDS = 3;

const FOG_START_NEAR = 15;
const FOG_START_FAR = 65;

const FOG_BREATH_PERIOD = 3;
const FOG_NEAR_AMPLITUDE = 2;
const FOG_FAR_AMPLITUDE = 6;

const FOG_END_NEAR = 0;
const FOG_END_FAR = 0.1;

// константы для 2.5D parallax with depth map
const COLOR_IMAGE = "/image.jpg";
const DEPTH_IMAGE = "/image-depth.png";

const SEGMENTS_X = 320;

const DEPTH_STRENGTH = 4;

const INVERT_DEPTH = false;

const VIEW_SCALE = 1.15;
// конец блока констант

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export {
  ACCENT_COLOR,
  ALTERNATE_ACCENT_COLOR,
  BASE_COLOR,
  CAMERA_FOV,
  CAMERA_SMOOTHING,
  CENTER_Z,
  COLOR_IMAGE,
  DEBUG,
  DEPTH_IMAGE,
  DEPTH_STRENGTH,
  FACE_DETECTION_GRACE_MS,
  FACE_LOSS_TIMEOUT_MS,
  FOG_BREATH_PERIOD,
  FOG_END_FAR,
  FOG_END_NEAR,
  FOG_FAR_AMPLITUDE,
  FOG_NEAR_AMPLITUDE,
  FOG_START_FAR,
  FOG_START_NEAR,
  FOG_TRANSITION_SECONDS,
  FOG_WAIT_SECONDS,
  FRAME_THICKNESS,
  FRAME_Z_POSITIONS,
  HAELL_HEIGHT,
  HAELL_LENGTH,
  HAELL_WIDTH,
  HALF_HEIGHT,
  HALF_WIDTH,
  HEAD_SENSITIVITY_X,
  HEAD_SENSITIVITY_Y,
  HEAD_SENSITIVITY_Z,
  HEART_FAVICON,
  HEART_IMAGE,
  HEART_PAGE_TITLE,
  IMAGE_WIDTH,
  IMAGE_X,
  IMAGE_Y,
  IMAGE_Z_OFFSET,
  INITIAL_CAMERA_Z,
  INVERT_DEPTH,
  MAX_CAMERA_Z,
  MIN_CAMERA_Z,
  MODEL_URL,
  RECALIBRATION_DELAY_MS,
  SCREEN_PLANE_Z,
  SEGMENTS_X,
  SKULL_FAVICON,
  SKULL_IMAGE,
  SKULL_PAGE_TITLE,
  VIEW_SCALE,
  WALL_THICKNESS,
  WASM_URL,
};
