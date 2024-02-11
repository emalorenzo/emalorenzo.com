import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLoaderStore } from "~/store/loader";
import { useStore } from "~/store/store";
import { PostMeta } from "~/types";
import { PostsWebgl } from "./webgl";

type Props = {
  posts: PostMeta[];
};

function Transition() {
  const viewport = useThree((t) => t.viewport);
  const ref = useRef<THREE.Mesh>(null!);
  const [firstTime, setFirstTime] = useState(true);

  const pathname = usePathname();
  const targetRoute = useLoaderStore((state) => state.targetRoute);
  const hoveredPost = useStore((state) => state.hoveredPost);
  const activePost = useStore((state) => state.activePost);

  const color = activePost?.background || hoveredPost?.background;

  const { contextSafe } = useGSAP({ scope: ref });

  const animateTransition = contextSafe((visible: boolean) => {
    if (firstTime) {
      gsap.set(ref.current.position, { x: visible ? 0 : viewport.width });

      setFirstTime(false);
      return;
    }

    gsap.to(ref.current.position, {
      x: visible ? 0 : viewport.width,
      duration: 0.7,
      ease: "sine.out",
    });
  });

  const firstCondition = !!targetRoute ? targetRoute !== "/" : false;
  const secondCondition = !targetRoute && pathname !== "/";
  const visible = firstCondition || secondCondition;

  useEffect(() => {
    animateTransition(visible);
  }, [visible, animateTransition]);

  return (
    <mesh ref={ref} position={[viewport.width, 0, 0.2]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial color={color || "#000"} />
    </mesh>
  );
}

export function Shared() {
  const posts = useStore((state) => state.posts);
  return (
    <>
      {posts?.length && <PostsWebgl posts={posts} />}
      <Transition />
    </>
  );
}
