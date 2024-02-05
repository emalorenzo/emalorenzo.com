import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PostItemImage } from "~/components/post-item/webgl";
import { useScroll } from "~/hooks/useScroll";
import { getScreenPosition, pxToThreeUnits } from "~/lib/utils";
import { useLoaderStore } from "~/store/loader";
import { PostMeta } from "~/types";

export type Props = {
  posts: PostMeta[];
};

const THRESHOLD_HEADER = 50;
const THRESHOLD_MINIMAP = 50;

const CONTAINER_PADDING = 32;
const CONTAINER_GAP = 32;
const ABOUT_SECTION_HEIGHT = 200;

const CONTAINER_OFFSET_Y = THRESHOLD_HEADER + CONTAINER_PADDING + ABOUT_SECTION_HEIGHT;
const CONTAINER_OFFSET_X = THRESHOLD_MINIMAP + CONTAINER_PADDING;

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 180;

export function PostsWebgl({ posts }: Props) {
  const wrapperRef = useRef<THREE.Group>(null!);
  const scrollTarget = useRef(0);
  const postsRef = useRef<any>([]);
  const isAnimating = useRef(false);

  const { camera, viewport }: { camera: THREE.PerspectiveCamera; viewport: any } = useThree();
  const activeViewport = viewport.getCurrentViewport(camera, [0, 0, 2]);

  const width = pxToThreeUnits(ITEM_WIDTH, viewport);
  const height = pxToThreeUnits(ITEM_HEIGHT, viewport);
  const gap = pxToThreeUnits(CONTAINER_GAP, viewport);

  const [containerX, containerY] = getScreenPosition(
    width,
    height,
    CONTAINER_OFFSET_X,
    CONTAINER_OFFSET_Y,
    viewport
  );

  const pathname = usePathname();
  const targetRoute = useLoaderStore((state) => state.targetRoute);

  const activePost = !!targetRoute
    ? targetRoute.split("/posts/")[1]
    : pathname?.split("/posts/")[1];

  const prevActivePost = useRef(activePost);

  const INITIAL_POSITION = new THREE.Vector3(0, 0, 0);
  const ACTIVE_POSITION = new THREE.Vector3(-containerX, 0, 3);

  const { contextSafe } = useGSAP({ scope: wrapperRef });

  const introTransition = contextSafe((postRef: THREE.Mesh, i: number) => {
    const yPosIdle = -(i * height) - i * gap;

    gsap.to(postRef.position, {
      x: INITIAL_POSITION.x,
      y: yPosIdle,
      z: INITIAL_POSITION.z,
      duration: 0.7,
      ease: "sine.out",
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  });

  const activeTransition = contextSafe((postRef: THREE.Mesh) => {
    const timeline = gsap.timeline({
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    timeline.to(postRef.position, {
      x: ACTIVE_POSITION.x,
      y: ACTIVE_POSITION.y,
      z: ACTIVE_POSITION.z,
      duration: 0.7,
      ease: "power2.inOut",
    });
  });

  useEffect(() => {
    if (!activePost && !prevActivePost.current) return;

    if (activePost) {
      prevActivePost.current = activePost;
    }

    if (activePost) {
      const postIndex = posts.findIndex((post) => post.slug === activePost);
      const post = postsRef.current[postIndex];

      activeTransition(post);
    } else {
      const postIndex = posts.findIndex((post) => post.slug === prevActivePost.current);
      const post = postsRef.current[postIndex];

      introTransition(post, postIndex);
    }
  }, [activePost, introTransition, activeTransition, posts]);

  useScroll(({ scroll }) => {
    scrollTarget.current = pxToThreeUnits(scroll, viewport);
  });

  useFrame(() => {
    if (!wrapperRef.current) return;

    const yOffset = containerY + scrollTarget.current;

    for (let i = 0; i < postsRef.current.length; i++) {
      const post = postsRef.current[i];
      const postData = posts[i];
      const yPosIdle = -(i * height) - i * gap;

      if (postData.slug !== activePost) {
        post.position.y = yOffset + yPosIdle;
      }
    }
  });

  return (
    <>
      <group position={[containerX, 0, 0]} ref={wrapperRef}>
        {posts.map((post, i) => (
          <PostItemImage
            ref={(node) => {
              if (node) postsRef.current[i] = node;
            }}
            key={post.slug}
            post={post}
            position={[0, -(i * height) - i * gap, 0]}
          />
        ))}
      </group>
      <Environment preset="warehouse" />
    </>
  );
}
