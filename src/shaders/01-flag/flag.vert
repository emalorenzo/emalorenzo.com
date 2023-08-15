uniform float uTime;
uniform float uSpeed;

void main() {
  vec3 newPosition = position;
  newPosition.z += sin(((position.x * 2.0) + uTime) * uSpeed) * 0.2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
