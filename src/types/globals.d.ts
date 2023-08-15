/* eslint-disable no-unused-vars */
import type {
  ColouredTerrainMaterialProps,
  ExpansiveWaveMaterialProps,
  FlagMaterialProps,
  NoiseMaterialProps,
  NormalizedSinMaterialProps,
  TextureDistortionMaterialProps,
  TextureNoiseMaterialProps,
} from '~/shaders'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flagMaterial: ReactThreeFiber.Object3DNode<
        FlagMaterial,
        FlagMaterialProps
      >
      noiseMaterial: ReactThreeFiber.Object3DNode<
        NoiseMaterial,
        NoiseMaterialProps
      >
      normalizedSinMaterial: ReactThreeFiber.Object3DNode<
        NormalizedSinMaterial,
        NormalizedSinMaterialProps
      >
      colouredTerrainMaterial: ReactThreeFiber.Object3DNode<
        ColouredTerrainMaterial,
        ColouredTerrainMaterialProps
      >
      textureNoiseMaterial: ReactThreeFiber.Object3DNode<
        TextureNoiseMaterial,
        TextureNoiseMaterialProps
      >
      textureDistortionMaterial: ReactThreeFiber.Object3DNode<
        TextureDistortionMaterial,
        TextureDistortionMaterialProps
      >
      expansiveWaveMaterial: ReactThreeFiber.Object3DNode<
        ExpansiveWaveMaterial,
        ExpansiveWaveMaterialProps
      >
    }
  }
}
