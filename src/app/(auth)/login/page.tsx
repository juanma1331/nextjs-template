import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Login | NextJS Template",
  description: "Secure access to your personalized dashboard",
};

export default function LoginPage() {
  return (
    <div>
      <Logo />
      <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
        Welcome Back to Your Dashboard
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Unlock the power of your account with a simple login. Your personalized
        experience awaits!
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Secure. Seamless. Tailored just for you.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
