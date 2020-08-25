/* eslint-disable */
import React, { useState, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Navbar, Nav } from 'react-bootstrap';
import Home from '../Home';
import SignUp from '../User/SignUp';
import LogIn from '../User/LogIn';

export default function NavBarComp() {
    const [isLogedIN, setIsLogedIN] = useState(false);
    const [cookies, removeCookie, remove] = useCookies(['connect.sid', 'carboard']);

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
                                <Link href={`/api/user/logout`}
                                    onClick={() => {
                                        remove('connect.sid');
                                        remove('carboard');
                                        setIsLogedIN(false);
                                    }}>logout
                                </Link>
                            </Fragment>
                            :
                            <Fragment>
                                <Link to="/">Home</Link>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                {isLogedIN ?
                    <Fragment>
                        <Route exact path="/" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                        <Route exact path="/cars" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                    </Fragment>
                    :
                    <Fragment>
                        <Route exact path="/" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                        <Route exact path="/signup" component={(props) => <SignUp {...props} logIN={logIN} />} />
                        <Route exact path="/login" component={(props) => <LogIn {...props} logIN={logIN} />} />
                    </Fragment>
                }
            </Switch>
        </Router >
    );
}
