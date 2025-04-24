"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const recuperarSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
});

export default function RecuperarPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof recuperarSchema>>({
    resolver: zodResolver(recuperarSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof recuperarSchema>) => {
    console.log(values);

    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Recuperar Contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico para recibir instrucciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <p>
                Hemos enviado un correo electrónico con instrucciones para
                recuperar tu contraseña. Por favor, revisa tu bandeja de
                entrada.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/login")}
              >
                Volver al inicio de sesión
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <Button type="submit" className="w-full">
                  Enviar instrucciones
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
