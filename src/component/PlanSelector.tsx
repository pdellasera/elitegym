import { useState, useEffect } from 'preact/hooks'

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  period: string
  badge?: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    id: 'mes',
    name: 'Plan Mensual',
    description: 'Acceso completo a todas las instalaciones durante un mes',
    price: 82000,
    period: '/mes',
    badge: 'El más popular',
    features: [
      'Acceso ilimitado al gimnasio',
      'Todas las clases grupales',
      'Zona de pesas y cardio',
      'Casillero incluido',
      'Asesoría inicial gratuita',
    ],
  },
  {
    id: 'quincena',
    name: 'Plan Quincenal',
    description: 'Acceso completo durante 15 días',
    price: 48000,
    period: '/quincena',
    features: [
      'Acceso ilimitado al gimnasio',
      'Todas las clases grupales',
      'Zona de pesas y cardio',
      'Casillero incluido',
    ],
  },
  {
    id: 'semana',
    name: 'Plan Semanal',
    description: 'Entrena una semana completa sin compromiso',
    price: 25000,
    period: '/semana',
    features: [
      'Acceso ilimitado al gimnasio',
      'Clases grupales incluidas',
      'Zona de pesas y cardio',
    ],
  },
  {
    id: 'clase',
    name: 'Clase Individual',
    description: 'Paga solo por la clase que quieras asistir',
    price: 10000,
    period: '/clase',
    features: [
      'Una clase a elección',
      'Acceso a vestuarios',
      'Sin compromiso',
    ],
  },
]

interface PlanSelectorProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (plan: Plan) => void
}

export default function PlanSelector({ isOpen, onClose, onContinue }: PlanSelectorProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<string>('mes')
  const [showBenefits, setShowBenefits] = useState<string | null>(null)

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
        setSelected('mes')
        setShowBenefits(null)
      }, 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)

  const handleContinue = () => {
    const plan = PLANS.find((p) => p.id === selected)
    if (plan) onContinue(plan)
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl bg-bg-darker border border-border rounded-2xl shadow-heavy overflow-hidden transition-all duration-300 max-h-[92vh] overflow-y-auto ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-bg-gray/50 hover:bg-red-500/20 flex items-center justify-center text-text-gray-light hover:text-red-400 transition-colors"
          aria-label="Cerrar"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Elige tu plan
          </div>
          <h2 className="text-text-light text-2xl md:text-3xl font-bold">
            Selecciona tu plan ideal
          </h2>
          <p className="text-text-gray-light mt-2 text-sm max-w-md mx-auto">
            Elige el plan que mejor se adapte a tu estilo de entrenamiento
          </p>
        </div>

        {/* Plans Grid */}
        <div className="px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id
            const benefitsOpen = showBenefits === plan.id

            return (
              <div
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all duration-300 group ${
                  isSelected
                    ? 'border-primary bg-gradient-to-b from-primary/10 to-bg-dark shadow-lg shadow-primary/10'
                    : 'border-border hover:border-text-gray-light/30 bg-bg-dark'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-bg-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Radio indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-primary' : 'border-text-gray-light/40'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <h3 className={`font-bold text-base transition-colors ${
                    isSelected ? 'text-text-light' : 'text-text-gray-light'
                  }`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-xs mb-4 leading-relaxed transition-colors ${
                  isSelected ? 'text-text-gray-light' : 'text-text-gray-light/60'
                }`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-3xl font-bold transition-colors ${
                        isSelected ? 'text-text-light' : 'text-text-gray-light'
                      }`}
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-text-gray-light/50 text-xs">{plan.period}</span>
                  </div>
                </div>

                {/* Show benefits toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowBenefits(benefitsOpen ? null : plan.id)
                  }}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isSelected ? 'text-primary' : 'text-text-gray-light/60 hover:text-text-gray-light'
                  }`}
                >
                  {benefitsOpen ? 'Ocultar' : 'Mostrar'} beneficios
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${benefitsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Benefits list (collapsible) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    benefitsOpen ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-2 border-t border-border/50 pt-3">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg
                          className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-primary' : 'text-text-gray-light/40'}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-xs ${isSelected ? 'text-text-gray-light' : 'text-text-gray-light/50'}`}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-6" />

        {/* Footer Actions */}
        <div className="px-6 pt-5 pb-7">
          {/* Selected plan summary */}
          {selected && (
            <div className="flex items-center justify-center gap-2 mb-5 text-sm">
              <span className="text-text-gray-light">Plan seleccionado:</span>
              <span className="text-primary font-bold">{PLANS.find(p => p.id === selected)?.name}</span>
              <span className="text-text-gray-light">—</span>
              <span className="text-text-light font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {formatPrice(PLANS.find(p => p.id === selected)?.price ?? 0)}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
            <button
              type="button"
              onClick={onClose}
              className="sm:flex-1 border border-border hover:border-text-gray-light/40 text-text-gray-light hover:text-text-light font-medium text-sm py-4 px-6 rounded-xl transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="sm:flex-[2] group relative overflow-hidden bg-primary hover:bg-primary-dark text-bg-dark font-bold text-sm py-4 px-8 rounded-xl transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continuar al registro
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Coupon link */}
          <div className="flex items-center justify-center gap-2 mt-5 text-primary/70 hover:text-primary text-xs font-medium cursor-pointer transition-colors group">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
            Añadir cupón
            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
