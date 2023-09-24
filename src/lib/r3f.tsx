import * as THREE from "three";

export function getFullScreenScale(mesh: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  const distance = camera.position.z - mesh.position.z;
  const vFov = (camera.fov * Math.PI) / 180;

  const fullHeight = 2 * Math.tan(vFov / 2) * distance;
  const fullWidth = fullHeight * camera.aspect;

  return { fullWidth, fullHeight };
}
