"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  LayoutDashboard,
  ListTodo,
  LogOut,
  MenuIcon,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { logOut } from "@/app/actions/authRegister";

export function MobileSidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const menuNav = [
    {
      label: "Dashboard",
      latedTranslated: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Expenses",
      latedTranslated: "Despesas",
      href: "/dashboard/expenses",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      label: "Tasks",
      latedTranslated: "Tarefas",
      href: "/dashboard/tasks",
      icon: <ListTodo className="w-5 h-5" />,
    },
  ];

  return (
    <div className="lg:hidden bg-text-sidebar">
      <header className="sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <MenuIcon className="w-7 h-7 text-app-sidebar" />
            </SheetTrigger>
            <SheetContent className="bg-card-register" side="left">
              <SheetHeader>
                <SheetTitle className="text-center text-text-register font-semibold">
                  PERSONAL SYSTEM
                </SheetTitle>
                <SheetDescription className={"text-center"}>
                  v0.1.0
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col p-6 space-y-4">
                {menuNav.map((item) => {
                  return (
                    <Link
                      key={item.label}
                      aria-label={item.label}
                      href={item.href}
                      replace
                      className={cn(
                        "flex items-center p-1 gap-2 text-lg rounded-md transition-colors duration-300s text-text-register",
                        pathname === item.href
                          ? " text-text-active border-r-4 border-text-active"
                          : "hover:bg-bg-hover",
                      )}
                    >
                      {item.icon}
                      {item.latedTranslated}
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-0 w-full">
                <form action={logOut} className="flex pb-2">
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
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}
