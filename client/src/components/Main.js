import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Content from "./Content";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Upload from "./Upload";
// import ContentPage from "./ContentPage";
// import ContentRouter from "./ContentRouter";

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
                {/* <Route exact path="/content/:id">
                    <ContentPage />
                </Route> */}
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/upload">
                    <Upload />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;