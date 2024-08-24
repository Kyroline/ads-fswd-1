import React, { useRef, useState } from 'react'
import InputBox from './InputBox'
import { IoChevronDown } from "react-icons/io5";
import useClickOutsideHide from '../../hooks/useClickOutsideHide';


const SelectSearchPopup = ({ value, selected, required = false, labelClass, data, label, selectItem }) => {
    const [searchValue, setSearchValue] = useState('')

    if (selected)
        data = data.filter((item) => selected.nomor_induk != item.nomor_induk)

    if (data && data.length != 0)
        data = data.filter((item) => (item.nama.toLowerCase().search(searchValue.toLowerCase()) != -1))
    const [active, setActive] = useState(false)
    const ref = useRef(null)

    useClickOutsideHide(ref, () => setActive(false))
    return (
        <div className="w-full flex flex-col">
            {label ? <label className={`${labelClass} mb-1`} htmlFor="">{label} {required ? <span className='text-red-600'>*</span> : null}</label> : null}
            <div className='w-full relative p-2.5 h-fit bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md flex items-center cursor-pointer' onClick={(e) => { e.stopPropagation(); setActive(true) }}>
                {value}
                <IoChevronDown className={`${active ? 'rotate-180' : ''} absolute right-2 top-0 flex h-full items-center transition-all duration-100`} />
            </div>
            <div className="w-full relative">
                <div ref={ref} className={`z-10 p-2 w-full absolute top-0 bg-white ${active ? 'max-h-48 visible' : 'max-h-0 invisible pointer-events-none'} overflow-y-auto transition-all`}>
                    <InputBox onFocus={() => { }} onBlur={() => { }} value={searchValue} onChange={e => setSearchValue(e.target.value)} hideOnClick={true} placeholder='Search books here' />
                    <div className="w-full">
                        {data?.map((item, index) => selectItem(item, index))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectSearchPopup