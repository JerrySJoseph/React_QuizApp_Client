import React from 'react';


import LoginForm from './loginform';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Questions from './questions';
export default function App() {

    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="app">
            <Switch>
                <Route path="/" component={LoginForm} />
                <Route path="/quiz" component={Questions} />
                <Route component={<div>404 Page not found</div>} />
            </Switch>
        </div>
    </BrowserRouter>;
}