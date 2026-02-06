import type { ComponentChildren } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'
import PlanSelector from '../component/PlanSelector'
import type { Plan } from '../component/PlanSelector'
import JoinModal from '../component/JoinModal'

interface LayoutProps {
  children: ComponentChildren
}

export default function Layout({ children }: LayoutProps) {
  const [contactOpen, setContactOpen] = useState(false)
  const [planOpen, setPlanOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  // Listen for global openJoinModal event (from HeroSection, CTA sections, etc.)
  useEffect(() => {
    const handler = () => setPlanOpen(true)
    window.addEventListener('openJoinModal', handler)
    return () => window.removeEventListener('openJoinModal', handler)
  }, [])

  const handlePlanContinue = (plan: Plan) => {
    setSelectedPlan(plan)
    setPlanOpen(false)
    // Small delay so close animation finishes before opening next modal
    setTimeout(() => setJoinOpen(true), 320)
  }

  const handleBackToPlan = () => {
    setJoinOpen(false)
    setTimeout(() => setPlanOpen(true), 320)
  }

  const handleJoinClose = () => {
    setJoinOpen(false)
    setSelectedPlan(null)
  }

  return (
    <div className="bg-bg-dark min-h-screen flex flex-col">
      <Header
        onContactClick={() => setContactOpen(true)}
        onJoinClick={() => setPlanOpen(true)}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <PlanSelector isOpen={planOpen} onClose={() => setPlanOpen(false)} onContinue={handlePlanContinue} />
      <JoinModal isOpen={joinOpen} onClose={handleJoinClose} selectedPlan={selectedPlan} onBack={handleBackToPlan} />
    </div>
  )
}
