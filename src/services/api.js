export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(errorText || `Error ${response.status}`)
  }

  if (response.status === 204) return null

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export function listResource(resource) {
  return request(`/api/${resource}`)
}

export function createResource(resource, data) {
  return request(`/api/${resource}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateResource(resource, id, data) {
  return request(`/api/${resource}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteResource(resource, id) {
  return request(`/api/${resource}/${id}`, {
    method: 'DELETE',
  })
}

export function loginUser(credentials) {
  return request('/api/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({
      ...credentials,
      usuario: credentials.username,
      nombreUsuario: credentials.username,
    }),
  })
}

export function sendContact(data) {
  return request('/api/contactos', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      correo: data.email,
    }),
  })
}
