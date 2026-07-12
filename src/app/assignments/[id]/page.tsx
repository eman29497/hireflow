"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Candidate {
  id: number;
  name: string;
}

export default function AssignmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    candidateId: 0,
  });

  useEffect(() => {
    fetchCandidates();
    fetchAssignment();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/candidates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/assignments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setFormData({
          title: data.assignment.title,
          description: data.assignment.description,
          status: data.assignment.status,
          dueDate: data.assignment.dueDate
            ? data.assignment.dueDate.split("T")[0]
            : "",
          candidateId: data.assignment.candidateId,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/assignments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: 1,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Assignment Updated Successfully");
    } else {
      alert(data.message);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this assignment?"
      )
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/assignments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Assignment Deleted Successfully");
      router.push("/assignments");
    } else {
      alert(data.message);
    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-2xl font-semibold">
        Loading...
      </h2>
    );
  }
    return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Review Assignment
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow rounded-xl p-8 space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium">
            Candidate
          </label>

          <select
            name="candidateId"
            value={formData.candidateId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Candidate</option>

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
          <label className="block mb-2 font-medium">
            Assignment Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Submitted">
              Submitted
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            className="flex-1 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Update Assignment
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Delete Assignment
          </button>

        </div>

      </form>

    </div>
  );
}