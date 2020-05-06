import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import ChartDashboard from "./components/ChartDashboard";
import Header from "./components/Header";
function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path='/covid19/' component={CovidDashboard} />
                    <Route exact path='/covid19/map' component={CovidDashboard} />
                    <Route exact path='/covid19/stats' component={ChartDashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
