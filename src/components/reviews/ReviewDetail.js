import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"

export const ReviewDetail = () => {
    const { getReviews, getReviewById, deleteReview, updateReview } = useContext(ReviewContext)
    const [reviews, setReviews] = useState({})
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const { reviewId } = useParams()
    const history = useHistory()

    const confirmDelete = e => {
        setDeleteModalOpen(true)
    }

    const handleDelete = () => {
        deleteReview(reviewId)
            .then(() => {
                history.push("/reviews")
            })
    }

    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        getReviewById(reviewId)
            .then((response) => {
                setReviews(response)
            })
    }, [])

    return (
        <>
            <section className="review">
                <div className="reviewLabel">Review: {reviews?.label}</div>
                <button className="btn btn-primary" onClick={confirmDelete}>Delete Review</button>
                <button className="btn btn-primary" onClick={() => { history.push(`/reviews/edit/${reviews?.id}`) }}>Edit</button>
            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${reviews?.label}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>
        </>
    )
}