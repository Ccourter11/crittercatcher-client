import React from "react"
import { Link } from "react-router-dom"

export const ReviewCard = ({reviewInstance}) => (
    <section className="Review">   
        <h3 className="ReviewTitle" id={reviewInstance.id}> 
        <Link to={`/reviews/detail/${reviewInstance.id}`}>
            { reviewInstance.label }
          </Link></h3>
    </section>
)