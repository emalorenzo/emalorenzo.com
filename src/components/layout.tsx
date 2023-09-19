import { PropsWithChildren, useEffect } from "react";
import { useStore } from "~/lib/store";
import { PostMeta } from "~/types";

type Props = JSX.IntrinsicElements["main"] & {
  posts: PostMeta[];
};

export function Layout({ children, posts, ...props }: PropsWithChildren<Props>) {
  const { setPosts } = useStore.getState();

  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  return <main {...props}>{children}</main>;
}
