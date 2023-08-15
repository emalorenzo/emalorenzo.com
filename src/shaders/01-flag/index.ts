import fragment from './flag.frag'
import vertex from './flag.vert'

import { generateShader } from '~/lib/shader'

export const FlagMaterial = generateShader(
  'FlagMaterial',
  { uSpeed: 1, uTime: 1 },
  vertex,
  fragment
)

export type FlagMaterialProps = {
  uSpeed: number
  uTime: number
}
