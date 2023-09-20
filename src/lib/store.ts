import { create } from "zustand";
import { PostMeta } from "~/types";

type GlobalStore = {
  posts: PostMeta[];
  setPosts: (posts: PostMeta[]) => void;

  dom: HTMLDivElement | null;
  setDom: (dom: HTMLDivElement) => void;
};

export const useStore = create<GlobalStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  dom: null,
  setDom: (dom) => set({ dom }),
}));
