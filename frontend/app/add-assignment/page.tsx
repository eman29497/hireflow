"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Candidate {
  id: number;
  name: string;
}
export default function AddAssignmentPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    candidateId: "",
    userId: 1,
  });
  useEffect(() => {
    fetchCandidates();
  }, []);
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "candidateId"
          ? Number(e.target.value)
          : e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/assignments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("Assignment Added Successfully");
      router.push("/assignments");
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Add Assignment
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-5"
      >
        <div>
          <label>Candidate</label>

          <select
            name="candidateId"
            value={formData.candidateId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          >
            <option value="">
              Select Candidate
            </option>
            <option value=''>
              Reject Candidate
            </option>

            {candidates.map((candidate) => (
              <option
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Assignment Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>
        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option>Pending</option>
            <option>Submitted</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800"
        >
          Save Assignment
        </button>
      </form>
    </div>
  );
}