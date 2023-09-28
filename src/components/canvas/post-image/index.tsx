import { Image } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import * as THREE from "three";
import { useStore } from "~/lib/store";

const damp = THREE.MathUtils.damp;

type Props = JSX.IntrinsicElements["mesh"] & {
  url: string;
  index: number;
  maxScale: number;
};

export function PostImage({ url, index, scale, maxScale, ...props }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialScale = useRef<THREE.Vector3>(scale as THREE.Vector3);

  const viewport = useThree((t) => t.viewport);
  const pathname = usePathname();

  const selectedIndex = useStore((s) => s.selectedPostIndex);
  const isSelected = selectedIndex === index;
  const isPrevious = selectedIndex !== null && index < selectedIndex;
  const isNext = selectedIndex !== null && index > selectedIndex;

  const targetScale = selectedIndex !== null ? maxScale : 1;

  const targetWidth = initialScale.current.x * targetScale;
  const targetHeight = initialScale.current.y * targetScale;

  useFrame((state, delta) => {
    const width = damp(ref.current.scale.x, targetWidth, 8, delta);
    const height = damp(ref.current.scale.y, targetHeight, 8, delta);

    ref.current.scale.x = width;
    ref.current.scale.y = height;
    ref.current.material.scale[0] = width;
    ref.current.material.scale[1] = height;

    const distanceToSelected = pathname === "/" ? viewport.width * 0.45 : viewport.width * 0.6;

    if (isPrevious) {
      ref.current.position.x = damp(ref.current.position.x, -distanceToSelected, 8, delta);
    }
    if (isNext) {
      ref.current.position.x = damp(ref.current.position.x, distanceToSelected, 8, delta);
    }
    if (selectedIndex === null || isSelected) {
      ref.current.position.x = damp(ref.current.position.x, 0, 8, delta);
      ref.current.position.y = damp(ref.current.position.y, 0, 8, delta);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
  };

  return <Image ref={ref} url={url} scale={scale} onClick={handleClick} {...props} />;
}
