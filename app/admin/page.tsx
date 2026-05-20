import { redirect } from "next/navigation";
import AdminPanel from "@/components/admin/AdminPanel";
import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/lib/auth";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?redirect=/admin");
  }

  if (!user.isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-28">
        <AdminPanel />
      </div>
    </main>
  );
};

export default page;
