import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { useUpdaterStore } from "./store";
import type { UpdateInfo } from "./types";

const setUpdaterState = (
  partial: Partial<ReturnType<typeof useUpdaterStore.getState>>
) => {
  useUpdaterStore.setState(partial);
};

export async function checkForUpdate() {
  setUpdaterState({ checking: true, error: null });
  try {
    const update = await check();
    if (update) {
      const info: UpdateInfo = {
        version: update.version ?? "",
        date: update.date ?? "",
        body: update.body ?? "",
      };
      setUpdaterState({ available: true, updateInfo: info });
    } else {
      setUpdaterState({ available: false, updateInfo: null });
    }
  } catch (e: any) {
    console.error("Updater checkForUpdate error:", e);
    setUpdaterState({ error: e.message || "Failed to check for update" });
  } finally {
    setUpdaterState({ checking: false });
  }
}

export async function downloadAndInstall() {
  setUpdaterState({ downloading: true, error: null, progress: null });
  try {
    const update = await check();
    if (!update) {
      setUpdaterState({ error: "No update available", downloading: false });
      return;
    }
    let downloaded = 0;
    let contentLength = 0;
    await update.downloadAndInstall((event: any) => {
      switch (event.event) {
        case "Started": {
          contentLength = event.data.contentLength ?? 0;
          setUpdaterState({ progress: { downloaded: 0, contentLength } });
          break;
        }
        case "Progress": {
          downloaded += event.data.chunkLength ?? 0;
          setUpdaterState({ progress: { downloaded, contentLength } });
          break;
        }
        case "Finished": {
          setUpdaterState({ downloaded: true });
          break;
        }
      }
    });
    setUpdaterState({ installing: true });
    await relaunch();
  } catch (e: any) {
    console.error("Updater downloadAndInstall error:", e);
    setUpdaterState({
      error: e.message || "Failed to download/install update",
    });
  } finally {
    setUpdaterState({ downloading: false, installing: false });
  }
}

export function resetUpdater() {
  useUpdaterStore.getState().reset();
}
