import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App'
import NotFound from './NotFound'

const Router = () => (
    <BrowserRouter>
        <Switch>
            //select route exactly on / and render StorePicker if hit
            <Route exact path="/" component={StorePicker} />
            <Route path="/store/:storeId" component={App}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Router