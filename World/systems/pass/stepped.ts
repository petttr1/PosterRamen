import { Camera } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { HEIGHT, WIDTH } from "~/constants";
import { translateColorspace } from "~/World/systems/pass/helpers";

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
uniform float width;
uniform float height;
uniform float offset;
uniform sampler2D tDiffuse;
varying vec2 vUv;

${translateColorspace}

float stepped(in float s, in float scale, in int steps) {
    return floor( s / ((1.0*scale) / float(steps))) * 1.0 / float(steps-1);
}
void main() {
float o = offset / 10.;
    float r = o > 0.4 ? o * 1.2 : o;
    float g = o > 0.5 ? o * 0.4 : o * 1.2;
    float b = o > 0.6 ? o * 0.6 : o - 0.4;
    vec4 Color1 = vec4(r, g, b, 1.0);
    vec4 Color2 = vec4(0.0, 0.0, 0.0, 1.0);
    int NumSteps = 16;
    float aspect = width / height; 
    
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.555);
    
    uv.x *= aspect;
    center.x *= aspect;
    float dist = distance( uv, center);
    
    float size = offset / 10. + offset * abs(sin(y / 10.));
    float s = stepped(dist, size, NumSteps );
    
    vec4 color = mix(Color1, Color2, clamp(s, 0.0, 1.0));
    vec3 hsv = rgb2hsv(color.rgb);
    hsv.x *= sin(x / 10.);
    gl_FragColor = vec4(hsv2rgb(hsv), 0.0);
}
`;

function createSteppedPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      width: { value: WIDTH },
      height: { value: HEIGHT },
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

export { createSteppedPass };
