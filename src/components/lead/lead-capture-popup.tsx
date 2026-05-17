'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Sparkles, Shield, TrendingUp, CheckCircle2 } from 'lucide-react'
import { leadCaptureSchema, LeadCaptureInput } from '@/lib/validations'

const POPUP_COOKIE_KEY = '3s_lead_captured'
const POPUP_DELAY = 3000 // 3 seconds

const steps = [
  {
    id: 1,
    title: 'Find Your Perfect Property',
    subtitle: 'Tell us a bit about yourself',
    fields: ['fullName', 'phone', 'email'],
  },
  {
    id: 2,
    title: 'What Are You Looking For?',
    subtitle: 'Help us match you perfectly',
    fields: ['propertyType', 'purpose', 'preferredLocation'],
  },
  {
    id: 3,
    title: 'Budget & Timeline',
    subtitle: 'Almost there!',
    fields: ['budget', 'timeline'],
  },
]

const budgetOptions = [
  'Under 30 Lac', '30-50 Lac', '50-80 Lac', '80L-1 Cr',
  '1-2 Cr', '2-5 Cr', '5 Cr+',
]

const propertyTypes = [
  { value: 'FLAT', label: '🏢 Flat / Apartment', popular: true },
  { value: 'VILLA', label: '🏡 Villa', popular: true },
  { value: 'PLOT', label: '🏗️ Plot / Land' },
  { value: 'COMMERCIAL', label: '🏪 Commercial' },
  { value: 'RENTAL', label: '🔑 Rental', popular: false },
  { value: 'LUXURY', label: '💎 Luxury', popular: true },
  { value: 'AGRICULTURAL', label: '🌾 Agricultural' },
]

const locations = ['Mohali', 'Chandigarh', 'Zirakpur', 'Kharar', 'New Chandigarh', 'Airport Road', 'Other']

const timelines = [
  { value: 'Immediate', label: '⚡ Immediate', color: 'red' },
  { value: '3 Months', label: '📅 3 Months', color: 'orange' },
  { value: '6 Months', label: '🗓️ 6 Months', color: 'blue' },
  { value: 'Exploring', label: '🔍 Exploring', color: 'gray' },
]

export function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedTimeline, setSelectedTimeline] = useState('')

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LeadCaptureInput>({
    resolver: zodResolver(leadCaptureSchema),
  })

  useEffect(() => {
    const captured = localStorage.getItem(POPUP_COOKIE_KEY)
    if (captured) return

    const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem(POPUP_COOKIE_KEY + '_session', '1')
  }

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const onSubmit = async (data: LeadCaptureInput) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...data,
        propertyType: selectedType || data.propertyType,
        purpose: selectedPurpose || data.purpose,
        preferredLocation: selectedLocation || data.preferredLocation,
        budget: selectedBudget || data.budget,
        timeline: selectedTimeline || data.timeline,
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSuccess(true)
        localStorage.setItem(POPUP_COOKIE_KEY, '1')
        setTimeout(() => setIsVisible(false), 3000)
      }
    } catch (error) {
      console.error('Lead capture failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-lg bg-charcoal-950 rounded-2xl overflow-hidden shadow-luxury border border-white/10"
        >
          {/* Gold accent top bar */}
          <div className="h-1 bg-gold-gradient" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <SuccessState />
          ) : (
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
                    Free Property Matching
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-white mb-1">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-white/50 text-sm">{steps[currentStep - 1].subtitle}</p>

                {/* Trust badges */}
                <div className="flex gap-4 mt-4">
                  {[
                    { icon: Shield, label: '100% Private' },
                    { icon: TrendingUp, label: 'Best Deals' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-white/40 text-xs">
                      <Icon className="w-3.5 h-3.5 text-gold-500" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      step.id <= currentStep ? 'bg-gold-gradient' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <FormInput
                      label="Full Name *"
                      placeholder="Eg. Rahul Sharma"
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />
                    <FormInput
                      label="Phone Number *"
                      placeholder="+91 98765 43210"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <FormInput
                      label="Email (optional)"
                      placeholder="your@email.com"
                      type="email"
                      {...register('email')}
                    />
                  </motion.div>
                )}

                {/* Step 2: Property Preferences */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-white/70 text-sm mb-3">Property Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setSelectedType(type.value)}
                            className={`relative px-3 py-2.5 rounded-lg text-sm text-left transition-all border ${
                              selectedType === type.value
                                ? 'border-gold-500 bg-gold-500/10 text-white'
                                : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'
                            }`}
                          >
                            {type.label}
                            {type.popular && (
                              <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">
                                Popular
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-3">Purpose</label>
                      <div className="flex gap-3">
                        {['Investment', 'Self Use', 'Rental Income'].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSelectedPurpose(p)}
                            className={`flex-1 py-2.5 rounded-lg text-sm transition-all border ${
                              selectedPurpose === p
                                ? 'border-gold-500 bg-gold-500/10 text-white'
                                : 'border-white/10 text-white/60 hover:border-white/30'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-3">Preferred Location</label>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => setSelectedLocation(loc)}
                            className={`px-4 py-1.5 rounded-full text-xs transition-all border ${
                              selectedLocation === loc
                                ? 'border-gold-500 bg-gold-500/10 text-white'
                                : 'border-white/10 text-white/50 hover:border-white/30'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Budget & Timeline */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-white/70 text-sm mb-3">Budget Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetOptions.map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`py-2.5 rounded-lg text-sm transition-all border ${
                              selectedBudget === budget
                                ? 'border-gold-500 bg-gold-500/10 text-white'
                                : 'border-white/10 text-white/60 hover:border-white/30'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-3">When do you plan to buy?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timelines.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setSelectedTimeline(t.value)}
                            className={`py-3 rounded-lg text-sm transition-all border ${
                              selectedTimeline === t.value
                                ? 'border-gold-500 bg-gold-500/10 text-white'
                                : 'border-white/10 text-white/60 hover:border-white/30'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-lg text-sm transition-all"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 btn-luxury py-3 rounded-lg text-sm"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-luxury py-3 rounded-lg text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Finding Matches...' : '🏡 Find My Property'}
                    </button>
                  )}
                </div>

                <p className="text-center text-white/30 text-xs">
                  🔒 Your information is 100% private and secure
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-10 text-center"
    >
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-white mb-2">
        We're On It! 🎉
      </h3>
      <p className="text-white/60 text-sm mb-4">
        Our property expert will call you within 30 minutes with the best matching properties.
      </p>
      <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4">
        <p className="text-gold-300 text-sm font-medium">
          ✨ You're a priority client now. Expect exclusive deals!
        </p>
      </div>
    </motion.div>
  )
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const FormInput = ({ label, error, ...props }: FormInputProps) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <input
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
      {...props}
    />
    {error && <p className="mt-1.5 text-red-400 text-xs">{error}</p>}
  </div>
)
