import { useState, useEffect, useRef } from 'preact/hooks'
import type { Plan } from './PlanSelector'
import CustomSelect from './CustomSelect'
import { addUser } from '../backend/methods/user'
import type { AddUserRequest } from '../backend/methods/user'

type Step = 'datos' | 'pago'

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
  const [step, setStep] = useState<Step>('datos')
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [stepVisible, setStepVisible] = useState(true)

  const goToStep = (target: Step) => {
    setSlideDir(target === 'pago' ? 'left' : 'right')
    setStepVisible(false)
    setTimeout(() => {
      setStep(target)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setStepVisible(true))
      })
    }, 200)
  }

  // Form state
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [birthDia, setBirthDia] = useState('')
  const [birthMes, setBirthMes] = useState('')
  const [birthAnio, setBirthAnio] = useState('')
  const [edad, setEdad] = useState('')
  const [cedula, setCedula] = useState('')
  const [tipoCedula, setTipoCedula] = useState<'CC' | 'CE'>('CC')

  // Payment state
  const [comprobante, setComprobante] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Calculate age from birthdate
  useEffect(() => {
    if (!birthDia || !birthMes || !birthAnio) {
      setEdad('')
      return
    }
    const birth = new Date(Number(birthAnio), Number(birthMes) - 1, Number(birthDia))
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    setEdad(age > 0 ? `${age} años` : '')
  }, [birthDia, birthMes, birthAnio])

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

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const resetForm = () => {
    setNombre('')
    setApellido('')
    setEmail('')
    setTelefono('')
    setBirthDia('')
    setBirthMes('')
    setBirthAnio('')
    setEdad('')
    setCedula('')
    setTipoCedula('CC')
    setComprobante(null)
    setPreviewUrl(null)
    setStep('datos')
    setStepVisible(true)
    setSlideDir('left')
    setSubmitting(false)
  }

  const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setComprobante(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setComprobante(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleNextStep = (e: Event) => {
    e.preventDefault()
    goToStep('pago')
  }

  const [submitting, setSubmitting] = useState(false)

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!comprobante || submitting) return

    setSubmitting(true)
    try {
      const receipt = await fileToBase64(comprobante)
      const gymId = import.meta.env.VITE_GYM_ID ?? ''

      const payload: AddUserRequest = {
        firstName: nombre,
        lastName: apellido,
        email,
        password: cedula,
        gymId,
        phone: `+57${telefono}`,
        cedula,
        membershipId: selectedPlan?.id ?? '',
        paymentMethod: 'transferencia',
        establishmentsID: gymId,
        receipt,
        receiptFilename: comprobante.name,
        birthDate: `${birthAnio}-${birthMes.padStart(2, '0')}-${birthDia.padStart(2, '0')}`,
        reference: '',
        paymentNotes: '',
      }

      const res = await addUser(payload)

      if (res.success) {
        // Send WhatsApp notification silently via hidden iframe
      const message = [
        `🏋️ *Nuevo Miembro — Elite Gym*`,
        ``,
        `👤 *Nombre:* ${nombre} ${apellido}`,
        `📧 *Email:* ${email}`,
        `📞 *Teléfono:* ${telefono}`,
        `🎂 *Fecha de nacimiento:* ${birthDia.padStart(2, '0')}/${birthMes.padStart(2, '0')}/${birthAnio}`,
        `📅 *Edad:* ${edad}`,
        `🪪 *Cédula:* ${cedula}`,
        `⭐ *Plan:* ${selectedPlan?.name ?? '—'} (${selectedPlan ? formatPrice(selectedPlan.price) : '—'}${selectedPlan?.period ?? ''})`,
        `💳 *Pago:* Comprobante enviado (${comprobante.name})`,
        ``,
        `_Registro enviado desde el sitio web de Elite Gym._`,
      ].join('\n')

      const whatsappUrl = `https://api.whatsapp.com/send?phone=573116248414&text=${encodeURIComponent(message)}`
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = whatsappUrl
      document.body.appendChild(iframe)
      setTimeout(() => iframe.remove(), 3000)

        onClose()
      } else {
        alert(res.message || 'Error al registrar. Intenta de nuevo.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      alert('Error de conexión. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
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
            onClick={step === 'pago' ? () => goToStep('datos') : onBack}
            className="w-9 h-9 rounded-full bg-bg-gray/50 hover:bg-bg-gray flex items-center justify-center text-text-gray-light hover:text-text-light transition-colors shrink-0"
            aria-label="Volver"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Icon */}
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            {step === 'datos' ? (
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-text-light font-bold text-lg">
              {step === 'datos' ? 'Registro de Miembro' : 'Método de Pago'}
            </h2>
            <p className="text-text-gray-light text-sm mt-0.5">
              {step === 'datos' ? 'Paso 1 de 2 — Datos personales' : 'Paso 2 de 2 — Comprobante de pago'}
            </p>
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

        {/* Step indicator */}
        <div className="flex gap-2 px-7 pb-4">
          <div className="flex-1 h-1 rounded-full bg-primary" />
          <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${step === 'pago' ? 'bg-primary' : 'bg-border'}`} />
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-7" />

        {/* Steps container with slide animation */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-350 ease-in-out"
            style={{ transform: step === 'pago' ? 'translateX(-50%)' : 'translateX(0)', width: '200%' }}
          >
            {/* Step 1: Datos personales */}
            <div className="w-1/2 shrink-0">
              <form className="px-7 py-6 space-y-5" onSubmit={handleNextStep}>

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
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-bg-gray border border-r-0 border-border rounded-l-lg text-text-gray-light text-sm select-none">+57</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="300 000 0000"
                    value={telefono.replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) => c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a)}
                    onInput={(e) => {
                      const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10)
                      setTelefono(raw)
                    }}
                    className={`${inputClass} rounded-l-none`}
                    required
                    maxLength={12}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Fecha de nacimiento + Edad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Fecha de nacimiento</label>
                <div className="grid grid-cols-3 gap-2">
                  <CustomSelect
                    value={birthDia}
                    onChange={setBirthDia}
                    placeholder="Día"
                    options={Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1).padStart(2, '0') }))}
                    maxHeight={180}
                  />
                  <CustomSelect
                    value={birthMes}
                    onChange={setBirthMes}
                    placeholder="Mes"
                    options={['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'].map((m, i) => ({ value: String(i + 1), label: m }))}
                    maxHeight={180}
                  />
                  <CustomSelect
                    value={birthAnio}
                    onChange={setBirthAnio}
                    placeholder="Año"
                    options={Array.from({ length: 80 }, (_, i) => { const y = new Date().getFullYear() - 16 - i; return { value: String(y), label: String(y) } })}
                    maxHeight={180}
                  />
                </div>
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

            {/* Row 4: Tipo Cédula + Cédula */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <div>
                <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Tipo</label>
                <CustomSelect
                  value={tipoCedula}
                  onChange={(v) => {
                    setTipoCedula(v as 'CC' | 'CE')
                    setCedula('')
                  }}
                  options={[{ value: 'CC', label: 'C.C.' }, { value: 'CE', label: 'C.E.' }]}
                />
              </div>
              <div>
                <label className="block text-text-gray-light text-xs font-medium mb-2 italic">Cédula</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={tipoCedula === 'CC' ? 'Ej: 1.234.567.890' : 'Ej: 123456'}
                  value={tipoCedula === 'CC' ? cedula.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : cedula}
                  onInput={(e) => {
                    const raw = (e.target as HTMLInputElement).value
                    if (tipoCedula === 'CC') {
                      const nums = raw.replace(/\D/g, '').slice(0, 10)
                      setCedula(nums)
                    } else {
                      const clean = raw.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)
                      setCedula(clean)
                    }
                  }}
                  pattern={tipoCedula === 'CC' ? '\\d{6,10}' : '[a-zA-Z0-9]{6,12}'}
                  minLength={6}
                  className={inputClass}
                  required
                />
              </div>
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
                Continuar al Pago
              </button>
            </div>
              </form>
            </div>

            {/* Step 2: Método de pago */}
            <div className="w-1/2 shrink-0">
              <form className="px-7 py-6 space-y-5" onSubmit={handleSubmit}>

            {/* Payment method info */}
            <div className="bg-bg-gray/50 border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-light font-bold text-sm">Transferencia Bancaria</p>
                  <p className="text-text-gray-light text-xs">Pago por llave Nequi / Daviplata</p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex flex-col items-center py-3">
                <span className="text-text-gray-light text-xs mb-1">Llave de transferencia</span>
                <span className="text-primary font-black text-2xl tracking-wide">@joan9831</span>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-gray-light">Titular:</span>
                  <span className="text-text-light font-medium">Elite Gym</span>
                </div>
                {selectedPlan && (
                  <div className="flex justify-between">
                    <span className="text-text-gray-light">Monto a pagar:</span>
                    <span className="text-primary font-bold">{formatPrice(selectedPlan.price)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Upload comprobante */}
            <div>
              <label className="block text-text-gray-light text-xs font-medium mb-3 italic">
                Comprobante de pago *
              </label>

              {!comprobante ? (
                <label className="flex flex-col items-center justify-center gap-3 w-full py-8 border-2 border-dashed border-border hover:border-primary/50 rounded-xl cursor-pointer transition-colors bg-bg-gray/30 hover:bg-bg-gray/50">
                  <svg className="w-10 h-10 text-text-gray-light/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <div className="text-center">
                    <p className="text-text-light text-sm font-medium">Subir comprobante</p>
                    <p className="text-text-gray-light text-xs mt-1">PNG, JPG o PDF — máx. 5MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex items-center gap-4 bg-bg-gray/50 border border-primary/30 rounded-xl p-4">
                  {previewUrl && comprobante.type.startsWith('image/') ? (
                    <img src={previewUrl} alt="Comprobante" className="w-16 h-16 object-cover rounded-lg border border-border" />
                  ) : (
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-text-light text-sm font-medium truncate">{comprobante.name}</p>
                    <p className="text-text-gray-light text-xs mt-0.5">
                      {(comprobante.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors shrink-0"
                    aria-label="Eliminar archivo"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => goToStep('datos')}
                className="flex-1 bg-bg-gray hover:bg-bg-gray/70 text-text-gray-light font-medium text-sm py-3.5 rounded-lg transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={!comprobante || submitting}
                className="flex-1 bg-primary hover:bg-primary-dark text-bg-dark font-bold text-sm py-3.5 rounded-lg transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Registrando...' : 'Registrar Miembro'}
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
