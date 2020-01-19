import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Content from "./Content";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddContent from "./AddContent";
import NoMatch from "./NoMatch";

function Main() {
    const location = useLocation();
    const [isLoggedIn, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("/api/verify", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setIsAuthenticated(data.isLoggedIn);
                setUsername(data.username);
            })
            .catch(err => console.log(err));

    }, [location.pathname]);

    return (
        <Fragment>
            <Header isLoggedIn={isLoggedIn} username={username} />
            <main className="main" role="main">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/content">
                        <Content />
                    </Route>
                    <Route path="/signin">
                        {isLoggedIn ? <Redirect to="/" /> : <SignIn />}
                    </Route>
                    <Route path="/signup">
                        {isLoggedIn ? <Redirect to="/" /> : <SignUp />}
                    </Route>
                    <Route path="/add">
                        <AddContent />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </main>
            <Footer />
        </Fragment>
    );
}

export default Main;