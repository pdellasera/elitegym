import { useState, useEffect, useRef } from 'preact/hooks'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 'greeting' | 'name' | 'phone' | 'interest' | 'done'

interface Message {
  from: 'bot' | 'user'
  text: string
}

const INTEREST_OPTIONS = [
  'Membresías',
  'Entrenamiento Personal',
  'Clases Grupales',
  'Horarios e Información',
  'Otro',
]

const TYPING_DELAY = 800

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState<Step>('greeting')
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userInterest, setUserInterest] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }

  const addBotMessage = (text: string) => {
    return new Promise<void>((resolve) => {
      setTyping(true)
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text }])
        setTyping(false)
        resolve()
      }, TYPING_DELAY)
    })
  }

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { from: 'user', text }])
  }

  // Open / close animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      const timer = setTimeout(() => {
        setMounted(false)
        // Reset conversation on close
        setMessages([])
        setStep('greeting')
        setInput('')
        setUserName('')
        setUserPhone('')
        setUserInterest('')
      }, 300)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Start conversation when mounted
  useEffect(() => {
    if (mounted && step === 'greeting' && messages.length === 0) {
      (async () => {
        await addBotMessage('¡Hola! 👋 Soy Marcos, tu asistente virtual de Elite Gym.')
        await addBotMessage('Me encantaría ayudarte. Para empezar, ¿cuál es tu nombre completo?')
        setStep('name')
      })()
    }
  }, [mounted])

  // Auto-scroll on new messages or typing
  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  // Focus input when step changes
  useEffect(() => {
    if (step === 'name' || step === 'phone') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [step, typing])

  const handleSubmit = async () => {
    const value = input.trim()
    if (!value) return

    if (step === 'name') {
      addUserMessage(value)
      setUserName(value)
      setInput('')
      await addBotMessage(`¡Mucho gusto, ${value}! 💪`)
      await addBotMessage('¿Me podrías compartir tu número de teléfono para contactarte?')
      setStep('phone')
    } else if (step === 'phone') {
      addUserMessage(value)
      setUserPhone(value)
      setInput('')
      await addBotMessage('¡Perfecto! Último paso 🎯')
      await addBotMessage('¿Cuál es el tema de tu interés?')
      setStep('interest')
    }
  }

  const sendWhatsApp = (name: string, phone: string, interest: string) => {
    const message = [
      `🏋️ *Nuevo Lead — Elite Gym*`,
      ``,
      `👤 *Nombre:* ${name}`,
      `📞 *Teléfono:* ${phone}`,
      `🎯 *Interés:* ${interest}`,
      ``,
      `_Mensaje enviado desde el asistente virtual del sitio web._`,
    ].join('\n')

    window.open(
      `https://wa.me/573116248414?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleInterestSelect = async (interest: string) => {
    addUserMessage(interest)
    setUserInterest(interest)
    setStep('done')
    await addBotMessage(`¡Excelente elección! Hemos registrado tu interés en "${interest}".`)
    await addBotMessage(`Gracias ${userName}, estamos enviando tu información a un asesor vía WhatsApp... 📲`)

    // Auto-send WhatsApp with lead info
    sendWhatsApp(userName, userPhone, interest)

    await addBotMessage('¡Listo! Se abrió WhatsApp con tu información. Un asesor de Elite Gym te responderá muy pronto. ¡Que tengas un gran día! 🏋️‍♂️')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const getInputPlaceholder = () => {
    if (step === 'name') return 'Escribe tu nombre completo...'
    if (step === 'phone') return 'Ej: 311 624 8414'
    return ''
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4 sm:pb-0 pb-0">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Chat Container */}
      <div
        className={`relative w-full sm:max-w-md bg-bg-darker border border-border sm:rounded-2xl rounded-t-2xl shadow-heavy overflow-hidden flex flex-col transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
        style={{ maxHeight: '85vh', height: '600px' }}
      >
        {/* Chat Header */}
        <div className="bg-bg-dark border-b border-border px-5 py-4 flex items-center gap-3 shrink-0">
          {/* Avatar */}
          <div className="relative">
            <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
              M
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-bg-dark" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-text-light font-semibold text-sm">Marcos</h3>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              En línea
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-bg-gray/50 hover:bg-red-500/20 flex items-center justify-center text-text-gray-light hover:text-red-400 transition-colors"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'bot' && (
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-1">
                  M
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-primary text-white rounded-2xl rounded-br-md'
                    : 'bg-bg-gray text-text-light rounded-2xl rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-1">
                M
              </div>
              <div className="bg-bg-gray rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-text-gray-light/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-text-gray-light/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-text-gray-light/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Interest options as quick-reply chips */}
          {step === 'interest' && !typing && (
            <div className="flex flex-wrap gap-2 pl-9 pt-1">
              {INTEREST_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleInterestSelect(opt)}
                  className="bg-bg-gray hover:bg-primary/20 border border-border hover:border-primary text-text-light text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Final action buttons */}
          {step === 'done' && !typing && (
            <div className="space-y-2 pl-9 pt-2">
              <button
                onClick={() => sendWhatsApp(userName, userPhone, userInterest)}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reenviar por WhatsApp
              </button>
              <button
                onClick={onClose}
                className="w-full bg-bg-gray hover:bg-bg-gray/70 text-text-gray-light text-sm py-2.5 rounded-xl transition-colors"
              >
                Cerrar chat
              </button>
            </div>
          )}
        </div>

        {/* Input area */}
        {(step === 'name' || step === 'phone') && !typing && (
          <div className="border-t border-border px-4 py-3 shrink-0 bg-bg-dark/50">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type={step === 'phone' ? 'tel' : 'text'}
                value={input}
                onInput={(e) => setInput((e.target as HTMLInputElement).value)}
                onKeyDown={handleKeyDown}
                placeholder={getInputPlaceholder()}
                className="flex-1 bg-bg-gray text-text-light text-sm px-4 py-3 rounded-xl border border-border focus:border-primary outline-none transition placeholder:text-text-gray-light/40"
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className="w-11 h-11 bg-primary hover:bg-primary-dark disabled:bg-bg-gray disabled:text-text-gray-light text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Powered by label */}
        <div className="text-center py-2 bg-bg-dark/80 border-t border-border/50 shrink-0">
          <span className="text-text-gray-light/30 text-[10px] uppercase tracking-wider">Elite Gym • Asistente Virtual</span>
        </div>
      </div>
    </div>
  )
}
