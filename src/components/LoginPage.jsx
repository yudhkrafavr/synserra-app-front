import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/synserra-logo.svg";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Redirect to "/" if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // fixed key name
    if (token) {
      navigate("/", { replace: true }); // fixed redirect (prevents loops)
    }
  }, []); // ✅ run once on mount only

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://api.upilabs.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Client-App": "Synserra-Client",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });      

      if (!response.ok) throw new Error("Invalid username or password");

      const data = await response.json();
      console.log("Login response:", data);

      const token = data?.access_token;
      if (!token) throw new Error("No access token returned from server");

      // ✅ Store tokens correctly
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("device_id", data.device_id);

      // ✅ Navigate to home once
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f8d8] to-[#A7A791]">
      {/* Logo */}
      <div className="mb-8 flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-12 select-none"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* Login Card */}
      <div className="bg-[#2b2a29] p-15 rounded-lg shadow-lg w-90 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-[#FFFFFF] w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#FFFFFF] w-full px-3 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-3 bg-[#f89c26] text-black font-semibold rounded-md hover:bg-[#f8b046] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
