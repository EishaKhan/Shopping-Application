import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Core/Main';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/card-display" exact component={Main} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;