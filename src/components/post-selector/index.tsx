import { PostItem } from "~/components/post-item";

import { SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { useStore } from "~/lib/store";
import { useDevToolsStore } from "../dev-tools/store";
import styles from "./post-selector.module.scss";

export function PostSelector() {
  const posts = useStore((s) => s.posts);
  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const enableWebGL = useDevToolsStore((s) => s.enableWebGL);

  const post = selectedPostIndex !== null ? posts[selectedPostIndex] : null;

  return (
    <SmoothScrollbar enabled={enableWebGL}>
      {(bind) => (
        <div className={styles.wrapper} {...bind}>
          {posts?.map((post, index) => (
            <PostItem key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </SmoothScrollbar>
  );
}
