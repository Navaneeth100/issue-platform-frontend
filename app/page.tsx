"use client";

import { useState } from "react";
import API from "../lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const createIssue = async () => {
    await API.post("/issues", { title, description });
    router.push("/issues");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Issue</h1>

      <input
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={createIssue}
        className="bg-black text-white px-4 py-2"
      >
        Create
      </button>
    </div>
  );
}