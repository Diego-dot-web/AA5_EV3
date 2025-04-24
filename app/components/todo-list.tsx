"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Swords } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");

      // Save to database
      await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoItem),
      });
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          type="text"
          placeholder="Añadir nueva misión..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Añadir Misión</span>
          <span className="sm:hidden">Añadir</span>
        </Button>
      </div>
      <ScrollArea className="h-[200px] sm:h-[300px] rounded-md border p-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.text}
            </span>
            <Swords className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
