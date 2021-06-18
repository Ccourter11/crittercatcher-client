import React, { useContext, useState, useEffect } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory, useParams } from 'react-router-dom'
// import "./Request.css"
import Button from 'react-bootstrap/Button'

export const RequestForm = () => {
    const history = useHistory()
    const {  request, categories, getCategories, createRequests, getRequestById, editRequests } = useContext(RequestContext)
    const {requestId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentRequest, setCurrentRequest] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        requestorId: 0,
        categoryId: 0
    })

    /*
        Get category type on initialization so that the <select>
        element presents category size choices to the user.
    */
    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (requestId) {
            getRequestById(requestId)
            .then(request => {
                setCurrentRequest({ 
                    title: request.title,
                    description: request.description,
                    location: request.location,
                    date: request.date,
                    category: request.category,
                    requestor: request.requestor
                })}
            )
        }
    }, [requestId])

    //when something changes, save it with 
    const changeRequestState = (event) => {
        const newRequestState = { ...currentRequest} 
        newRequestState[event.target.name] = event.target.value
        // update state
        setCurrentRequest(newRequestState) 
    }

    return (
        <form className="requestForm">
            {console.log(currentRequest)}
            <h2 className="requestForm__title">Create New Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentRequest.title}
                        onChange={changeRequestState}
                    />
                </div>
            </fieldset>

                      
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                    placeholder="Description"
                    onChange={changeRequestState}
                    value={currentRequest.description}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                    placeholder="Location"
                    onChange={changeRequestState}
                    value={currentRequest.location}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                    onChange={changeRequestState}
                    value={currentRequest.date}/>
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="requestor">Requestor: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                    placeholder="Maker"
                    onChange={changeGameState}
                    value={currentGame.maker}/>
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                     <select value={currentRequest.categoryId} name="categoryId" className="form-control" onChange={changeRequestState}>
                        <option value="0">Select a size</option>
                        {categories.map(cat => (
                             <option key={cat.id} value={cat.id}>
                            {cat.label}
                            {/* because this is react, im looping over something and creating a jsx element, i do need a key, a key needs to be a unquie identifier bc we already have an id that acts like a unique identifier, we use the id as the key. the value of of option tag is going to beid bc thats what we want to capture and then what the user sees is going to be the name  */}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {
            (requestId)
            ? <Button type="submit" variant="warning"
            onClick={evt => {
                evt.preventDefault()
                editRequests({
                    id: requestId,
                    // : currentGame.maker,
                    title: currentRequest.title,
                    description: currentRequest.description,
                    location: currentRequest.location,
                    categoryId: parseInt(currentRequest.categoryId)
                })
                history.push("/requests")
            }
            }     
            className="btn btn-primary">Edit</Button>
                    :           
            <Button variant="success" type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const request = {
                        // maker: currentGame.maker,
                        title: currentRequest.title,
                        description: currentRequest.description,
                        date: currentRequest.date,
                        location: currentRequest.location,
                        categoryId: parseInt(currentRequest.categoryId)
                    }

                    // Send POST request to your API
                    createRequests(request)
                        .then(() => history.push("/requests"))
                }}
                className="btn btn-primary">Save</Button>
                }
        </form>
    )
}