'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const USERNAME = 'admin'
const PASSWORD = 'password123'

const LoginPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdmin')
    if (isLoggedIn === 'true') {
      router.push('/admin/giftcards')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin/giftcards')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
