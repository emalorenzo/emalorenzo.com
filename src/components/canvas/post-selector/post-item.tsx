import { Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import * as THREE from "three";
import { PostMeta } from "~/types";

const damp = THREE.MathUtils.damp;

type Props = JSX.IntrinsicElements["mesh"] & {
  post: PostMeta;
  index: number;
  aspectRatio: number;
  scale: [number, number, number];
};

export function PostItem({ post, position, index, scale, aspectRatio, ...props }: Props) {
  const pathname = usePathname();

  const ref = useRef<THREE.Mesh>(null!);

  const viewport = useThree((t) => t.viewport);
  const selectedHeight = viewport.height * 0.5;
  const selectedWidth = selectedHeight * aspectRatio;
  const targetWidth = selectedIndex !== null ? selectedWidth : scale[0];
  const targetHeight = selectedIndex !== null ? selectedHeight : scale[1];

  const targetYPosition = isSelected && pathname !== "/" ? 0.6 : 0;

  const handleHover = useCallback(() => {}, [isSelected, isNext, isPrevious]);

  useFrame((state, delta) => {
    const width = damp(ref.current.scale.x, targetWidth, 8, delta);
    const height = damp(ref.current.scale.y, targetHeight, 8, delta);

    ref.current.scale.x = width;
    ref.current.scale.y = height;
    ref.current.material.scale[0] = width;
    ref.current.material.scale[1] = height;

    const distanceToSelected = pathname === "/" ? viewport.width * 0.45 : viewport.width * 0.6;

    if (isPrevious) {
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - distanceToSelected,
        8,
        delta
      );
    }
    if (isNext) {
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + distanceToSelected,
        8,
        delta
      );
    }
    if (selectedIndex === null || isSelected) {
      ref.current.position.x = damp(ref.current.position.x, position[0], 8, delta);
      ref.current.position.y = damp(ref.current.position.y, targetYPosition, 8, delta);
    }
  });

  return (
    <Image
      ref={ref}
      alt=""
      position={position}
      url={post.image}
      scale={[scale[0], scale[1]]}
      {...props}
    />
  );
}
