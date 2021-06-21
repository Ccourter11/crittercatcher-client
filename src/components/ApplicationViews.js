import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { RequestProvider } from "./request/RequestProvider"
import { RequestList } from "./request/RequestList"
import { RequestForm } from "./request/RequestForm"
import { ServiceList } from './services/ServiceList'

export const ApplicationViews = () => {
    return (
        <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <Home />
            </Route>
            
            <RequestProvider>

                <Route exact path="/requests">
                   <RequestList />
                </Route>

                <Route exact path="/requests/new">
                    <RequestForm />
                </Route> 
                <Route exact path="/requests/:requestId(\d+)/edit">
                    <RequestForm />
                </Route>

                <Route exact path="/services">
                   <ServiceList />
                </Route>

            </RequestProvider>
        </main>
        </>
    )
}