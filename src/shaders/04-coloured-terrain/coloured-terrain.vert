#pragma glslify: cnoise3 = require('glsl-noise/classic/3d')

uniform float uNoiseScale;
uniform float uAmplitude;
uniform float uTime;
uniform float uSpeed;
uniform float uVerticalSpeed;
varying float vNoise;

void main() {
  vec3 newPosition = position;
  float speed = uTime * uSpeed;
  float verticalSpeed = uTime * uVerticalSpeed;
  float noise = cnoise3(vec3(position.x * uNoiseScale, position.y * uNoiseScale + speed, verticalSpeed));
  newPosition.z += uAmplitude * noise;

  vNoise = noise;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
