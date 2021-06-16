import React, { useState, createContext } from "react"

export const RequestContext = createContext()

export const RequestProvider = (props) => {

    const [requests, setRequests] = useState([])
    const [request, setRequest ] = useState({})
    const [categories, setCategories] = useState([])
    


    const getRequests = () => {
        return fetch("http://localhost:8000/requests", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
        })
        .then(response => response.json())
        .then(setRequests)
    }

    const createRequests = request => {
        return fetch("http://localhost:8000/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            },
            body: JSON.stringify(request)
        })
        .then(getRequests)
      }

    const editRequests = (request) => {
        return fetch(`http://localhost:8000/requests/${request.id}`, { 
            method: "PUT",
            headers:{
              "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(getRequests)
    }  


    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
         })
            .then(response => response.json())
            .then(setCategories)
    }

    const getRequestById = (requestId) => {
        return fetch(`http://localhost:8000/requests/${requestId}`, { 
            headers:{
              "Authorization": `Token ${localStorage.getItem("critter-catcher_token")}`
            }
        })
            .then(res => res.json())
            .then(setRequest)
    }


    return (
        <RequestContext.Provider value={{
          
          request,requests,categories, createRequests, getRequests, editRequests, getCategories, getRequestById
        }}>
          {props.children}
        </RequestContext.Provider>
      )
}