#pragma glslify: cnoise3 = require('glsl-noise/classic/3d')

uniform float uNoiseScale;
// uniform float uAmplitude;
uniform float uTime;
uniform float uSpeed;

varying float vNoise;
varying vec2 vUv;

void main() {
  vec3 newPosition = position;
  float speed = uTime * uSpeed;
  float noise = cnoise3(vec3(position.x * uNoiseScale, position.y * uNoiseScale, speed));
  // newPosition.z += uAmplitude * noise;

  vNoise = noise;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
