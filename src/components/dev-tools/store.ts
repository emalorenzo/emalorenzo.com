import { create } from "zustand";

type DevToolsStore = {
  enableWebGL: boolean;
  setEnableWebGL: (enable: boolean) => void;

  enableSmoothTouchScroll: boolean;
  setEnableSmoothTouchScroll: (enable: boolean) => void;
};

export const useDevToolsStore = create<DevToolsStore>((set) => ({
  enableWebGL: true,
  setEnableWebGL: (enable) => set({ enableWebGL: enable }),

  enableSmoothTouchScroll: true,
  setEnableSmoothTouchScroll: (enable) => set({ enableSmoothTouchScroll: enable }),
}));
