import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const ListItemLink = ({ to, name, ...rest }) => {
    return (
        <Route
            path={to}
            children={({ match }) => {
                console.log(match)
                return (
                    <li className={match ? 'active' : ''}>
                        <Link to={to} {...rest}>
                            {name}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

const RouteChildren = () => {
    return (
        <div>
            <h3>RouteChildren</h3>
            <Router>
                <ul>
                    <ListItemLink to="/somewhere" name="链接1" />
                    <ListItemLink to="/somewhere-else" name="链接2" />
                </ul>
            </Router>
        </div>
    );
}

export default RouteChildren;
