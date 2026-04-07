import React from 'react';

/**
 * Premium DashboardHeader Component for the unified dashboard.
 * Redesigned to match the Admin Dashboard aesthetic: White cards with colored icons on the right.
 */
export default function DashboardHeader({ title, subtitle, badgeText = "Portal Dashboard", stats = [] }) {
  const cardThemes = [
    {
      text: 'text-teal-900',
      subtext: 'text-teal-500',
      iconBg: 'bg-teal-100',
      iconText: 'text-teal-600',
      glow: 'shadow-teal-500/10',
      accent: 'bg-teal-50',
    },
    {
      text: 'text-pink-900',
      subtext: 'text-pink-500',
      iconBg: 'bg-pink-100',
      iconText: 'text-pink-600',
      glow: 'shadow-pink-500/10',
      accent: 'bg-pink-50',
    },
    {
      text: 'text-amber-900',
      subtext: 'text-amber-500',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      glow: 'shadow-amber-500/10',
      accent: 'bg-amber-50',
    },
  ];

  return (
    <div className='pt-12 space-y-10'>
      <div className="flex flex-col gap-10 mb-8 px-10 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="space-y-3">
          <h1
            className="text-2xl font-bold mb-1 tracking-tight flex items-center gap-3 uppercase"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#0d9488',
            }}
          >
            <span style={{ color: '#0d9488' }}>✦</span>
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-3xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            {subtitle}
          </p>
        </div>

        {/* Line space between header/subtitle and cards is handled by the space-y-10 and gap-10 above */}

        {/* Stats - Refined White Cards matching Admin style */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const theme = cardThemes[i % cardThemes.length];
              return (
                <div
                  key={i}
                  className={`bg-white border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between shadow-xl ${theme.glow} hover:shadow-2xl hover:border-teal-100 transform transition-all hover:scale-[1.02] group relative overflow-hidden cursor-default`}
                >
                  {/* Decorative background glow (Admin style) */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme.accent} rounded-full translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

                  <div className="relative z-10 space-y-1.5">
                    <div className="text-4xl font-black text-slate-900 tracking-tighter leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className={`text-[11px] font-black ${theme.subtext} uppercase tracking-[0.25em]`}>
                      {stat.label}
                    </div>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl ${theme.iconBg} ${theme.iconText} flex items-center justify-center text-3xl transition-transform group-hover:rotate-6 group-hover:scale-110 relative z-10 shadow-inner`}
                  >
                    {stat.icon}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
