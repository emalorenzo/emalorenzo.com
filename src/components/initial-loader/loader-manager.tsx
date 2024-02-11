import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useLoaderStore } from "~/store/loader";
import { useStore } from "~/store/store";
import { PostMeta } from "~/types";

type Props = {
  posts: PostMeta[];
  onLoaded: () => void;
};

export function LoaderManager({ posts, onLoaded }: Props) {
  const { setPosts } = useStore.getState();

  const canvasCreated = useLoaderStore((state) => state.canvasCreated);
  const { active, progress } = useProgress();

  const ready = canvasCreated && !active && progress === 100;

  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  useEffect(() => {
    if (ready) {
      onLoaded();
    }
  }, [ready, onLoaded]);

  return null;
}
