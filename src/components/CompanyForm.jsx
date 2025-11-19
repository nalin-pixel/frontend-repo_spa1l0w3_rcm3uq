import { useState } from 'react'

export default function CompanyForm({ onSave, onCancel }) {
  const [company_name, setCompanyName] = useState('')
  const [orgnr, setOrgNr] = useState('')
  const [status, setStatus] = useState('Aktiv')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ company_name, orgnr, status, contacts: [], sales: [] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-blue-100 mb-1">Företagsnamn</label>
        <input value={company_name} onChange={(e)=>setCompanyName(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" required />
      </div>
      <div>
        <label className="block text-sm text-blue-100 mb-1">Organisationsnummer</label>
        <input value={orgnr} onChange={(e)=>setOrgNr(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" required />
      </div>
      <div>
        <label className="block text-sm text-blue-100 mb-1">Status</label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10">
          <option>Aktiv</option>
          <option>Pågående</option>
          <option>Vilande</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">Spara</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500 text-white">Avbryt</button>
      </div>
    </form>
  )
}
