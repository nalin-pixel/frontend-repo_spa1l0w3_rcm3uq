import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function CompanyList({ onSelect, onCreate }) {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const data = await api.getCompanies()
      setCompanies(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Kunder</h2>
        <button onClick={onCreate} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Ny kund</button>
      </div>

      {loading && <p className="text-blue-200">Laddar...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <ul className="divide-y divide-white/10">
        {companies.map((c) => (
          <li key={c.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{c.company_name}</p>
              <p className="text-blue-200/80 text-sm">{c.orgnr} • {c.status}</p>
            </div>
            <button onClick={() => onSelect(c)} className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Öppna</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
