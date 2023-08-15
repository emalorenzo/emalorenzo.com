import fragment from './noise.frag'
import vertex from './noise.vert'

import { generateShader } from 'lib/shader'

export const NoiseMaterial = generateShader(
  'NoiseMaterial',
  { uSpeed: 1, uTime: 1 },
  vertex,
  fragment
)

export type NoiseMaterialProps = {
  uSpeed: number
  uTime: number
}
