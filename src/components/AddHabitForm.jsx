// AddHabitForm.jsx
// Formulario para agregar un nuevo hábito. Maneja su propio estado
// del input y llama a onAdd cuando el usuario confirma.

import { useState } from 'react'

function AddHabitForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nuevo hábito (ej. Leer 20 min)"
        maxLength={60}
      />
      <button className="add-btn" type="submit">
        Agregar
      </button>
    </form>
  )
}

export default AddHabitForm