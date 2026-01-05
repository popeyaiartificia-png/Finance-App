export default function GlassCard({ children, className = '', hover = true }) {
    return (
        <div
            className={`
        bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${hover ? 'transition-all duration-300 hover:bg-white/8 hover:border-green-500/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(34,197,94,0.15)]' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
