import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    if (!email) return;
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create ADMIN</h2>
        <p className="subtitle">Sign in to continue</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={submit}>REGISTER</button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
