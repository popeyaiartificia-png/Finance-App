export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const variants = {
        primary: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 hover:shadow-[0_8px_24px_rgba(34,197,94,0.4)]',
        secondary: 'bg-white/5 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 hover:shadow-[0_8px_24px_rgba(239,68,68,0.4)]',
        ghost: 'bg-transparent text-gray-300 hover:bg-white/10 hover:text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-all duration-300 transform hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
