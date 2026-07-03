function Header({ onNavigate }) {
  return (
    <header className="site-header">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-photo">
          <div className="hero-badge">CM</div>
        </div>
      </div>
      <div className="hero-content">
        <p className="eyebrow">Unidad Educativa Carlos Medinaceli</p>
        <h1>Comunidad educativa con informacion clara y gestion moderna</h1>
        <p className="hero-copy">
          Portal institucional para compartir noticias, docentes, promociones y
          canales de contacto con estudiantes, familias y administradores.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href="/noticias"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/noticias')
            }}
          >
            Ver noticias
          </a>
          <a
            className="button secondary"
            href="/admin"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/admin')
            }}
          >
            Panel admin
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
