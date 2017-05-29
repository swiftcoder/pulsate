
const vec3 light = vec3(0,0.7,0.7);

varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    float d = dot(normal, light);
    float h = 0.5 * d + 0.5;
    vec3 topColor = vec3(0.5, 0.0, 0.5);
    vec3 botColor = vec3(0.0, 0.5, 0.5);
    gl_FragColor = vec4(mix(botColor, topColor, h), 1);
}
