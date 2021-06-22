import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReviewContext } from './ReviewProvider'

export const ReviewForm = () => {
    const { getReviews, addReview, getReviewById, updateReview } = useContext(ReviewContext)
    const { reviewId } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    
    const [review, setReview] = useState("")

    
    const handleInputChange = e => {
        setReview(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (reviewId) {
            updateReview({ id: reviewId, label: review })
                .then(() => history.push(`/reviews`))
        } else {
            addReview({ label: review })
            history.push("/reviews")
        }
    }

    const handleClickCancel = () => {
        history.push(`/reviews/detail/${reviewId}`)
    }

    useEffect(() => {
        getReviews().then(() => {
            if (reviewId) {
                getReviewById(reviewId)
                    .then(review => {
                        setReview(review.label)
                        setIsLoading(false)
                    })
            } else {
                // else there is no data
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <section className="review_form">
            <form className="reviewForm">
                <h2>{reviewId ? "Edit Review" : "Create Review"}</h2>
                <fieldset className="form">
                    <div className="form-group">
                        <label htmlFor="reviewLabel">Review</label>
                        <input type="text"
                            placeholder={reviewId ? review : "Enter new review"}
                            id="reviewLabel"
                            onChange={handleInputChange}
                            className="form-control"
                            value={review}></input>
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        {reviewId ? <button className="btn btn-primary"
                            disabled={isLoading}
                            onClick={handleClickCancel}>
                            Cancel
                        </button> : ""}
                    </div>
                </fieldset>
            </form>
        </section>
    )
}