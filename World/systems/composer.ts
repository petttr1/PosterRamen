import {
  Camera,
  LinearFilter,
  RGBAFormat,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { HEIGHT, WIDTH } from "~/constants";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { createExportRenderer, createRenderer } from "~/World/systems/renderer";
import { getPasses } from "~/World/systems/pass";
import { Pass } from "three/examples/jsm/postprocessing/Pass";

function createBaseComposer(renderer: WebGLRenderer, passes: Pass[]) {
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    stencilBuffer: false,
  };
  const renderTarget = new WebGLRenderTarget(WIDTH, HEIGHT, parameters);
  const composer = new EffectComposer(renderer, renderTarget);
  composer.setSize(WIDTH, HEIGHT);
  passes.forEach((pass) => composer.addPass(pass));
  return composer;
}

function createComposer(camera: Camera, passes: Pass[] = getPasses(camera)) {
  return createBaseComposer(createRenderer(), passes);
}

function createExportComposer(
  camera: Camera,
  passes: Pass[] = getPasses(camera),
) {
  return createBaseComposer(createExportRenderer(), passes);
}

export { createComposer, createExportComposer };
