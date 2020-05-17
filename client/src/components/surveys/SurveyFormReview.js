import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
//withRouter help redirect after submitting the form
//so this SurveyFormReview knows the history object
import {withRouter} from 'react-router-dom';


import FIELDS from "./formFields";
import * as actions from "../../actions";

//props come from SurveyNew and mapStateToProps down here
const SurveyFormReview = (props) => {
    //return an array of div
    const reviewFields = _.map(FIELDS, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {props.formValues[field.name]}
                </div>
            </div>
        )
    });

    return (
        <div>
            <h5> Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 btn-flat"
                onClick={() => props.onCancel()}
            >
                Back
                <i className="material-icons right">undo </i>
            </button>
            <button
                className="green btn-flat right"
                onClick={() => props.submitSurvey(props.formValues, props.history)}
            >
                Send
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
};

//connect to redux store and retrieve and pass down the state
function mapStateToProps(state) {
    return {
        //when we input and submit form values,
        //redux-form will help us pass these values to redux store
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
