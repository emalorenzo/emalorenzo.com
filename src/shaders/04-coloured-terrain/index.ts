import fragment from './coloured-terrain.frag'
import vertex from './coloured-terrain.vert'

import { generateShader } from 'lib/shader'

export const ColouredTerrainMaterial = generateShader(
  'ColouredTerrainMaterial',
  { uNoiseScale: 4, uAmplitude: 0.2, uTime: 0, uSpeed: 1, uVerticalSpeed: 0.1 },
  vertex,
  fragment
)

export type ColouredTerrainMaterialProps = {
  uNoiseScale: number
  uAmplitude: number
  uTime: number
  uSpeed: number
  uVerticalSpeed: number
}
