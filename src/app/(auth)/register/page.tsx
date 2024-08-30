import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Register | NextJS Template",
  description: "Create your account and start using our platform",
};

export default function RegisterPage() {
  return (
    <div>
      <Logo />
      <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
        Create Your Account
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Join our community and unlock a world of possibilities. Your journey
        starts here!
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Secure. Simple. Tailored for you.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
