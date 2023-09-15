import { OrbitControls, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

import { CanvasLayout } from '~/layouts/canvas'
import { TextureNoiseMaterial, TextureNoiseMaterialProps } from '~/shaders'

function Scene() {
  const shaderRef = useRef<TextureNoiseMaterialProps>(null!)

  const { noiseScale, amplitude, speed, mixThreshold, wireframe } = useControls(
    {
      noiseScale: {
        min: 0.1,
        value: 1,
        max: 10,
      },
      amplitude: {
        min: 0,
        value: 0.2,
        max: 0.5,
      },
      speed: {
        min: 0,
        value: 0.4,
        max: 1,
      },
      mixThreshold: {
        min: 0,
        value: 0.5,
        max: 1,
      },
      wireframe: false,
    }
  )

  const texture = useTexture('/images/fuji.jpg')

  useFrame((_, delta) => (shaderRef.current.uTime += delta))
  return (
    <mesh>
      <planeGeometry args={[5, 5, 50, 50]} />
      <textureNoiseMaterial
        ref={shaderRef}
        key={TextureNoiseMaterial.key}
        uTexture={texture}
        uSpeed={speed}
        uAmplitude={amplitude}
        uNoiseScale={noiseScale}
        uMixThreshold={mixThreshold}
        wireframe={wireframe}
      />
    </mesh>
  )
}

function TextureNoiseShader() {
  return (
    <CanvasLayout>
      <OrbitControls />
      <Scene />
    </CanvasLayout>
  )
}

export default TextureNoiseShader
