"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, LayoutDashboard, Wallet, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logOut } from "@/app/actions/authRegister";

interface IUserProps {
    userName: string;
}

export function Sidebar({ userName }: IUserProps) {
    const pathname = usePathname();
    const menuNav = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            label: "Expenses",
            href: "/dashboard/expenses",
            icon: <Wallet className="w-5 h-5" />,
        },
        {
            label: "Tasks",
            href: "/dashboard/tasks",
            icon: <ListTodo className="w-5 h-5" />,
        },
    ];
    return (
        <aside className="hidden w-64 min-h-screen lg:flex font-mono flex-col bg-app-sidebar">
            <div className="border-b py-8 gap-8">
                <h1 className="text-center pb-4 text-lg text-text-sidebar">
                    PERSONAL SYSTEM
                </h1>
                <h1 className="text-white text-lg text-center">{userName}</h1>
            </div>
            <nav className="p-6 space-y-4 flex-1 font-mono">
                {menuNav.map((item) => {
                    return (
                        <Link
                            key={item.label}
                            aria-label={item.label}
                            href={item.href}
                            replace
                            className={cn(
                                "flex items-center justify-center text-center text-lg rounded-md transition-colors duration-300s text-gray-400",
                                pathname === item.href
                                    ? " text-white border-x border-text-register"
                                    : "hover:bg-bg-hover",
                            )}
                        >
                            <span className="flex w-3/4  gap-2 items-center">
                                {item.icon}
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
            <div className="flex items-center justify-start">
                <form
                    action={logOut}
                    className="flex items-center justify-center"
                >
                    <Button
                        type="submit"
                        variant={"default"}
                        className="bg-transparent"
                    >
                        {" "}
                        <LogOut className="w-5 h-5" color="white" />
                        Log Out
                    </Button>
                </form>
            </div>
        </aside>
    );
}
