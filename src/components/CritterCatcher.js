import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"

export function CritterCatcher() {
    return <>
        <Route render={() => {
            if (localStorage.getItem('crittercatcher_token')) {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                )
            } else {
                return <Redirect to="/login" />;
            }
                            }} />
            
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            
        
    </>
}