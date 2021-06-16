import React, { useContext, useState, useEffect } from "react"
import { RequestContext } from "./RequestProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const RequestForm = () => {
    const history = useHistory()
    const { getRequests, createRequests, editRequests, getRequestType, getRequests } = useContext(RequestContext)
    const {requestId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentRequest, setCurrentRequest] = useState({
        description: "",
        location: "",
        title: "",
        requestorId: 0,
        categoryId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getRequestType()
    }, [])

    useEffect(() => {
        if (requestId) {
            getRequest(requestId).then(request => {
                setCurrentRequest({
                    description: request.description,
                    location: request.location,
                    title: request.title,
                    requestTypeId: request.requestType.id,
                    requestor: request.requestor
                })
            })
        }
    }, [requestId])

    /*
        REFACTOR CHALLENGE START
        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?
        One hint: [event.target.name]
    */

    const changeRequestState = (event) => {
        const newRequestState = { ...currentRequest} 
        newRequestState[event.target.name] = event.target.value
        setCurrentRequest(newRequestState) 
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="requestForm">
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

{/*                       
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                    placeholder="Number of Players"
                    onChange={changeGameState}
                    value={currentGame.numberOfPlayers}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                    placeholder="Skill Level"
                    onChange={changeGameState}
                    value={currentGame.skillLevel}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                    placeholder="Maker"
                    onChange={changeGameState}
                    value={currentGame.maker}/>
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Type of Game: </label>
                     <select value={currentGame.gameTypeId} name="gameTypeId" className="form-control" onChange={changeGameState}>
                        <option value="0">Select a type</option>
                        {gameTypes.map(gt => (
                             <option key={gt.id} value={gt.id}>
                            {gt.label}
                            {/* because this is react, im looping over something and creating a jsx element, i do need a key, a key needs to be a unquie identifier bc we already have an id that acts like a unique identifier, we use the id as the key. the value of of option tag is going to beid bc thats what we want to capture and then what the user sees is going to be the name  */}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {
            (gameId)
            ? <button type="submit"
            onClick={evt => {
                evt.preventDefault()
                editGame({
                    id: gameId,
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                })
                history.push("/games")
            }
            }     
            className="btn btn-primary">Edit</button>
                    :           
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
                }
        </form>
    )
}