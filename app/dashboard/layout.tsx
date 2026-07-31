import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileSidebar } from "@/components/sidebar/sidebar-mobile";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-dvh overflow-hidden flex bg-app-background">
      <Sidebar userName={user.name} />
      <div className="flex flex-col flex-1">
        <MobileSidebar />
        <main className={`px-2`}>{children}</main>
      </div>
    </div>
  );
}
