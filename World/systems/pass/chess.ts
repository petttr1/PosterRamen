import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Camera } from "three";
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
#define PI 3.14159265358979323846
uniform float offset;
varying vec2 vUv;
${baseShaderUniforms}

// Function to generate a simple procedural noise
float simpleNoise(vec2 st)
{
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    // Create a chessboard pattern
    ivec2 cell = ivec2(floor(vUv * 8.0));
    bool isBlack = (cell.x + cell.y) % 2 == 1;

    // Add curvature to the lines using noise
    float noise = simpleNoise(vUv * position.x); // Adjust the noise intensity here
    vec2 perturb = vec2(noise * 0.1 - 0.05, noise * position.y - 0.05); // Adjust the perturbation amount here
    vec2 distortedTexCoord = vUv + perturb;

    // Use the distorted texture coordinates for color assignment
    ivec2 distortedCell = ivec2(floor(distortedTexCoord * 8.0));
    bool isDistortedBlack = (distortedCell.x + distortedCell.y) % 2 == 1;
    vec3 color = isDistortedBlack ? colors.background.rgb : colors.color.rgb;

    gl_FragColor = vec4(color, 1.0);
}

`;

function createChessPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      ...baseUniforms(),
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      offset: { value: 10 + $random.$getRandom() * 50 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    name: "ChessPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createChessPass };
