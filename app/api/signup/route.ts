import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { nombre, email, password } = body
    
    const existingUser = await prisma.usuarios.findUnique({
        where: {
            email: email
        }
    })
    
    if (existingUser) {
        return NextResponse.json({ error: "El email ya existe" }, { status: 400 })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.usuarios.create({
        data: {nombre, email, id_usuario: email,  contrase_a: hashedPassword}
    })

    return NextResponse.redirect("http://localhost:3000/")
}