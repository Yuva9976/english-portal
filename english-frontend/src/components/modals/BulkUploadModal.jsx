import React, { useState } from 'react';
import apiClient from '../../apiClient';

/**
 * Enhanced BulkUploadModal with types and filters.
 */
const BulkUploadModal = ({ isOpen, onClose, onSuccess, initialType = 'course' }) => {
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState(initialType);
  const [category, setCategory] = useState('General');
  const [level, setLevel] = useState('beginner');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('courseFile', file);
    formData.append('uploadType', uploadType);
    formData.append('category', category);
    formData.append('level', level);

    try {
      const res = await apiClient.post('/tutor/upload-bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        onSuccess(res.data);
        onClose();
        setFile(null);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.details || err.response?.data?.error || 'Upload failed. Please check the format.');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      // Use the existing uploadType from state
      const res = await apiClient.get(`/content-provider/template?type=${uploadType}`, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Determine filename
      let extension = 'xlsx';
      let cleanType = uploadType.replace('-', '_');
      link.setAttribute('download', `${cleanType.charAt(0).toUpperCase() + cleanType.slice(1)}_Template.${extension}`);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download failed:', err);
      setError('Could not download template. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bulk Upload</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <span className="text-2xl">✕</span>
            </button>
          </div>

          <p className="text-slate-500 mb-6 text-sm">Upload a PDF, Text or Excel file to automatically generate your curriculum.</p>

          <div className="space-y-4 mb-8">
            {/* Upload Type */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Upload Content As</label>
              <select 
                value={uploadType} 
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400 transition-all cursor-pointer"
              >
                <option value="course">Full Course (Hierarchy)</option>
                <option value="learning-guide">Learning Guide (Rules/Types)</option>
                <option value="lesson-flow">Lesson Flow (Reading/Writing)</option>
                <option value="quiz">Quiz Set (10+ Questions)</option>
              </select>
            </div>

            {/* Category & Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400 transition-all cursor-pointer"
                >
                  <option value="General">General</option>
                  <option value="Grammar">Grammar</option>
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Target Level</label>
                <select 
                  value={level} 
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400 transition-all cursor-pointer"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* File Input */}
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.txt,.xlsx,.csv"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${file ? 'border-teal-400 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                {file ? (
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">📄</span>
                    <p className="text-sm font-bold text-teal-700 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[10px] text-teal-600 mt-1">Ready to upload</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-3xl text-slate-300 mb-2 block">☁️</span>
                    <p className="text-sm font-bold text-slate-600">Select Document</p>
                    <p className="text-xs text-slate-400 mt-1">Excel, PDF or TXT</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New System Templates:</p>
              <button 
                onClick={handleDownloadTemplate}
                className="w-full py-2 bg-slate-50 border border-slate-100 text-teal-600 text-xs font-bold rounded-xl hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
              >
                <span>📥</span> Download {uploadType.replace('-', ' ')} Template (Excel)
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="flex-[2] py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Analyze & Upload</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-medium text-center leading-relaxed">
            By uploading, you agree that this document correctly follows the <span className="text-teal-600 font-bold">LMS Formatting Guide</span> for automatic parsing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;
