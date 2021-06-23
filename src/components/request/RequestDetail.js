import React, { useContext, useEffect, useState } from 'react' 
import { useParams, Link, useHistory } from 'react-router-dom'
import { RequestContext } from './RequestProvider'
import Button from 'react-bootstrap/Button'

export const RequestDetail = () => {
    const history = useHistory()
    const {requestId} = useParams()
    const {getRequestById} = useContext(RequestContext)
    const [request, setRequest] = useState({})

    useEffect(() => {
        getRequestById(requestId)
        .then(setRequest)
    }, [])

    return (
        <section className="review">
        <h1>{request.reviews?.map(review =>
            <section key={review.id}>
                {console.log(review)}
                <div>First Name: {review.requestor.user.first_name}</div>
                <div>Last Name: {review.requestor.user.last_name}</div>
                <div>Review: {review.review}</div>
            </section>
            )}</h1>
        {/* <Button variant='warning' onClick={() => history.push(`/requests/edit/${requests.id}`)}>Edit Request</Button> */}
        </section>
        
    )
}