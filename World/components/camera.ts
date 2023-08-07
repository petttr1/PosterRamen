import { OrthographicCamera } from 'three';
import {HEIGHT, WIDTH} from "~/constants";

function createCamera() {
    const camera = new OrthographicCamera(
        WIDTH / - 2,
        WIDTH / 2,
        HEIGHT / 2,
        HEIGHT / - 2,
        0,
        Number.MAX_VALUE
    );
    camera.position.set(0, 0, 10);
    return camera;
}

export { createCamera };