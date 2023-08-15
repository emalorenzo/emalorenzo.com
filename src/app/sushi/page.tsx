'use client'

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from '~/scenes/01.sushi'

export default function SushiPage() {
  return (
    <Canvas
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100%',
    }}>
      <Scene />
      <mesh>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="#ac4d85" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
