import { useEffect, useState } from 'react'
import { listResource } from '../services/api.js'
import { asArray, initials, pick } from '../utils/data.js'

function Docentes() {
  const [docentes, setDocentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listResource('docentes')
      .then((data) => setDocentes(asArray(data)))
      .catch(() => setError('No se pudieron cargar los docentes.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section card-grid">
      {loading && <p className="state-message">Cargando docentes...</p>}
      {error && <p className="state-message error">{error}</p>}
      {!loading && !error && docentes.length === 0 && (
        <p className="state-message">No hay docentes registrados.</p>
      )}
      {docentes.map((docente, index) => {
        const nombre = pick(docente, ['nombre', 'nombres', 'nombreCompleto'], 'Docente')
        return (
          <article className="profile-card" key={docente.id ?? index}>
            <div className="avatar" aria-hidden="true">
              {initials(nombre)}
            </div>
            <h2>{nombre}</h2>
            <p>{pick(docente, ['materia', 'especialidad', 'area'], 'Area no especificada')}</p>
            {pick(docente, ['telefono', 'email', 'correo']) && (
              <small>{pick(docente, ['telefono', 'email', 'correo'])}</small>
            )}
          </article>
        )
      })}
    </section>
  )
}

export default Docentes
