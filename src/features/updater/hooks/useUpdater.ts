import { useUpdaterStore } from "../store";
import { checkForUpdate, downloadAndInstall, resetUpdater } from "../updater";

export function useUpdater() {
  const state = useUpdaterStore();
  return {
    ...state,
    checkForUpdate,
    downloadAndInstall,
    resetUpdater,
  };
}
