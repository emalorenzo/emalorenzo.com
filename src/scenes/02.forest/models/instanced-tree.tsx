import { useGLTF } from "@react-three/drei";
import { forwardRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type Props = JSX.IntrinsicElements["group"] & {
  count: number;
};

export type GLTFResult = GLTF & {
  nodes: {
    Tree002: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export const InstancedTree = forwardRef(function TreeFn({ count, ...props }: Props, ref: any) {
  const { nodes, materials } = useGLTF("/assets/tree.glb") as GLTFResult;

  useLayoutEffect(() => {
    if (!ref?.current) return;

    ref?.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  }, []);

  return (
    <group {...props}>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, count]}
        geometry={nodes.Tree002.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
});

InstancedTree.defaultProps = {
  count: 100,
};
