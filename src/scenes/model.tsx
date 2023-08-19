import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Plate: THREE.Mesh;
    Chopstick001: THREE.Mesh;
    Chopstick: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    Rice: THREE.MeshStandardMaterial;
    Salmon: THREE.MeshStandardMaterial;
    Cucumber: THREE.MeshStandardMaterial;
    Seaweed: THREE.MeshStandardMaterial;
    Plate: THREE.MeshStandardMaterial;
    Chopstic: THREE.MeshStandardMaterial;
    Sauce: THREE.MeshStandardMaterial;
    Acrilic: THREE.MeshStandardMaterial;
    Orange: THREE.MeshStandardMaterial;
    Yellow: THREE.MeshStandardMaterial;
  };
};

export function Sushi(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/sushi.glb") as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group position={[-0.755, 0.045, 0.382]} scale={0.276}>
        <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.Rice} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Salmon}
        />
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
      </group>
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
      <group position={[1.788, 0.255, 4.151]} scale={0.681}>
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
      <group position={[-0.767, 0.5, -3.053]} scale={0.498}>
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
      </group>
    </group>
  );
}

useGLTF.preload("/assets/sushi.glb");
