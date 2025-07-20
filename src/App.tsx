import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useUpdater } from "./features/updater/hooks/useUpdater";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
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

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>

      {/* Updater UI */}
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
                Downloaded {progress.downloaded} / {progress.contentLength}{" "}
                bytes
              </p>
            )}
            {downloaded && <p>Download finished. Installing...</p>}
          </div>
        )}
        {!available && !checking && <p>No update available.</p>}
      </section>
    </main>
  );
}

export default App;
