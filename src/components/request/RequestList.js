import React, { useContext, useEffect, useState } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import "./Request.css"
import moment from "moment"

export const RequestList = () => {
    const { requests, getRequests, deleteRequest } = useContext(RequestContext)
    const [ request, setRequests ] = useState({})
    const history = useHistory()

    const handleDelete = (event) => { 
        const [prefix, id] = event.target.id.split("--")
        deleteRequest(id)
        .then(() => {
        history.push("/requests")
      })
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <article className="requests">
            <Button variant="success" className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/requests/new` })
                            }}
                        >New Request</Button>
                        
            {
                requests.map(request => {
                    return <section key={`request--${request.id}`} className="request">
                        
                        <div className="request__title"><strong>Title:</strong> {request.title}</div>
                        <div className="request__description"><strong>Description:</strong> {request.description} </div>
                        <div className="request__location"><strong>Location:</strong> {request.location}</div>
                        <div className="request__time"><strong>Time:</strong> {moment(request.datetime).format('LT')}</div>   
                        <div className="request__time"><strong>Date:</strong> {moment(request.datetime).format('L')}</div>   
                        

                        <div className="request__edit">
                             <Button variant="warning" className="btn btn-3"
                                    onClick={() => history.push(`/requests/${request.id}/edit`)}
                                    >Edit</Button>
                        </div>
                        <Button variant="danger" id={`request--${request.id}`} onClick={handleDelete}>Delete Request</Button>
                        
                    </section>
                })
            }
        </article>
    )
}