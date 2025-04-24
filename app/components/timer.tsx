"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayCircle, PauseCircle, RotateCcw } from 'lucide-react'

export default function Timer() {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [inputMinutes, setInputMinutes] = useState("25")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(parseInt(inputMinutes) * 60 || 25 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forja del Tiempo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="text-4xl sm:text-6xl font-bold text-center">{formatTime(time)}</div>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={toggleTimer}>
            {isActive ? (
              <PauseCircle className="mr-2 h-4 w-4" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {isActive ? "Pausar" : "Iniciar"}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Label htmlFor="minutes" className="w-full sm:w-auto">Establecer Minutos:</Label>
          <div className="flex w-full sm:w-auto space-x-2">
            <Input
              id="minutes"
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="w-full sm:w-20"
            />
            <Button onClick={resetTimer} variant="secondary" className="w-full sm:w-auto">
              Establecer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

