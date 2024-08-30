import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/session";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-xl mb-4">Nombre de usuario: {user.username}</p>
        <p className="text-gray-600 mb-2">Email: {user.email}</p>
        <p className="text-gray-600">ID: {user.id}</p>
      </div>
    </div>
  );
}
