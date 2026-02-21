import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts";

export default function TopNav() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Context safety
  if (!auth) return null;

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  return (
    <header className="top-nav">
      <div className="left">
        {/* <strong>MGC Kitty Classic</strong> */}
      </div>

      <div
        className="right"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Login
          </button>
        ) : (
          <>
            <span className="welcome">{user.email}</span>

            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                cursor: "pointer",
                background: "red",
                color: "white",
                font: "inherit",
                padding: 4,
                borderRadius: 4,
                border: "none",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}