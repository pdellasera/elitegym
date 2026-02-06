import { useState, useEffect } from 'preact/hooks'
import logo from '../assets/icon.png'

interface HeaderProps {
    onContactClick?: () => void
    onJoinClick?: () => void
}

export default function Header({ onContactClick, onJoinClick }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-heavy' : 'bg-transparent'
        }`}>
            <div className="max-w-container-xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                        <div className="flex items-baseline gap-0.5" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            <span className="text-white font-bold text-2xl tracking-wide uppercase leading-none">
                                Elite
                            </span>
                            <span className="text-primary font-bold text-2xl tracking-wide uppercase leading-none">
                                Gym
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-7">
                        <a href="#" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1">
                            Inicio
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                        <a href="#about" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1">
                            Nosotros
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                        <a href="#horarios" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors">
                            Horarios
                        </a>
                        <a href="#programs" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1">
                            Clases
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                        {/* <a href="#" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1">
                            Páginas
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                        <a href="#blog" className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors">
                            Blog
                        </a> */}
                        <button onClick={() => { onContactClick?.(); }} className="text-text-gray hover:text-primary text-[13px] font-medium uppercase tracking-wider transition-colors cursor-pointer bg-transparent border-none">
                            Contacto
                        </button>
                    </nav>

                    {/* CTA Button */}
                    <button
                        onClick={() => onJoinClick?.()}
                        className="hidden lg:block bg-primary hover:bg-primary-dark text-white px-7 py-3 transition-colors font-semibold text-sm uppercase tracking-wider"
                    >
                        Únete Ahora
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-text-light"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="lg:hidden bg-bg-dark/95 backdrop-blur-sm pb-6 space-y-1 border-t border-border">
                        <a href="#" className="block text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3">Inicio</a>
                        <a href="#about" className="block text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3">Nosotros</a>
                        <a href="#horarios" className="block text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3">Horarios</a>
                        <a href="#programs" className="block text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3">Clases</a>
                        {/* <a href="#blog" className="block text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3">Blog</a> */}
                        <button onClick={() => { setIsOpen(false); onContactClick?.(); }} className="block w-full text-left text-text-gray hover:text-primary text-sm font-medium uppercase tracking-wider py-3 cursor-pointer bg-transparent border-none">Contacto</button>
                        <button
                            onClick={() => { setIsOpen(false); onJoinClick?.(); }}
                            className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 transition-colors font-semibold text-sm uppercase tracking-wider mt-4"
                        >
                            Únete Ahora
                        </button>
                    </nav>
                )}
            </div>
        </header>
    )
}
