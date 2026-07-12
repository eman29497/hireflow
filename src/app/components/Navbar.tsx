"use client";
import { useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;
  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-2xl text-cyan-400 tracking-tight">
            Hire<span className="text-white">Flow</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-slate-200 hover:text-white font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/candidates"
              className="text-slate-200 hover:text-white font-medium transition-colors"
            >
              Candidates
            </Link>
            <Link
              href="/assignments"
              className="text-slate-200 hover:text-white font-medium transition-colors"
            >
              Assignments
            </Link>

            {isLoggedIn ? (
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-white p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden bg-slate-800 ${isOpen ? "block" : "hidden"}`}>
        <div className="px-4 py-4 space-y-2">
          <Link
            href="/"
            className="block text-slate-200 hover:text-white px-3 py-2"
          >
            Dashboard
          </Link>
          <Link
            href="/candidates"
            className="block text-slate-200 hover:text-white px-3 py-2"
          >
            Candidates
          </Link>

          <Link
            href="/assignments"
            className="block text-slate-200 hover:text-white px-3 py-2"
          >
            Assignments
          </Link>
          <Link
            href="/login"
            className="block text-cyan-400 font-bold px-3 py-2"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}