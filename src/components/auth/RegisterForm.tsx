"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { registerAction } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    setIsLoading(true);
    setFormError(null);

    try {
      const [result, error] = await registerAction(values);

      if (error) {
        setFormError("Ocurrió un error al procesar tu solicitud.");
        console.error("Error during registration:", error);
      } else if (result?.error) {
        switch (result.error) {
          case "USERNAME_TAKEN":
            setFormError("El nombre de usuario ya está en uso.");
            break;
          case "EMAIL_TAKEN":
            setFormError("El correo electrónico ya está registrado.");
            break;
          default:
            setFormError("Ocurrió un error inesperado durante el registro.");
        }
      } else if (result?.success) {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada correctamente.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setFormError("Ocurrió un error al procesar tu solicitud.");
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="johndoe"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </FormControl>
              <FormMessage className="mt-2 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </FormControl>
              <FormMessage className="mt-2 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Contraseña
              </FormLabel>
              <FormControl>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <EyeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="mt-2 text-sm text-red-600" />
            </FormItem>
          )}
        />

        {formError && (
          <div className="text-red-500 text-sm mt-2">{formError}</div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </Form>
  );
}
