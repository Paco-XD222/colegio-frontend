import { useEffect, useState } from 'react'
import { listResource } from '../services/api.js'
import { asArray, pick } from '../utils/data.js'

function PromotionImage({ promotion }) {
  const [hasError, setHasError] = useState(false)
  const imagenUrl = promotion?.imagenUrl
  const nombre = pick(promotion, ['nombre', 'titulo'], 'Promocion')

  if (!imagenUrl || hasError) {
    return (
      <div className="promotion-placeholder" aria-label="Imagen no disponible">
        <span>Sin imagen</span>
      </div>
    )
  }

  return <img src={imagenUrl} alt={nombre} onError={() => setHasError(true)} />
}

function Promociones() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listResource('promociones')
      .then((data) => setPromociones(asArray(data)))
      .catch((apiError) => setError(`No se pudieron cargar las promociones. ${apiError.message}`))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section timeline">
      {loading && <p className="state-message">Cargando promociones...</p>}
      {error && <p className="state-message error">{error}</p>}
      {!loading && !error && promociones.length === 0 && (
        <p className="state-message">No hay promociones registradas.</p>
      )}
      {promociones.map((promotion, index) => (
        <article className="timeline-item" key={promotion.id ?? index}>
          <span></span>
          <div className="promotion-image">
            <PromotionImage promotion={promotion} />
          </div>
          <div>
            <h2>{pick(promotion, ['nombre', 'titulo'], `Promocion ${pick(promotion, ['anio', 'gestion'], '')}`)}</h2>
            <p>{pick(promotion, ['descripcion', 'detalle'], 'Generacion del Colegio Carlos Medinaceli.')}</p>
            {pick(promotion, ['anio', 'gestion']) && <small>Gestion {pick(promotion, ['anio', 'gestion'])}</small>}
          </div>
        </article>
      ))}
    </section>
  )
}

export default Promociones
