import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { queryBuilder } from '../lib/queryBuilder'
import Pagination from '../components/Pagination'
import Select from '../components/form/Select'
import CutiListTable from '../components/table/CutiListTable'
import CutiListFilter from '../components/filter/CutiListFilter'
import AxiosInstance from '../lib/AxiosInstance'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/form/Button'
import { BsPlus } from 'react-icons/bs'
import useModal from '../hooks/useModal'
import CreateCutiModal from '../modals/CreateCutiModal'

const DataCutiPage = () => {

    const { showModal, hideModal, modal } = useModal()
    const [param, setParam] = useSearchParams()
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = (await AxiosInstance.get(queryBuilder('/api/cuti', [
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

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <Breadcrumbs nodes={[{ title: 'Home', link: '' }, { title: 'Cuti', link: '/cuti' }]} />
                <div className="w-fit">
                    <Button className='flex flex-row bg-primary hover:bg-primary-darker text-white p-2 text-sm' onClick={() => showModal(<CreateCutiModal key={Date.now()} />)}>
                        <BsPlus className='text-lg mr-1' /> Tambahkan Cuti
                    </Button>

                </div>
            </div>
            <div className="flex flex-col mt-2 bg-white">
                <CutiListFilter />
                <div className="w-full overflow-x-auto">
                    <CutiListTable data={data?.data} />
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

export default DataCutiPage