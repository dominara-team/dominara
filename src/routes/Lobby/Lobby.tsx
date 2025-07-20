import { Link } from "react-router-dom";

export default function Lobby() {
  return (
    <div>
      <h2>Lobby Page</h2>
      <p>This is the lobby page.</p>
      <Link to="/auth">Go to Auth</Link>
    </div>
  );
}
