const navItems = [
  { path: '/', label: 'Inicio', icon: 'IN' },
  { path: '/historia', label: 'Historia', icon: 'HI' },
  { path: '/noticias', label: 'Noticias', icon: 'NO' },
  { path: '/docentes', label: 'Docentes', icon: 'DO' },
  { path: '/promociones', label: 'Promociones', icon: 'PR' },
  { path: '/contacto', label: 'Contacto', icon: 'CO' },
  { path: '/ubicacion', label: 'Ubicacion', icon: 'UB' },
  { path: '/admin', label: 'Admin', icon: 'AD' },
]

function Navbar({ currentPath, onNavigate }) {
  return (
    <aside className="navbar" aria-label="Navegacion principal">
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
          <small>Menu institucional</small>
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
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}

export default Navbar
