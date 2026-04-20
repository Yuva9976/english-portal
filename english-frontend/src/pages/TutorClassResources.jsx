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
    const [activeTab, setActiveTab] = useState('global') // 'global' or 'upload'
    const [globalCourses, setGlobalCourses] = useState([])
    const [globalGuides, setGlobalGuides] = useState([])
    const [globalVocab, setGlobalVocab] = useState([])
    const [form, setForm] = useState({ title: '', type: 'course', url: '', description: '', global_id: '' })
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        if (show) {
            apiClient.get('/teacher-resources/available-courses').then(res => setGlobalCourses(res.data?.courses || []))
            apiClient.get('/teacher-resources/grammar-guides').then(res => setGlobalGuides(res.data?.guides?.filter(g => g.approved) || []))
            apiClient.get('/grammar/topics/vocabulary?approval_status=approved').then(res => setGlobalVocab(res.data || []))
        }
    }, [show])

    if (!show) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            if (activeTab === 'upload') {
                if (!selectedFile) {
                    alert('Please select a PDF file')
                    setSubmitting(false)
                    return
                }
                const formData = new FormData()
                formData.append('file', selectedFile)
                formData.append('classId', classId)
                formData.append('title', form.title || selectedFile.name)
                formData.append('description', form.description)

                await apiClient.post('/tutor/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                let submitData = { ...form }
                if (form.type === 'course') {
                    const selected = globalCourses.find(c => c.id.toString() === form.global_id)
                    submitData.title = selected ? `Course: ${selected.title}` : 'Assigned Course'
                    submitData.url = `/class/${classId}`
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
            }
            onResourceAdded()
            onClose()
            setForm({ title: '', type: 'course', url: '', description: '', global_id: '' })
            setSelectedFile(null)
            setActiveTab('global')
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
                <div className="flex border-b border-slate-100">
                    <button
                        type="button"
                        onClick={() => setActiveTab('global')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'global' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        🌐 Global Library
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('upload')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'upload' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        📤 Tutor Upload
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {activeTab === 'global' ? (
                        <>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Material Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {RESOURCE_TYPES.filter(rt => rt.value !== 'pdf').map(rt => (
                                        <button
                                            type="button"
                                            key={rt.value}
                                            onClick={() => setForm({ ...form, type: rt.value, title: '', url: '', global_id: '' })}
                                            className={`p-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${form.type === rt.value ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                        >
                                            {rt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {form.type === 'course' && (
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Select from Global Library *</label>
                                    <select
                                        value={form.global_id}
                                        onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-xs font-bold"
                                        required
                                    >
                                        <option value="">-- Choose an approved course --</option>
                                        {globalCourses.filter(c => c.status === 'approved' || c.approved).map(c => (
                                            <option key={c.id} value={c.id}>{c.title} ({c.level})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {form.type === 'guide' && (
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Select Grammar Guide *</label>
                                    <select
                                        value={form.global_id}
                                        onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-xs font-bold"
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
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Select Vocabulary Deck *</label>
                                    <select
                                        value={form.global_id}
                                        onChange={(e) => setForm({ ...form, global_id: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-xs font-bold"
                                        required
                                    >
                                        <option value="">-- Choose a vocabulary deck --</option>
                                        {globalVocab.map(v => (
                                            <option key={v.id} value={v.id}>{v.title}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {form.type === 'link' && (
                                <>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Custom Title *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-sm font-bold"
                                            placeholder="e.g., Reading Assignment PDF"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">URL / Link *</label>
                                        <input
                                            type="url"
                                            value={form.url}
                                            onChange={(e) => setForm({ ...form, url: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-sm font-bold"
                                            placeholder="https://..."
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Select PDF File *</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                    required
                                />
                                {selectedFile && <p className="text-[10px] text-teal-600 font-bold mt-2">Selected: {selectedFile.name}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Display Title *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-sm font-bold"
                                    placeholder="e.g., Week 1 Reading.pdf"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Teacher Notes (Optional)</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all resize-none text-xs font-bold"
                            rows={2}
                            placeholder="Add instructions or notes for your class..."
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 mt-2 bg-[#0D9488] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
                    >
                        {submitting ? 'Processing...' : 'Attach Resource ➕'}
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
    const [showBuildDropdown, setShowBuildDropdown] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const fetchResources = useCallback(async () => {
        setLoading(true)
        setError('')
        try {
            const classRes = await apiClient.get(`/tutor/dashboard/classes/${classId}`)
            setResources(classRes.data.resources || [])
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

    const toggleVisibility = async (resourceId, currentVisible) => {
        try {
            await apiClient.patch(`/tutor/dashboard/classes/${classId}/resources/visibility`, {
                resourceId,
                isVisible: !currentVisible
            })
            setSuccessMsg(`Material is now ${!currentVisible ? 'Visible to Students' : 'Hidden'} 👻`)
            fetchResources()
            setTimeout(() => setSuccessMsg(''), 3000)
        } catch (err) {
            console.error('Failed to toggle visibility:', err)
            setError('Failed to update visibility toggle')
        }
    }

    const curriculumDefaults = resources.filter(r => r.isGlobal);
    const tutorChoice = resources.filter(r => !r.isGlobal);

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
                        <div className="flex gap-2 relative">
                            <button
                                onClick={() => navigate('/content-provider/vocabulary')}
                                className="inline-flex items-center gap-1 font-black text-[10px] border border-slate-200 bg-white text-slate-500 rounded-xl px-4 py-2 hover:bg-slate-50 transition-all shadow-sm uppercase tracking-widest"
                            > 
                                📚 Vocab Hub
                            </button>
                            
                            <div className="relative">
                                <button
                                    onClick={() => setShowBuildDropdown(!showBuildDropdown)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-teal-600 text-teal-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-teal-50 transition-all shadow-sm"
                                >
                                    ✨ Build New Documents
                                    <svg className={`w-4 h-4 transition-transform ${showBuildDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {showBuildDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scaleIn">
                                        <button 
                                            onClick={() => navigate(`/content-provider/lessons/${classId}/create`)}
                                            className="w-full px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-teal-50 hover:text-teal-700 border-b border-slate-50 transition-all"
                                        >
                                            📄 New Lesson Flow
                                        </button>
                                        <button 
                                            onClick={() => navigate('/content-provider/lessons')} // Adjust if there's a specific route
                                            className="w-full px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-teal-50 hover:text-teal-700 border-b border-slate-50 transition-all"
                                        >
                                            📖 New Learning Guide
                                        </button>
                                        <button 
                                            onClick={() => navigate('/quizzes')}
                                            className="w-full px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-all"
                                        >
                                            🎯 New Quiz
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20"
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
                    <div className="space-y-12 pt-4">
                        {/* Curriculum Defaults */}
                        {curriculumDefaults.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                                    Curriculum Defaults
                                    <div className="flex-1 h-px bg-slate-100"></div>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {curriculumDefaults.map(resource => (
                                        <div
                                            key={resource.id}
                                            className={`bg-white rounded-3xl border-2 ${resource.isVisible ? 'border-teal-50 shadow-xl shadow-teal-500/5' : 'border-slate-100 opacity-60'} p-6 transition-all group flex flex-col justify-between`}
                                        >
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-xl border border-teal-100 shrink-0 shadow-sm">
                                                    {resource.type === 'course' ? '📚' : resource.type === 'guide' ? '📖' : resource.type === 'vocabulary' ? '🗂️' : resource.type === 'pdf' ? '📄' : '🔗'}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                                        <ResourceTypeChip type={resource.type} />
                                                        <span className="px-2 py-0.5 text-[8px] font-black bg-rose-50 text-rose-600 border border-rose-100 rounded shadow-sm uppercase tracking-widest">System</span>
                                                    </div>
                                                    <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase font-['Outfit'] truncate">{resource.title}</h3>
                                                    {resource.description && <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-1 line-clamp-2 italic">{resource.description}</p>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                                                <button onClick={() => toggleVisibility(resource.id, resource.isVisible)} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${resource.isVisible ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                                                    {resource.isVisible ? '👁️ Visible' : '🙈 Hidden'}
                                                </button>
                                                <button onClick={() => { if (resource.url?.startsWith('/')) { navigate(resource.url) } else { window.open(resource.url, '_blank', 'noopener,noreferrer') } }} className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 shadow-sm transition-all focus:ring-2 focus:ring-teal-500">Visualise</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tutor's Choice */}
                        {tutorChoice.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                                    Tutor Additions
                                    <div className="flex-1 h-px bg-slate-100"></div>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tutorChoice.map(resource => (
                                        <div
                                            key={resource.id}
                                            className={`bg-white rounded-3xl border-2 ${resource.isVisible ? 'border-sky-50 shadow-xl shadow-sky-500/5' : 'border-slate-100 opacity-60'} p-6 transition-all group flex flex-col justify-between`}
                                        >
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-xl border border-sky-100 shrink-0 shadow-sm">
                                                    {resource.type === 'course' ? '📚' : resource.type === 'guide' ? '📖' : resource.type === 'pdf' ? '📄' : '🔗'}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <ResourceTypeChip type={resource.type} />
                                                    </div>
                                                    <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase font-['Outfit'] truncate">{resource.title}</h3>
                                                    {resource.description && <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-1 line-clamp-2 italic">{resource.description}</p>}
                                                </div>
                                            </div>
                                            <div className="space-y-2 pt-4 border-t border-slate-50">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => toggleVisibility(resource.id, resource.isVisible)} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${resource.isVisible ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                                                        {resource.isVisible ? '👁️' : '🙈'}
                                                    </button>
                                                    <button onClick={() => { if (resource.url?.startsWith('/')) { navigate(resource.url) } else { window.open(resource.url, '_blank', 'noopener,noreferrer') } }} className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 shadow-sm transition-all">View</button>
                                                    <button onClick={() => handleDeleteResource(resource.id)} className="p-2 text-slate-400 bg-white border border-slate-100 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">🗑️</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
