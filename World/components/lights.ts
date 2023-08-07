import {
    AmbientLight,
    PointLight,
} from "three";

function createLights() {
    const lights = [];
    const light = new PointLight( 0xffffff, 2, 100 );
    light.position.set( 0, 0, 100 );
    lights.push(light);
    const ambient = new AmbientLight( 0xffffff );
    lights.push(ambient)

    return lights;
}

export { createLights };