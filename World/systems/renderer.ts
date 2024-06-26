import { ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer } from "three";
import { HEIGHT, WIDTH } from "~/constants";

function createBaseRenderer() {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true; // important!
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  return renderer;
}

function createRenderer() {
  const renderer = createBaseRenderer();
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  return renderer;
}

function createExportRenderer() {
  const renderer = createBaseRenderer();
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 2);
  return renderer;
}

function createLandingRenderer(width: number, height: number) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true; // important!
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
}

export { createRenderer, createExportRenderer, createLandingRenderer };
