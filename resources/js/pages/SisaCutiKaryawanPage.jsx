import React, { useEffect, useState } from 'react'
import SisaCutiKaryawanListFilter from '../components/filter/SisaCutiKaryawanListFilter'
import { useSearchParams } from 'react-router-dom'
import { queryBuilder } from '../lib/queryBuilder'
import Pagination from '../components/Pagination'
import Select from '../components/form/Select'
import SisaCutiKaryawanListTable from '../components/table/SisaCutiKaryawanListTable'
import AxiosInstance from '../lib/AxiosInstance'
import Breadcrumbs from '../components/Breadcrumbs'

const SisaCutiKaryawanPage = () => {

    const [param, setParam] = useSearchParams()
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = (await AxiosInstance.get(queryBuilder('/api/karyawan/sisa-cuti', [
                {
                    query: 'tahun',
                    value: param.get('tahun') ?? new Date().getFullYear()
                },
                {
                    query: 'q',
                    value: param.get('q') ?? ''
                },
                {
                    query: 'order_by',
                    value: param.get('order_by') ?? 'id'
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

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <Breadcrumbs nodes={[{ title: 'Home', link: '' }, { title: 'Cuti', link: '/cuti' }, { title: 'Sisa Cuti', link: '/sisa-cuti' }]} />
            </div>
            <div className="flex flex-col mt-2 bg-white">
                <SisaCutiKaryawanListFilter />
                <div className="w-full overflow-x-auto">
                    <SisaCutiKaryawanListTable data={data?.data} />
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

export default SisaCutiKaryawanPage