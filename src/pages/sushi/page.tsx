"use client";

import { Loader, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "~/scenes/01.sushi/01.sushi";

export default function SushiPage() {
  return (
    <div>
      <Canvas
        gl={{ antialias: false }}
        camera={{ position: [-10, 13, 25], near: 0.1, far: 100, fov: 30 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
      <Loader />
      <article className="absolute bottom-0 left-0 p-4 bg-black pointer-events-none">
        <h2 className="text-md">Sushi</h2>
        <p className="text-xs text-slate-200">Loading custom 3D model</p>
      </article>
    </div>
  );
}
