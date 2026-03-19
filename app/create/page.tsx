"use client";

import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: any = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createIssue = async () => {

    if (!validate()) return;

    try {
      setLoading(true);
      await API.post("/issues", { title, description });
      router.push("/issues");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Issue
        </h1>

        <Link href="/issues">
          <button className="text-sm text-blue-600 hover:underline">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-sm border p-6">

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev: any) => ({ ...prev, title: "" }));
            }}
            placeholder="Enter issue title"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 text-black ${errors.title
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-500"
              }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev: any) => ({ ...prev, description: "" }));
            }}
            placeholder="Describe the issue"
            rows={5}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 resize-none text-black ${errors.description
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-500"
              }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={createIssue}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </>
            ) : (
              "Create Issue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}