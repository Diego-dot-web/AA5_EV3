import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy } from 'lucide-react'

const achievements = [
  { id: 1, name: "Madrugador", description: "Completa 5 tareas antes de las 9 AM", completed: true },
  { id: 2, name: "Maestro del Enfoque", description: "Usa el temporizador durante 2 horas seguidas", completed: false },
  { id: 3, name: "Campeón de Misiones", description: "Completa 50 misiones", completed: true },
  { id: 4, name: "Señor del Tiempo", description: "Acumula 24 horas de tiempo enfocado", completed: false },
  { id: 5, name: "Guardián de la Racha", description: "Mantén una racha de 7 días", completed: true },
]

export default function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logros</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] sm:h-[300px]">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <Trophy className={`h-6 w-6 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge variant={achievement.completed ? "default" : "outline"} className="mt-2 sm:mt-0 sm:ml-auto">
                {achievement.completed ? "Completado" : "En Progreso"}
              </Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

