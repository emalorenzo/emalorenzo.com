precision mediump float;

varying float vNoise;

void main() {
  vec3 bottomColor = vec3(1., 0., 0.);
  vec3 topColor = vec3(1., 1., 1.);
  vec3 color = mix(bottomColor, topColor, 0.5 * (vNoise + 1.0));

  gl_FragColor = vec4(color, 1.0);
}
