import React from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import Button from "../form/Button"
import moment from 'moment'
import { IoPencil, IoTrash } from "react-icons/io5"
import useModal from "../../hooks/useModal"
import ConfirmCutiDeletion from '../../modals/ConfirmCutiDeletion'
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
        title: 'Tanggal Cuti'
    },
    {
        title: 'Lama (Hari)'
    },
    {
        title: 'Tanggal Pengajuan'
    },
    {
        title: ''
    }
]

const CutiListTable = ({ data }) => {
    const { showModal, hideModal, modal } = useModal()
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
                        <td className="px-4 py-3">{moment(item.tanggal_cuti).format('DD MMMM YYYY')}</td>
                        <td className="px-4 py-3">{item.lama_cuti}</td>
                        <td className="px-4 py-3">{moment(item.created_at).format('DD MMMM YYYY HH:mm')}</td>
                        <td className="px-4 py-3">
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    onClick={() => { showModal(<ConfirmCutiDeletion key={Date.now()} cutiId={item.id} />) }}
                                    className="rounded-md mb-2 bg-red-600 hover:bg-red-800 p-2 hover:cursor-pointer"
                                ><IoTrash /></div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CutiListTable