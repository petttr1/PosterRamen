import {
    Camera,
    LinearFilter,
    RGBAFormat, Scene, WebGLRenderer,
    WebGLRenderTarget
} from 'three';
import {HEIGHT, WIDTH} from "~/constants";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {createRenderPass} from "~/World/systems/pass/render";
import {createGrainPass} from "~/World/systems/pass/grain";
import {createLiquidPass} from "~/World/systems/pass/liquid";
import {createMaskingPass} from "~/World/systems/pass/masking";
import {createBloomPass} from "~/World/systems/pass/bloom";

function createComposer(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    const parameters = {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBAFormat,
        stencilBuffer: false
    };
    const renderTarget = new WebGLRenderTarget( WIDTH, HEIGHT, parameters );
    const composer = new EffectComposer(renderer, renderTarget);
    composer.setSize(WIDTH, HEIGHT);
    composer.addPass(createRenderPass(scene, camera));
    composer.addPass(createLiquidPass());
    composer.addPass(createBloomPass());
    composer.addPass(createMaskingPass());
    composer.addPass(createGrainPass());
    return composer;
}

export { createComposer };