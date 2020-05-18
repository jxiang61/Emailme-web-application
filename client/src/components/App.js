import React, {Component} from "react";
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import history from "../history";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDelete from "./surveys/SurveyDelete";

class App extends Component {

    componentDidMount() {
        //props comes from connect "actions"
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <Router history={history}>
                    <Header/>
                    <div className="container">
                        <Route path="/" exact={true} component={Landing}/>
                        <Route path="/surveys" exact={true} component={Dashboard}/>
                        <Route path="/surveys/new" exact={true} component={SurveyNew}/>
                        <Route path='/surveys/delete/:id' exact={true} component={SurveyDelete}/>

                    </div>
                </Router>
            </div>
        );
    }

};

export default connect(null, actions)(App);
