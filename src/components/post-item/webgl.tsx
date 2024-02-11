import { MeshDistortMaterial, useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { usePxToThreeUnits } from "~/lib/utils";
import { useLoaderStore } from "~/store/loader";
import { useStore } from "~/store/store";
import { PostMeta } from "~/types";

type Props = {
  post: PostMeta;
} & JSX.IntrinsicElements["mesh"];

export const PostItemImage = forwardRef(function PostItemImageFn(
  { post, ...props }: Props,
  ref: any
) {
  const material = useRef<any>(null!);
  const hoveredPost = useStore((state) => state.hoveredPost);
  const appReady = useLoaderStore((state) => state.appReady);

  const isHovered = hoveredPost?.slug === post.slug;

  useCursor(isHovered);
  const texture = useTexture(post.image);

  useFrame(() => {
    if (!material.current) return;

    material.current.distort = THREE.MathUtils.lerp(
      material.current.distort,
      isHovered ? 0.2 : 0,
      isHovered ? 0.05 : 0.01
    );
  });

  const width = usePxToThreeUnits(300);
  const height = usePxToThreeUnits(180);

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[appReady ? width : 0, appReady ? height : 0, 32, 32]} />
      <MeshDistortMaterial ref={material} map={texture} speed={2} distort={0} />
    </mesh>
  );
});
