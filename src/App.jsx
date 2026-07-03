import { useEffect, useMemo, useState } from 'react'
import Layout from './components/Layout.jsx'
import Admin from './pages/Admin.jsx'
import Contacto from './pages/Contacto.jsx'
import Docentes from './pages/Docentes.jsx'
import Home from './pages/Home.jsx'
import Noticias from './pages/Noticias.jsx'
import Promociones from './pages/Promociones.jsx'
import './App.css'

const routes = {
  '/': {
    title: 'Inicio',
    element: <Home />,
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
  '/admin': {
    title: 'Administracion',
    element: <Admin />,
  },
}

function getCurrentPath() {
  const path = window.location.pathname
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
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Layout
      currentPath={currentPath}
      currentTitle={currentRoute.title}
      onNavigate={handleNavigate}
    >
      {currentRoute.element}
    </Layout>
  )
}

export default App
