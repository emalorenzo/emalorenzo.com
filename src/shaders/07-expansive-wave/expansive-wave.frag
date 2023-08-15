precision mediump float;

uniform sampler2D uTexture;

varying float vElevation;
// uniform float uVVScale;

// varying float vNoise;
// varying vec2 vUv;

void main() {
  // vec2 newUV = vUv;

  // newUV = vec2(newUV.x, newUV.y + vNoise * uVVScale);

  // vec4 texture = texture2D(uTexture, newUV);
  vec3 bottomColor = vec3(0., 0., 0.);
  vec3 topColor = vec3(1., 1., 1.);

  vec3 color = mix(bottomColor, topColor, vElevation * 10.);

  gl_FragColor = vec4(color, 1.0);
}
