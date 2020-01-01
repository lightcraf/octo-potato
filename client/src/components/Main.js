import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Content from "./Content";
import ContentPage from "./ContentPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddContent from "./AddContent";

function Main() {
    return (
        <main className="main" role="main">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/content">
                    <Content />
                </Route>
                <Route path="/content/:id">
                    <ContentPage />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/add">
                    <AddContent />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;