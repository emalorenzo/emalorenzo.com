import { useGLTF } from "@react-three/drei";
import React from "react";

export function Tree(props) {
  const { nodes, materials } = useGLTF("/tree-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Tree002.geometry}
        material={materials["Material.001"]}
        position={[0.993, -0.033, -0.261]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.528}
      />
    </group>
  );
}

useGLTF.preload("/tree-transformed.glb");
