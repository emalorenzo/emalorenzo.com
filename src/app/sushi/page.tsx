"use client";

import { Html, Loader, OrbitControls, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "~/scenes/01.sushi";

export default function SushiPage() {
  return (
    <div>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
        }}
      >
        <Suspense
          fallback={
            <Html>
              <div>Loading...</div>
            </Html>
          }
        >
          <Scene />
          <PerspectiveCamera makeDefault position={[-5, 4, 7]} />
          <OrbitControls />
        </Suspense>
        <Preload all />
      </Canvas>
      <Loader />
      <article className="absolute p-4">
        <h1>Sushi</h1>
      </article>
    </div>
  );
}
