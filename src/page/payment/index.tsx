interface PaymentProps {
  onNavigate?: (page: 'home' | 'payment') => void
}

export default function Payment({ onNavigate }: PaymentProps) {
    console.log('Payment page loaded',onNavigate)
  return (
    <>
      {/* Pricing Section */}
      <section className="pt-28 pb-20 md:py-section-py bg-bg-dark border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-h2 md:text-h1 font-bold text-text-light mb-4">Planes de Membresía</h1>
            <p className="text-text-gray text-base md:text-lg">Elige el plan perfecto para tu camino fitness</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Basic Plan */}
            <div className="bg-bg-darker p-8 rounded-lg shadow-light hover:shadow-medium border-2 border-border transition-all">
              <h3 className="text-text-light font-bold text-h4 mb-2">Básico</h3>
              <p className="text-primary text-sm font-semibold mb-6">Perfecto para comenzar</p>
              <div className="text-h2 font-bold text-text-light mb-6">
                $29<span className="text-sm">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Acceso a instalaciones
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Todo el equipamiento
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Acceso a vestuarios
                </li>
                <li className="text-text-gray-light text-sm flex items-center">
                  <span className="text-text-gray-light mr-3">✗</span>
                  Entrenador personal
                </li>
              </ul>

              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded transition-colors">
                COMENZAR
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-bg-darker p-8 rounded-lg shadow-medium border-2 border-primary transform scale-105">
              <div className="bg-primary text-white text-xs font-bold px-4 py-2 rounded inline-block mb-4">
                MÁS POPULAR
              </div>
              <h3 className="text-text-light font-bold text-h4 mb-2">Pro</h3>
              <p className="text-primary text-sm font-semibold mb-6">El mejor valor para el fitness serio</p>
              <div className="text-h2 font-bold text-text-light mb-6">
                $59<span className="text-sm">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Todo lo del plan Básico
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Clases grupales
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  2 sesiones con entrenador
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Evaluación física
                </li>
              </ul>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition-colors">
                COMENZAR
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-bg-darker p-8 rounded-lg shadow-light hover:shadow-medium border-2 border-border transition-all">
              <h3 className="text-text-light font-bold text-h4 mb-2">Elite</h3>
              <p className="text-primary text-sm font-semibold mb-6">Experiencia premium</p>
              <div className="text-h2 font-bold text-text-light mb-6">
                $99<span className="text-sm">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Todo lo del plan Pro
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Entrenamiento personal ilimitado
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Consulta nutricional
                </li>
                <li className="text-text-gray text-sm flex items-center">
                  <span className="text-primary mr-3">✓</span>
                  Soporte prioritario
                </li>
              </ul>

              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded transition-colors">
                COMENZAR
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-bg-darker p-8 rounded-lg shadow-light">
            <h2 className="text-text-light font-bold text-h4 mb-6">Preguntas Frecuentes</h2>

            <div className="space-y-4">
              <details className="border-b border-border pb-4 open:pb-4">
                <summary className="text-text-light font-semibold cursor-pointer flex justify-between items-center">
                  ¿Puedo cancelar mi membresía en cualquier momento?
                  <span>+</span>
                </summary>
                <p className="text-text-gray text-sm mt-4">
                  Sí, puedes cancelar tu membresía en cualquier momento. Solo contacta a nuestro equipo de soporte y procesaremos tu cancelación inmediatamente sin complicaciones.
                </p>
              </details>

              <details className="border-b border-border pb-4">
                <summary className="text-text-light font-semibold cursor-pointer flex justify-between items-center">
                  ¿Hay un período de prueba?
                  <span>+</span>
                </summary>
                <p className="text-text-gray text-sm mt-4">
                  ¡Sí! Ofrecemos una prueba gratuita de 7 días para que experimentes nuestras instalaciones y clases antes de comprometerte con una membresía.
                </p>
              </details>

              <details className="border-b border-border pb-4">
                <summary className="text-text-light font-semibold cursor-pointer flex justify-between items-center">
                  ¿Ofrecen descuentos para membresías a largo plazo?
                  <span>+</span>
                </summary>
                <p className="text-text-gray text-sm mt-4">
                  ¡Por supuesto! Ofrecemos descuentos para membresías anuales. Contáctanos para precios especiales en compromisos a largo plazo.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
