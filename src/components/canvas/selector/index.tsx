import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useStore } from "~/lib/store";

import * as THREE from "three";
import { PostItem } from "./post-item";

const ASPECT_RATIO = 16 / 9;
const HEIGHT = 1.5;
const WIDTH = HEIGHT * ASPECT_RATIO;
const SPACING = 0.1;
const SPEED = 0.003;

export function Selector() {
  console.log("Selector");
  const [selected, setSelected] = useState<number | null>(null);

  const posts = useStore((s) => s.posts);
  const dom = useStore((s) => s.dom);
  const router = useRouter();

  const progress = useRef(0);
  const dampenedProgress = useRef(0);
  const velocity = useRef(0);

  const group = useRef<THREE.Group>(null!);

  const maxProgress = (posts.length - 1) * WIDTH + (posts.length - 1) * SPACING;

  useEffect(() => {
    dom?.addEventListener(
      "wheel",
      (e) => {
        progress.current += e.deltaY * SPEED;
      },
      { passive: true }
    );
  }, [dom]);

  useFrame((_, delta) => {
    progress.current = THREE.MathUtils.clamp(progress.current, 0, maxProgress);

    dampenedProgress.current = THREE.MathUtils.damp(
      dampenedProgress.current,
      progress.current,
      10,
      delta
    );

    if (group.current) {
      group.current.position.x = -dampenedProgress.current;
    }
  });

  return (
    <group ref={group}>
      {posts?.map((post, i) => (
        <PostItem
          key={post.slug}
          post={post}
          position={[i * WIDTH + i * SPACING, 0, 0]}
          scale={[WIDTH, HEIGHT, 1]}
        />
      ))}
    </group>
  );
}

{
  /* <mesh
          key={post.slug}
          position-x={i * WIDTH + i * SPACING}
          onClick={() => {
            router.push(post.slug);
          }}
        >
          <planeGeometry args={[WIDTH, HEIGHT, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh> */
}
