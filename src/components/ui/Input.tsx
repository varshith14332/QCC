
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef, type ChangeEvent } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', type = 'text', onChange, ...props }, ref) => {
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                // For security, we sanitize on submit, not on every keystroke
                // This maintains user experience while preparing for backend submission
                onChange(e);
            }
        };

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {label}
                        {props.required && <span className="text-neon-pink ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={`
w - full px - 4 py - 3 rounded - lg
bg - white / 5 backdrop - blur - sm
            border border - white / 20
text - white placeholder - white / 40
focus: outline - none focus: ring - 2 focus: ring - neon - blue focus: border - transparent
transition - all duration - 300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
`}
                    onChange={handleChange}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-white/60">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, helperText, className = '', onChange, ...props }, ref) => {
        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {label}
                        {props.required && <span className="text-neon-pink ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
w - full px - 4 py - 3 rounded - lg
bg - white / 5 backdrop - blur - sm
            border border - white / 20
text - white placeholder - white / 40
focus: outline - none focus: ring - 2 focus: ring - neon - blue focus: border - transparent
transition - all duration - 300
resize - vertical
custom - scrollbar
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
`}
                    onChange={handleChange}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-white/60">{helperText}</p>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {label}
                        {props.required && <span className="text-neon-pink ml-1">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
w - full px - 4 py - 3 rounded - lg
bg - white / 5 backdrop - blur - sm
            border border - white / 20
text - white
focus: outline - none focus: ring - 2 focus: ring - neon - blue focus: border - transparent
transition - all duration - 300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
`}
                    {...props}
                >
                    <option value="" className="bg-quantum-dark">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-quantum-dark">
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
