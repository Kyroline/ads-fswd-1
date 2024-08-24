import React, { useState } from 'react'

const InputBox = ({ labelClass, onFocusDo = () => { }, onBlurDo = () => { }, className = null, label = undefined, autoFocus = false, type = 'text', value, onChange, placeholder = null, readOnly = false, required = false, limit = null, hideOnClick = true, ...props }) => {
    const [focus, setFocus] = useState(false)

    const onValue = (e) => {
        if (!limit) {
            onChange(e)
            return
        }

        if (e.target.value.length > limit)
            return
        onChange(e)

    }
    return (
        <div className={`${className} flex flex-col w-full`}>
            {label ? <label className={`${labelClass} mb-1`} htmlFor="">{label} {required ? <span className='text-red-600'>*</span> : null}</label> : null}
            <input
                autoFocus={autoFocus ?? false}
                onFocus={() => { setFocus(true); onFocusDo() }}
                onBlur={() => { setFocus(false); onBlurDo() }}
                readOnly={readOnly}
                required={required}
                value={value}
                onChange={onValue}
                type={type ?? 'text'}
                className={`relative p-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md outline-none focus:outline-none ring-0 focus:ring-0 w-full`}
                {...props} />
            {limit ? <div className="flex justify-end mb-4 text-xs">
                <span>{value ? value.length : 0}/{limit}</span>
            </div> : null}
        </div>
    )
}

export default InputBox