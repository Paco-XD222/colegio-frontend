import { useEffect, useMemo, useState } from 'react'
import Layout from './components/Layout.jsx'
import Admin from './pages/Admin.jsx'
import Contacto from './pages/Contacto.jsx'
import Docentes from './pages/Docentes.jsx'
import Historia from './pages/Historia.jsx'
import Home from './pages/Home.jsx'
import Noticias from './pages/Noticias.jsx'
import Promociones from './pages/Promociones.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import './App.css'

const routes = {
  '/': {
    title: 'Inicio',
    element: <Home />,
  },
  '/historia': {
    title: 'Historia',
    element: <Historia />,
  },
  '/noticias': {
    title: 'Noticias',
    element: <Noticias />,
  },
  '/docentes': {
    title: 'Docentes',
    element: <Docentes />,
  },
  '/promociones': {
    title: 'Promociones',
    element: <Promociones />,
  },
  '/contacto': {
    title: 'Contacto',
    element: <Contacto />,
  },
  '/ubicacion': {
    title: 'Ubicacion',
    element: <Ubicacion />,
  },
  '/admin': {
    title: 'Administracion',
    element: <Admin />,
  },
}

const basePath =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')

function stripBasePath(pathname) {
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/'
  }

  return pathname
}

function getCurrentPath() {
  const path = stripBasePath(window.location.pathname)
  return routes[path] ? path : '/'
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const currentRoute = useMemo(() => routes[currentPath], [currentPath])

  const handleNavigate = (path) => {
    if (!routes[path] || path === currentPath) return
    window.history.pushState({}, '', `${basePath}${path}`)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getHref = (path) => `${basePath}${path}`

  return (
    <Layout
      currentPath={currentPath}
      currentTitle={currentRoute.title}
      getHref={getHref}
      onNavigate={handleNavigate}
    >
      {currentRoute.element}
    </Layout>
  )
}

export default App
