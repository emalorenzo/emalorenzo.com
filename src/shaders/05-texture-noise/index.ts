import fragment from './texture-noise.frag'
import vertex from './texture-noise.vert'

import { generateShader } from 'lib/shader'

export const TextureNoiseMaterial = generateShader(
  'TextureNoiseMaterial',
  {
    uNoiseScale: 4,
    uAmplitude: 0.2,
    uTime: 0,
    uSpeed: 1,
    uMixThreshold: 0.5,
    uTexture: null,
  },
  vertex,
  fragment
)

export type TextureNoiseMaterialProps = {
  uNoiseScale: number
  uAmplitude: number
  uTime: number
  uSpeed: number
  uMixThreshold: number
  uTexture: THREE.Texture
}
