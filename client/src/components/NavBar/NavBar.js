import React, { useState, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';
import { Navbar, Nav } from 'react-bootstrap';
import Home from '../Home';
import SignUp from '../User/SignUp';
import LogIn from '../User/LogIn';

export default function NavBarComp() {
    const [isLogedIN, setIsLogedIN] = useState(false);
    const [cookies, removeCookie] = useCookies(['connect.sid', 'carboard']);

    useEffect(() => {
        if (cookies['connect.sid'] || cookies.carboard) setIsLogedIN(true)
        else setIsLogedIN(false);
    }, []);
    const logIN = (status) => {
        setIsLogedIN(!isLogedIN);
    }
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">Car-Board</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {isLogedIN ?
                            <Fragment>
                                <Link to="/">Home</Link>
                                <a href={window.location.host + `/api/user/logout`}
                                    onClick={() => {
                                        removeCookie('carboard', []);
                                        removeCookie('connect.sid', []);
                                    }}>logout
                                </a>
                            </Fragment>
                            :
                            <Fragment>
                                <Link to="/">Home</Link>
                                <Link to="/user/login">Login</Link>
                                <Link to="/user/signup">Signup</Link>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h2>Car Board - <small>Get info about any car </small></h2>
            <Switch>
                {isLogedIN ?
                    <Fragment>
                        <Route exact path="/" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                        <Route exact path="/cars" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                    </Fragment>
                    :
                    <Fragment>
                        <Route exact path="/" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                        <Route exact path="/user/signup" component={(props) => <SignUp {...props} logIN={logIN} />} />
                        <Route exact path="/user/login" component={(props) => <LogIn {...props} logIN={logIN} />} />
                    </Fragment>
                }
            </Switch>
        </Router>
    );
}
