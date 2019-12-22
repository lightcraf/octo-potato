import React, {useState} from 'react';
// import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ContentMenu from './ContentMenu';

function Cities() {
    const cities = ["London", "Barcelona", "Los Angeles", "New York", "Wigan"]
    const [activeCity, setCity] = useState(null);


    // const toggleNav = () => {
    //     setCity((prevactiveCity) => !prevactiveCity);
    // }
    function toggleNav(city) {
        console.log(city);
        const currentItemId = city !== activeCity ? city : null;
        // this.setState({ currentItemId })
        // console.log(setCity((prevactiveCity) => !prevactiveCity));
        setCity(currentItemId);
    }

    return (
        <>
            {cities.map(city => 
                <p key={city}
                    onClick={() => toggleNav(city)} 
                    style={{ color: activeCity == city ? "red" : "green" }}>
                       {city}
                </p>
            )}
        </>
    );
}
{/* <button className="btn" itemId={city} onClick={toggleNav(city)}>Change data</button> */}

{/* <button className="btn" itemId={d.id} onClick={() => this.toggleModalFunc(d.id)}>Change data</button>
                            {activeCity === city ? "asddad" : null} */}

function Main() {
    return (
        <main className="main" role="main">
            <div className="container">
                {/* <Home /> */}
                <Cities />
                <ContentMenu />
                {/* <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/tours' component={Tours}/>
                <Route path='/services' component={Services}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
                <Route path='/request' component={RequestForm}/>
                </Switch> */}
            </div>
        </main>
    );
}

export default Main;