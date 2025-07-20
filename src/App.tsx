import { Link } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.css";

function App() {
  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <nav style={{ marginBottom: 24 }}>
        <Link to="/auth" style={{ marginRight: 12 }}>
          Auth
        </Link>
        <Link to="/lobby" style={{ marginRight: 12 }}>
          Lobby
        </Link>
        <Link to="/updater">Updater</Link>
      </nav>
      <AppRoutes />
    </main>
  );
}

export default App;
