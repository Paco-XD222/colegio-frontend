import { useState } from 'react'
import { sendContact } from '../services/api.js'

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
}

function Contacto() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await sendContact(form)
      setStatus('Mensaje enviado correctamente.')
      setForm(initialForm)
    } catch {
      setStatus('No se pudo enviar el mensaje. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section contact-layout">
      <div>
        <h2>Informacion de contacto</h2>
        <p>
          Envia consultas, solicitudes o mensajes para la administracion del
          Colegio Carlos Medinaceli.
        </p>
        <div className="contact-panel">
          <p>
            <strong>Direccion:</strong> Calle San Alberto y Av. Aniceto Arce N. 453, Potosi
          </p>
          <p>
            <strong>Atencion:</strong> Lunes a viernes
          </p>
          <p>
            <strong>Email:</strong> contacto@carlosmedinaceli.edu.bo
          </p>
        </div>
      </div>
      <form className="glass-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Telefono
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </label>
        <label>
          Mensaje
          <textarea name="mensaje" rows="5" value={form.mensaje} onChange={handleChange} required />
        </label>
        <button className="button primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status && <p className="state-message">{status}</p>}
      </form>
    </section>
  )
}

export default Contacto
