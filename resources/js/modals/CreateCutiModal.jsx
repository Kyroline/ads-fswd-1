import { BsXLg } from "react-icons/bs"
import useModal from "../hooks/useModal"
import Button from "../components/form/Button"
import InputBox from "../components/form/InputBox"
import React, { useEffect, useState } from "react"
import { IoMdSave } from "react-icons/io"
import AxiosInstance from "../lib/AxiosInstance"
import SelectSearchPopup from "../components/form/SelectSearchPopup"

const CreateCutiModal = () => {
    const { showModal, hideModal, modal } = useModal()
    const [nomorInduk, setNomorInduk] = useState('')
    const [tanggalCuti, setTanggalCuti] = useState('')
    const [lamaCuti, setLamaCuti] = useState(1)
    const [loading, setLoading] = useState(false)
    const [karyawan, setKaryawan] = useState([])
    const [selected, setSelected] = useState(null)
    const [keterangan, setKeterangan] = useState('')

    useEffect(() => {
        AxiosInstance.get('/api/karyawan?limit=10000').then(res => setKaryawan(res.data.data))
    }, [])

    const confirmCreate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await AxiosInstance.post('/api/cuti', {
                nomor_induk: selected.nomor_induk,
                tanggal_cuti: tanggalCuti,
                lama_cuti: lamaCuti,
                keterangan: keterangan
            })
            hideModal()
        } catch (error) {

        }
        setLoading(false)
    }
    return (
        <div className="flex flex-col bg-white p-2 rounded-xl z-50 md:w-2/5 w-4/5 relative py-4">
            <BsXLg className='absolute right-4 top-4 w-4 h-4 cursor-pointer' onClick={() => hideModal()} />
            <h1 className="text-center font-bold mb-4">Tambahkan Data Cuti</h1>
            <form className="px-2" onSubmit={confirmCreate}>
                <SelectSearchPopup
                    data={karyawan}
                    selected={selected}
                    label='Karyawan'
                    value={
                        selected ?
                            <div className="bg-secondary text-white p-0.5 rounded-full flex items-center justify-between text-xs px-2 mr-2 cursor-default shadow-2xl">
                                <span>{selected.nomor_induk} - {selected.nama}</span>
                                <span className="ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelected(null) }}><BsXLg /></span>
                            </div>
                            : '- - -'
                    }
                    selectItem={(item, index) => (
                        <label htmlFor="hs-radio-on-right" onClick={() => setSelected(item)} className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 group cursor-pointer">
                            <span className="text-sm text-gray-500 group-hover:text-gray-700">{item.nomor_induk} - {item.nama}</span>
                        </label>
                    )} />
                {/* <InputBox required={true} className='mb-2' label="Karyawan" value={nomorInduk} onChange={e => setNomorInduk(e.target.value)} /> */}
                <InputBox required={true} type='date' className='mb-2' label="Tanggal Cuti" value={tanggalCuti} onChange={e => setTanggalCuti(e.target.value)} />
                <InputBox required={true} type='number' min='0' max='60' className='mb-2' label="Lama Cuti (Hari)" value={lamaCuti} onChange={e => setLamaCuti(e.target.value)} />
                <InputBox required={true} type='text' className='mb-2' label="Keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)} />
                <div className="flex flex-row w-full justify-end items-center mt-2">
                    <Button onClick={() => hideModal()} className="bg-primary hover:bg-primary-darker disabled:bg-tertiary text-white p-2 text-sm mr-1" >Cancel</Button>
                    <Button className="bg-primary hover:bg-primary-darker disabled:bg-tertiary text-white p-2 text-sm ml-1 flex flex-row justify-center h-full">
                        {loading ?
                            <svg aria-hidden="true" class="mr-1 w-5 h-5 text-gray-200 animate-spin fill-tertiary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            :
                            <IoMdSave className="mr-1 text-xl" />
                        }
                        <span>Tambah</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateCutiModal