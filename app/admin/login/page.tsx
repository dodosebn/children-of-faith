'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const USERNAME = 'admin'
const PASSWORD = 'secret_p_s_word'

const LoginPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdmin')
    if (isLoggedIn === 'true') {
      router.push('/admin/giftcards')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem('isAdmin', 'true')
        router.push('/admin/giftcards')
      } else {
        setError('Invalid username or password')
        setLoading(false)
      }
    }, 800) // small delay for UX feel
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transform transition-all hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Field with Eye Icon */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4 animate-pulse">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'
          } text-white py-2 rounded transition`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
