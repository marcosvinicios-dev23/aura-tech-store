import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isAuthenticated } from "@/lib/auth";

export default async function ProtectedAdminLayout({children}:{children:React.ReactNode}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <div className="admin-page admin-shell"><AdminSidebar /><main className="admin-main">{children}</main></div>;
}
