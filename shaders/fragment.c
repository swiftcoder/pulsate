
const vec3 light = vec3(0,1,1);

varying vec3 vNormal;

void main() {
    float d = dot(vNormal, light);
    vec3 color = vec3(0.5, 0, 0.5);
    gl_FragColor = vec4(color * d, 1);
}
