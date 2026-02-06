interface ServiceCardProps {
  icon: string
  image: string
  title: string
  description: string
}

export default function ServiceCard({ icon, image, title, description }: ServiceCardProps) {
  return (
    <div className="bg-bg-darker rounded-lg shadow-light hover:shadow-medium transition-all duration-300 group overflow-hidden">
      {/* Image */}
      <div className="h-48 overflow-hidden bg-bg-gray">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <span className="text-4xl">{icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-text-light font-bold text-h5 md:text-h4 mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-gray text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>

        {/* Link */}
        <a
          href="#"
          className="inline-flex items-center text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
        >
          VER DETALLES
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
