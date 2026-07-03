import { useEffect, useMemo, useState } from 'react'
import {
  createResource,
  deleteResource,
  listResource,
  loginUser,
  updateResource,
} from '../services/api.js'
import { asArray, getId, pick } from '../utils/data.js'

const resources = {
  noticias: {
    label: 'Noticias',
    fields: [
      { name: 'titulo', label: 'Titulo', required: true },
      { name: 'descripcion', label: 'Descripcion', type: 'textarea', required: true },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'imagenUrl', label: 'URL de imagen', type: 'url' },
    ],
  },
  docentes: {
    label: 'Docentes',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'materia', label: 'Materia' },
      { name: 'especialidad', label: 'Especialidad' },
      { name: 'correo', label: 'Correo', type: 'email' },
      { name: 'telefono', label: 'Telefono' },
      { name: 'fotoUrl', label: 'URL de foto', type: 'url' },
    ],
  },
  promociones: {
    label: 'Promociones',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'anio', label: 'Gestion', type: 'number' },
      { name: 'descripcion', label: 'Descripcion', type: 'textarea' },
      { name: 'imagenUrl', label: 'URL de imagen', type: 'url' },
    ],
  },
  contactos: {
    label: 'Contactos',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true },
      { name: 'correo', label: 'Correo', type: 'email', required: true },
      { name: 'asunto', label: 'Asunto', required: true },
      { name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true },
      { name: 'fecha', label: 'Fecha', type: 'date' },
    ],
  },
}

const emptyLogin = {
  username: '',
  password: '',
}

function buildEmptyForm(fields) {
  return fields.reduce((form, field) => ({ ...form, [field.name]: '' }), {})
}

function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState(emptyLogin)
  const [loginStatus, setLoginStatus] = useState('')
  const [activeResource, setActiveResource] = useState('noticias')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [editingId, setEditingId] = useState(null)
  const current = resources[activeResource]
  const formTemplate = useMemo(() => buildEmptyForm(current.fields), [current.fields])
  const [form, setForm] = useState(formTemplate)

  useEffect(() => {
    setForm(formTemplate)
    setEditingId(null)
  }, [formTemplate, activeResource])

  useEffect(() => {
    if (!authenticated) return
    loadItems(activeResource)
  }, [authenticated, activeResource])

  const loadItems = async (resource) => {
    setLoading(true)
    setStatus('')
    try {
      const data = await listResource(resource)
      setItems(asArray(data))
    } catch (apiError) {
      setStatus(
        `No se pudo cargar ${resources[resource].label.toLowerCase()}. ${apiError.message}`,
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoginStatus('')
    try {
      const response = await loginUser(loginForm)
      if (response === 'Login correcto' || response?.mensaje === 'Login correcto' || response) {
        setAuthenticated(true)
        setLoginStatus('')
        setLoginForm(emptyLogin)
      }
    } catch (apiError) {
      setLoginStatus(`Credenciales incorrectas o servidor no disponible. ${apiError.message}`)
    }
  }

  const handleFieldChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      if (editingId) {
        await updateResource(activeResource, editingId, form)
        setStatus('Registro actualizado.')
      } else {
        await createResource(activeResource, form)
        setStatus('Registro creado.')
      }
      setForm(formTemplate)
      setEditingId(null)
      await loadItems(activeResource)
    } catch (apiError) {
      setStatus(`No se pudo guardar el registro. ${apiError.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingId(getId(item))
    setForm(
      current.fields.reduce(
        (nextForm, field) => ({
          ...nextForm,
          [field.name]: item[field.name] ?? '',
        }),
        {},
      ),
    )
  }

  const handleDelete = async (item) => {
    const id = getId(item)
    if (!id) return
    setLoading(true)
    setStatus('')
    try {
      await deleteResource(activeResource, id)
      setStatus('Registro eliminado.')
      await loadItems(activeResource)
    } catch (apiError) {
      setStatus(`No se pudo eliminar el registro. ${apiError.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <section className="section admin-panel">
        <div>
          <p className="eyebrow">Panel administrativo</p>
          <h2>Ingreso de administrador</h2>
          <p>Inicia sesion para gestionar noticias, docentes, promociones y contactos.</p>
        </div>
        <form className="glass-form" onSubmit={handleLogin}>
          <label>
            Usuario
            <input
              name="username"
              value={loginForm.username}
              onChange={(event) =>
                setLoginForm((currentForm) => ({
                  ...currentForm,
                  username: event.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((currentForm) => ({
                  ...currentForm,
                  password: event.target.value,
                }))
              }
              required
            />
          </label>
          <button className="button primary" type="submit">
            Ingresar
          </button>
          {loginStatus && <p className="state-message error">{loginStatus}</p>}
        </form>
      </section>
    )
  }

  return (
    <section className="section admin-workspace">
      <div className="admin-toolbar">
        <div>
          <p className="eyebrow">Panel administrativo</p>
          <h2>Gestion de contenido</h2>
        </div>
        <button className="button secondary" type="button" onClick={() => setAuthenticated(false)}>
          Salir
        </button>
      </div>

      <div className="admin-tabs">
        {Object.entries(resources).map(([key, resource]) => (
          <button
            className={activeResource === key ? 'active' : ''}
            key={key}
            type="button"
            onClick={() => setActiveResource(key)}
          >
            {resource.label}
          </button>
        ))}
      </div>

      <form className="glass-form admin-form" onSubmit={handleSubmit}>
        {current.fields.map((field) => (
          <label key={field.name}>
            {field.label}
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                rows="4"
                value={form[field.name] ?? ''}
                onChange={handleFieldChange}
                required={field.required}
              />
            ) : (
              <input
                name={field.name}
                type={field.type ?? 'text'}
                value={form[field.name] ?? ''}
                onChange={handleFieldChange}
                required={field.required}
              />
            )}
          </label>
        ))}
        <div className="form-actions">
          <button className="button primary" type="submit" disabled={loading}>
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button
              className="button secondary"
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm(formTemplate)
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {status && <p className="state-message">{status}</p>}
      {loading && <p className="state-message">Cargando...</p>}

      <div className="admin-list">
        {items.map((item, index) => (
          <article className="admin-row" key={getId(item) ?? index}>
            <div>
              <h3>{pick(item, ['titulo', 'nombre', 'correo'], `Registro ${index + 1}`)}</h3>
              <p>
                {pick(
                  item,
                  ['descripcion', 'mensaje', 'asunto', 'materia', 'especialidad', 'telefono'],
                  'Sin detalle.',
                )}
              </p>
              {pick(item, ['fecha', 'anio', 'gestion']) && (
                <small>{pick(item, ['fecha', 'anio', 'gestion'])}</small>
              )}
            </div>
            <div className="row-actions">
              <button className="button secondary" type="button" onClick={() => handleEdit(item)}>
                Editar
              </button>
              <button className="button danger" type="button" onClick={() => handleDelete(item)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
        {!loading && items.length === 0 && (
          <p className="state-message">No hay registros para mostrar.</p>
        )}
      </div>
    </section>
  )
}

export default Admin
