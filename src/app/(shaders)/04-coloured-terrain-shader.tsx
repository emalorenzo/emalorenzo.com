import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

import { CanvasLayout } from '~/layouts/canvas'
import {
  ColouredTerrainMaterial,
  ColouredTerrainMaterialProps,
} from '~/shaders'

function Scene() {
  const shaderRef = useRef<ColouredTerrainMaterialProps>(null!)

  const { noiseScale, amplitude, speed, verticalSpeed, wireframe } =
    useControls({
      noiseScale: {
        min: 0.1,
        value: 4,
        max: 10,
      },
      amplitude: {
        min: 0,
        value: 0.2,
        max: 0.5,
      },
      speed: {
        min: 0,
        value: 1,
        max: 2,
      },
      verticalSpeed: {
        min: 0,
        value: 0.1,
        max: 2,
      },
      wireframe: false,
    })

  useFrame((_, delta) => (shaderRef.current.uTime += delta))
  return (
    <mesh scale={4} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[4, 4, 150, 150]} />
      <colouredTerrainMaterial
        ref={shaderRef}
        key={ColouredTerrainMaterial.key}
        uNoiseScale={noiseScale}
        uAmplitude={amplitude}
        uSpeed={speed}
        uVerticalSpeed={verticalSpeed}
        wireframe={wireframe}
      />
    </mesh>
  )
}

function ColouredTerrainShader() {
  return (
    <CanvasLayout camera={{ position: [0, 2.5, 8] }}>
      <OrbitControls />
      <Scene />
    </CanvasLayout>
  )
}

export default ColouredTerrainShader
