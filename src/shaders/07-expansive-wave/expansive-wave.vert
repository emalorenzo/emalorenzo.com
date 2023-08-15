#pragma glslify: cnoise3 = require('glsl-noise/classic/3d')

uniform float uNoiseScale;
// uniform float uAmplitude;
uniform float uTime;
uniform float uSpeed;

// varying float vNoise;
varying float vElevation;
// varying vec2 vUv;

void main() {
  vec3 newPosition = position;
  float speed = uTime * uSpeed;

  // float noise = cnoise3(vec3(position.x * uNoiseScale, position.y * uNoiseScale + speed, 0.));

  float dist = distance(uv, vec2(0.5));
  float elevation = 0.05 * sin(dist * 40. - speed);

  newPosition.z += elevation;
  vElevation = elevation;


  // vNoise = noise;
  // vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
} 
