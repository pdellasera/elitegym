export default function StatsSection() {
  const stats = [
    { number: '12000', label: 'Training Hours' },
    { number: '2300', label: 'Active members' },
    { number: '540', label: 'transformation' },
    { number: '25', label: 'Certified Trainers' },
  ]

  return (
    <section className="bg-bg-dark py-16 md:py-20 border-t border-border">
      <div className="max-w-container-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
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
