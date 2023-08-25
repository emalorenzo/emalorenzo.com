import { Center, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
  };
  materials: {
    Sauce: THREE.MeshStandardMaterial;
    Acrilic: THREE.MeshStandardMaterial;
  };
};

export function SoySauceGlass(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/sushi.glb") as unknown as GLTFResult;
  return (
    <Center top scale={1} {...props}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Sauce}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials.Acrilic}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/assets/sushi.glb");
