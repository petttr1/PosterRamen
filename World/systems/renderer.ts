import {ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer} from 'three';
import {HEIGHT, WIDTH} from "~/constants";

function createRenderer() {
    const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
    })
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(
        WIDTH,
        HEIGHT
    )
    renderer.setPixelRatio(window.devicePixelRatio * 1);

    renderer.shadowMap.enabled = true // important!
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setPixelRatio(window.devicePixelRatio)
    return renderer;
}

export { createRenderer };