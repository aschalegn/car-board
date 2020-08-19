import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import HOME from '../Home';
import SignUp from '../User/SignUp';
import LogIn from '../User/LogIn';


export default function NavBar() {
    const [isLogedIN, setIsLogedIN] = useState(false);
    const [cookies, setCookie] = useCookies(['connect.sid', 'carboard']);
    const logOut = () => {
        axios.get('/api/user/logout')
            .then(res => { 
                isLogedIN()
            })
    }
    return (
        <Router>
            <nav>
                <ul>
                    {cookies['connect.sid'] ?
                        <Fragment>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Cars</Link></li>
                            <li><a href="http://localhost:2000/api/user/logout">logout</a></li>
                        </Fragment>
                        :
                        <Fragment>
                            <li><Link to="/user/signup">Signup</Link></li>
                            <li><Link to="/user/login">Login</Link></li>
                        </Fragment>
                    }
                </ul>
            </nav>
            <Switch>
                {cookies['connect.sid'] ?
                    <Fragment>
                        <Route exact path="/" component={HOME} />
                        <Route exact path="/cars" component={HOME} />
                    </Fragment>
                    :
                    <Fragment>
                        <Route exact path="/user/signup" component={SignUp} />
                        <Route exact path="/user/login" component={LogIn} />
                    </Fragment>
                }
            </Switch>
        </Router>
    );
}
