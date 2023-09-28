export interface PostMeta {
  title: string;
  subtitle: string;
  publishedAt: string;
  slug: string;
  summary: string;
  image: string;
  background: string;
  scene: string;
}

export type CursorType =
  | "Previous"
  | "Next"
  | "MINIMIZE"
  | "MAXIMIZE"
  | "RESIZE"
  | "MOVE"
  | "CLOSE"
  | "Open"
  | "DEFAULT"
  | null;
