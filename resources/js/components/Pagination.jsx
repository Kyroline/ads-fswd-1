import React, { useState, useEffect } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ total }) => {
    const [param, setParam] = useSearchParams()
    const totalPage = Math.ceil(total / Number(param.get('limit') ?? 10))

    const page = Number(param.get('page') ?? 1) 
    const limit = Number(param.get('limit') ?? 10)

    console.log(page)
    console.log(totalPage)

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

    const onLastPagePressed = () => {
        if (page <= totalPage) {
            appendParam('page', totalPage)
        }
    }

    const onFirstPagePressed = () => {
        if (page >= 1) {
            appendParam('page', 1)
        }
    }

    const onNextPressed = () => {
        if (page < totalPage) {
            appendParam('page', page + 1)
        }
    }

    const onPrevPressed = () => {
        if (page > 1) {
            appendParam('page', page - 1)
        }
    }

    const onPagePressed = (s) => {
        appendParam('page', s)
    }

    const changeLimit = e => {
        appendParam('limit', e.target.value)
        appendParam('page', 1)
        // setLimit(e.target.value)
        // setPage(1)
    }

    return (
        <nav className='flex flex-row justify-center items-center text-white font-medium'>
            {page > 1 ? (
                <>
                    <button onClick={onFirstPagePressed} className='border-0 p-2 m-1 bg-primary'>
                        <i className='bi bi-chevron-double-left h-5 w-5 text-white'></i>
                        <BsChevronDoubleLeft className='h-5 w-5' />
                    </button>
                    <button onClick={onPrevPressed} className='border-0 p-2 m-1 bg-primary'>
                        <i className='bi bi-chevron-left h-5 w-5 text-white'></i>
                        <BsChevronLeft className='h-5 w-5' />
                    </button>
                </>
            ) : ('')}
            {(() => {
                let startPosition = page - 3
                while (startPosition < 0) {
                    startPosition += 1
                }
                while (startPosition + 5 > totalPage) {
                    startPosition -= 1
                }
                const elements = []
                for (let i = startPosition; i < startPosition + 5; i++) {
                    if (i < 0)
                        continue
                    if (i + 1 == page) {
                        elements.push(
                            <button className='p-2 m-1 px-4 bg-white border border-primary text-black'>{i + 1}</button>
                        )
                    }
                    else {
                        elements.push(
                            <button onClick={() => onPagePressed(i + 1)} className='border-0 p-2 m-1 px-4 bg-primary'>{i + 1}</button>
                        )
                    }
                }
                return elements
            })()}

            {page < totalPage ? (
                <>
                    <button onClick={onNextPressed} className='border-0 p-2 m-1 bg-primary'>
                        <BsChevronRight className='h-5 w-5' />
                    </button>
                    <button onClick={onLastPagePressed} className='border-0 p-2 m-1 bg-primary'>
                        <BsChevronDoubleRight className='h-5 w-5' />
                    </button>
                </>) : ''}
        </nav>
    )
}

export default Pagination