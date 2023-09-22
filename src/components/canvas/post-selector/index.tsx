import { useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useStore } from "~/lib/store";

import * as THREE from "three";
import { PostItem } from "./post-item";

const ASPECT_RATIO = 16 / 9;
const HEIGHT = 1.8;
const WIDTH = HEIGHT * ASPECT_RATIO;
const SPACING = 0.1;
const SPEED = 0.003;

const getPosition = (i: number) => i * WIDTH + i * SPACING;

export function PostSelector() {
  const pathname = usePathname();

  const { setSelectedPostIndex } = useStore.getState();
  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const posts = useStore((s) => s.posts);
  const dom = useStore((s) => s.dom);

  const progress = useRef(0);
  const dampenedProgress = useRef(0);

  const group = useRef<THREE.Group>(null!);

  const maxProgress = (posts.length - 1) * WIDTH + (posts.length - 1) * SPACING;

  useLayoutEffect(() => {
    if (selectedPostIndex !== null) {
      progress.current = getPosition(selectedPostIndex);
    }
  }, [selectedPostIndex]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      progress.current += e.deltaY * SPEED;

      if (selectedPostIndex !== null && pathname === "/") {
        setSelectedPostIndex(null);
      }
    },
    [pathname, selectedPostIndex, setSelectedPostIndex]
  );

  useEffect(() => {
    dom?.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      dom?.removeEventListener("wheel", handleScroll);
    };
  }, [dom, handleScroll]);

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
          index={i}
          position={[getPosition(i), 0, 0]}
          scale={[WIDTH, HEIGHT, 1]}
          aspectRatio={ASPECT_RATIO}
        />
      ))}
    </group>
  );
}