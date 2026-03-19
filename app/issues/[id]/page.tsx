"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";

export default function IssueDetail() {
    const params = useParams();
    const id = params.id;

    const [issue, setIssue] = useState<any>(null);
    const [discussions, setDiscussions] = useState([]);
    const [message, setMessage] = useState("");
    const [aiResult, setAiResult] = useState("");

    const loadData = async () => {
        if (!id) return;

        const issueRes = await API.get(`/issues/${id}`);
        const discussionRes = await API.get(`/issues/${id}/discussions`);

        setIssue(issueRes.data[0]);
        setDiscussions(discussionRes.data);
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
            const res = await API.post(`/issues/${id}/analyze`);
            setAiResult(res.data);
        } catch {
            setAiResult("AI failed (optional)");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{issue?.title}</h1>
            <p>{issue?.description}</p>

            <h2 className="mt-4 font-semibold">Discussions</h2>
            {discussions.map((d: any) => (
                <div key={d.id} className="border p-2 mt-2">
                    {d.message}
                </div>
            ))}

            <textarea
                className="border w-full mt-3 p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                type="button"
                onClick={addDiscussion}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
                Add Comment
            </button>

            <button
                type="button"
                onClick={runAI}
                className="bg-green-600 text-white px-4 py-2 mt-4"
            >
                Analyze
            </button>

            {aiResult && (
                <div className="mt-3 p-3 border bg-gray-100">
                    {aiResult}
                </div>
            )}
        </div>
    );
}