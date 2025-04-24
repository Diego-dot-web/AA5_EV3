import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body

    const existingUser = await prisma.usuarios.findUnique({
        where: {
            email: email
        }
    })

    if (!existingUser) {
        return NextResponse.json({ error: "El usuario no existe" }, { status: 400 })
    }

    const isPasswordValid = await bcryptjs.compare(password, existingUser.contrase_a);

    if (!isPasswordValid) {
        return NextResponse.json({ error: "La contraseña es incorrecta" }, { status: 400 })
    }

    return NextResponse.json({user: existingUser}, { status: 200 })
}