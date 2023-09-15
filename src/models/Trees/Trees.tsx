import { Sampler, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Tree } from "./Tree";

type Props = {
  count: number;
};

export function Trees({ count }: Props) {
  const grassSurfaceRef = useRef();
  const dirtSurfacefaceRef = useRef();

  const grassTreesRef = useRef();
  const dirtTreesRef = useRef();

  const { nodes, materials } = useGLTF("/assets/terrain.glb");

  useEffect(() => {
    if (!grassTreesRef.current || !dirtTreesRef) return;

    grassTreesRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    // dirtTreesRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  }, []);

  return (
    <group>
      <Sampler
        mesh={grassSurfaceRef}
        instances={grassTreesRef}
        count={300}
        transform={({ position, normal, dummy: object }) => {
          object.position.copy(position);
          object.lookAt(normal.add(position));
          object.updateMatrix();
          return object;
        }}
      />
      <Sampler
        mesh={dirtSurfacefaceRef}
        instances={dirtTreesRef}
        count={100}
        transform={({ position, normal, dummy: object }) => {
          object.position.copy(position);
          object.lookAt(normal.add(position));
          object.updateMatrix();
          return object;
        }}
      />
      <Tree ref={grassTreesRef} count={300} />
      <Tree ref={dirtTreesRef} count={100} />
      <primitive ref={grassSurfaceRef} object={nodes.Plane_3} />
      <primitive ref={dirtSurfacefaceRef} object={nodes.Plane} />
    </group>
  );
}

Trees.defaultProps = {
  count: 10,
};
