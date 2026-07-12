"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}
export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCandidates();
  }, []);
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/candidates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCandidates(data.candidates);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Candidates</h1>
<Link
  href="/add-candidate"
  className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
>
  Add Candidate
</Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b">
                  <td className="px-6 py-4">{candidate.name}</td>
                  <td className="px-6 py-4">{candidate.email}</td>
                  <td className="px-6 py-4">{candidate.phone}</td>
                  <td className="px-6 py-4">
                  <span
  className={`px-3 py-1 rounded-full text-sm font-semibold
    ${
      candidate.status === "Selected"
        ? "bg-green-100 text-green-700"
        : candidate.status === "Interviewing"
        ? "bg-blue-100 text-blue-700"
        : candidate.status === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
>
  {candidate.status}
</span>
                  </td>
                  <td className="px-6 py-4">
                   <Link
  href={`/candidates/${candidate.id}`}
  className="text-cyan-600 hover:text-cyan-800 font-medium"
>
  View
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {candidates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No Candidates Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}