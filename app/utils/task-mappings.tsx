// utils/task-mappings.tsx
import {
    CheckCircle2,
    Clock,
    PlayCircle,
    ArrowDown,
    Minus,
    ArrowUp,
} from "lucide-react";
import { TaskStatus } from "@/lib/taskService";


export const STATUS_UI = [
    {
        label: "PENDING",
        color: "bg-amber-100 text-amber-800",
        icon: <Clock className="w-3 h-3 sm:w-5 sm:h-5"/>,
    },
    {
        label: "ACTIVE",
        color: "bg-blue-100 text-blue-800",
        icon: <PlayCircle className="w-3 h-3 sm:w-5 sm:h-5" />,
    },
    {
        label: "DONE",
        color: "bg-emerald-100 text-emerald-800",
        icon: <CheckCircle2 className="w-3 h-3 sm:w-5 sm:h-5" />,
    },
];

export const PRIORITY_UI = [
    {
        label: "LOW",
        color: "bg-slate-100 text-slate-700",
        icon: <ArrowDown className="w-3 h-3 sm:w-5 sm:h-5"/>,
    },
    {
        label: "MEDIUM",
        color: "bg-orange-100 text-orange-800",
        icon: <Minus className="w-3 h-3 sm:w-5 sm:h-5"/>,
    },
    {
        label: "HIGH",
        color: "bg-red-100 text-red-800",
        icon: <ArrowUp className="w-3 h-3 sm:w-5 sm:h-5"/>,
    },
];

export const VALID_STATUSES: TaskStatus[] = ["PENDING", "ACTIVE", "DONE"];
