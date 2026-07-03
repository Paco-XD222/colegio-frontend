export function asArray(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.content)) return data.content
  if (Array.isArray(data?.data)) return data.data
  return []
}

export function getId(item) {
  return item?.id ?? item?.idNoticia ?? item?.idDocente ?? item?.idPromocion
}

export function pick(item, keys, fallback = '') {
  for (const key of keys) {
    if (item?.[key] !== undefined && item[key] !== null && item[key] !== '') {
      return item[key]
    }
  }
  return fallback
}

export function initials(value) {
  return String(value || 'CM')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
