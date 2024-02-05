import { create } from "zustand";

export type NavigationOptions = {
  replace?: boolean;
  delay?: number;
  showLoader?: boolean;
};

type LoaderStore = {
  initialLoadReady: boolean;
  setInitialLoadReady: (initialLoadReady: boolean) => void;
  targetRoute: string | null;
  navigationOptions: NavigationOptions;
  setTargetRoute: (targetRoute: string | null, navigationOptions: NavigationOptions) => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  initialLoadReady: true,
  setInitialLoadReady: (initialLoadReady) => set({ initialLoadReady }),

  targetRoute: null,
  navigationOptions: {},
  setTargetRoute: (targetRoute, navigationOptions = {}) => set({ targetRoute, navigationOptions }),
}));
