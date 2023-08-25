import {
  AccumulativeShadows,
  Environment,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO, Vignette } from "@react-three/postprocessing";
import { Vector3 } from "three";
import { SoySauceBottle } from "~/models/soySauceBottle";
import { SoySauceGlass } from "~/models/soySauceGlass";
import { Sushi } from "~/models/sushi";
import { SushiPlate } from "~/models/sushiPlate";

const CAMERA_POSITION = new Vector3(10, 18, -22);
const TARGET_CAMERA_POSITION = new Vector3(10, 18, -22);

export default function Scene() {
  useFrame(({ pointer, camera }) => {
    console.log(pointer.y);

    const x = CAMERA_POSITION.x + pointer.x * 5;
    const y = CAMERA_POSITION.y + pointer.y * 5;

    TARGET_CAMERA_POSITION.set(x, y, camera.position.z);

    camera.position.lerp(TARGET_CAMERA_POSITION, 0.1);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <AccumulativeShadows
        color="orange"
        alphaTest={0.3}
        colorBlend={4}
        temporal
        frames={100}
        scale={25}
      >
        <RandomizedLight radius={6} position={[-10, 9, -10]} />
      </AccumulativeShadows>

      <SushiPlate scale={2} position={[0, 0, 0]} />
      <SoySauceBottle position={[-6.5, 0, -3]} />
      <SoySauceGlass position={[6, 0, 0]} />
      <group position={[0.5, 0.1, -0.3]}>
        <Sushi position={[-1.6, 0, 1.1]} />
        <Sushi position={[-0.5, 0, 1.1]} />
        <Sushi position={[0.6, 0, 1.1]} />
        <Sushi position={[-1.6, 0, 0]} />
        <Sushi position={[-0.5, 0, 0]} />
        <Sushi position={[0.6, 0, 0]} />
      </group>

      <Environment preset="lobby" background blur={1} />
      <PerspectiveCamera position={CAMERA_POSITION} fov={30} makeDefault />

      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur intensity={1} luminanceThreshold={1} />
        <N8AO aoRadius={20} intensity={4} screenSpaceRadius />
        <Vignette offset={0.4} darkness={0.4} />
      </EffectComposer>
    </>
  );
}
