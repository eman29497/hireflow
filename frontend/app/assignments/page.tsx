"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Assignment {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  candidate: {
    name: string;
  };
}
export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAssignments();
  }, []);
  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/assignments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setAssignments(data.assignments);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Loading...
      </h2>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Assignment Tracking
        </h1>
      <Link
  href="/add-assignment"
  className="w-full sm:w-auto text-center bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
>
  Add Assignment
</Link>
      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Assignment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {assignments.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    {item.candidate?.name}
                  </td>
                  <td className="px-6 py-4">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Submitted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/assignments/${item.id}`}
                      className="text-cyan-600 hover:text-cyan-800 font-medium"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {assignments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No Assignments Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}