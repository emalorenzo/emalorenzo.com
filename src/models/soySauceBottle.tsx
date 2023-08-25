import { Center, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    Plate: THREE.MeshStandardMaterial;
    Orange: THREE.MeshStandardMaterial;
    Yellow: THREE.MeshStandardMaterial;
  };
};

export function SoySauceBottle(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/sushi.glb") as unknown as GLTFResult;
  return (
    <Center top scale={1} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_1.geometry}
        material={materials.Yellow}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_2.geometry}
        material={materials.Plate}
      />
    </Center>
  );
}

useGLTF.preload("/assets/sushi.glb");
