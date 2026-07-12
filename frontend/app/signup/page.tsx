"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Admin Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@hireflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}