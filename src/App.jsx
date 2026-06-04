// App.jsx
// Componente raíz. Conecta el hook useHabits con todos los componentes visuales.

import { useHabits } from './hooks/useHabits'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import HabitList from './components/HabitList'
import AddHabitForm from './components/AddHabitForm'

function App() {
  const {
    habits,
    completedToday,
    totalWins,
    maxStreak,
    doneCount,
    totalCount,
    progressPct,
    toggleHabit,
    addHabit,
    deleteHabit,
  } = useHabits()

  return (
    <div className="app">
      <Header />

      <ProgressBar
        doneCount={doneCount}
        totalCount={totalCount}
        progressPct={progressPct}
      />

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{doneCount}</div>
          <div className="stat-label">hoy</div>
        </div>
        <div className="stat">
          <div className="stat-num">{maxStreak}</div>
          <div className="stat-label">racha máx.</div>
        </div>
        <div className="stat">
          <div className="stat-num">{totalWins}</div>
          <div className="stat-label">victorias totales</div>
        </div>
      </div>

      <p className="section-label">Hábitos de hoy</p>

      <HabitList
        habits={habits}
        completedToday={completedToday}
        onToggle={toggleHabit}
        onDelete={deleteHabit}
      />

      <AddHabitForm onAdd={addHabit} />
    </div>
  )
}

export default App