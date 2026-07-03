import { useEffect, useState } from 'react'
import { listResource } from '../services/api.js'
import { asArray, pick } from '../utils/data.js'

function NewsImage({ noticia }) {
  const [hasError, setHasError] = useState(false)
  const titulo = pick(noticia, ['titulo', 'nombre'], 'Noticia institucional')
  const imagenUrl = noticia?.imagenUrl

  if (!imagenUrl || hasError) {
    return (
      <div className="news-placeholder" aria-label="Imagen no disponible">
        <span>Sin imagen</span>
      </div>
    )
  }

  return <img src={imagenUrl} alt={titulo} onError={() => setHasError(true)} />
}

function Noticias() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listResource('noticias')
      .then((data) => setNoticias(asArray(data)))
      .catch((apiError) => setError(`No se pudieron cargar las noticias. ${apiError.message}`))
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
          <div className="news-image">
            <NewsImage noticia={item} />
          </div>
          <div>
            <h2>{pick(item, ['titulo', 'nombre'], 'Noticia institucional')}</h2>
            <p>{pick(item, ['descripcion', 'contenido', 'detalle'], 'Sin descripcion.')}</p>
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
