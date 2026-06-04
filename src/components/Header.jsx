// Header.jsx
// Muestra el título de la app y la fecha actual en español.

function Header() {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  const now = new Date()
  const dateText = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`

  return (
    <header className="header">
      <h1 className="title">
        Tiny<span className="title-accent">Wins</span>
      </h1>
      <p className="date">{dateText}</p>
    </header>
  )
}

export default Header