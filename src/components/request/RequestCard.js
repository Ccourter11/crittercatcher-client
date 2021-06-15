import React from "react"
import { Link } from "react-router-dom"

export const RequestCard = (props) => (
    <div className="requestCard"> 
      <h1 className="request__name">
      <Link to={`/requests/detail/${props.request.id}`}>
        {props.request.title}
      </Link>
      </h1>
      <h1 className="request__date">{props.request.date}</h1>
      <h3></h3>
    </div>
  )