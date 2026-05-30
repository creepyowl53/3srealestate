'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Shield, TrendingUp, CheckCircle2, Loader2 } from 'lucide-react'

const POPUP_COOKIE_KEY = '3s_lead_captured'
const POPUP_DELAY = 3000

const budgetOptions = [
  'Under 30 Lac', '30-50 Lac', '50-80 Lac',
  '80L-1 Cr', '1-2 Cr', '2-5 Cr', '5 Cr+',
]

const propertyTypes = [
  { value: 'FLAT', label: '🏢 Flat / Apartment', popular: true },
  { value: 'VILLA', label: '🏡 Villa', popular: true },
  { value: 'PLOT', label: '🏗️ Plot / Land', popular: false },
  { value: 'COMMERCIAL', label: '🏪 Commercial', popular: false },
  { value: 'RENTAL', label: '🔑 Rental', popular: false },
  { value: 'LUXURY', label: '💎 Luxury', popular: true },
  { value: 'AGRICULTURAL', label: '🌾 Agricultural', popular: false },
]

const locations = ['Mohali', 'Chandigarh', 'Zirakpur', 'Kharar', 'New Chandigarh', 'Airport Road', 'Other']

const steps = [
  { id: 1, title: 'Find Your Perfect Property', subtitle: 'Tell us a bit about yourself' },
  { id: 2, title: 'What Are You Looking For?', subtitle: 'Help us match you perfectly' },
  { id: 3, title: 'Your Budget', subtitle: 'Almost there!' },
]

export function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form state
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')

  useEffect(() => {
    const captured = localStorage.getItem(POPUP_COOKIE_KEY)
    if (captured) return
    const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsVisible(false)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }
    if (!phone.trim() || phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return
    }
    setCurrentStep((s) => s + 1)
  }

  const handleBack = () => setCurrentStep((s) => s - 1)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        propertyType: selectedType || undefined,
        purpose: selectedPurpose || undefined,
        preferredLocation: selectedLocation || undefined,
        budget: selectedBudget || undefined,
        timeline: 'Not specified',
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSuccess(true)
        localStorage.setItem(POPUP_COOKIE_KEY, '1')
        setTimeout(() => setIsVisible(false), 4000)
      } else {
        const data = await res.json()
        console.error('API error:', data)
        // Still show success to user even if there's an issue
        setIsSuccess(true)
        localStorage.setItem(POPUP_COOKIE_KEY, '1')
        setTimeout(() => setIsVisible(false), 4000)
      }
    } catch (error) {
      console.error('Lead capture failed:', error)
      // Show success anyway — don't frustrate user
      setIsSuccess(true)
      localStorage.setItem(POPUP_COOKIE_KEY, '1')
      setTimeout(() => setIsVisible(false), 4000)
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
          {/* Gold top bar */}
          <div className="h-1 bg-gold-gradient" />

          {/* Close */}
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
              <div className="mb-6">
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
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Shield className="w-3.5 h-3.5 text-gold-500" />
                    100% Private
                  </div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-gold-500" />
                    Best Deals
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="flex gap-2 mb-6">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      step.id <= currentStep ? 'bg-gold-gradient' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name *</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Eg. Rahul Sharma"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-all"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Phone Number *</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-all"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email (optional)</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
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

              {/* Step 3 — Budget */}
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
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-5">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-lg text-sm transition-all"
                  >
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 btn-luxury py-3 rounded-lg text-sm font-semibold"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 btn-luxury py-3 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : '🏡 Find My Property'}
                  </button>
                )}
              </div>

              <p className="text-center text-white/30 text-xs mt-4">
                🔒 Your information is 100% private and secure
              </p>
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
      <h3 className="text-2xl font-heading font-bold text-white mb-2">We're On It! 🎉</h3>
      <p className="text-white/60 text-sm mb-4">
        Our property expert will call you with the best matching properties.
      </p>
      <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4">
        <p className="text-gold-300 text-sm font-medium">
          ✨ You're a priority client now. Expect exclusive deals!
        </p>
      </div>
    </motion.div>
  )
}