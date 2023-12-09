import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { baseShaderUniforms, baseUniforms } from "~/World/systems/pass/helpers";

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
uniform sampler2D tDiffuse;
varying vec2 vUv;
${baseShaderUniforms}

void main() {
    vec4 color = texture2D( tDiffuse, vUv );
    vec2 uv = vUv;
    vec2 bl = step(vec2(borders.left, borders.bottom),uv);
    float padding = bl.x * bl.y;
    vec2 tr = step(vec2(borders.right, borders.top),1.0-uv);
    padding *= tr.x * tr.y;
    if (borders.show && step( 0.5, 1. - padding ) > 0.) {
        color *= colors.background;
    }
    gl_FragColor = color;
}
`;

function createMaskingPass() {
  const maskingEffect = {
    uniforms: {
      ...baseUniforms(),
      tDiffuse: { value: null },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    name: "MaskingPass",
  };
  const maskingPass = new ShaderPass(maskingEffect);
  maskingPass.renderToScreen = true;
  return maskingPass;
}

export { createMaskingPass };
