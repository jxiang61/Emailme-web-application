import React, {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {

    componentDidMount() {
        //props comes from connect "actions"
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header/>
                        <Route path="/" exact={true} component={Landing}/>
                        <Route path="/surveys" exact={true} component={Dashboard}/>
                        <Route path="/surveys/new" exact={true} component={SurveyNew}/>


                    </div>
                </BrowserRouter>
            </div>
        );
    }

};

export default connect(null, actions)(App);
