"use client";

import { OrbitControls, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "~/scenes/01.sushi";

export default function SushiPage() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
      }}
    >
      <Scene />
      <PerspectiveCamera makeDefault position={[-5, 4, 7]} />
      <OrbitControls />
      <Preload all />
    </Canvas>
  );
}
