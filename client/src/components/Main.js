import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import Home from './Home';

function Main() {
    return (
        <main className="main" role="main">
            <Home />
            {/* <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/tours' component={Tours}/>
            <Route path='/services' component={Services}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/login' component={Login}/>
            <Route path='/join' component={Join}/>
            <Route path='/request' component={RequestForm}/>
            </Switch> */}
        </main>
    );
}

export default Main;