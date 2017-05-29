
uniform float size, time;

varying vec3 vNormal;

void main() {
    vec3 scaledPosition = position * size * clamp(time, 0.0, 2.0);
    vec4 mvPosition = modelViewMatrix * vec4(scaledPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vec4 mvNormal = modelViewMatrix * vec4(normal, 0.0);
    vNormal = mvNormal.xyz;
}
