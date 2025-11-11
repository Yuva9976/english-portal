import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function LessonDetails(){
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    async function load(){
      try {
        const res = await apiClient.get('/lessons/'+id)
        setLesson(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  },[id])

  if (loading) return <div>Loading...</div>
  if (!lesson) return <div>Lesson not found</div>

  return (
    <div className='space-y-6'>
      <div className='bg-white p-6 rounded shadow'>
        <h2 className='text-2xl font-semibold'>{lesson.title}</h2>
        <p className='mt-2 text-sm text-slate-600'>{lesson.description}</p>
      </div>
      <div className='flex gap-3'>
        <button onClick={()=>navigate(`/quiz/${lesson._id}`)} className='px-4 py-2 bg-sky-600 text-white rounded'>Take Quiz</button>
        <a href='#' className='px-4 py-2 border rounded'>Download Lesson (PDF)</a>
      </div>
    </div>
  )
}
