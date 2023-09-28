import { create } from "zustand";
import { PostMeta } from "~/types";

type GlobalStore = {
  dom: HTMLDivElement | null;
  setDom: (dom: HTMLDivElement) => void;

  posts: PostMeta[];
  setPosts: (posts: PostMeta[]) => void;

  selectedPostIndex: number | null;
  setSelectedPostIndex: (index: number | null) => void;

  eventsTarget: HTMLDivElement | null;
  setEventsTarget: (target: HTMLDivElement | null) => void;
};

export const useStore = create<GlobalStore>((set) => ({
  dom: null,
  setDom: (dom) => set({ dom }),

  posts: [],
  setPosts: (posts) => set({ posts }),

  selectedPostIndex: null,
  setSelectedPostIndex: (index) => set({ selectedPostIndex: index }),

  eventsTarget: null,
  setEventsTarget: (target: HTMLDivElement | null) => set({ eventsTarget: target }),
}));
