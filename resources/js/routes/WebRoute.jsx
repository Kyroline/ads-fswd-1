import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DataKaryawanPage from '../pages/DataKaryawanPage'
import AddKaryawanPage from '../pages/AddKaryawanPage'
import DataCutiPage from '../pages/DataCutiPage'
import SisaCutiKaryawanPage from '../pages/SisaCutiKaryawanPage'
import LoginPage from '../pages/LoginPage'
import EditKaryawanPage from '../pages/EditKaryawanPage'

const WebRoute = createBrowserRouter([
    {
        path: '',
        element: <AdminLayout />,
        children: [
            {
                path: 'sisa-cuti',
                element: <SisaCutiKaryawanPage />
            },
            {
                path: 'karyawan',
                element: <DataKaryawanPage />,
            },
            {
                path: 'karyawan/tambah',
                element: <AddKaryawanPage />,
            },
            {
                path: 'karyawan/:id',
                element: <EditKaryawanPage />,
            },
            {
                path: 'cuti',
                element: <DataCutiPage />,
            }
        ]
    },
    {
        path: 'login',
        element: <LoginPage />
    }
])

export default WebRoute