import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Plate: THREE.Mesh;
    Chopstick001: THREE.Mesh;
    Chopstick: THREE.Mesh;
  };
  materials: {
    Plate: THREE.MeshStandardMaterial;
    Chopstic: THREE.MeshStandardMaterial;
  };
};

export function SushiPlate(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/sushi.glb") as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plate.geometry}
        material={materials.Plate}
        scale={0.497}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chopstick001.geometry}
        material={materials.Chopstic}
        position={[-0.055, 0.204, 1.752]}
        scale={0.497}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chopstick.geometry}
        material={materials.Chopstic}
        position={[-0.055, 0.204, 1.563]}
        rotation={[0, 0.009, 0]}
        scale={0.497}
      />
    </group>
  );
}

useGLTF.preload("/assets/sushi.glb");
