"use client";

import { Loader, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import Scene from "~/scenes/02.forest";

export default function ForestPage() {
  return (
    <div>
      <Leva hidden={process.env.NODE_ENV === "production"} />
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
        <h2 className="text-md">Forest</h2>
        <p className="text-xs text-slate-200">Loading custom 3D model</p>
        <a>https://threejs.org/docs/#examples/en/math/MeshSurfaceSampler</a>
        <a>https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_scatter.html</a>
        <a>https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/</a>
      </article>
    </div>
  );
}
