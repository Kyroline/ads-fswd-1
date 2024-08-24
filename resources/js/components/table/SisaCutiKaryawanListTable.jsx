import React from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import Button from "../form/Button"
import moment from 'moment'
import { IoPencil, IoTrash } from "react-icons/io5"
// import useModal from '../../hooks/useModal'
// import ConfirmBookDeletion from "../modals/ConfirmBookDeletion"

const columns = [
    {
        title: 'Nomor Induk'
    },
    {
        title: 'Nama'
    },
    {
        title: 'Sisa Cuti (Hari)'
    }
]

const SisaCutiKaryawanListTable = ({ data }) => {
    // const { showModal, hideModal, modal } = useModal()
    // const navigate = useNavigate()
    return (
        <table className="text-xs text-left text-black w-full">
            <thead className="text-xs text-white uppercase bg-primary">
                <tr>
                    {columns?.map((item, index) => (
                        <th key={index} scope="col" className="px-4 py-3">{item.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr className="bg-white border-b">
                        <td className="px-4 py-3">{item.nomor_induk}</td>
                        <td className="px-4 py-3">{item.nama}</td>
                        <td className={`px-4 py-3 font-bold ${item.sisa_cuti > 4 ? 'text-green-600' : item.sisa_cuti > 0 ? 'text-orange-600' : 'text-red-600'}`}>{item.sisa_cuti} {item.sisa_cuti < 0 ? 'MELEBIHI JATAH TAHUNAN' : ''}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SisaCutiKaryawanListTable