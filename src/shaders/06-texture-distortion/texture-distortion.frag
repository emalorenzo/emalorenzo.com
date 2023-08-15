precision mediump float;

uniform sampler2D uTexture;
uniform float uVVScale;

// varying float vNoise;
varying float vElevation;
// varying vec2 vUv;

void main() {
  // vec2 newUV = vUv;

  // newUV = vec2(newUV.x, newUV.y + vNoise * uVVScale);

  // vec4 texture = texture2D(uTexture, newUV);
  // gl_FragColor = texture;
  gl_FragColor = vec4(vElevation);
}
