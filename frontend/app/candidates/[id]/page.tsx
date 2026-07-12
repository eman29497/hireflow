"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
export default function CandidateDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/candidates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.candidate.name,
          email: data.candidate.email,
          phone: data.candidate.phone,
          status: data.candidate.status,
          notes: data.candidate.notes || "",
        });
      } else {
        alert(data.message);
      }
    } catch {
      alert("Failed to load candidate");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const updateCandidate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:5000/api/candidates/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("Candidate Updated Successfully");
      router.push("/candidates");
    } else {
      alert(data.message);
    }
  };
  const deleteCandidate = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this candidate?"
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:5000/api/candidates/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("Candidate Deleted Successfully");
      router.push("/candidates");
    } else {
      alert(data.message);
    }
  };
  if (loading) {
    return (
      <h2 className="text-center mt-10 text-2xl">
        Loading...
      </h2>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Candidate Details
      </h1>
      <form
        onSubmit={updateCandidate}
        className="bg-white rounded-xl shadow border p-8 space-y-5"
      >
        <div>
          <label>Name</label>
          <input
            className="w-full border rounded-lg p-3 mt-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="w-full border rounded-lg p-3 mt-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            className="w-full border rounded-lg p-3 mt-2"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select
            className="w-full border rounded-lg p-3 mt-2"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Selected</option>
            <option>Rejected</option>
            
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea
            className="w-full border rounded-lg p-3 mt-2"
            rows={4}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800"
          >
            Update Candidate
          </button>
          <button
            type="button"
            onClick={deleteCandidate}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}