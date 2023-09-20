import { Image } from "@react-three/drei";
import { useRef } from "react";
import { PostMeta } from "~/types";

type Props = JSX.IntrinsicElements["mesh"] & {
  post: PostMeta;
};

export function PostItem({ post, position, ...props }: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  console.log(position);

  return <Image ref={ref} alt="" position={position} url={post.image} {...props} />;
}
