import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FeaturedTopics from '../components/FeaturedTopics'
import LatestLessons from '../components/LatestLessons'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          <FeaturedTopics />
          <LatestLessons />

          {/* TESTIMONIALS */}
          <section className="bg-slate-50 py-12 rounded-lg">
            <div className="px-6">
              <h3 className="text-xl font-semibold mb-6 text-slate-800">What learners say</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-sm text-slate-600">"I finally started speaking confidently after 3 months!"</p>
                  <div className="mt-4 font-semibold">— Priya</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-sm text-slate-600">"Lessons are easy to follow and quizzes are fun."</p>
                  <div className="mt-4 font-semibold">— Ahmed</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-sm text-slate-600">"Dashboard helped me track my progress day by day."</p>
                  <div className="mt-4 font-semibold">— Latha</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>
      </div>

      {/* CTA */}
      <section>
        <div className="container mx-auto px-6 md:px-12 rounded-lg p-8 bg-gradient-to-r from-teal-600 to-rose-400 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold">Ready to improve your English?</h4>
            <p className="mt-2 text-sm">Start with a free lesson and see how quickly you improve.</p>
          </div>
          <div>
            <Link to="/register" className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition">Get started — it's free</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
