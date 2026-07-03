import Footer from './Footer.jsx'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'

function Layout({ children, currentPath, currentTitle, getHref, onNavigate }) {
  const isHome = currentPath === '/'

  return (
    <div className="app-shell">
      <Navbar currentPath={currentPath} getHref={getHref} onNavigate={onNavigate} />
      <div className="content-shell">
        {isHome ? (
          <Header getHref={getHref} onNavigate={onNavigate} />
        ) : (
          <section className="page-hero">
            <p className="eyebrow">Colegio Carlos Medinaceli</p>
            <h1>{currentTitle}</h1>
          </section>
        )}
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
