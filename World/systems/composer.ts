import {
  Camera,
  LinearFilter,
  RGBAFormat,
  Scene,
  WebGLRenderTarget,
} from "three";
import { HEIGHT, WIDTH } from "~/constants";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { createRenderPass } from "~/World/systems/pass/render";
import { createGrainPass } from "~/World/systems/pass/grain";
import { createLiquidPass } from "~/World/systems/pass/liquid";
import { createMaskingPass } from "~/World/systems/pass/masking";
import { createBloomPass } from "~/World/systems/pass/bloom";
import {
  createExportRenderer,
  createLandingRenderer,
  createRenderer,
} from "~/World/systems/renderer";
import { createCloudPass } from "~/World/systems/pass/cloud";

function createComposer(scene: Scene, camera: Camera) {
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    stencilBuffer: false,
  };
  const renderer = createRenderer();
  const renderTarget = new WebGLRenderTarget(WIDTH, HEIGHT, parameters);
  const composer = new EffectComposer(renderer, renderTarget);
  composer.setSize(WIDTH, HEIGHT);
  composer.addPass(createRenderPass(scene, camera));
  composer.addPass(createBloomPass());
  composer.addPass(createLiquidPass());
  composer.addPass(createMaskingPass());
  composer.addPass(createGrainPass());
  return composer;
}

function createExportComposer(scene: Scene, camera: Camera) {
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    stencilBuffer: false,
  };
  const renderer = createExportRenderer();
  const renderTarget = new WebGLRenderTarget(WIDTH, HEIGHT, parameters);
  const composer = new EffectComposer(renderer, renderTarget);
  composer.setSize(WIDTH, HEIGHT);
  composer.addPass(createRenderPass(scene, camera));
  composer.addPass(createBloomPass());
  composer.addPass(createLiquidPass());
  composer.addPass(createMaskingPass());
  composer.addPass(createGrainPass());
  return composer;
}

function createLandingComposer(
  scene: Scene,
  camera: Camera,
  width: number,
  height: number,
) {
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    stencilBuffer: false,
  };
  const renderer = createLandingRenderer(width, height);
  const renderTarget = new WebGLRenderTarget(width, height, parameters);
  const composer = new EffectComposer(renderer, renderTarget);
  composer.setSize(width, height);
  composer.addPass(createRenderPass(scene, camera));
  composer.addPass(createGrainPass());
  return composer;
}

export { createComposer, createExportComposer, createLandingComposer };
