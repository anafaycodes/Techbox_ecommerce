import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // MOCK AUTHENTICATION - Backend integration comes in Phase 6
    setTimeout(() => {
      if (email === "admin@techbox.pk" && password === "admin123") {
        localStorage.setItem("techbox_admin", "true");
        navigate("/admin");
      } else {
        alert("Invalid credentials. Use admin@techbox.pk / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="tb-login">
      <div className="tb-login__card">
        <div className="tb-login__brand">TECHBOX</div>
        <h1 className="tb-login__title">Admin Portal</h1>
        <p className="tb-login__desc">Sign in to manage your store.</p>

        <form onSubmit={handleLogin} className="tb-login__form">
          <div className="tb-login__field">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@techbox.pk"
              required 
            />
          </div>
          <div className="tb-login__field">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="tb-btn tb-btn--primary tb-btn--full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
