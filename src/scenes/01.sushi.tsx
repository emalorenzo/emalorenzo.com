import { Gltf } from "@react-three/drei";
import { Suspense } from "react";
/**
 * Copyright (c) Michael Dougall. All rights reserved.
 *
 * This source code is licensed under the GPL-3.0 license found in the LICENSE
 * file in the root directory of this source tree.
 */

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.25} />
      <pointLight
        castShadow={true}
        intensity={4.3}
        position={[-3.7594113786689043, 1.6377178989292671, 1.122109130607944]}
        color={-0.84}
        decay={-0.02}
        frustumCulled={false}
        layers={-0.02}
        renderOrder={0.04}
      />
      <pointLight
        castShadow
        position={[6.4178570090635905, 1, -0.9711793664704707]}
        intensity={0.5}
      />
      <pointLight castShadow intensity={0.1} />

      <group></group>

      <Gltf src="/assets/sushi.glb" position={[-0.7553853988647461, 0, 0.38181358575820923]} />
      <mesh position={[0, 0, 0]} rotation={[-1.5707963267948966, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={"#912b2b"} />
      </mesh>
    </Suspense>
  );
}
