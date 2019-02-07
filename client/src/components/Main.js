import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Homepage from './homepage/Homepage';
import RankingsAll from './rankings/RankingsAll';
import Account from './account/Account';

const Main = props => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route exact path="/rankings" component={RankingsAll}></Route>
                <Route exact path="/account/:name" component={Account}></Route>
                <Route path="/" render={() => (<Redirect to="/"/>)}></Route>
            </Switch>
        </div>
    )
}

export default withRouter(Main);
