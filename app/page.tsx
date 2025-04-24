import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "./components/user-nav"
import { ModeToggle } from "./components/mode-toggle"
import Dashboard from "./components/dashboard"
import TodoList from "./components/todo-list"
import Timer from "./components/timer"
import Achievements from "./components/achievements"

export default function ProductivityApp() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Multitasking</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Panel</TabsTrigger>
            <TabsTrigger value="todos">Misiones</TabsTrigger>
            <TabsTrigger value="timer">Forja del Tiempo</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard"><Dashboard /></TabsContent>
          <TabsContent value="todos"><TodoList /></TabsContent>
          <TabsContent value="timer"><Timer /></TabsContent>
          <TabsContent value="achievements"><Achievements /></TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

