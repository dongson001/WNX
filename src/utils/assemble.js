export function assemble(query, keys) {
  return keys.map(key => {
    return `${key}=${encodeURIComponent(query[key])}&`
  }).join('').slice(0, -1)
}
