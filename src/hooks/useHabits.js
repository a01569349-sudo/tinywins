// useHabits.js
// Custom hook que maneja toda la lógica de los hábitos:
// estado, persistencia, agregar, marcar, eliminar, y reseteo diario.

import { useState, useEffect } from 'react'
import { loadData, saveData } from '../utils/storage'

// Hábitos por defecto si el usuario no tiene nada guardado
const DEFAULT_HABITS = [
  { id: 1, name: 'Tomar 8 vasos de agua', emoji: '💧', streak: 0 },
  { id: 2, name: 'Ir al gym', emoji: '🏋️', streak: 0 },
  { id: 3, name: 'Leer 20 minutos', emoji: '📚', streak: 0 },
  { id: 4, name: 'Dormir antes de medianoche', emoji: '🌙', streak: 0 },
  { id: 5, name: 'Cocinar en casa', emoji: '🍳', streak: 0 },
]

const EMOJIS = ['💧','🏋️','📚','🌙','🍳','🧘','🚶','✍️','🎯','🌿','🎵','🍎']

// Devuelve la fecha de hoy en formato YYYY-MM-DD
function getToday() {
  return new Date().toISOString().split('T')[0]
}

export function useHabits() {
  // Estado inicial: lee de localStorage o usa los defaults
  const [data, setData] = useState(() => {
    const saved = loadData()
    if (saved) return saved
    return {
      habits: DEFAULT_HABITS,
      completedToday: {},
      lastDate: getToday(),
      totalWins: 0,
      maxStreak: 0,
      nextId: 6,
    }
  })

  // Guarda automáticamente en localStorage cuando data cambie
  useEffect(() => {
    saveData(data)
  }, [data])

  // Si cambió el día, resetea las completaciones y actualiza rachas
  useEffect(() => {
    const today = getToday()
    if (data.lastDate !== today) {
      setData(prev => {
        const updatedHabits = prev.habits.map(h => ({
          ...h,
          streak: prev.completedToday[h.id] ? h.streak + 1 : 0,
        }))
        const newMaxStreak = Math.max(
          prev.maxStreak,
          ...updatedHabits.map(h => h.streak)
        )
        return {
          ...prev,
          habits: updatedHabits,
          completedToday: {},
          lastDate: today,
          maxStreak: newMaxStreak,
        }
      })
    }
  }, [])

  function toggleHabit(id) {
    setData(prev => {
      const wasDone = !!prev.completedToday[id]
      return {
        ...prev,
        completedToday: { ...prev.completedToday, [id]: !wasDone },
        totalWins: wasDone ? Math.max(0, prev.totalWins - 1) : prev.totalWins + 1,
      }
    })
  }

  function addHabit(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    setData(prev => ({
      ...prev,
      habits: [
        ...prev.habits,
        { id: prev.nextId, name: trimmed, emoji, streak: 0 },
      ],
      nextId: prev.nextId + 1,
    }))
  }

  function deleteHabit(id) {
    setData(prev => {
      const newCompleted = { ...prev.completedToday }
      delete newCompleted[id]
      return {
        ...prev,
        habits: prev.habits.filter(h => h.id !== id),
        completedToday: newCompleted,
      }
    })
  }

  // Valores calculados que los componentes van a usar
  const doneCount = data.habits.filter(h => data.completedToday[h.id]).length
  const totalCount = data.habits.length
  const progressPct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return {
    habits: data.habits,
    completedToday: data.completedToday,
    totalWins: data.totalWins,
    maxStreak: data.maxStreak,
    doneCount,
    totalCount,
    progressPct,
    toggleHabit,
    addHabit,
    deleteHabit,
  }
}