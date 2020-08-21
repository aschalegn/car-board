import React, { useState, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import Home from '../Home';
import SignUp from '../User/SignUp';
import LogIn from '../User/LogIn';

export default function NavBarComp() {
    const [isLogedIN, setIsLogedIN] = useState(false);
    const [cookies, setCookie] = useCookies(['connect.sid', 'carboard']);
    useEffect(() => {
        cookies['connect.sid'] || cookies.carboard ? setIsLogedIN(true) : setIsLogedIN(false);
    }, [])
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
                                <Link to="/cars">Cars</Link>
                                <a href="http://localhost:2000/api/user/logout">logout</a>
                            </Fragment>
                            :
                            <Fragment>
                                <Link to="/">Home</Link>
                                <Link to="/user/signup">Signup</Link>
                                <Link to="/user/login">Login</Link>
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
                        <Route exact path="/cars" component={Home} />
                    </Fragment>
                    :
                    <Fragment>
                        <Route exact path="/" component={(props) => <Home {...props} isLogedIN={isLogedIN} />} />
                        <Route exact path="/user/signup" component={SignUp} />
                        <Route exact path="/user/login" component={LogIn} />
                    </Fragment>
                }
            </Switch>
        </Router>
    );
}
