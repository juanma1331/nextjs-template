export default function AboutPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <p className="text-lg mb-4">
          Welcome to our Next.js Template project! We are passionate about
          creating efficient and scalable web applications using cutting-edge
          technologies.
        </p>
        <p className="text-lg mb-4">
          Our template combines the power of Next.js with Lucia for
          authentication and Drizzle ORM for database management, providing a
          solid foundation for your next web project.
        </p>
        <p className="text-lg">
          Whether you're building a small application or a large-scale platform,
          our template offers the flexibility and performance you need to
          succeed.
        </p>
      </div>
    </div>
  );
}
