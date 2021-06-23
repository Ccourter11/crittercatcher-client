import React, { useState, createContext } from "react"

export const ReviewContext = createContext()

export const ReviewProvider = (props) => {

    const [reviews, setReviews] = useState([])

    const getReviews = () => {
        return fetch("http://localhost:8000/reviews", {
            headers:{
                "Authorization":  `Token ${localStorage.getItem("critter-catcher_token")}`
            }
        })
        .then(response => response.json())
        .then(setReviews)
    }

    const addReview = reviewObj => {
        return fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            },
            body: JSON.stringify(reviewObj)
        })
        .then(getReviews)
    }

    
    const getReviewById = (id) => {
        return fetch(`http://localhost:8000/reviews/${id}`)
            .then(res => res.json())
    }

    const deleteReview = reviewId => {
        return fetch(`http://localhost:8000/reviews/${reviewId}`, {
            method: "DELETE"
        })
            .then(getReviews)
    }

    const updateReview = review => {
        return fetch(`http://localhost:8088/reviews/${review.Id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(review)
        })
          .then(getReviews)
      }

    return (
        <ReviewContext.Provider value={{
            reviews, getReviews, addReview, getReviewById, deleteReview, updateReview
        }}>
            {props.children}
        </ReviewContext.Provider>    
    )
}