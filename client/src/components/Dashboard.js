import React from "react";
import {Link} from "react-router-dom";
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {

    return (
        <div>
            <div style={{marginTop:'20px'}} className='ui info message'>
                <h1 style={{fontSize:'3rem',textAlign:'center'}}>
                    <strong>Dashboard</strong>
                </h1>
                <div style={{textAlign:'center', fontSize:'17px'}}>
                    <Link to="/surveys/new" >
                        Click to create a new survey!
                    </Link>

                </div>

            </div>
            <SurveyList />
        </div>
    )
}

export default Dashboard;
