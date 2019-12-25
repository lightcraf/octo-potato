import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Content from "./Content";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
// import ContentPage from "./ContentPage";

function Main() {
    return (
        <main className="main" role="main">
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/content">
                        <Content />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </main>
    );
}

export default Main;