import fragment from './texture-distortion.frag'
import vertex from './texture-distortion.vert'

import { generateShader } from 'lib/shader'

export const TextureDistortionMaterial = generateShader(
  'TextureDistortionMaterial',
  {
    uNoiseScale: 4,
    uTime: 0,
    uSpeed: 1,
    uVVScale: 0.5,
    uTexture: null,
  },
  vertex,
  fragment
)

export type TextureDistortionMaterialProps = {
  uNoiseScale: number
  uTime: number
  uSpeed: number
  uVVScale: number
  uTexture: THREE.Texture
}
