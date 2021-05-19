import React from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import Home from '../pages/Home.jsx';
import RouteChildren from '../pages/RouteChildren.jsx';
import Count from '../pages/Count.jsx';
import HocPage from '../pages/HocPage.jsx';
import Recommend from '../pages/Recommend.jsx';

const PrimaryLayout = () => (
    <div>
        <header>
            <Link to="/"> toHome </Link>
            <Link to="/route"> toRouteChildren </Link>
            {/* <Link to="/home">toHome</Link> */}
            <Link to="/hocpage"> toHocPage </Link>
            <Link to="/count"> toCount </Link>
            <Link to="/recommend"> toRecommend </Link>
        </header>
        <main>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/route" component={RouteChildren} />
                {/* <Route path="/home"  component={()=><Home/>} /> // 这样写不好! */}
                <Route path="/hocpage" component={HocPage} />
                <Route path="/count" component={Count} />
                <Route path="/recommend" component={Recommend} />
            </Switch>
        </main>
    </div>
);

export default PrimaryLayout;
