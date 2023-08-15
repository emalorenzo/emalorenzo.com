uniform float uSize;
uniform float uAmplitude;

void main() {
  vec3 newPosition = position;
  float PI = 3.1415926535897932384626433832795;
  float correctionOffset = (uSize / 2.);
  newPosition.z += uAmplitude * sin((position.x + correctionOffset) * (1. / uSize) * PI);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
