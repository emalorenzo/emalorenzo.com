import { Environment as DreiEnvironment, Sky } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";

export function Environment() {
  const skyRef = useRef<THREE.Mesh>(null!);

  const { azimuth, turbidity, rayleigh, inclination, distance } = useControls({
    azimuth: {
      value: 0.23,
      min: 0,
      max: 10,
    },
    turbidity: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.01,
    },
    rayleigh: {
      value: 1.21,
      min: 0,
      max: 10,
      step: 0.01,
    },
    inclination: {
      value: 0.51,
      min: 0,
      max: 1,
    },
    distance: {
      value: 420,
      min: 0,
      max: 1000,
    },
  });

  return (
    <DreiEnvironment background preset="city" blur={0}>
      <Sky
        ref={skyRef}
        azimuth={azimuth}
        turbidity={turbidity}
        rayleigh={1.99}
        inclination={inclination}
        distance={distance}
      />
    </DreiEnvironment>
  );
}
