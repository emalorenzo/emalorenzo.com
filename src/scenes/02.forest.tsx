import {
  Box,
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  StatsGl,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { Trees } from "~/models/Trees/Trees";
import { Terrain } from "~/models/terrain";

const CAMERA_POSITION = new Vector3(0, 10, 5);
const TARGET_CAMERA_POSITION = new Vector3(10, 18, -22);

export default function Scene() {
  const dof = useRef<any>(null!);
  const ring = useRef<any>(null!);
  const target = useRef<THREE.Mesh>(null!);

  const pointer = useRef<any>([0, 0, 0]);

  const { camera, scene } = useThree((t) => t);

  useEffect(() => {
    console.log("USE LAYOUTEFFECT");
    // dof.current.target = new THREE.Vector3();

    ring.current.geometry = new THREE.RingGeometry(0.125, 0.225);
    ring.current.geometry.rotateX(Math.PI / 2).rotateZ(Math.PI / 2);
  }, []);

  useFrame((state, delta) => {
    TARGET_CAMERA_POSITION.set(
      Math.cos(state.clock.elapsedTime / 2) * 10,
      2,
      Math.sin(state.clock.elapsedTime / 2) * 10
    );

    // dof.current.target = TARGET_CAMERA_POSITION.clone();
    // state.camera.lookAt(TARGET_CAMERA_POSITION);

    target.current.position.lerp(TARGET_CAMERA_POSITION, 0.1);

    // console.log(dof.current.target);
    // if (dof.current.target) {
    //   // easing.damp3(dof.current.target, target.current.position, 0.2, delta);
    // } else {
    //   // console.log("no target", dof.current);
    // }
    // ring.current.scale.setScalar(2 + Math.sin(state.clock.elapsedTime * 6) / 2)
  });

  // useEffect(() => {
  //   camera.lookAt(10, 10, -10);
  // }, [camera]);

  // useFrame(({ pointer, camera }) => {
  //   const x = CAMERA_POSITION.x + pointer.x * 5;
  //   const y = CAMERA_POSITION.y + pointer.y * 5;

  //   TARGET_CAMERA_POSITION.set(x, y, camera.position.z);

  //   camera.position.lerp(TARGET_CAMERA_POSITION, 0.1);
  //   camera.lookAt(0, 5, 1);
  // });

  // const target = useRef<THREE.Mesh>(null!);
  // const { vector1, vector2 } = useControls({
  //   vector1: {
  //     value: [0, 5, 12],
  //   },
  //   vector2: {
  //     value: [0, 2, -7],
  //   },
  // });

  // const { focalLenght, bokehScale, focusDistance } = useControls({
  //   focalLenght: {
  //     value: 0.3,
  //     min: 0,
  //     max: 1,
  //   },
  //   bokehScale: {
  //     value: 8,
  //     min: 0,
  //     max: 10,
  //   },
  //   focusDistance: {
  //     value: 0.1,
  //     min: 0,
  //     max: 1,
  //   },
  // });

  const { effects, azimuth, turbidity, rayleigh, inclination, distance } = useControls({
    effects: {
      value: false,
    },
    azimuth: {
      value: 0.1,
      min: 0,
      max: 1,
    },
    turbidity: {
      value: 10,
      min: 0,
      max: 100,
    },
    rayleigh: {
      value: 0.5,
      min: 0,
      max: 100,
    },
    inclination: {
      value: 0.5,
      min: 0,
      max: 1,
    },
    distance: {
      value: 400,
      min: 0,
      max: 100000,
    },
  });

  return (
    <>
      {/* <AccumulativeShadows
        color="orange"
        alphaTest={0.3}
        colorBlend={4}
        temporal
        frames={100}
        scale={25}
      >
        <RandomizedLight radius={6} position={[-10, 9, -10]} />
      </AccumulativeShadows> */}

      <Box ref={target} />
      <OrbitControls makeDefault />
      <group
        onPointerMove={(e) => {
          e.stopPropagation();
          pointer.current = e.point.toArray();

          ring.current.position.copy(e.point);
          ring.current.rotation.set(...e.normal.multiplyScalar(Math.PI / 2).toArray());
        }}
      >
        <Terrain />
      </group>
      {effects && (
        <EffectComposer disableNormalPass multisampling={4}>
          {/* <DepthOfField
          ref={dof}
          focalLength={focalLenght}
          bokehScale={bokehScale}
          focusDistance={focusDistance}
        /> */}
          {/* <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.5} /> */}
          {/* <LensFlare opacity={0.3} /> */}
          <N8AO aoRadius={20} intensity={4} screenSpaceRadius />
          {/* <Vignette offset={0.4} darkness={0.4} /> */}
        </EffectComposer>
      )}
      <Trees count={1000} />
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[15, 2, 8]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={"#73a6c2"}
        />
      </mesh>
      <mesh ref={ring}>
        <meshBasicMaterial
          color="pink"
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight
        position={[0, 1, 0]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-radius={1}
      />

      {/* <Instances> */}
      {/* <Terrain ref={terrain} position={[0, 0, 0]} /> */}
      {/* <Tree ref={treeMesh} />

      <mesh position={vector1}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>

      <mesh position={vector2} ref={target}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh> */}

      {/* <directionalLight
        position={vector1}
        target={target.current}
        castShadow
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-radius={1}
      /> */}

      {/* </Instances> */}

      <StatsGl />
      <Environment preset="dawn" background blur={1} />
      <PerspectiveCamera position={CAMERA_POSITION} fov={50} makeDefault />

      {/* <directionalLight castShadow intensity={1} position={[10, 10, 5]} /> */}
      <Sky
        azimuth={azimuth}
        turbidity={turbidity}
        rayleigh={rayleigh}
        inclination={inclination}
        distance={distance}
      />
    </>
  );
}
