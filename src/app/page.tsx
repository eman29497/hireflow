"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Candidate {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}
interface DashboardStats {
  totalCandidates: number;
  interviewing: number;
  selected: number;
  recentCandidates: Candidate[];
}
export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCandidates: 0,
    interviewing: 0,
    selected: 0,
    recentCandidates: [],
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signup");
      return;
    }
    fetchDashboard(token);
  }, []);
  const fetchDashboard = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-slate-500">
            Total Candidates
          </h3>
          <p className="text-4xl font-bold mt-2">
            {stats.totalCandidates}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-slate-500">
            Interviewing
          </h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {stats.interviewing}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-slate-500">
            Selected
          </h3>
        <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.selected}
          </p>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-bold mb-5">
          Recent Candidates
        </h2>
        {stats.recentCandidates.length === 0 ? (
          <p>No Candidates Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Name
                  </th>
                  <th className="text-left py-3">
                    Email
                  </th>
                  <th className="text-left py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b">
                    <td className="py-3">
                      {candidate.name}
                    </td>
                    <td className="py-3">
                      {candidate.email}
                    </td>
                    <td className="py-3">
                      <span className="px-3 py-1 rounded-full bg-slate-100">
                        {candidate.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}