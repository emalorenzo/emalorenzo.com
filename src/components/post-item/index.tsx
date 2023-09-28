import {
  ScrollScene,
  UseCanvas,
  styles,
  useScrollRig,
  useScrollbar,
} from "@14islands/r3f-scroll-rig";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useRef } from "react";
import { PostImage } from "~/components/canvas/post-image";
import { useStore } from "~/lib/store";
import { CursorType, PostMeta } from "~/types";
import { ITEM_SPACING, ITEM_WIDTH } from "../post-selector";
import s from "./post-item.module.scss";

type Props = JSX.IntrinsicElements["div"] & {
  post: PostMeta;
  index: number;
  maxScale: number;
};

const getInteractType = (
  index: number,
  isPrevious: boolean,
  isNext: boolean,
  isSelected: boolean
): CursorType => {
  switch (true) {
    case isPrevious: {
      return "Previous";
    }
    case isNext: {
      return "Next";
    }
    case isSelected: {
      return "Open";
    }
    default: {
      return null;
    }
  }
};

export function PostItem({ className, post, index, maxScale }: Props) {
  const wrapper = useRef<HTMLDivElement>(null!);

  const router = useRouter();
  const pathname = usePathname();
  const { hasSmoothScrollbar } = useScrollRig();
  const { scrollTo } = useScrollbar();

  const selectedIndex = useStore((s) => s.selectedPostIndex);
  const { setSelectedPostIndex } = useStore.getState();

  const isSelected = selectedIndex === index;
  const isPrevious = selectedIndex !== null && index < selectedIndex;
  const isNext = selectedIndex !== null && index > selectedIndex;

  const distanceToSelected = pathname === "/" ? window.innerWidth * 0.45 : window.innerWidth * 0.6;

  let targetX = 0;
  if (isPrevious) {
    targetX = -window.innerWidth * 0.45;
  }
  if (isNext) {
    targetX = window.innerWidth * 0.45;
  }
  if (selectedIndex === null || isSelected) {
    targetX = 0;
  }

  const interactType = getInteractType(index, isPrevious, isNext, isSelected);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (isSelected) {
      router.push(post.slug);
    } else {
      const scrollTarget = index * ITEM_WIDTH + index * ITEM_SPACING;
      setSelectedPostIndex(index);

      scrollTo(scrollTarget, { duration: 0.7 });
    }
  };

  return (
    <>
      <motion.div
        ref={wrapper}
        className={clsx(s.wrapper, className)}
        data-interactable={!!interactType}
        data-type={interactType}
        onClick={handleClick}
        animate={{ scale: selectedIndex !== null ? maxScale : 1, x: targetX }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img src={post.image} className={styles.hiddenWhenSmooth} alt="placeholder" />
      </motion.div>
      {hasSmoothScrollbar && (
        <UseCanvas>
          <ScrollScene track={wrapper}>
            {(props) => <PostImage url={post.image} index={index} maxScale={maxScale} {...props} />}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
}
