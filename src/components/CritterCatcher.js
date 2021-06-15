import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/login"
import { Register } from "./auth/register"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"

export function OneLeftFoot() {
    return <>
        <Route render={() => {
            if (localStorage.getItem('olf_token')) {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />
                        <Footer />
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