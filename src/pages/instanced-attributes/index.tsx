import { Loader, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import Scene from "~/scenes/03.instanced-attributes";
import { useStore } from "~/store/store";

export default function InstancedAttributesPage() {
  const dom: HTMLDivElement | null = useStore((s) => s.dom);

  return (
    <div className="h-screen">
      <Leva hidden={process.env.NODE_ENV === "production"} />
      <Canvas
        gl={{ antialias: false }}
        camera={{ position: [-10, 13, 25], near: 0.1, far: 100, fov: 30 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          width: "100vw",
          height: "100%",
          pointerEvents: "all",
        }}
        eventSource={dom!}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}
