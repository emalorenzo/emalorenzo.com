import { Center, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
  };
  materials: {
    Rice: THREE.MeshStandardMaterial;
    Salmon: THREE.MeshStandardMaterial;
    Cucumber: THREE.MeshStandardMaterial;
    Seaweed: THREE.MeshStandardMaterial;
  };
};

export function Sushi(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/sushi.glb") as unknown as GLTFResult;
  return (
    <Center top scale={0.4} {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.Rice} />
      <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.Salmon} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_2.geometry}
        material={materials.Cucumber}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_3.geometry}
        material={materials.Seaweed}
      />
    </Center>
  );
}

useGLTF.preload("/assets/sushi.glb");
