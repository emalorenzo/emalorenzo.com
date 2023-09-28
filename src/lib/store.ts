import { create } from "zustand";
import { PostMeta } from "~/types";

type Cursor =
  | "PREVIOUS"
  | "NEXT"
  | "MINIMIZE"
  | "MAXIMIZE"
  | "RESIZE"
  | "MOVE"
  | "CLOSE"
  | "OPEN"
  | "DEFAULT";

type GlobalStore = {
  dom: HTMLDivElement | null;
  setDom: (dom: HTMLDivElement) => void;

  posts: PostMeta[];
  setPosts: (posts: PostMeta[]) => void;

  selectedPostIndex: number | null;
  setSelectedPostIndex: (index: number | null) => void;

  cursor: Cursor | null;
  setCursor: (cursor: Cursor | null) => void;

  eventsTarget: HTMLDivElement | null;
  setEventsTarget: (target: HTMLDivElement) => void;
};

export const useStore = create<GlobalStore>((set) => ({
  dom: null,
  setDom: (dom) => set({ dom }),

  posts: [],
  setPosts: (posts) => set({ posts }),

  selectedPostIndex: null,
  setSelectedPostIndex: (index) => set({ selectedPostIndex: index }),

  cursor: null,
  setCursor: (cursor: Cursor | null) => set({ cursor }),

  eventsTarget: null,
  setEventsTarget: (target) => set({ eventsTarget: target }),
}));
