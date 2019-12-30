import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Main />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;