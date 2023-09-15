import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type Props = JSX.IntrinsicElements["mesh"] & {
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

export const Tree = forwardRef(function TreeFn({ count, ...props }: Props, ref) {
  const { nodes, materials } = useGLTF("/assets/tree.glb") as GLTFResult;
  return (
    <group>
      <instancedMesh
        // @ts-ignore
        ref={ref}
        // @ts-ignore
        args={[undefined, undefined, count]}
        geometry={nodes.Tree002.geometry}
        material={materials["Material.001"]}
        {...props}
      />
    </group>
  );
});

Tree.defaultProps = {
  count: 10,
};
