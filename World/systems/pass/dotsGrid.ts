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

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 pattern(in vec2 _st, in float _index){
    _index = fract(((_index-sin(position.x+2.))*sin(position.y-1.)));
    if (_index > 0.804) {
        _st = vec2(1.560-_st.x, 1.536-_st.y);
    }
    else {
        _st = vec2(2.400-_st.x, 1.976-_st.y);
    }
    return _st;
}

void main() {
    vec2 st = vUv;
    float aspect = width / height; 
    st.x *= aspect;
    st *= offset;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 tile = pattern(fpos, random( ipos ));
    float color = 0.0;
    color = step(length(tile-vec2(1.,1.)),0.4);
    vec3 mixed = mix(colors.color.rgb, colors.background.rgb, clamp(1. - color, 0.0, 1.0));
    gl_FragColor = vec4(mixed, 1.);
}
`;

function createDotsPass(camera: Camera) {
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
    name: "DotsPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createDotsPass };
