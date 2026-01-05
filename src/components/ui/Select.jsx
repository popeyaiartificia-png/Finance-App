import { forwardRef } from 'react';

const Select = forwardRef(({
    label,
    error,
    options = [],
    className = '',
    ...props
}, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                className={`
          w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl
          px-4 py-3 text-white
          focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20
          transition-all duration-300
          ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}
          ${className}
        `}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-slate-800 text-white"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
