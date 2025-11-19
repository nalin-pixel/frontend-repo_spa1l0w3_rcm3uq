import { useEffect, useState } from 'react'
import { api } from '../utils/api'

function ContactRow({ idx, value, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-5 gap-2 items-end">
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Förnamn" value={value.first_name} onChange={(e)=>onChange(idx,{...value, first_name:e.target.value})} />
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Efternamn" value={value.last_name} onChange={(e)=>onChange(idx,{...value, last_name:e.target.value})} />
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Telefon" value={value.phone} onChange={(e)=>onChange(idx,{...value, phone:e.target.value})} />
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="E-post" value={value.email} onChange={(e)=>onChange(idx,{...value, email:e.target.value})} />
      <button onClick={()=>onRemove(idx)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white">Ta bort</button>
    </div>
  )
}

function SaleRow({ idx, value, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-6 gap-2 items-end">
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Telefonnummer" value={value.phone_number} onChange={(e)=>onChange(idx,{...value, phone_number:e.target.value})} />
      <input className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Abonnemangsform" value={value.plan} onChange={(e)=>onChange(idx,{...value, plan:e.target.value})} />
      <input type="number" className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Pris" value={value.price} onChange={(e)=>onChange(idx,{...value, price: parseFloat(e.target.value||0)})} />
      <input type="number" className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" placeholder="Bindning (mån)" value={value.contract_term_months} onChange={(e)=>onChange(idx,{...value, contract_term_months: parseInt(e.target.value||0)})} />
      <input type="date" className="px-2 py-1 rounded bg-slate-800 text-white border border-white/10" value={value.renegotiation_date} onChange={(e)=>onChange(idx,{...value, renegotiation_date:e.target.value})} />
      <button onClick={()=>onRemove(idx)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white">Ta bort</button>
    </div>
  )
}

export default function CompanyDetail({ company, onBack, onSaved }) {
  const [form, setForm] = useState({ ...company, contacts: [], sales: [], id: company.id })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await api.getCompany(company.id)
        setForm({ ...data, id: data.id })
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [company.id])

  const updateContact = (idx, val) => {
    const copy = [...(form.contacts||[])]
    copy[idx] = val
    setForm({ ...form, contacts: copy })
  }
  const removeContact = (idx) => {
    const copy = [...(form.contacts||[])]
    copy.splice(idx,1)
    setForm({ ...form, contacts: copy })
  }
  const addContact = () => setForm({ ...form, contacts: [...(form.contacts||[]), { first_name:'', last_name:'', phone:'', email:'' }] })

  const updateSale = (idx, val) => {
    const copy = [...(form.sales||[])]
    copy[idx] = val
    setForm({ ...form, sales: copy })
  }
  const removeSale = (idx) => {
    const copy = [...(form.sales||[])]
    copy.splice(idx,1)
    setForm({ ...form, sales: copy })
  }
  const addSale = () => setForm({ ...form, sales: [...(form.sales||[]), { phone_number:'', plan:'', price:0, contract_term_months:0, renegotiation_date:'' }] })

  const save = async () => {
    try {
      setLoading(true)
      const payload = { company_name: form.company_name, orgnr: form.orgnr, status: form.status, contacts: form.contacts, sales: form.sales }
      const saved = await api.updateCompany(form.id, payload)
      onSaved?.(saved)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="text-blue-200">Laddar...</p>
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{form.company_name}</h2>
          <p className="text-blue-200/80">{form.orgnr} • {form.status}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onBack} className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white">Tillbaka</button>
          <button onClick={save} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white">Spara</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Kontaktpersoner</h3>
          <div className="space-y-3">
            {(form.contacts||[]).map((c, idx) => (
              <ContactRow key={idx} idx={idx} value={c} onChange={updateContact} onRemove={removeContact} />
            ))}
            <button onClick={addContact} className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white">Lägg till kontakt</button>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Försäljning</h3>
          <div className="space-y-3">
            {(form.sales||[]).map((s, idx) => (
              <SaleRow key={idx} idx={idx} value={s} onChange={updateSale} onRemove={removeSale} />
            ))}
            <button onClick={addSale} className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white">Lägg till abonnemang</button>
          </div>
        </div>
      </div>
    </div>
  )
}
