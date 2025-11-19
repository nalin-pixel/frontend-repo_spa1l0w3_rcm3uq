const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const api = {
  base: API_BASE,
  async login(email, password) {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Inloggning misslyckades')
    return res.json()
  },
  async getCompanies() {
    const res = await fetch(`${API_BASE}/api/companies`)
    if (!res.ok) throw new Error('Kunde inte hämta företag')
    return res.json()
  },
  async createCompany(payload) {
    const res = await fetch(`${API_BASE}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Kunde inte skapa företag')
    return res.json()
  },
  async getCompany(id) {
    const res = await fetch(`${API_BASE}/api/companies/${id}`)
    if (!res.ok) throw new Error('Kunde inte hämta företaget')
    return res.json()
  },
  async updateCompany(id, payload) {
    const res = await fetch(`${API_BASE}/api/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Kunde inte uppdatera företaget')
    return res.json()
  },
  async deleteCompany(id) {
    const res = await fetch(`${API_BASE}/api/companies/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Kunde inte radera företaget')
    return res.json()
  }
}
