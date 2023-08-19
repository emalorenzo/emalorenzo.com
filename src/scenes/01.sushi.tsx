import {
  AccumulativeShadows,
  CameraControls,
  Environment,
  RandomizedLight,
} from "@react-three/drei";
import { Bloom, EffectComposer, N8AO, Vignette } from "@react-three/postprocessing";
import { Sushi } from "./model";

export default function Scene() {
  return (
    <>
      <group>
        <AccumulativeShadows color="blue" colorBlend={4} temporal frames={100} scale={25}>
          <RandomizedLight radius={6} position={[-10, 9, -10]} />
        </AccumulativeShadows>

        <Sushi scale={2} position={[0, 0, 0]} />
      </group>

      <Environment preset="lobby" background blur={1} />
      <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur intensity={1} luminanceThreshold={1} />
        <N8AO aoRadius={20} intensity={4} screenSpaceRadius />
        <Vignette offset={0.4} darkness={0.4} />
      </EffectComposer>
    </>
  );
}
