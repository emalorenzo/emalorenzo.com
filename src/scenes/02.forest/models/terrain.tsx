import { useGLTF } from "@react-three/drei";
import { forwardRef, useLayoutEffect } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type TerrainGLTF = GLTF & {
  nodes: {
    Terrain: THREE.Mesh;
  };
  materials: {
    Terrain: THREE.MeshStandardMaterial;
  };
};

type Props = JSX.IntrinsicElements["group"];

export const Terrain = forwardRef(function TerrainFn(
  props: Props,
  ref: React.ForwardedRef<THREE.Mesh>
) {
  const { nodes, materials } = useGLTF("/assets/terrain.glb") as TerrainGLTF;

  useLayoutEffect(() => {
    materials.Terrain.vertexColors = false;
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Terrain.geometry}
        material={materials.Terrain}
      />
    </group>
  );
});

useGLTF.preload("/assets/terrain.glb");
