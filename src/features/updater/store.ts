import { create } from "zustand";
import type { UpdaterState, UpdaterActions } from "./types";

const initialState: UpdaterState = {
  checking: false,
  available: false,
  downloading: false,
  downloaded: false,
  installing: false,
  error: null,
  updateInfo: null,
  progress: null,
};

export const useUpdaterStore = create<UpdaterState & UpdaterActions>((set) => ({
  ...initialState,

  checkForUpdate: async () => {
    set({ checking: true, error: null });
    try {
    } catch (e: any) {
      set({ error: e.message || "Failed to check for update" });
    } finally {
      set({ checking: false });
    }
  },

  downloadAndInstall: async () => {
    set({ downloading: true, error: null, progress: null });
    try {
    } catch (e: any) {
      set({ error: e.message || "Failed to download/install update" });
    } finally {
      set({ downloading: false });
    }
  },

  reset: () => set(initialState),
}));
