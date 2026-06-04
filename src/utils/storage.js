// storage.js
// Capa de persistencia. Aísla el acceso a localStorage del resto de la app.
// Si mañana cambiamos a una API o base de datos, solo modificamos este archivo.

const STORAGE_KEY = 'tinywins_v1'

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error leyendo localStorage:', error)
    return null
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error guardando en localStorage:', error)
  }
}

export function clearData() {
  localStorage.removeItem(STORAGE_KEY)
}