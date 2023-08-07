import {SphereGeometry} from "three";

function createSphere(r: number) {
    const geometry = new SphereGeometry( r, 128, 128);
    return geometry;
}

export {createSphere}