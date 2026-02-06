import { useState, useEffect } from 'preact/hooks'
import logo from '../assets/logo_oscuro.png'
import background from '../assets/bacckground.jpg'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image — parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Geometric accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left corner accent */}
        <div
          className={`absolute top-24 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-primary/60 to-transparent transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        />
        <div
          className={`absolute top-24 left-8 md:left-16 h-px w-20 bg-gradient-to-r from-primary/60 to-transparent transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        />

        {/* Bottom-right corner accent */}
        <div
          className={`absolute bottom-32 right-8 md:right-16 w-px h-32 bg-gradient-to-t from-primary/40 to-transparent transition-all duration-1000 delay-900 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        />
        <div
          className={`absolute bottom-32 right-8 md:right-16 h-px w-20 bg-gradient-to-l from-primary/40 to-transparent transition-all duration-1000 delay-900 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        />

        {/* Floating dots */}
        <div className="absolute top-1/4 right-[15%] w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[35%] left-[20%] w-1 h-1 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Logo — animated entrance */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <img src={logo} alt="Elite Gym" className="w-28 md:w-36 drop-shadow-2xl" />
        </div>

        {/* Tagline chip */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-primary text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] border border-primary/30 px-5 py-2 rounded-full bg-primary/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Transforma tu cuerpo, transforma tu vida
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-black text-text-light leading-[0.9] tracking-tight uppercase">
          <span
            className={`block text-[3.2rem] md:text-[6.5rem] lg:text-[8rem] transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Sé diferente
          </span>
          <span
            className={`block text-[1.6rem] md:text-[3.5rem] lg:text-[5rem] mt-1 md:mt-2 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              color: '#ffbb2d',
              textShadow: '0 0 60px rgba(255,187,45,0.3), 0 0 120px rgba(255,187,45,0.1)',
            }}
          >
            entrena diferente
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-text-gray-light text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed mt-8 mb-10 transition-all duration-700 delay-600 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Programas de entrenamiento premium diseñados para construir
          fuerza, resistencia y la mejor versión de ti.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
            className="group relative bg-primary hover:bg-primary-dark text-bg-dark font-bold text-sm uppercase tracking-wider py-4 px-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,187,45,0.3)] hover:scale-105"
          >
            <span className="relative z-10">Únete Ahora</span>
          </button>
          <a
            href="#about"
            className="text-text-gray-light hover:text-primary text-sm uppercase tracking-wider font-medium flex items-center gap-2 py-4 px-6 transition-colors border border-border/50 hover:border-primary/50 bg-white/5 backdrop-blur-sm"
          >
            Conoce más
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-16 md:mt-20 flex items-center justify-center gap-6 md:gap-12 transition-all duration-700 delay-[800ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-primary font-black text-2xl md:text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>15+</div>
            <div className="text-text-gray-light/60 text-[10px] md:text-xs uppercase tracking-wider mt-1">Años</div>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <div className="text-primary font-black text-2xl md:text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>2.3K</div>
            <div className="text-text-gray-light/60 text-[10px] md:text-xs uppercase tracking-wider mt-1">Miembros</div>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <div className="text-primary font-black text-2xl md:text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>25+</div>
            <div className="text-text-gray-light/60 text-[10px] md:text-xs uppercase tracking-wider mt-1">Entrenadores</div>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <div className="text-primary font-black text-2xl md:text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>540+</div>
            <div className="text-text-gray-light/60 text-[10px] md:text-xs uppercase tracking-wider mt-1">Resultados</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[1000ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-text-gray-light/40 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 border border-text-gray-light/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
