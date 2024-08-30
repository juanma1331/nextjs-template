export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="hidden lg:block relative w-1/3">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-3/4 h-3/4 text-primary/20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="currentColor" />
            <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
