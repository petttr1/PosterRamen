import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Camera } from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix
      * modelViewMatrix
      * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform float x;
uniform float y;
uniform float offset;
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
    vec2 uv = vUv;
    float t = x + y + offset;
    vec2 center = uv / 4.;
    float g = 3.1;
    center.x+=sin(uv.y*g+x);
    center.y+=cos(uv.x*g+y);
    float d = distance(uv,center);
    float k = -sin(d*6.283*10. - t);
    float e = smoothstep(0., fwidth(k)*1.5, k);
    // gl_FragColor = vec4(sqrt(max(e, 0.)));
    float sqrte = sqrt(max(e, 0.));
    gl_FragColor = vec4(sqrte * 0.8, sqrte * 0.7, sqrte * 0.6, 1.);
}
`;

function createZebraPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      tDiffuse: { value: null },
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createZebraPass };
