import { Link } from "react-router-dom";

export default function Auth() {
  return (
    <div>
      <h2>Auth Page</h2>
      <p>This is the authentication page.</p>
      <Link to="/lobby">Go to Lobby</Link>
    </div>
  );
}
