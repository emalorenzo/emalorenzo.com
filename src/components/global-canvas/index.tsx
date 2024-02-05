"use client";

import { Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import { R3F } from "~/lib/r3f";
import { Shared } from "../../../app/shared";

export function GlobalCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100lvh",
      }}
      camera={{ far: 200, near: 0.01 }}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      eventPrefix="client"
      eventSource={document.body}
      shadows
    >
      <Suspense fallback={null}>
        <View.Port />
        <R3F.Out />
        <Shared />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
