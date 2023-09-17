import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type Props = JSX.IntrinsicElements["group"] & {
  count: number;
};

type GLTFResult = GLTF & {
  nodes: {
    Rock1006: THREE.Mesh;
  };
  materials: {
    Rock: THREE.MeshStandardMaterial;
  };
};

export const InstancedRock = forwardRef(function RockFn({ count, ...props }: Props, ref: any) {
  const { nodes, materials } = useGLTF("/assets/rock.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, count]}
        geometry={nodes.Rock1006.geometry}
        material={materials.Rock}
      />
    </group>
  );
});

useGLTF.preload("/assets/rock.glb");

InstancedRock.defaultProps = {
  count: 100,
};
