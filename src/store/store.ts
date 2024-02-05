import Lenis from "@studio-freight/lenis/types";
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

  lenis: Lenis | undefined | null;
  setLenis: (lenis: Lenis | null) => void;

  useWebGL: boolean;
  setUseWebGL: (useWebGL: boolean) => void;

  hoveredPost: PostMeta | null;
  setHoveredPost: (post: PostMeta | null) => void;

  activePost: PostMeta | null;
  setActivePost: (post: PostMeta | null) => void;
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

  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),

  useWebGL: true,
  setUseWebGL: (useWebGL) => set({ useWebGL }),

  hoveredPost: null,
  setHoveredPost: (post) => set({ hoveredPost: post }),

  activePost: null,
  setActivePost: (post) => set({ activePost: post }),
}));
