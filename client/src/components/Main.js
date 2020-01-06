import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Content from "./Content";
import ContentPage from "./ContentPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddContent from "./AddContent";

function Main() {
    const location = useLocation();
    const [isLoggedIn, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/verify", {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => {
                    setIsAuthenticated(data.isLoggedIn);
                    setUsername(data.username);
                })
                .catch(err => console.log(err));
        };

        fetchData();
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
                        {/* {isLoggedIn ? <AddContent /> : <Redirect to="/signin" />} */}
                        <AddContent />
                    </Route>
                </Switch>
            </main>
            <Footer />
        </Fragment>
    );
}

export default Main;