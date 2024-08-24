import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../lib/AxiosInstance'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/form/Button'
import InputBox from '../components/form/InputBox'
import useModal from '../hooks/useModal'

const AddKaryawanPage = () => {
    const [nomorInduk, setNomorInduk] = useState('')
    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')
    const [tanggalBergabung, setTanggalBergabung] = useState('')

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitForm = async e => {
        e.preventDefault()
        if (loading)
            return

        setLoading(true)
        try {
            const response = (await AxiosInstance.post('/api/karyawan', {
                nomor_induk: nomorInduk,
                nama: nama,
                alamat: alamat,
                tanggal_lahir: tanggalLahir,
                tanggal_bergabung:tanggalBergabung
            })).data
            navigate('/karyawan')
        } catch (error) {

        }
        setLoading(false)
    }

    let valid = nomorInduk != '' && nama != '' && alamat != '' && tanggalLahir != '' && tanggalBergabung != ''
    console.log(valid)

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <Breadcrumbs nodes={[{ title: 'Home', link: '' }, { title: 'Karyawan', link: '/karyawan' }, { title: 'Tambah Karyawan', link: '/karyawan/tambah' }]} />
            </div>
            <div className="flex flex-col mt-2 bg-white p-2">
                <div className="pb-1 border-b">
                    <h1 className='font-medium text-lg'>Data Diri Karyawan</h1>
                </div>
                <form onSubmit={submitForm} className="flex flex-col">
                    <InputBox className='mb-2' value={nomorInduk} onChange={e => setNomorInduk(e.target.value)} label='Nomor Induk' required={true} />
                    <InputBox className='mb-2' value={nama} onChange={e => setNama(e.target.value)} label='Nama' required={true} />
                    <InputBox className='mb-2' value={alamat} onChange={e => setAlamat(e.target.value)} label='Alamat' required={true} />
                    <InputBox className='mb-2' type='date' onChange={e => setTanggalLahir(e.target.value)} label='Tanggal Lahir' required={true} />
                    <InputBox className='mb-2' type='date' value={tanggalBergabung} onChange={e => setTanggalBergabung(e.target.value)} label='Tanggal Bergabung' required={true} />
                    <div className="p-1 border-t">
                        <Button disabled={(loading || !valid)}>Tambah</Button>
                        </div>
                </form>
            </div>
        </>
    )
}

export default AddKaryawanPage