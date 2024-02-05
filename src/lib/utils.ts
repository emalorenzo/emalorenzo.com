import { Viewport, useThree } from "@react-three/fiber";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function usePxToThreeUnits(sizeInPx: number) {
  const { viewport } = useThree();
  const sizeInThreeUnits = (1 / viewport.factor) * sizeInPx;

  return sizeInThreeUnits;
}

export function pxToThreeUnits(sizeInPx: number, viewport: Viewport) {
  const sizeInThreeUnits = (1 / viewport.factor) * sizeInPx;

  return sizeInThreeUnits;
}

export function getScreenPosition(
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
  viewport: Viewport
) {
  // returns the position in three.js world units
  // counting from the top left corner of the screen
  // instead of the center of the screen
  // and with an offset of offsetX and offsetY
  // and taking into account the viewport factor
  // and the top left corner of the mesh
  const x = pxToThreeUnits(offsetX, viewport) + width / 2;
  const y = pxToThreeUnits(-offsetY, viewport) - height / 2;

  const xInThreeUnits = x - viewport.width / 2;
  const yInThreeUnits = y + viewport.height / 2;

  return [xInThreeUnits, yInThreeUnits];
}
