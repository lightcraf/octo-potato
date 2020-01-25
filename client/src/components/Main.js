import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home/Home";
import Content from "./Content/Content";
import SignIn from "./Registration/SignIn";
import SignUp from "./Registration/SignUp";
import AddContent from "./Content/AddContent";
import NoMatch from "./NoMatch";
import useUserStatus from "./useUserStatus";

function Main() {
    const { isLoggedIn, username } = useUserStatus();

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