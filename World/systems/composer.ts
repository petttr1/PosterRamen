import {
  Camera,
  LinearFilter,
  RGBAFormat,
  Scene,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { HEIGHT, WIDTH } from "~/constants";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { createRenderPass } from "~/World/systems/pass/render";
import { createGrainPass } from "~/World/systems/pass/grain";
import {
  createExportRenderer,
  createLandingRenderer,
  createRenderer,
} from "~/World/systems/renderer";
import { getPasses } from "~/World/systems/pass";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { createLandingPass } from "~/World/systems/pass/dotsLanding";
import { createGradientPass } from "~/World/systems/pass/gradient";
import { createZebraPass } from "~/World/systems/pass/zebra";
import { createLiquidPass } from "~/World/systems/pass/liquid";
import { createLiquidLargePass } from "~/World/systems/pass/liquidLarge";
import { createSilkPass } from "~/World/systems/pass/silk";

function createBaseComposer(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  passes: Pass[],
) {
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

function createComposer(
  scene: Scene,
  camera: Camera,
  passes: Pass[] = getPasses(scene, camera),
) {
  return createBaseComposer(createRenderer(), scene, camera, passes);
}

function createExportComposer(
  scene: Scene,
  camera: Camera,
  passes: Pass[] = getPasses(scene, camera),
) {
  return createBaseComposer(createExportRenderer(), scene, camera, passes);
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
  const dir = Math.random() - 1 > 0 ? 1 : -1;
  camera.position.x = dir * 4 + dir * Math.random() * 10;
  camera.position.y = dir * 4 + dir * Math.random() * 10;
  composer.addPass(createLiquidLargePass(camera));
  return composer;
}

export { createComposer, createExportComposer, createLandingComposer };
