import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-xl mb-4">Bienvenido, {user.username}!</p>
        <p className="text-gray-600">
          Esta es una página protegida. Solo usuarios autenticados pueden verla.
        </p>
      </div>
    </div>
  );
}
