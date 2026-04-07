import React from 'react';

/**
 * Premium StatCard Component for the unified dashboard.
 * @param {Object} props
 * @param {string} props.icon - Emoji or icon element
 * @param {string} props.label - Stat label (e.g., "Words Learned")
 * @param {string|number} props.value - Main stat value
 * @param {string} [props.subtitle] - Supporting text
 * @param {string} [props.subtitleIcon] - Optional icon for the subtitle
 */
export default function StatCard({ icon, label, value, subtitle, subtitleIcon }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
          {label}
        </p>
        <div className="text-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '32px', fontWeight: 800, color: '#0d9488', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {value}
        </p>
        <div className="flex items-center gap-1 mt-4 text-teal-600">
          {subtitleIcon && <span className="text-xs">{subtitleIcon}</span>}
          {subtitle && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600 }}>{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
