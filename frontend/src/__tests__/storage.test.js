// frontend/src/__tests__/storage.test.js
import { saveToken, getToken, clearToken, saveUser, getUser, clearUser } from '../utils/storage'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('saveToken/getToken/clearToken', () => {
    expect(getToken()).toBeNull()
    saveToken('abc123')
    expect(getToken()).toBe('abc123')
    clearToken()
    expect(getToken()).toBeNull()
  })

  test('saveUser/getUser/clearUser', () => {
    expect(getUser()).toBeNull()
    const user = { name: 'Test', email: 't@example.com' }
    saveUser(user)
    expect(getUser()).toEqual(user)
    clearUser()
    expect(getUser()).toBeNull()
  })
})
