import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { HEIGHT, WIDTH } from "~/constants";

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
uniform float top;
uniform float right;
uniform float bottom;
uniform float left;
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
    vec4 color = texture2D( tDiffuse, vUv );
    vec2 uv = vUv;

    // bottom-left
    vec2 bl = step(vec2(left, bottom),uv);

    float padding = bl.x * bl.y;

    // top-right
    vec2 tr = step(vec2(right, top),1.0-uv);
    padding *= tr.x * tr.y;

    // if white
    // color.rgb /= padding;
    // if black
    // color.rgb *= padding;
    gl_FragColor = vec4( step( 0.5, padding ) * color.rgb, 1 );
}
`;

function createMaskingPass() {
  const maskingEffect = {
    uniforms: {
      tDiffuse: { value: null },
      top: { value: 64 / HEIGHT },
      right: { value: 64 / WIDTH },
      bottom: { value: 228 / HEIGHT },
      left: { value: 64 / WIDTH },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const maskingPass = new ShaderPass(maskingEffect);
  maskingPass.renderToScreen = true;
  return maskingPass;
}

export { createMaskingPass };
