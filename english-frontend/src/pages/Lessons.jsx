import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../apiClient'

export default function Lessons(){
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try {
        const res = await apiClient.get('/lessons')
        setLessons(res.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  },[])

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Lessons</h2>
      {loading ? <div>Loading...</div> : (
        <div className='grid md:grid-cols-3 gap-6'>
          {lessons.map(lesson => (
            <Link to={'/lessons/'+lesson._id} key={lesson._id} className='block bg-white rounded-lg shadow hover:shadow-md overflow-hidden'>
              <img src={lesson.image || 'https://images.unsplash.com/photo-1520975911162-8b3ed0e7ac7f?q=80&w=800&auto=format&fit=crop'} alt='' className='w-full h-40 object-cover' />
              <div className='p-4'>
                <h3 className='font-semibold'>{lesson.title}</h3>
                <p className='text-sm mt-2'>{lesson.shortDescription || lesson.description?.slice(0,100)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
