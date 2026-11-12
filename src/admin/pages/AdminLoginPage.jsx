import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5012/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Invalid credentials");
      
      const data = await res.json();
      
      // Save the real token from C#
      localStorage.setItem("techbox_admin", "true"); // Kept for your existing layout check
      localStorage.setItem("techbox_token", data.token); 
      
      navigate("/admin");
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tb-login">
      <div className="tb-login__card">
        <div className="tb-login__brand" style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-6)" }}>
         <img src="/logo.png.png" alt="Techbox" style={{ height: "120px", width: "auto" }} />
        </div>
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
