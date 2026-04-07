import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

const RESOURCE_TYPES = [
    { value: 'course', label: '📚 Global Course', color: 'bg-pink-100 text-pink-700' },
    { value: 'guide', label: '📖 Grammar Guide', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'vocabulary', label: '🔤 Vocab Deck', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'link', label: '🔗 Web Link', color: 'bg-blue-100 text-blue-700' },
    { value: 'pdf', label: '📄 PDF Document', color: 'bg-red-100 text-red-700' },
]

const ResourceTypeChip = ({ type }) => {
    const rt = RESOURCE_TYPES.find(r => r.value === type) || { value: type, label: type.toUpperCase(), color: 'bg-slate-100 text-slate-700' }
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${rt.color}`}>
            {rt.label}
        </span>
    )
}

const AddResourceModal = ({ show, onClose, classId, onResourceAdded }) => {
    const [submitting, setSubmitting] = useState(false)
    const [globalCourses, setGlobalCourses] = useState([])
    const [globalGuides, setGlobalGuides] = useState([])
    const [globalVocab, setGlobalVocab] = useState([])
    const [form, setForm] = useState({ title: '', type: 'course', url: '', description: '', global_id: '' })

    useEffect(() => {
        if (show) {
            // Fetch the Global Library when modal opens so tutor can select from it
            apiClient.get('/teacher-resources/available-courses').then(res => setGlobalCourses(res.data?.courses || []))
            apiClient.get('/teacher-resources/grammar-guides').then(res => setGlobalGuides(res.data?.guides?.filter(g => g.approved) || []))
            // Fetch approved vocabulary decks
            apiClient.get('/grammar/topics/vocabulary?approval_status=approved').then(res => setGlobalVocab(res.data || []))
        }
    }, [show])

    if (!show) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            // Depending on the type, we structure the URL or reference
            let submitData = { ...form }
            if (form.type === 'course') {
                const selected = globalCourses.find(c => c.id.toString() === form.global_id)
                submitData.title = selected ? `Course: ${selected.title}` : 'Assigned Course'
                submitData.url = `/class/${classId}` // Or wherever courses are viewed
            } else if (form.type === 'guide') {
                const selected = globalGuides.find(g => g.key === form.global_id)
                submitData.title = selected ? `Guide: ${selected.title}` : 'Grammar Guide'
                submitData.url = selected ? selected.route : '#'
            } else if (form.type === 'vocabulary') {
                const selected = globalVocab.find(v => v.id.toString() === form.global_id)
                submitData.title = selected ? `Deck: ${selected.title}` : 'Vocabulary Deck'
                submitData.url = `/grammar/topics/vocabulary/${form.global_id}`
            }

            await apiClient.post(`/classroom/${classId}/resources`, submitData)
            onResourceAdded()
            onClose()
            setForm({ title: '', type: 'course', url: '', description: '', global_id: '' })
        } catch (err) {
            alert('Failed to add resource: ' + (err.response?.data?.error || err.message))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><span>📂</span> Attach Material</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-rose-500 text-2xl leading-none transition-colors">&times;</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Material Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {RESOURCE_TYPES.map(rt => (
                                <button
                                    type="button"
                                    key={rt.value}
                                    onClick={() => setForm({ ...form, type: rt.value, title: '', url: '', global_id: '' })}
                                    className={`p-3 text-sm font-semibold rounded-xl border transition-all ${form.type === rt.value ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                >
                                    {rt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {form.type === 'course' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Select from Global Library *</label>
                            <select
                                value={form.global_id}
                                onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            >
                                <option value="">-- Choose an approved course --</option>
                                {globalCourses.map(c => (
                                    <option key={c.id} value={c.id}>{c.title} ({c.level})</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {form.type === 'guide' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Select Grammar Guide *</label>
                            <select
                                value={form.global_id}
                                onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            >
                                <option value="">-- Choose a grammar guide --</option>
                                {globalGuides.map(g => (
                                    <option key={g.key} value={g.key}>{g.title}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {form.type === 'vocabulary' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Select Vocabulary Deck *</label>
                            <select
                                value={form.global_id}
                                onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                                required
                            >
                                <option value="">-- Choose a vocabulary deck --</option>
                                {globalVocab.map(v => (
                                    <option key={v.id} value={v.id}>{v.title}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {(form.type === 'link' || form.type === 'pdf') && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Custom Title *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                                    placeholder="e.g., Reading Assignment PDF"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">URL / Link *</label>
                                <input
                                    type="url"
                                    value={form.url}
                                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Teacher Notes (Optional)</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                            rows={2}
                            placeholder="Add instructions or notes for your class..."
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 mt-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-sm disabled:opacity-50"
                    >
                        {submitting ? 'Attaching...' : 'Attach to Class'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function TutorClassResources() {
    const { classId } = useParams()
    const navigate = useNavigate()
    const [resources, setResources] = useState([])
    const [classInfo, setClassInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const fetchResources = useCallback(async () => {
        setLoading(true)
        setError('')
        try {
            const [resRes, classRes] = await Promise.all([
                apiClient.get(`/classroom/${classId}/resources`),
                apiClient.get(`/tutor/dashboard/classes/${classId}`)
            ])
            setResources(resRes.data.resources || [])
            setClassInfo(classRes.data)
        } catch (err) {
            console.error('Failed to load resources:', err)
            setError('Failed to load resources')
        } finally {
            setLoading(false)
        }
    }, [classId])

    useEffect(() => {
        fetchResources()
    }, [fetchResources])

    const handleDeleteResource = async (resourceId) => {
        if (!window.confirm('Remove this material from your class?')) return
        try {
            await apiClient.delete(`/classroom/${classId}/resources/${resourceId}`)
            setSuccessMsg('Material removed cleanly ✅')
            fetchResources()
            setTimeout(() => setSuccessMsg(''), 3000)
        } catch (err) {
            console.error('Failed to delete resource:', err)
            setError('Failed to delete resource')
        }
    }

    return (
        <div className="p-8 space-y-6 max-w-6xl mx-auto">
                {/* Back + Header */}
                <div>
                    <button
                        onClick={() => navigate('/tutor/classes')}
                        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
                    >
                        ← Back to Classes
                    </button>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
                                Curriculum Materials {classInfo ? `— ${classInfo.title}` : ''}
                            </h1>
                            <p className="text-slate-500 mt-2 text-sm">
                                Attach official courses, grammar modules, or custom links for your students to access.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/content-provider/vocabulary')}
                                className="inline-flex items-center gap-1 font-semibold text-xs border border-slate-200 bg-white text-slate-600 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors shadow-sm"
                            > 
                                📚 Vocab Builder
                            </button>
                            <button
                                onClick={() => navigate(`/content-provider/lessons/${classId}/create`)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all shadow-sm"
                            >
                                ✨ Build Interactive Lesson
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-sm"
                            >
                                ➕ Attach Material
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {successMsg && (
                    <div className="bg-teal-50 border border-teal-100 text-teal-700 px-5 py-4 rounded-xl text-sm font-semibold flex items-center gap-3">
                        <span>✨</span> {successMsg}
                    </div>
                )}
                {error && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-700 px-5 py-4 rounded-xl flex items-center justify-between font-semibold text-sm">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-rose-500 hover:text-rose-700">&times;</button>
                    </div>
                )}

                {/* Resources List */}
                {loading ? (
                    <div className="space-y-4 pt-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
                                <div className="h-5 bg-slate-200 rounded w-1/3 mb-3"></div>
                                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : resources.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center shadow-sm mt-6">
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">📭</div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">No Materials Attached</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">Assign an approved global course, grammar guide, or upload your own PDF link.</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-sm"
                        >
                            Attach Material
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 pt-6">
                        {resources.map(resource => (
                            <div
                                key={resource.id}
                                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100 shrink-0 group-hover:bg-white group-hover:scale-110 transition-all">
                                        {resource.type === 'course' ? '📚' :
                                         resource.type === 'guide' ? '📖' :
                                         resource.type === 'pdf' ? '📄' : '🔗'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1.5 mt-0.5">
                                            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <ResourceTypeChip type={resource.type} />
                                        </div>
                                        {resource.description && (
                                            <p className="text-sm text-slate-500 mb-2">{resource.description}</p>
                                        )}
                                        {resource.url && (
                                           <a
                                               href={resource.url}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="text-xs font-semibold text-slate-400 hover:text-teal-600 transition-colors truncate block max-w-lg"
                                           >
                                               {resource.url}
                                           </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50 w-full md:w-auto mt-4 md:mt-0">
                                    <button
                                        onClick={() => {
                                            if (resource.url?.startsWith('/')) {
                                                navigate(resource.url)
                                            } else {
                                                window.open(resource.url, '_blank', 'noopener,noreferrer')
                                            }
                                        }}
                                        className="flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-100 rounded-xl hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all"
                                    >
                                        Visualise
                                    </button>
                                    <button
                                        onClick={() => handleDeleteResource(resource.id)}
                                        className="px-4 py-2.5 text-sm font-semibold text-slate-400 bg-white border border-slate-100 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                                        title="Sever Link"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Modal */}
                <AddResourceModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    classId={classId}
                    onResourceAdded={() => {
                        setSuccessMsg('Material officially attached to your cohort! 🎉')
                        fetchResources()
                        setTimeout(() => setSuccessMsg(''), 4000)
                    }}
                />
            </div>
    )
}
