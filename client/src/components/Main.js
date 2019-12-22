import React, {useState, useEffect} from 'react';
// import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Content from './Content';
import Login from './Login';
import SignUp from './SignUp';

function Main() {
    return (
        <main className="main" role="main">
            <div className="container">
                {/* <Home /> */}
                {/* <Cities /> */}
                <Content />
                {/* <Login /> */}
                {/* <SignUp /> */}


                {/* <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={SignUp}/>
                </Switch> */}
            </div>
        </main>
    );
}

export default Main;