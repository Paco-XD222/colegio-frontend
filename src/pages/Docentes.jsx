import { useEffect, useState } from 'react'
import { listResource } from '../services/api.js'
import { asArray, initials, pick } from '../utils/data.js'

function TeacherPhoto({ docente, nombre }) {
  const [hasError, setHasError] = useState(false)
  const fotoUrl = pick(docente, ['fotoUrl', 'fotoURL', 'imagenUrl', 'imagen'])

  if (!fotoUrl || hasError) {
    return (
      <div className="avatar profile-photo-fallback" aria-hidden="true">
        {initials(nombre)}
      </div>
    )
  }

  return (
    <img
      className="profile-photo"
      src={fotoUrl}
      alt={nombre}
      onError={() => setHasError(true)}
    />
  )
}

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
        const materia = pick(docente, ['materia', 'area'])
        const especialidad = pick(docente, ['especialidad'])
        const correo = pick(docente, ['correo', 'email'])
        const telefono = pick(docente, ['telefono'])
        return (
          <article className="profile-card" key={docente.id ?? index}>
            <TeacherPhoto docente={docente} nombre={nombre} />
            <h2>{nombre}</h2>
            <div className="profile-details">
              <p>
                <strong>Materia:</strong> {materia || 'No especificada'}
              </p>
              <p>
                <strong>Especialidad:</strong> {especialidad || 'No especificada'}
              </p>
              <p>
                <strong>Correo:</strong> {correo || 'No registrado'}
              </p>
              <p>
                <strong>Telefono:</strong> {telefono || 'No registrado'}
              </p>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Docentes
