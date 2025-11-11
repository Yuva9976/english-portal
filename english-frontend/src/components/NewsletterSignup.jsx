import React, { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email')
      return
    }
    // TODO: Connect to backend newsletter API
    console.log('Subscribing:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 to-rose-50 border-2 border-teal-200 rounded-lg p-6">
      <h3 className="font-bold text-slate-800 mb-2">📧 Weekly English Tips</h3>
      <p className="text-sm text-slate-600 mb-4">Get grammar tips, vocabulary, and lesson ideas delivered to your inbox every week.</p>
      
      {subscribed ? (
        <div className="bg-green-50 border border-green-600 text-green-700 px-4 py-2 rounded text-sm font-semibold text-center">
          ✅ Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
          />
          {error && <div className="text-red-600 text-xs">{error}</div>}
          <button
            type="submit"
            className="w-full px-3 py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition text-sm"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
