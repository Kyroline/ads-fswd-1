import React from 'react'

const Select = ({ options, value, required = false, labelClass, onSelect, data, label, selectItem }) => {

    return (
        <div className="w-full flex flex-col">
            {label ? <label className={`${labelClass} mb-1`} htmlFor="">{label} {required ? <span className='text-red-600'>*</span> : null}</label> : null}
            <select onChange={e => onSelect(e.target.value)} className='w-full relative p-2.5 h-fit bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md flex items-center cursor-pointer' >
                <option value={''}>---</option>
                {options.map((item, index) => (
                    <option value={item.value} key={index}>{item.display}</option>
                ))}
                {/* <IoChevronDown className={`${active ? 'rotate-180' : ''} absolute right-2 top-0 flex h-full items-center transition-all duration-100`} /> */}
            </select>
        </div>
    )
}

export default Select