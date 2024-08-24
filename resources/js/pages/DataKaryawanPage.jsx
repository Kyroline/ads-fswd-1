import React, { useEffect, useState } from 'react'
import KaryawanListTable from '../components/table/KaryawanListTable'
import axios from 'axios'
import KaryawanListFilter from '../components/filter/KaryawanListFilter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { queryBuilder } from '../lib/queryBuilder'
import Pagination from '../components/Pagination'
import Select from '../components/form/Select'
import AxiosInstance from '../lib/AxiosInstance'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/form/Button'
import { BsPlus } from 'react-icons/bs'

const DataKaryawanPage = () => {

    const [param, setParam] = useSearchParams()
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = (await AxiosInstance.get(queryBuilder('/api/karyawan', [
                {
                    query: 'order_by',
                    value: param.get('order_by') ?? 'id'
                },
                {
                    query: 'q',
                    value: param.get('q') ?? ''
                },
                {
                    query: 'dir',
                    value: param.get('dir') ?? 'asc'
                },
                {
                    query: 'page',
                    value: param.get('page') ?? 1
                },
                {
                    query: 'limit',
                    value: param.get('limit') ?? 10
                }
            ]))).data
            setData(data)
        }

        getData()
    }, [param])



    const appendParam = (key, value) => {
        const newParams = new URLSearchParams(param.toString())
        newParams.set(key, value)
        setParam(newParams)
    }

    const clearParam = (key) => {
        const newParams = new URLSearchParams(param.toString())
        newParams.delete(key)
        setParam(newParams)
    }

    const navigate = useNavigate()

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <Breadcrumbs nodes={[{ title: 'Home', link: '' }, { title: 'Karyawan', link: '/karyawan' }]} />
                <div className="w-fit">
                    <Button className='flex flex-row bg-primary hover:bg-primary-darker text-white p-2 text-sm' onClick={() => navigate('/karyawan/tambah')}>
                        <BsPlus className='text-lg mr-1'/> Tambah Karyawan</Button></div>
            </div>
            <div className="flex flex-col mt-2 bg-white">
                <KaryawanListFilter />
                <div className="w-full overflow-x-auto">
                    <KaryawanListTable data={data?.data} />
                </div>
                <div className="w-full mb-2 flex flex-row justify-between items-center px-4">
                    <Pagination
                        total={data?.meta?.total}
                    />
                    <div className="w-fit">
                        <Select
                            onSelect={e => { if (e !== '') appendParam('limit', e); else clearParam('limit') }}
                            label='Jumlah per Halaman'
                            options={[
                                {
                                    value: '10',
                                    display: '10'
                                },
                                {
                                    value: '25',
                                    display: '25'
                                },
                                {
                                    value: '50',
                                    display: '50'
                                },
                                {
                                    value: '100',
                                    display: '100'
                                }
                            ]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataKaryawanPage