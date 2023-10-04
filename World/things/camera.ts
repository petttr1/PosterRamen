import { OrthographicCamera } from "three";
import { HEIGHT, WIDTH } from "~/constants";

function createCamera() {
  return new OrthographicCamera(
    WIDTH / -2,
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT / -2,
    0,
    Number.MAX_VALUE,
  );
}

function createCameraParams(
  left: number,
  right: number,
  top: number,
  bottom: number,
) {
  return new OrthographicCamera(left, right, top, bottom, 0, Number.MAX_VALUE);
}

export { createCamera, createCameraParams };
