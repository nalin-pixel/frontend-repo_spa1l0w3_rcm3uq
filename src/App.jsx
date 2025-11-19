import { useState } from 'react'
import Login from './components/Login'
import CompanyList from './components/CompanyList'
import CompanyForm from './components/CompanyForm'
import CompanyDetail from './components/CompanyDetail'
import { api } from './utils/api'

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? { name: 'Användare', token } : null
  })
  const [view, setView] = useState('list') // list | new | detail
  const [selected, setSelected] = useState(null)

  if (!user) {
    return <Login onSuccess={(u)=> setUser(u)} />
  }

  const handleCreate = async (payload) => {
    const created = await api.createCompany(payload)
    setSelected(created)
    setView('detail')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Mitt CRM</h1>
          <div className="flex items-center gap-3">
            <p className="text-blue-200">Hej, {user.name}</p>
            <button onClick={()=>{localStorage.removeItem('token'); setUser(null)}} className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white">Logga ut</button>
          </div>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {view === 'list' && (
            <CompanyList
              onCreate={() => setView('new')}
              onSelect={(c)=>{ setSelected(c); setView('detail') }}
            />
          )}

          {view === 'new' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Ny kund</h2>
              <CompanyForm
                onSave={handleCreate}
                onCancel={() => setView('list')}
              />
            </div>
          )}

          {view === 'detail' && selected && (
            <CompanyDetail
              company={selected}
              onBack={()=> setView('list')}
              onSaved={(c)=>{ setSelected(c) }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
