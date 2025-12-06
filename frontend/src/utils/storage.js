// frontend/src/utils/storage.js
// Simple token storage helpers: saveToken(), getToken(), clearToken()

const TOKEN_KEY = 'auditflow_token'
const USER_KEY = 'auditflow_user'

export function saveToken(token) {
  if (!token) return
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    console.error('saveToken error', e)
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (e) {
    console.error('getToken error', e)
    return null
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (e) {
    console.error('clearToken error', e)
  }
}

export function saveUser(user) {
  if (!user) return
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (e) {
    console.error('saveUser error', e)
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('getUser error', e)
    return null
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY)
  } catch (e) {
    console.error('clearUser error', e)
  }
}
