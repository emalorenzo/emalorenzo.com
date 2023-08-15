#pragma glslify: cnoise3 = require('glsl-noise/classic/3d')

uniform float uTime;
uniform float uSpeed;

void main() {
  vec3 newPosition = position;
  newPosition.z += 0.1 * cnoise3(vec3(position.x * 4., position.y * 4., uTime * uSpeed));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
 