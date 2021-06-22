import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"
import { ReviewCard } from "./ReviewCard"

export const ReviewList = () => {
    const { reviews, getReviews} = useContext(ReviewContext)

    // useState to return filtered reviews
    const history = useHistory()
  
    // Initialization effect hook -> Go get Category data
    useEffect(() => {
      getReviews()
    }, [])

    return (
      <>
        <section className="ReviewList">
          <h1> Review List </h1>
          <button className="btn btn-primary" onClick={() => history.push("/reviews/create")}> Create Review </button>
          <div className="Reviews">
            {
            reviews.map(review => {
              return <ReviewCard key={review.id} reviewInstance={review} />
            })
            }
            </div>
        </section>
      </>
      )}