import React, { useEffect, useState } from 'react'
import apiClient from '../apiClient'

export default function AdminDashboard(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try {
        const res = await apiClient.get('/auth/me')
        setUser(res.data?.user)
      } catch (err) {
        console.error(err)
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }
    load()
  },[])

  if (loading) return <div className="text-center py-8">Loading...</div>

  if (error) return <div className="text-red-600 text-center py-8">{error}</div>

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h2>
        <div className='px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg font-semibold'>
          🛡️ Administrator
        </div>
      </div>

      {/* Welcome Card */}
      <div className='bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white p-8 rounded-lg shadow-lg'>
        <h3 className='text-2xl font-bold mb-2'>Welcome, Admin!</h3>
        <p className='text-teal-100'>You have full access to system management and user controls.</p>
      </div>

      {/* User Info Card */}
      <div className='bg-white p-6 rounded-lg shadow'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>Profile Information</h3>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Name:</span>
            <span className='font-semibold text-gray-800'>{user?.name || 'N/A'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Email:</span>
            <span className='font-semibold text-gray-800'>{user?.email || 'N/A'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Role:</span>
            <span className='font-semibold text-teal-700 uppercase'>{user?.role || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Admin Features */}
      <div className='grid md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
          <div className='text-3xl mb-3'>👥</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>User Management</h4>
          <p className='text-sm text-gray-600'>Manage all registered users and their roles</p>
          <button className='mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm'>
            Manage Users
          </button>
        </div>

        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
          <div className='text-3xl mb-3'>📚</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>Content Management</h4>
          <p className='text-sm text-gray-600'>Create and manage learning content and lessons</p>
          <button className='mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm'>
            Manage Content
          </button>
        </div>

        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
          <div className='text-3xl mb-3'>📊</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>Analytics</h4>
          <p className='text-sm text-gray-600'>View system statistics and user progress reports</p>
          <button className='mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm'>
            View Analytics
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid md:grid-cols-4 gap-4'>
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-300'>
          <div className='text-3xl font-bold text-blue-600'>0</div>
          <div className='text-sm text-gray-600 mt-2'>Total Users</div>
        </div>
        <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-300'>
          <div className='text-3xl font-bold text-green-600'>0</div>
          <div className='text-sm text-gray-600 mt-2'>Active Users</div>
        </div>
        <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-300'>
          <div className='text-3xl font-bold text-yellow-600'>0</div>
          <div className='text-sm text-gray-600 mt-2'>Lessons Created</div>
        </div>
        <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-300'>
          <div className='text-3xl font-bold text-purple-600'>0</div>
          <div className='text-sm text-gray-600 mt-2'>Quiz Attempts</div>
        </div>
      </div>
    </div>
  )
}
