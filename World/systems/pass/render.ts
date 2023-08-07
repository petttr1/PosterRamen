import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {Camera, Scene} from "three";

function createRenderPass(scene: Scene, camera: Camera) {
    return new RenderPass(scene, camera);
}

export { createRenderPass };