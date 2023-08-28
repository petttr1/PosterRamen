import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { useSceneStore } from "~/store/scene";

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
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);
float pixelWidth = 0.368;
float thickness = 0.980;
vec2 st;
uniform vec2 u_resolution;
uniform float u_time;

float random(in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 drawCircle(vec2 center, float radius, vec3 color) {
    float r = sqrt(pow(st.xy.xy.x - center.x, 2.) + pow(st.xy.xy.y - center.y, 2.));
    float delta = r - radius;
    vec3 inside = color;
    float blend = smoothstep(0., pixelWidth, abs(delta) - thickness);
    return mix(white, inside, blend);
}

vec2 pattern(in vec2 _st, in float _index){
    _index = fract(((_index-1.660)*(u_time / 10.)));
    if (_index > 0.860) {
        _st = vec2(0.5-_st.x, 0.5-_st.y);
    }
    else {
        _st = vec2(1.216-_st.x, 1.680-_st.y);
    }
    return _st;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st *= 100.680;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 tile = pattern(fpos, random( ipos ));
    vec3 color = drawCircle(tile, 1.512, vec3(random(ipos), cos(ipos.y), sin(ipos.x*random( ipos ))));
    gl_FragColor = vec4(color, 1.0);
}
`;

function createLandingPass() {
  const effect = {
    uniforms: {},
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createLandingPass };
