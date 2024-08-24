import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../components/layout/AdminNavbar'
import useModal from '../hooks/useModal'
import useSessionStorage from '../hooks/useSessionStorage'

const AdminLayout = () => {
    const { showModal, hideModal, modal } = useModal()
    const [navToggle, setNavToggle] = useState(true)
    const apiKey = useSessionStorage('api_key')
    const navigate = useNavigate()

    useEffect(() => {
        if (!apiKey)
            navigate('/login')
    }, [apiKey])

    return (
        <>
            <div className='flex flex-col w-screen h-screen bg-slate-300 font-ubuntu'>
                <AdminNavbar toggle={navToggle} onToggleNav={() => setNavToggle(prev => !prev)} />
                <div className={`transition-none main text-sm fixed top-[75px] p-4 overflow-auto w-full h-[calc(100vh-75px)] ${navToggle ? 'lg:w-[calc(100vw-250px)] lg:left-[250px]' : ''}`} >
                    <Outlet />
                </div>
            </div>
            <div className={`${modal ? 'visible before:opacity-20' : 'opacity-0 invisible pointer-events-none'} flex justify-center items-center transition-all z-50 fixed inset-0 h-screen w-screen`}>
                <div className={`absolute transition-all inset-0 bg-black ${modal ? 'opacity-20' : 'opacity-0'}`}></div>
                <div className={`${modal ? 'translate-y-0' : '-translate-y-12'} w-full transition-all absolute flex justify-center items-center`}>
                    {modal}
                </div>
            </div>
        </>
    )
}

export default AdminLayout