import { useScrollReveal } from '../hooks/useScrollReveal'

export default function TestimonialSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Background Image — woman on gym machine — parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80")',
        }}
      />

      {/* Dark Overlay — lighter to show the image */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* Stars — golden/yellow */}
        <div className={`flex justify-center gap-1.5 mb-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-400 text-lg" style={{ transitionDelay: `${i * 100}ms` }}>★</span>
          ))}
        </div>

        {/* Quote — italic, large */}
        <blockquote className={`text-text-light text-xl md:text-3xl lg:text-4xl font-bold italic leading-snug mb-8 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Unirme a este gimnasio transformó completamente
          mi estilo de vida y mentalidad. Es la mejor decisión
          que he tomado para mi salud, energía y mi camino
          fitness a largo plazo.
        </blockquote>

        {/* Author */}
        <p className={`text-text-gray-light text-sm md:text-base tracking-wide transition-all duration-700 delay-[400ms] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Paula Andrea Zuluaga Cuartas
        </p>

        {/* Dots (carousel indicator) */}
        <div className={`flex justify-center gap-2.5 mt-10 transition-all duration-700 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-gray-light/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-gray-light/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-gray-light/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-gray-light/40" />
        </div>
      </div>
    </section>
  )
}
