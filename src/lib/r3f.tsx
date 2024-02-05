import * as THREE from "three";

import tunnel from "tunnel-rat";

export const R3F = tunnel();

export const Three = ({ children }: any) => {
  return <R3F.In>{children}</R3F.In>;
};

export function getFullScreenScale(mesh: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  const distance = camera.position.z - mesh.position.z;
  const vFov = (camera.fov * Math.PI) / 180;

  const fullHeight = 2 * Math.tan(vFov / 2) * distance;
  const fullWidth = fullHeight * camera.aspect;

  return { fullWidth, fullHeight };
}
