// HabitItem.jsx
// Renderiza un hábito individual. Permite marcarlo como completado
// haciendo clic en cualquier parte, o eliminarlo con el botón de borrar.

function HabitItem({ habit, isDone, onToggle, onDelete }) {
  function handleDeleteClick(event) {
    event.stopPropagation()
    onDelete(habit.id)
  }

  return (
    <div
      className={`habit ${isDone ? 'habit-done' : ''}`}
      onClick={() => onToggle(habit.id)}
      role="button"
      tabIndex={0}
    >
      <div className="habit-check">
        {isDone && <span aria-hidden="true">✓</span>}
      </div>
      <span className="habit-emoji" aria-hidden="true">{habit.emoji}</span>
      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        <div className="habit-streak">
          {habit.streak > 0
            ? `🔥 ${habit.streak} días seguidos`
            : 'Sin racha aún'}
        </div>
      </div>
      <button
        className="habit-delete"
        onClick={handleDeleteClick}
        aria-label="Eliminar hábito"
      >
        ✕
      </button>
    </div>
  )
}

export default HabitItem