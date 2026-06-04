// HabitList.jsx
// Renderiza la lista de hábitos del día. Si no hay ninguno,
// muestra un mensaje vacío para guiar al usuario.

import HabitItem from './HabitItem'

function HabitList({ habits, completedToday, onToggle, onDelete }) {
  if (habits.length === 0) {
    return (
      <p className="empty-state">
        Aún no tienes hábitos. ¡Agrega uno abajo!
      </p>
    )
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isDone={!!completedToday[habit.id]}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default HabitList