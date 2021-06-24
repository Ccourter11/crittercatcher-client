import React, { useContext, useEffect, useState } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
// import "./Request.css"
import moment from "moment"
import Card from 'react-bootstrap/Card'



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
        <div class="container">
        <article className="requests">
            <Button variant="success" className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/requests/new` })
                            }}
                        >New Request</Button>
                        
            {
                requests.map(request => {
                    return <section key={`request--${request.id}`} className="request">
                                   
                        <Card style={{ width: '18rem' }}>
                        <Card.Header><strong>Request</strong></Card.Header>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title><strong>Title:</strong> {request.title}</Card.Title>
                            <Card.Text><strong>Description:</strong> {request.description}</Card.Text>
                            <Card.Text><strong>Location:</strong> {request.location}</Card.Text>
                            <Card.Text><strong>Date:</strong> {moment(request.date).format('MMMM Do YYYY')}</Card.Text>
                            <div className="image is-4by4"><img src={request.image_url}/></div>
                            <Card.Link href={`/requests/${request.id}`}><strong>Reviews</strong></Card.Link>
                            <div className="request__edit">
                             <Button variant="secondary" className="btn btn-3"
                                    onClick={() => history.push(`/requests/${request.id}/edit`)} 
                                    size="sm">Edit</Button>
                        </div>
                        <Button variant="danger" id={`request--${request.id}`} onClick={handleDelete} size="sm">Delete Request</Button>
                        
                        </Card.Body>
                        </Card>
                        
                    </section>
                })
            }
        </article>
        </div>
    )
}