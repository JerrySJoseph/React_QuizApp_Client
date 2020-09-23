import React from 'react';


import LoginForm from './loginform';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Questions from './questions';
export default function App() {

    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="app">
            <Switch>
                <Route path="/" component={LoginForm} exact />
                <Route path="/quiz" component={Questions} />

            </Switch>

        </div>
    </BrowserRouter>;
}