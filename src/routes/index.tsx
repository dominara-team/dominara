import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./auth/Auth";
import Lobby from "./lobby/Lobby";
import Updater from "./updater/Updater";
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
