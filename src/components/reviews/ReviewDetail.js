import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"

export const CategoryDetail = () => {
    const { getReviews, getReviewById, deleteReview, updateReview } = useContext(CategoryContext)
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
        getReviewsById(reviewId)
            .then((response) => {
                setReviews(response)
            })
    }, [])

    return (
        <>
            <section className="review">
                <div className="reviewLabel">Review: {review?.label}</div>
                <button className="btn btn-primary" onClick={confirmDelete}>Delete Review</button>
                <button className="btn btn-primary" onClick={() => { history.push(`/reviews/edit/${review?.id}`) }}>Edit</button>
            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${review?.label}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>
        </>
    )
}