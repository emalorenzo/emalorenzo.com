import fragment from './normalized-sin.frag'
import vertex from './normalized-sin.vert'

import { generateShader } from 'lib/shader'

export const NormalizedSinMaterial = generateShader(
  'NormalizedSinMaterial',
  { uSize: 0.5, uAmplitude: 0.2 },
  vertex,
  fragment
)

export type NormalizedSinMaterialProps = {
  uSize: number
  uAmplitude: number
}
