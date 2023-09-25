import { ScrollScene, UseCanvas, styles, useScrollRig } from "@14islands/r3f-scroll-rig";
import clsx from "clsx";
import { useRef } from "react";
import { PostImage } from "~/components/canvas/post-image";
import { PostMeta } from "~/types";
import s from "./post-item.module.scss";

type Props = JSX.IntrinsicElements["div"] & {
  post: PostMeta;
  index: number;
};

export function PostItem({ className, post, index }: Props) {
  const wrapper = useRef<HTMLDivElement>(null!);
  const { hasSmoothScrollbar } = useScrollRig();

  console.log(hasSmoothScrollbar);
  return (
    <>
      <div ref={wrapper} className={clsx(s.wrapper, className)}>
        <img src={post.image} className={styles.hiddenWhenSmooth} alt="placeholder" />
      </div>
      {hasSmoothScrollbar && (
        <UseCanvas>
          <ScrollScene track={wrapper}>
            {(props) => <PostImage url={post.image} index={index} {...props} />}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
}
