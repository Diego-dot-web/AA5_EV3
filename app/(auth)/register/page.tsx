"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Esquema de validación con Zod
const registroSchema = z
  .object({
    nombre: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
    email: z.string().email({
      message: "Ingresa un correo electrónico válido",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message:
          "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número",
      }),
    confirmPassword: z.string(),
    terminos: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function RegistroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong" | null
  >(null);

  // Inicializar formulario con React Hook Form y Zod
  const form = useForm<z.infer<typeof registroSchema>>({
    resolver: zodResolver(registroSchema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      terminos: false,
    },
  });

  // Evaluar la fuerza de la contraseña
  const evaluatePasswordStrength = (password: string) => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength < 2) return "weak";
    if (strength < 4) return "medium";
    return "strong";
  };

  // Manejar cambios en el campo de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(evaluatePasswordStrength(password));
    form.setValue("password", password);
  };

  // Manejar envío del formulario
  const onSubmit = async (values: z.infer<typeof registroSchema>) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const error = await res.text();
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Únete a la aventura de productividad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="correo@ejemplo.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Crea una contraseña segura"
                          type={showPassword ? "text" : "password"}
                          onChange={handlePasswordChange}
                          {...fieldProps}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                    {passwordStrength && (
                      <div className="h-1 w-full rounded-full bg-muted overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength === "weak"
                              ? "w-1/3 bg-destructive"
                              : passwordStrength === "medium"
                              ? "w-2/3 bg-yellow-500"
                              : "w-full bg-green-500"
                          }`}
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Repite tu contraseña"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terminos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Acepto los{" "}
                        <Link href="#" className="text-primary hover:underline">
                          términos y condiciones
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
