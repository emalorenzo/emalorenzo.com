import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Plane_1: THREE.Mesh;
    Plane_2: THREE.Mesh;
    Plane_3: THREE.Mesh;
  };
  materials: {
    Dirt: THREE.MeshStandardMaterial;
    Rock: THREE.MeshStandardMaterial;
    Snow: THREE.MeshStandardMaterial;
    Grass: THREE.MeshStandardMaterial;
  };
};

type Props = JSX.IntrinsicElements["group"];

export const Terrain = forwardRef(function TerrainFn(
  props: Props,
  ref: React.ForwardedRef<THREE.Mesh>
) {
  const { nodes, materials } = useGLTF("/assets/terrain.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Dirt} />
      <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Rock} />
      <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Snow} />
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Plane_3.geometry}
        material={materials.Grass}
      />
    </group>
  );
});

useGLTF.preload("/assets/terrain.glb");
