import { PerspectiveCamera, Stage, StatsGl } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Effects } from "./effects";
import { Environment } from "./environment";
import { Forest } from "./models/forest";

const CAMERA_POSITION = new Vector3(0, 20, 70);
const TARGET_CAMERA_POSITION = new Vector3(10, 18, -22);

export default function ForestScene() {
  useFrame(({ pointer, camera }) => {
    const x = CAMERA_POSITION.x + pointer.x * 20;
    const y = CAMERA_POSITION.y + pointer.y * 20;

    TARGET_CAMERA_POSITION.set(x, y, camera.position.z);

    camera.position.lerp(TARGET_CAMERA_POSITION, 0.1);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Stage intensity={0.5} shadows="contact">
        <Forest />
      </Stage>

      <Environment />
      <Effects />
      <StatsGl />

      <PerspectiveCamera position={CAMERA_POSITION} fov={25} makeDefault />
    </>
  );
}
