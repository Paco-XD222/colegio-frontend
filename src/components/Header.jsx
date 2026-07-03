import tigreImg from '../assets/tigre.jpg'

function Header({ getHref, onNavigate }) {
  return (
    <header className="site-header">
      <div className="hero-content">
        <p className="eyebrow">Unidad Educativa Carlos Medinaceli</p>
        <h1>MEDINACELI</h1>
        <p className="hero-copy">
          Portal institucional moderno para noticias, docentes, promociones,
          contacto y administracion del Colegio Carlos Medinaceli.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href={getHref('/noticias')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/noticias')
            }}
          >
            Ver noticias
          </a>
          <a
            className="button secondary"
            href={getHref('/admin')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/admin')
            }}
          >
            Panel admin
          </a>
        </div>
      </div>
      <div className="hero-media">
        <img src={tigreImg} alt="Tigre institucional con fondo de fuego" />
      </div>
    </header>
  )
}

export default Header
