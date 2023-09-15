import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type GLTFResult = GLTF & {
  nodes: {
    Tree002: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

type Props = JSX.IntrinsicElements["mesh"];

export function Tree(props: Props) {
  const { nodes, materials } = useGLTF("/assets/tree.glb") as GLTFResult;
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Tree002.geometry}
      material={materials["Material.001"]}
      position={[0.993, -0.033, -0.261]}
      rotation={[-Math.PI, 0, -Math.PI]}
      scale={0.528}
    />
  );
}

useGLTF.preload("/assets/tree.glb");
