"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddCandidatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Applied",
    notes: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Candidate Added Successfully");
      router.push("/candidates");
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Add New Candidate
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6"
      >
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
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
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg"
        >
          Save Candidate
        </button>
      </form>
    </div>
  );
}