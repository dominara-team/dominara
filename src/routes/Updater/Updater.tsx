import { useUpdater } from "../../features/updater/hooks/useUpdater";

export default function Updater() {
  const {
    checking,
    available,
    downloading,
    downloaded,
    installing,
    error,
    updateInfo,
    progress,
    checkForUpdate,
    downloadAndInstall,
  } = useUpdater();

  return (
    <section style={{ marginTop: 32 }}>
      <h2>Updater</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button
        onClick={checkForUpdate}
        disabled={checking || downloading || installing}
      >
        {checking ? "Checking..." : "Check for Update"}
      </button>
      {available && updateInfo && (
        <div style={{ marginTop: 16 }}>
          <p>
            <strong>Update available!</strong>
            <br />
            Version: {updateInfo.version}
            <br />
            Date: {updateInfo.date}
            <br />
            Notes: {updateInfo.body}
          </p>
          <button
            onClick={downloadAndInstall}
            disabled={downloading || installing}
          >
            {downloading
              ? "Downloading..."
              : installing
              ? "Installing..."
              : "Download & Install"}
          </button>
          {progress && (
            <p>
              Downloaded {progress.downloaded} / {progress.contentLength} bytes
            </p>
          )}
          {downloaded && <p>Download finished. Installing...</p>}
        </div>
      )}
      {!available && !checking && <p>No update available.</p>}
    </section>
  );
}
