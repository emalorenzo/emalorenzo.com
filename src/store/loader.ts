import { create } from "zustand";

export type NavigationOptions = {
  replace?: boolean;
  delay?: number;
  showLoader?: boolean;
};

type LoaderStore = {
  canvasCreated: boolean;
  setCanvasCreated: (canvasCreated: boolean) => void;

  appReady: boolean;
  setAppReady: (appReady: boolean) => void;
  targetRoute: string | null;
  navigationOptions: NavigationOptions;
  setTargetRoute: (targetRoute: string | null, navigationOptions: NavigationOptions) => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  canvasCreated: false,
  setCanvasCreated: (canvasCreated) => set({ canvasCreated }),

  appReady: false,
  setAppReady: (appReady) => set({ appReady }),

  targetRoute: null,
  navigationOptions: {},
  setTargetRoute: (targetRoute, navigationOptions = {}) => set({ targetRoute, navigationOptions }),
}));
