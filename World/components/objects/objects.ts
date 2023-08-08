import {
    Mesh, SphereGeometry, Vector3,
} from "three";
import {HEIGHT, WIDTH} from "~/constants";
import {createMaterial} from "~/World/components/materials/material";

const sampleCoords = (min: number, max: number, r: number) => {
    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
    return clamp(Math.random() * (max - min) + min, min + r/-2, max - r/2);
}

function makeObject(pos: Vector3, r: number) {
    const geometry = new SphereGeometry( r, 128, 128);
    const material = createMaterial(geometry);
    geometry.translate(...pos);
    return new Mesh( geometry, material );
}
function makeObjects() {
    let objects = [];
    const amt = Math.floor(Math.random() * 6 + 2);
    for (let i = 0; i < amt; i++) {
        const radius = 50 + Math.random() * 300;
        const x = sampleCoords(WIDTH / - 2, WIDTH / 2, radius);
        const y = sampleCoords(HEIGHT / - 2, HEIGHT / 2 , radius);
        const z = - Math.random() * 1000;
        const coords = new Vector3(x,y,z);
        const obj = makeObject(coords, radius);
        objects.push(obj);
    }
    return objects;
}

export { makeObjects };