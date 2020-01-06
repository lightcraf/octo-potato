import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Main from "./Main";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;