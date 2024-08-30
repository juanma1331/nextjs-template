import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Logo />
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Register
              </Link>
            </nav>
          </div>
        </Container>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Your Company
      </footer>
    </div>
  );
}
