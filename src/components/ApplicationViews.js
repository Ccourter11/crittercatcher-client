import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { RequestProvider } from "./request/RequestProvider"
import { RequestList } from "./request/RequestList"
import { RequestForm } from "./request/RequestForm"
import { ServiceList } from './services/ServiceList'
import { ReviewProvider } from "./reviews/ReviewProvider"
import { ReviewList } from "./reviews/ReviewList"
import { ReviewForm } from "./reviews/ReviewForm"
import { ReviewDetail } from "./reviews/ReviewDetail"

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

            <ReviewProvider>

                <Route exact path="/reviews"> 
                    <ReviewList />
                </Route>

                <Route exact path="/reviews/create">
                    <ReviewForm />
                </Route>

                <Route exact path="/reviews/detail/:reviewId(\d+)">
                    <ReviewDetail />
                </Route>

                <Route exact path="/reviews/edit/:reviewId(\d+)">
                     <ReviewForm />
                </Route
            


            </ReviewProvider>
        </main>
        </>
    )
}