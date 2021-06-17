import React, { useContext, useEffect } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory } from "react-router-dom"

export const RequestList = () => {
    const { request, requests, getRequests } = useContext(RequestContext)

    const history = useHistory()

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <article className="requests">
            <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/requests/new` })
                            }}
                        >New Request</button>
                        
            {
                requests.map(request => {
                    return <section key={`request--${request.id}`} className="request">
                        <div className="request__edit">
                             <button className="btn btn-3"
                                    onClick={() => history.push(`/requests/${request.id}/edit`)}
                                    >Edit</button>
                        </div>
                        <div className="request__title">Title: {request.title}</div>
                        <div className="request__description">Description: {request.description} </div>
                        <div className="request__location">Location: {request.location}</div>
                        
                    </section>
                })
            }
        </article>
    )
}