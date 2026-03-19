"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";
import Link from "next/link";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    API.get("/issues").then((res) => setIssues(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>

      {issues.map((issue: any) => (
        <Link key={issue.id} href={`/issues/${issue.id}`}>
          <div className="border p-4 mb-3 rounded cursor-pointer">
            <h2 className="font-semibold">{issue.title}</h2>
            <p className="text-sm text-gray-500">{issue.status}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}