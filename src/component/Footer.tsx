import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Footer() {
  const { ref: footerRef, visible } = useScrollReveal({ threshold: 0.1 })

  return (
    <footer ref={footerRef} className="bg-bg-dark">
      {/* Main Footer */}
      <div className="max-w-container-xl mx-auto px-6 md:px-12 py-16 md:py-section-py">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-text-light font-bold text-h5 mb-6">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Inicio</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Nosotros</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Horarios</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Classes */}
          <div className={`transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-text-light font-bold text-h5 mb-6">Nuestras Clases</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Fuerza y Acondicionamiento</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Entrenamiento Personal</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">HIIT y Clases Grupales</a></li>
              <li><a href="#" className="text-text-gray-light hover:text-primary text-sm transition-colors">Yoga y Pilates</a></li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div className={`transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-text-light font-bold text-h5 mb-6">Estamos Abiertos</h3>
            <ul className="text-text-gray-light text-sm space-y-1 mb-6">
              <li>Lunes a Viernes: 5:00 AM – 9:00 PM</li>
              <li>Sábados y Festivos: 8:00 AM – 2:00 PM</li>
              <li>Domingo: Cerrado</li>
            </ul>
            
            <h3 className="text-text-light font-bold text-h5 mb-3">Nuestra Ubicación</h3>
            <p className="text-text-gray-light text-sm leading-relaxed">
              Mall Zona Oro<br />
              Carrera 14 # 46 Norte 41, Piso 2<br />
              Armenia, Quindío
            </p>
          </div>

          {/* Contact & Social */}
          <div className={`transition-all duration-700 delay-[450ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-text-light font-bold text-h5 mb-6">Contáctanos</h3>
            <a href="tel:+573116248414" className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors flex items-center gap-2 mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              311 624 8414
            </a>
            <a href="mailto:contact@elitegym.co" className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors flex items-center gap-2 mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              contact@elitegym.co
            </a>

            <h3 className="text-text-light font-bold text-h5 mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-bg-darker hover:bg-primary rounded-full flex items-center justify-center text-text-light transition-colors text-sm font-bold">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-bg-darker hover:bg-primary rounded-full flex items-center justify-center text-text-light transition-colors text-sm font-bold">
                t
              </a>
              <a href="#" className="w-10 h-10 bg-bg-darker hover:bg-primary rounded-full flex items-center justify-center text-text-light transition-colors text-sm font-bold">
                i
              </a>
              <a href="#" className="w-10 h-10 bg-bg-darker hover:bg-primary rounded-full flex items-center justify-center text-text-light transition-colors text-sm font-bold">
                y
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-bg-darker">
        <div className="max-w-container-xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-text-gray-light text-xs gap-4">
            <p>&copy; 2025 Elite Gym. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
