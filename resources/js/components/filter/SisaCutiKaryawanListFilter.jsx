import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { BsXLg } from "react-icons/bs"
import Select from "../form/Select"
import InputBox from "../form/InputBox"

const SisaCutiKaryawanListFilter = () => {
    const [param, setParam] = useSearchParams()
    const [tahun, setTahun] = useState(param.get('tahun') ?? new Date().getFullYear())

    const submitQuery = e => {
        e.preventDefault()
        if (tahun != '')
            appendParam('tahun', tahun)
        else
            clearParam('tahun')
    }

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
        <div className="p-3 bg-white w-full">
            <div className="flex flex-row flex-wrap mb-2">
                <div className="p-1 w-full max-w-96">
                    <Select
                        onSelect={e => { if (e !== '') appendParam('order_by', e); else clearParam('order_by') }}
                        label='Urutkan Berdasarkan'
                        options={[
                            { value: 'nomor_induk', display: 'Nomor Induk' },
                            { value: 'nama', display: 'Nama' },
                            { value: 'sisa_cuti', display: 'Sisa Cuti' },
                        ]} />
                </div>
                <div className="p-1 grow-0 flex flex-col">
                    <Select
                        onSelect={e => { if (e !== '') appendParam('dir', e); else clearParam('dir') }}
                        label='Arah'
                        options={[
                            { value: 'asc', display: 'Ascending' },
                            { value: 'desc', display: 'Descending' }
                        ]} />
                </div>
                <form className="p-1 grow flex" onSubmit={submitQuery}>
                    <InputBox min='1970' max='2100' type='number' label='Tahun' value={tahun} onChange={e => setTahun(e.target.value)} placeholder="" hideOnClick={true} />
                </form>
            </div>
        </div>
    )
}

export default SisaCutiKaryawanListFilter