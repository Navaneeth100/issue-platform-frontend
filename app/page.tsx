"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import Link from "next/link";

export default function IssuesPage() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/issues").then((res) => setIssues(res.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Issue Dashboard
                </h1>

                <Link href="/create">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                        + Create Issue
                    </button>
                </Link>
            </div>

            {loading ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse"
                        >
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="my-4 border-t"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {issues.map((issue: any) => (
                            <div className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1" key={issue.id}>

                                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                                    {issue.title}
                                </h2>

                                <div className="flex justify-end text-sm text-gray-500">
                                    <Link key={issue.id} href={`/issues/${issue.id}`}>
                                        <span className="group-hover:text-blue-500 transition">
                                            View →
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {issues.length === 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            No issues found
                        </div>
                    )}
                </>
            )}
        </div>
    );
}