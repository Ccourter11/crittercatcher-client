import React, { useState, createContext } from "react"

export const RequestContext = createContext()

export const RequestProvider = (props) => {

    const [requests, setRequests] = useState([])
    // const [categories, setCategories] = useState([])


    const getRequests = () => {
        return fetch("http://localhost:8088/requests", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
        })
        .then(response => response.json())
        .then(requests => setRequests(requests))
    }

    const createRequests = requests => {
        return fetch("http://localhost:8088/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            },
            body: JSON.stringify(requests)
        })
        .then(getRequests)
      }

    const editRequests = (requests) => {
        return fetch(`http://localhost:8000/requests/${requests.id}`, { 
            method: "PUT",
            headers:{
              "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requests)
        })
            .then(getRequests)
    }  


    const getRequestType = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
         })
            .then(response => response.json())
            .then(setRequests)
    }

    const getRequest = (requestId) => {
        return fetch(`http://localhost:8000/requests/${requestId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
        })
        .then(res => res.json())
    }


    return (
        <RequestContext.Provider value={{
          
          requests, createRequests, getRequests, editRequests, getRequestType, getRequest
        }}>
          {props.children}
        </RequestContext.Provider>
      )
}