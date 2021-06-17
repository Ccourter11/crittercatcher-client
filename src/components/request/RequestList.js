import React, { useContext, useEffect } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory } from "react-router-dom"

export const RequestList = () => {
    const { request, requests, getRequests, deleteRequest } = useContext(RequestContext)

    const history = useHistory()
    // const {requestId} = useParams()

    const handleDelete = () => {
        deleteRequest(request.id)
        .then(() => {
        history.push("/requests")
      })
    }

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
                        
                        <div className="request__title">Title: {request.title}</div>
                        <div className="request__description">Description: {request.description} </div>
                        <div className="request__location">Location: {request.location}</div>
                        <div className="request__edit">
                             <button className="btn btn-3"
                                    onClick={() => history.push(`/requests/${request.id}/edit`)}
                                    >Edit</button>
                        </div>
                        <button onClick={handleDelete}>Delete Request</button>
                        
                    </section>
                })
            }
        </article>
    )
}