import { Center, MeshTransmissionMaterial, Sampler } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { InstancedTree } from "./instanced-tree";
import { Terrain } from "./terrain";

const TREES_COUNT = 500;

export function Forest() {
  const terrainRef = useRef<THREE.Mesh>(null!);
  const treesRef = useRef<any>(null!);

  return (
    <Center top>
      <Sampler
        mesh={terrainRef}
        instances={treesRef}
        count={TREES_COUNT}
        weight="color"
        transform={({ position, normal, dummy: object }) => {
          object.position.copy(position);
          object.scale.setScalar(0.5 + Math.random() / 2);
          object.lookAt(normal.add(position));
          object.updateMatrix();
          return object;
        }}
      />
      <InstancedTree ref={treesRef} count={TREES_COUNT} />
      <Terrain ref={terrainRef} />

      {/* lake */}
      <mesh position={[0, -1.2, -0.5]}>
        <boxGeometry args={[15, 2, 8]} />
        <MeshTransmissionMaterial
          samples={4}
          thickness={0.01}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={3}
          distortionScale={1}
          temporalDistortion={0.1}
          iridescence={0}
          iridescenceIOR={1}
          transmission={0.3}
          color={"#73a6c2"}
        />
      </mesh>
    </Center>
  );
}
