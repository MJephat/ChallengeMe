import { NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts";

export default function SideNav() {
  const { user } = useAuth();

  return (
    <aside className="side-nav">
      <h2 className="logo">Challenge Me</h2>

      <nav>
        <NavLink to="/">QR Code</NavLink>

        {!user && (
          <>
            {/* <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink> */}
          </>
        )}

        {user && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/users">Users</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
