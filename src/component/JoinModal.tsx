import { useState, useEffect } from 'preact/hooks'
import type { Plan } from './PlanSelector'

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: Plan | null
  onBack: () => void
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)

export default function JoinModal({ isOpen, onClose, selectedPlan, onBack }: JoinModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  // Form state
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [edad, setEdad] = useState('')
  const [cedula, setCedula] = useState('')

  // Calculate age from birthdate
  useEffect(() => {
    if (!fechaNacimiento) {
      setEdad('')
      return
    }
    const birth = new Date(fechaNacimiento)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    setEdad(age > 0 ? `${age} años` : '')
  }, [fechaNacimiento])

  // Open / close animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      const timer = setTimeout(() => {
        setMounted(false)
        resetForm()
      }, 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const resetForm = () => {
    setNombre('')
    setApellido('')
    setEmail('')
    setTelefono('')
    setFechaNacimiento('')
    setEdad('')
    setCedula('')
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    // Build WhatsApp message with lead info
    const message = [
      `🏋️ *Nuevo Miembro — Elite Gym*`,
      ``,
      `👤 *Nombre:* ${nombre} ${apellido}`,
      `📧 *Email:* ${email}`,
      `📞 *Teléfono:* ${telefono}`,
      `🎂 *Fecha de nacimiento:* ${fechaNacimiento}`,
      `📅 *Edad:* ${edad}`,
      `🪪 *Cédula:* ${cedula}`,
      `⭐ *Plan:* ${selectedPlan?.name ?? '—'} (${selectedPlan ? formatPrice(selectedPlan.price) : '—'}${selectedPlan?.period ?? ''})`,
      ``,
      `_Registro enviado desde el sitio web de Elite Gym._`,
    ].join('\n')

    // Send via WhatsApp API silently (open in background)
    window.open(
      `https://wa.me/573116248414?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    onClose()
  }

  if (!mounted) return null

  const inputClass =
    'w-full bg-bg-gray text-text-light text-sm px-4 py-3 rounded-lg border border-border focus:border-primary outline-none transition placeholder:text-text-gray-light/40'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-xl bg-bg-darker border border-border rounded-2xl shadow-heavy overflow-hidden transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Selected plan banner */}
        {selectedPlan && (
          <div className="bg-gradient-to-r from-primary/15 to-primary/5 border-b border-primary/20 px-7 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary text-xs font-bold uppercase tracking-wider">{selectedPlan.name}</p>
              <p className="text-text-gray-light text-[11px]">{formatPrice(selectedPlan.price)}{selectedPlan.period}</p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-primary/70 hover:text-primary text-[11px] font-medium underline underline-offset-2 transition-colors"
            >
              Cambiar plan
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 px-7 pt-6 pb-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-bg-gray/50 hover:bg-bg-gray flex items-center justify-center text-text-gray-light hover:text-text-light transition-colors shrink-0"
            aria-label="Volver"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Icon */}
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-text-light font-bold text-lg">Registro de Miembro</h2>
            <p className="text-text-gray-light text-sm mt-0.5">Completa tus datos para finalizar</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-bg-gray/50 hover:bg-red-500/20 flex items-center justify-center text-text-gray-light hover:text-red-400 transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-7" />

        {/* Form */}
        <form className="px-7 py-6 space-y-5" onSubmit={handleSubmit}>

          {/* Row 1: Nombre + Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onInput={(e) => setNombre((e.target as HTMLInputElement).value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Apellido</label>
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onInput={(e) => setApellido((e.target as HTMLInputElement).value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Row 2: Email + Teléfono */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Email</label>
              <input
                type="email"
                placeholder="correo@dominio.com"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Teléfono</label>
              <input
                type="tel"
                placeholder="+57 300 000 0000"
                value={telefono}
                onInput={(e) => setTelefono((e.target as HTMLInputElement).value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Row 3: Fecha de nacimiento + Edad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Fecha de nacimiento</label>
              <input
                type="date"
                value={fechaNacimiento}
                onInput={(e) => setFechaNacimiento((e.target as HTMLInputElement).value)}
                className={`${inputClass} [color-scheme:dark]`}
                required
              />
            </div>
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Edad</label>
              <input
                type="text"
                placeholder="Calculada automáticamente"
                value={edad}
                readOnly
                className={`${inputClass} opacity-60 cursor-not-allowed`}
              />
            </div>
          </div>

          {/* Row 4: Cédula */}
          <div>
            <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Cédula</label>
            <input
              type="text"
              placeholder="1234567890"
              value={cedula}
              onInput={(e) => setCedula((e.target as HTMLInputElement).value)}
              className={inputClass}
              required
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-bg-gray hover:bg-bg-gray/70 text-text-gray-light font-medium text-sm py-3.5 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-bg-dark font-bold text-sm py-3.5 rounded-lg transition-colors uppercase tracking-wider"
            >
              Registrar Miembro
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
