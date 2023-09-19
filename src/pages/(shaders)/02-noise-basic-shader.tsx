import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { CanvasLayout } from '~/layouts/canvas'
import { NoiseMaterial, NoiseMaterialProps } from '~/shaders'

function Scene() {
  const shaderRef = useRef<NoiseMaterialProps>(null!)

  useFrame((_, delta) => (shaderRef.current.uTime += delta))
  return (
    <mesh scale={4}>
      <planeGeometry args={[0.5, 0.5, 32, 32]} />
      <noiseMaterial
        uSpeed={0.5}
        ref={shaderRef}
        key={NoiseMaterial.key}
        wireframe
      />
    </mesh>
  )
}

function NoiseBasicShader() {
  return (
    <CanvasLayout>
      <OrbitControls />
      <Scene />
    </CanvasLayout>
  )
}

export default NoiseBasicShader
