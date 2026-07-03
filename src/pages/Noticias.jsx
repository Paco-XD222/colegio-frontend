import { useEffect, useState } from 'react'
import { listResource } from '../services/api.js'
import { asArray, pick } from '../utils/data.js'

function Noticias() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listResource('noticias')
      .then((data) => setNoticias(asArray(data)))
      .catch(() => setError('No se pudieron cargar las noticias.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section content-list">
      {loading && <p className="state-message">Cargando noticias...</p>}
      {error && <p className="state-message error">{error}</p>}
      {!loading && !error && noticias.length === 0 && (
        <p className="state-message">No hay noticias registradas.</p>
      )}
      {noticias.map((item, index) => (
        <article className="content-item" key={item.id ?? index}>
          <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{pick(item, ['titulo', 'nombre'], 'Noticia institucional')}</h2>
            <p>{pick(item, ['contenido', 'descripcion', 'detalle'], 'Sin descripcion.')}</p>
            {pick(item, ['fecha', 'fechaPublicacion']) && (
              <small>{pick(item, ['fecha', 'fechaPublicacion'])}</small>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}

export default Noticias
