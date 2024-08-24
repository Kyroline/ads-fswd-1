import React, { createContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState()

    const showModal = (modal2) => {
        setModal(modal2)
    }

    const hideModal = () => {
        setModal(null)
    }

    return (
        <ModalContext.Provider value={{ showModal: showModal, hideModal: hideModal, modal: modal }}>
            {children}
        </ModalContext.Provider >
    )
}