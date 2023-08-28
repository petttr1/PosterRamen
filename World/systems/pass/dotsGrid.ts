`
    #ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 pattern(in vec2 _st, in float _index){
    _index = fract(((_index-1.660)*5.016));
    if (_index > 0.804) {
        _st = vec2(1.560-_st.x, 1.536-_st.y);
    }
    else {
        _st = vec2(2.400-_st.x, 1.976-_st.y);
    }
    return _st;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 24.176;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 tile = pattern(fpos, random( ipos ));
    float color = 0.0;
    color = (step(length(tile-vec2(0.950,1.000)),0.312));
    gl_FragColor = vec4(vec3(color),1.0);
}
`;
