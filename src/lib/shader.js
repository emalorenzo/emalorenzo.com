import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

export function generateShader(name, uniforms, vertex, fragment) {
  const shader = shaderMaterial(uniforms, vertex, fragment)
  shader.key = THREE.MathUtils.generateUUID()

  extend({ [name]: shader })
  return shader
}
