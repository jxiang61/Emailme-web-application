import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {fetchSurveys} from "../../actions";
import '../../display/dashboard.css';

class SurveyList extends React.Component{

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className='card darken-1' key={survey._id}>
                    <div className="card-content">
                        <span id='d-title' className='card-title'>
                            {survey.title}
                        </span>
                        <p id='d-body'>
                            {survey.body}
                        </p>
                        <p id='d-date' className='right'>
                            Send Date: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className='card-action'>
                        <a>
                            <i className='material-icons'>thumb_up</i>
                            <span style={{marginLeft:'5px'}}> {survey.yes}</span>
                        </a>
                        <a>
                            <i className='material-icons'>thumb_down</i>
                            <span style={{marginLeft:'5px'}}> {survey.no}</span>
                        </a>

                        <Link
                            to={`/surveys/delete/${survey._id}`}
                            className='btn-small right red'
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
};

function mapStateToProps(state) {
    //state.surveys comes from the reducer combination
    return {surveys: Object.values(state.surveys)};
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
