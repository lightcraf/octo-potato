import React from "react";
import { Switch, Route } from "react-router-dom";
import Content from "./Content";
import ContentPage from "./ContentPage";

function ContentRouter() {
    return (
        <Switch>
            <Route exact path="/content">
                <Content />
            </Route>
            <Route path="/content/:id">
                <ContentPage />
            </Route>
        </Switch>
    );
}

export default ContentRouter;