import fragment from './expansive-wave.frag'
import vertex from './expansive-wave.vert'

import { generateShader } from 'lib/shader'

export const ExpansiveWaveMaterial = generateShader(
  'ExpansiveWaveMaterial',
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

export type ExpansiveWaveMaterialProps = {
  uNoiseScale: number
  uTime: number
  uSpeed: number
  uVVScale: number
  uTexture: THREE.Texture
}
