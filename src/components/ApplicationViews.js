import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { RequestProvider } from "./request/RequestProvider"
import { RequestList } from "./request/RequestList"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            
            <RequestProvider>

                <Route path="/request">
                   <RequestList />
                </Route>

            </RequestProvider>
        </>
    )
}