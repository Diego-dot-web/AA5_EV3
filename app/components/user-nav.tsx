"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Crown, LogIn, LogOut, Settings, User } from "lucide-react";
import { ResponsiveText } from "./responsive-text";
import Link from "next/link";

const nombre = localStorage.getItem("nombre");

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@usuario" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">usuario</p>
            <ResponsiveText
              baseSize="text-xs"
              mdSize="text-sm"
              className="leading-none text-muted-foreground"
            >
              Nivel 5 Maestro de Productividad
            </ResponsiveText>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{nombre ? nombre : "Perfil"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Crown className="mr-2 h-4 w-4" />
            <span>Actualizar a Pro</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Link href={"/login"}>
            <span>Iniciar sesión</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogIn className="mr-2 h-4 w-4" />
          <Link href={"/register"}>
            <span>Registrarse</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
