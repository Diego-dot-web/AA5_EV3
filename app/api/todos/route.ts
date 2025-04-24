import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"



export async function POST(request: Request) {
    const body = await request.json()
    const { id, text, completed } = body
    

  try {
    const newTodo = await prisma.tareas.create({
      data: {
        id_tarea: id.toString(),
        nombre_tarea: text,
        estado: completed ? "Completado" : "Pendiente",
        id_proyecto: "1234567", 
      },
    })
    return NextResponse.json(newTodo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
  }
}

export async function GET() {
    try {
      const todos = await prisma.tareas.findMany({
        select: {
          id_tarea: true,
          nombre_tarea: true,
          estado: true,
        },
      });
  
      return NextResponse.json(
        todos.map((todo) => ({
          id: todo.id_tarea,
          text: todo.nombre_tarea,
          completed: todo.estado === "Completado",
        }))
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}