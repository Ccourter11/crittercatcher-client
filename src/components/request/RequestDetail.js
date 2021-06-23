import React, { useContext, useEffect, useState } from 'react' 
import { useParams, Link, useHistory } from 'react-router-dom'
import { RequestContext } from './RequestProvider'
import { ReviewContext } from '../reviews/ReviewProvider'
import Button from 'react-bootstrap/Button'

export const RequestDetail = () => {
    const history = useHistory()
    const {requestId} = useParams()
    const {getRequestById} = useContext(RequestContext)
    const { addReview, reviews, getReviewById, updateReview } = useContext(ReviewContext)
    const [request, setRequest] = useState({})
    const [requests, setRequests] = useState([])
    const [hidden, setHidden] = useState(true)
    const [review, setReview] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRequestById(requestId)
        .then(setRequest)
    }, [reviews])

    const handleInputChange = e => {
        setReview(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addReview({
            requestId: parseInt(requestId),
            review: review
        })
        .then(getRequestById(requestId))
        setHidden(!hidden)
    }

    const handleClickCancel = () => {
        history.push(`/reviews/detail/${review}`)
    }

    const handleCreate = () => {
        setHidden(!hidden)
    } 

    return (
        <>
        <section className="review">
        <h1>{request.reviews?.map(review =>
            <section key={review.id}>
                {console.log(review)}
                <div>First Name: {review.requestor.user.first_name}</div>
                <div>Last Name: {review.requestor.user.last_name}</div>
                <div>Review: {review.review}</div>
            </section>
            )}</h1>
        {/* <Button variant='warning' onClick={() => history.push(`/reviews/edit/${requests.id}`)}>Edit Review</Button> */}
        <Button onClick={handleCreate}>Create</Button>
        </section>

        <section className="review_form" hidden={hidden}>
        <form className="reviewForm">
            {/* <h2>"Create Review"</h2> */}
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="reviewLabel"></label>
                    <input type="text"
                        placeholder="Enter new review"
                        id="review"
                        onChange={handleInputChange}
                        className="form-control"
                        value={review}></input>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    {review ? <button className="btn btn-primary"
                        disabled={isLoading}
                        onClick={handleClickCancel}>
                        Cancel
                    </button> : ""}
                </div>
            </fieldset>
        </form>
    </section>
    </>    
    )
}