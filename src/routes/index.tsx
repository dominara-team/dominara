import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import Lobby from "./Lobby/Lobby";
import Updater from "./Updater/Updater";
import { ReactElement } from "react";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/updater" element={<Updater />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
