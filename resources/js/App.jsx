import React from 'react'
import { RouterProvider } from 'react-router-dom'
import WebRoute from './routes/WebRoute'
import { ModalProvider } from './contexts/ModalContext'

const App = () => {
    return (
        <ModalProvider>
            <RouterProvider router={WebRoute} />
        </ModalProvider>
    )
}

export default App