// ProgressBar.jsx
// Barra de progreso visual que muestra qué porcentaje de hábitos
// del día están completados.

function ProgressBar({ doneCount, totalCount, progressPct }) {
  return (
    <div className="progress">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="progress-labels">
        <span>{doneCount} de {totalCount} completados</span>
        <span>{progressPct}%</span>
      </div>
    </div>
  )
}

export default ProgressBar