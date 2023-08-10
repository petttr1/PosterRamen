import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { Camera, Scene } from "three";

function createRenderPass(scene: Scene, camera: Camera) {
  const renderPass = new RenderPass(scene, camera);
  renderPass.clear = false;
  return renderPass;
}

export { createRenderPass };
