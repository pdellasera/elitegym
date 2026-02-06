import { useScrollReveal } from '../hooks/useScrollReveal'

export default function WelcomeSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  const stats = [
    { number: '12000', label: 'Horas de Entrenamiento' },
    { number: '2300', label: 'Miembros Activos' },
    { number: '540', label: 'Transformaciones' },
    { number: '25', label: 'Entrenadores Certificados' },
  ]

  return (
    <section ref={sectionRef} className="bg-bg-darker py-20 md:py-24">
      <div className="max-w-container-xl mx-auto px-6 md:px-12">

        {/* Top — Images + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">

          {/* Left — Dual Images with Badge */}
          <div className={`relative flex gap-4 justify-center lg:justify-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            {/* Image 1 — woman training */}
            <div className="w-[46%] aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&q=80"
                alt="Woman training"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 — man fitness, offset down */}
            <div className="w-[46%] aspect-[3/4] rounded-lg overflow-hidden mt-8">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80"
                alt="Man fitness"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badge — 15 Years */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-heavy z-10 transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
              <span className="text-white text-4xl md:text-5xl font-bold leading-none">15</span>
              <span className="text-white text-xs md:text-sm mt-1 text-center leading-tight">Años de<br />experiencia</span>
            </div>
          </div>

          {/* Right — Text Content */}
          <div>
            <span className={`text-primary font-semibold text-sm tracking-wide mb-4 block transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Bienvenido a Elite Gym
            </span>

            <h2 className={`text-3xl md:text-h2 lg:text-h1 font-bold text-text-light leading-tight mb-6 transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Supera Tus Límites Y Desbloquea Tu Fuerza
            </h2>

            <p className={`text-text-gray-light text-sm md:text-base leading-relaxed mb-8 transition-all duration-700 delay-[400ms] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Vive una experiencia fitness diseñada para desafiar tu cuerpo y
              fortalecer tu mente. Con entrenadores expertos, equipamiento de última
              generación y programas para todos los niveles, obtendrás la fuerza,
              confianza y resultados que siempre quisiste. Cada entrenamiento te
              acerca a tu mejor versión.
            </p>

            <button className={`bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3.5 px-8 transition-all duration-700 delay-500 uppercase tracking-wider ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
              onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
            >
              Únete Ahora
            </button>
          </div>
        </div>

        {/* Bottom — Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: `${600 + idx * 150}ms` }}>
              <div className="text-4xl md:text-6xl font-bold text-text-light mb-3 tracking-tight">
                {stat.number}<span className="text-primary">+</span>
              </div>
              <p className="text-text-gray-light text-xs md:text-sm tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
