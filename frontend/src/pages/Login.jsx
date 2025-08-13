import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("manager@example.com");
  const [password, setPassword] = useState("pass1234");
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");
  const { setToken } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "register") await api.post("/auth/register", { email, password });
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">{mode === "login" ? "Manager Login" : "Create Manager"}</h2>
        {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full border rounded p-2 mb-3" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" className="w-full border rounded p-2 mb-3" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 text-white rounded p-2 mb-2">{mode === "login" ? "Login" : "Register & Login"}</button>
        <button type="button" className="w-full border rounded p-2" onClick={()=>setMode(mode==="login"?"register":"login")}>
          {mode==="login"?"Create an account":"Have an account? Login"}
        </button>
      </form>
    </div>
  );
}
