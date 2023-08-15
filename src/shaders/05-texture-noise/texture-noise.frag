precision mediump float;

uniform sampler2D uTexture;
uniform float uMixThreshold;

varying float vNoise;
varying vec2 vUv;

void main() {
  vec4 texture = texture2D(uTexture, vUv);
  vec3 bottomColor = vec3(1., 1., 1.);
  float normalizedNoise = 0.5 * (vNoise + 1.0);

  vec3 color = mix(bottomColor, texture.xyz, normalizedNoise + uMixThreshold);

  gl_FragColor = vec4(color, 1.0);
}
