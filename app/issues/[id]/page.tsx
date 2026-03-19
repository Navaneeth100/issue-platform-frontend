"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";
import ReactMarkdown from "react-markdown";

export default function IssueDetail() {
    const params = useParams();
    const id = params.id;

    const [issue, setIssue] = useState<any>(null);
    const [discussions, setDiscussions] = useState([]);
    const [message, setMessage] = useState("");
    const [aiResult, setAiResult] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState(false);

    const loadData = async () => {
        if (!id) return;

        setLoading(true);

        const issueRes = await API.get(`/issues/${id}`);
        const discussionRes = await API.get(`/issues/${id}/discussions`);

        setIssue(issueRes.data[0]);
        setDiscussions(discussionRes.data);

        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const addDiscussion = async () => {
        await API.post(`/issues/${id}/discussions`, { message });
        setMessage("");
        loadData();
    };

    const runAI = async () => {
        try {
            setAiLoading(true);
            const res = await API.post(`/issues/${id}/analyze`);
            setAiResult(res.data);
        } catch {
            setAiResult("AI failed");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Header */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Issue View
            </h1>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {issue?.title}
                        </h2>
                        <p className="text-gray-600 mt-2">{issue?.description}</p>
                    </div>

                    <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border">
                        <h2 className="font-semibold text-lg mb-4 text-gray-800">
                            Discussions
                        </h2>

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {discussions.map((d: any) => (
                                <div
                                    key={d.id}
                                    className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-black"
                                >
                                    {d.message || "..."}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <textarea
                                className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Add a comment..."
                            />

                            <button
                                type="button"
                                onClick={addDiscussion}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl transition"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-gray-800">
                                AI Analysis
                            </h2>

                            <button
                                type="button"
                                onClick={runAI}
                                disabled={aiLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition disabled:opacity-50"
                            >
                                {aiLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Analyzing...
                                    </>
                                ) : (
                                    "Analyze"
                                )}
                            </button>
                        </div>

                        {aiResult && (
                            <div className="mt-4 bg-gray-100 p-4 rounded-xl text-sm text-gray-700">
                                <ReactMarkdown>{aiResult}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}