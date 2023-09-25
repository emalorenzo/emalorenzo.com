import { Image } from "@react-three/drei";

type Props = JSX.IntrinsicElements["mesh"] & {
  url: string;
  index: number;
};

export function PostImage({ url, index, ...props }: Props) {
  console.log("props", props.position);
  return <Image url={url} {...props} />;
}
