import HeroSection from '../../component/HeroSection'
import WelcomeSection from '../../component/WelcomeSection'
import TestimonialSection from '../../component/TestimonialSection'
import { useState } from 'preact/hooks'
import { useScrollReveal } from '../../hooks/useScrollReveal'

import seccion8 from '../../assets/seccion_8.png'
import seccion9 from '../../assets/seccion_9.png'
import seccion10 from '../../assets/seccion_10.png'
import seccion11 from '../../assets/seccion_11.png'
import seccion12 from '../../assets/seccion_12.png'
import seccion13 from '../../assets/seccion_13.png'
import seccion14 from '../../assets/seccion_14.png'
import seccion15 from '../../assets/seccion_15.png'

interface HomeProps {
    onNavigate?: (page: 'home' | 'payment') => void
}

export default function Home({ onNavigate }: HomeProps) {
    console.log('Home page rendered', onNavigate) // Debug log to confirm rendering
    const images = [seccion8, seccion9, seccion10, seccion11, seccion12, seccion13, seccion14]

    const [slideIndex, setSlideIndex] = useState(0)
    const totalSlides = images.length

    const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides)
    const prevSlide = () => setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)

    // Scroll reveal for each section
    const { ref: ctaRef, visible: ctaVisible } = useScrollReveal()
    const { ref: aboutRef, visible: aboutVisible } = useScrollReveal()
    const { ref: horariosRef, visible: horariosVisible } = useScrollReveal()

    return (
        <>
            <HeroSection />
            <WelcomeSection />
            <TestimonialSection />

            {/* Services Section — Image Carousel */}
            <section id="programs" className="relative border-t border-border">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '85vh' }}>

                    {/* Images — crossfade */}
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Instalación ${i + 1}`}
                            width={2667}
                            height={1500}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                            style={{ opacity: i === slideIndex ? 1 : 0 }}
                        />
                    ))}

                    {/* Subtle dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                    {/* Navigation arrows — centered on sides */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 hover:bg-primary/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                        aria-label="Anterior"
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 hover:bg-primary/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                        aria-label="Siguiente"
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Pagination dots — bottom center */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlideIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === slideIndex
                                        ? 'bg-primary w-7'
                                        : 'bg-white/40 hover:bg-white/70'
                                    }`}
                                aria-label={`Imagen ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section — parallax */}
            <section ref={ctaRef} className="relative py-20 md:py-section-py border-t border-border overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80")',
                    }}
                />
                <div className="absolute inset-0 bg-primary/80" />
                <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 text-center">
                    <h2 className={`text-h2 md:text-h1 font-bold text-text-light mb-4 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        ¿Listo para dar el primer paso hacia tus metas fitness?
                    </h2>
                    <p className={`text-text-light text-base md:text-lg mb-8 opacity-90 transition-all duration-700 delay-200 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        Únete a miles de miembros que han transformado sus vidas en Elite Gym. Profesional, confiable y apasionado por tu salud.
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
                        className={`bg-text-light hover:bg-text-gray text-bg-dark font-bold py-4 px-10 rounded transition-all duration-700 delay-[400ms] transform hover:scale-105 text-lg ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        ÚNETE AHORA
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} id="about" className="py-20 md:py-section-py bg-bg-darker border-t border-border">
                <div className="max-w-container-xl mx-auto px-6 md:px-12">

                    {/* Centered Header */}
                    <div className="text-center mb-16 md:mb-20">
                        <div className={`text-primary font-bold text-base md:text-lg lg:text-xl uppercase tracking-widest mb-4 transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                            ¿Por Qué Elegirnos?
                        </div>
                        <h2 className={`text-h2 md:text-h1 font-bold text-text-light leading-tight max-w-3xl mx-auto transition-all duration-700 delay-150 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                            Construye Fuerza, Resistencia y Confianza con Nosotros
                        </h2>
                    </div>

                    {/* Content — images left, numbered items right */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left — Two images side-by-side with offset */}
                        <div className={`relative flex gap-4 justify-center lg:justify-start transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                            }`}>
                            <div className="w-[48%] aspect-[3/4] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80"
                                    alt="Entrenamiento"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-[48%] aspect-[3/4] overflow-hidden mt-12">
                                <img
                                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80"
                                    alt="Gimnasio"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right — 3 numbered features */}
                        <div className="space-y-10">
                            <div className={`flex items-start gap-6 transition-all duration-700 delay-300 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="text-text-light font-bold text-lg mb-2">Entrenadores Personales Certificados</h3>
                                    <p className="text-text-gray text-sm md:text-base leading-relaxed">
                                        Entrena con profesionales que guían cada movimiento — asegurando la forma correcta, seguridad y resultados más rápidos para tus metas fitness.
                                    </p>
                                </div>
                            </div>

                            <div className={`flex items-start gap-6 transition-all duration-700 delay-[450ms] ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="text-text-light font-bold text-lg mb-2">Equipamiento Moderno</h3>
                                    <p className="text-text-gray text-sm md:text-base leading-relaxed">
                                        Experimenta máquinas de última generación y herramientas funcionales que hacen cada entrenamiento efectivo, divertido y desafiante.
                                    </p>
                                </div>
                            </div>

                            <div className={`flex items-start gap-6 transition-all duration-700 delay-[600ms] ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="text-text-light font-bold text-lg mb-2">Ambiente Motivador</h3>
                                    <p className="text-text-gray text-sm md:text-base leading-relaxed">
                                        Únete a una comunidad que te inspira a ser constante, superar tus límites y celebrar cada logro en el camino.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Horarios Section — Parallax */}
            <section ref={horariosRef} id="horarios" className="relative py-20 md:py-section-py border-t border-border overflow-hidden">
                {/* Parallax background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: `url(${seccion15})` }}
                />
                <div className="absolute inset-0 bg-black/75" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

                    {/* Section header — centered */}
                    <div className="text-center mb-14 md:mb-20">
                        <div className={`text-primary font-bold text-base md:text-lg lg:text-xl uppercase tracking-widest mb-4 transition-all duration-700 ${horariosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                            Horarios de Apertura
                        </div>
                        <h2 className={`text-h2 md:text-h1 font-bold text-text-light leading-tight transition-all duration-700 delay-150 ${horariosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                            Entrena en el Horario que Mejor se Adapte a Ti
                        </h2>
                    </div>

                    {/* Schedule cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Lunes a Viernes */}
                        <div className={`group relative bg-bg-dark/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-700 delay-300 overflow-hidden ${horariosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            {/* Glow accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-2xl" />
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <h3 className="text-text-light font-bold text-lg mb-2">Lunes a Viernes</h3>
                                <p className="text-text-gray-light text-sm mb-5">Entre semana</p>
                                <div className="w-full h-px bg-border mb-5" />
                                <div className="flex items-baseline gap-1">
                                    <span className="text-primary font-bold text-3xl md:text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>5 AM</span>
                                    <span className="text-text-gray-light text-lg mx-2">–</span>
                                    <span className="text-primary font-bold text-3xl md:text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>9 PM</span>
                                </div>
                                <p className="text-text-gray-light text-xs mt-3 uppercase tracking-wider">16 horas continuas</p>
                            </div>
                        </div>

                        {/* Sábados y Festivos */}
                        <div className={`group relative bg-bg-dark/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-700 delay-[450ms] overflow-hidden ${horariosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-2xl" />
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-text-light font-bold text-lg mb-2">Sábados y Festivos</h3>
                                <p className="text-text-gray-light text-sm mb-5">Fin de semana</p>
                                <div className="w-full h-px bg-border mb-5" />
                                <div className="flex items-baseline gap-1">
                                    <span className="text-primary font-bold text-3xl md:text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>8 AM</span>
                                    <span className="text-text-gray-light text-lg mx-2">–</span>
                                    <span className="text-primary font-bold text-3xl md:text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>2 PM</span>
                                </div>
                                <p className="text-text-gray-light text-xs mt-3 uppercase tracking-wider">6 horas</p>
                            </div>
                        </div>

                        {/* Domingo */}
                        <div className={`group relative bg-bg-dark/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-white/10 transition-all duration-700 delay-[600ms] overflow-hidden ${horariosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-text-gray-light/30 rounded-t-2xl" />
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                                    <svg className="w-7 h-7 text-text-gray-light" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                </div>
                                <h3 className="text-text-gray-light font-bold text-lg mb-2">Domingo</h3>
                                <p className="text-text-gray-light/60 text-sm mb-5">Día de descanso</p>
                                <div className="w-full h-px bg-border mb-5" />
                                <span className="text-text-gray-light font-bold text-3xl md:text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>CERRADO</span>
                                <p className="text-text-gray-light/60 text-xs mt-3 uppercase tracking-wider">Nos vemos el lunes</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}
