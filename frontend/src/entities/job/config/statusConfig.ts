import type { JobStatus } from "../model/types";

export const statusConfig: Record<JobStatus, { label: string; className: string }> = {
    wishlist: { label: "Wishlist", className: "bg-slate-100 text-slate-700" },
    applied: { label: "Applied", className: "bg-blue-100 text-blue-700" },
    hr_contacted: { label: "HR Contacted", className: "bg-indigo-100 text-indigo-700" },
    interview: { label: "Interview", className: "bg-purple-100 text-purple-700" },
    technical_interview: { label: "Technical Interview", className: "bg-violet-100 text-violet-700" },
    test_task: { label: "Test Task", className: "bg-amber-100 text-amber-700" },
    offer: { label: "Offer", className: "bg-emerald-100 text-emerald-700" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
    accepted: { label: "Accepted", className: "bg-green-100 text-green-700" },
};

export const statusOrder: JobStatus[] = [
    "wishlist",
    "applied",
    "hr_contacted",
    "interview",
    "technical_interview",
    "test_task",
    "offer",
    "rejected",
    "accepted",
];