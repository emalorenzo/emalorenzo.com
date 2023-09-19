import { create } from "zustand";
import { PostMeta } from "~/types";

type GlobalStore = {
  posts: PostMeta[];
  setPosts: (posts: PostMeta[]) => void;
};

export const useStore = create<GlobalStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
