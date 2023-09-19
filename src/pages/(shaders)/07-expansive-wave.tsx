import { OrbitControls, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

import { CanvasLayout } from '~/layouts/canvas'
import {
  ExpansiveWaveMaterial,
  ExpansiveWaveMaterialProps,
} from '~/shaders/07-expansive-wave'

function Scene() {
  const shaderRef = useRef<ExpansiveWaveMaterialProps>(null!)

  const { noiseScale, speed, UVScale, wireframe } = useControls({
    noiseScale: {
      min: 0.01,
      step: 0.01,
      value: 1,
      max: 10,
    },
    UVScale: {
      min: 0.01,
      step: 0.01,
      value: 0.5,
      max: 1,
    },
    speed: {
      min: 0,
      value: 2,
      max: 5,
    },
    wireframe: true,
  })

  const texture = useTexture('/images/fuji.jpg')

  useFrame((_, delta) => (shaderRef.current.uTime += delta))
  return (
    <mesh scale={5}>
      <planeGeometry args={[1, 1, 50, 50]} />
      <expansiveWaveMaterial
        ref={shaderRef}
        key={ExpansiveWaveMaterial.key}
        uTexture={texture}
        uSpeed={speed}
        uNoiseScale={noiseScale}
        uVVScale={UVScale}
        wireframe={wireframe}
      />
    </mesh>
  )
}

function TextureDistortionShader() {
  return (
    <CanvasLayout>
      <OrbitControls />
      <Scene />
    </CanvasLayout>
  )
}

export default TextureDistortionShader
