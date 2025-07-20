export interface UpdaterState {
  checking: boolean;
  available: boolean;
  downloading: boolean;
  downloaded: boolean;
  installing: boolean;
  error: string | null;
  updateInfo: UpdateInfo | null;
  progress: UpdateProgress | null;
}

export interface UpdateInfo {
  version: string;
  date: string;
  body: string;
}

export interface UpdateProgress {
  downloaded: number;
  contentLength: number;
}

export interface UpdaterActions {
  checkForUpdate: () => Promise<void>;
  downloadAndInstall: () => Promise<void>;
  reset: () => void;
}

export type UpdaterEvent =
  | { event: "Started"; data: { contentLength: number } }
  | { event: "Progress"; data: { chunkLength: number } }
  | { event: "Finished" };
