"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useTransition } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: "Todas", value: "" },
  { label: "Pendentes", value: "PENDING" },
  { label: "Ativas", value: "ACTIVE" },
  { label: "Concluídas", value: "DONE" },
];

export function TasksFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, StartTransition] = useTransition();

  const currentStatus = searchParams.get("status") || "";

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    StartTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div
      className={`flex w-full gap-2 ${isPending ? "opacity-50 pointer-events-none" : ""}`}
    >
      {STATUS_OPTIONS.map((item) => {
        const isActive = currentStatus === item.value;
        return (
          <Button
            key={item.value}
            onClick={() => handleFilter(item.value)}
            className={`py-2 flex-1 rounded-md border text-sm font-medium transition-colors ${
              isActive
                ? "bg-text-register text-black border-text-register font-bold hover:bg-text-register"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}

export function TaskFilterByQuerys() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  function handleTaskFilter(term: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  }

  return (
    <div>
      <Input
        key={currentSearch}
        defaultValue={currentSearch}
        onChange={(e) => handleTaskFilter(e.target.value)}
        placeholder="pesquise por um valor"
      />
    </div>
  );
}
