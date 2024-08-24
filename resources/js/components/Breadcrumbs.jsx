import React from "react"
import { IoChevronForward } from "react-icons/io5"
import { Link } from "react-router-dom"


const Breadcrumbs= ({ nodes }) => {
    return (
        <div className="p-2 flex flex-row items-center">
            {nodes.map((node, index, { length }) => {
                if (length - 1 === index)
                    return <h1 key={index} className="text-primary font-semibold">{node.title}</h1>
                else {
                    return (
                        <div className="flex flex-row items-center" key={index}>
                            <Link to={node.link} className="text-tertiary">{node.title}</Link>
                            <IoChevronForward className="text-tertiary mx-2" />
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Breadcrumbs