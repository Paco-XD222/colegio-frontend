const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/noticias', label: 'Noticias' },
  { path: '/docentes', label: 'Docentes' },
  { path: '/promociones', label: 'Promociones' },
  { path: '/contacto', label: 'Contacto' },
  { path: '/admin', label: 'Admin' },
]

function Navbar({ currentPath, onNavigate }) {
  return (
    <nav className="navbar" aria-label="Navegacion principal">
      <a
        className="brand"
        href="/"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/')
        }}
      >
        <span className="brand-mark">CM</span>
        <span>
          <strong>Carlos Medinaceli</strong>
          <small>Colegio</small>
        </span>
      </a>

      <div className="nav-links">
        {navItems.map((item) => (
          <a
            aria-current={currentPath === item.path ? 'page' : undefined}
            className={currentPath === item.path ? 'active' : undefined}
            href={item.path}
            key={item.path}
            onClick={(event) => {
              event.preventDefault()
              onNavigate(item.path)
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
