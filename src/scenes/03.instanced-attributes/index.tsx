import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function InstancedAttributesScene() {
  return (
    <>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls makeDefault />
      <PerspectiveCamera makeDefault />
      <Environment preset="forest" background />
    </>
  );
}
