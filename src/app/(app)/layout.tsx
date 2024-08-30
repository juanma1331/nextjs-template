import Link from "next/link";
import { getUser } from "@/lib/auth/session";
import Container from "@/components/ui/Container";
import UserMenu from "@/components/header/UserMenu";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <Container>
          <div className="flex justify-between items-center py-4">
            <nav className="flex space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900"
              >
                Profile
              </Link>
            </nav>
            {user && <UserMenu user={user} />}
          </div>
        </Container>
      </header>
      <main className="py-8">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
