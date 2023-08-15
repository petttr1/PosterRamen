import { Color, ColorRepresentation, Scene } from "three";

function createScene(color: ColorRepresentation) {
  const scene = new Scene();
  scene.background = new Color(color);
  return scene;
}

function createLandingScene() {
  return new Scene();
}

export { createScene, createLandingScene };
