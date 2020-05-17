import React from "react";
import _ from "lodash";
//reduxForm here allows us to connect the form store
//Field provides us all kinds of input, like text area, button, etc.
import {reduxForm, Field} from "redux-form";
import {Link} from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from './formFields'

class SurveyForm extends React.Component {

    //return an array contains all Fields
    renderFields() {
        return _.map(FIELDS, field => {
            return <Field
                key={field.name}
                component={SurveyField}
                type='text'
                label={field.label}
                name={field.name}
            />
        })
    }

    render() {
        return (
            <div>
                {/*click the submit button, the arrow function in handleSubmit will be called*/}
                <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>
                    {this.renderFields()}
                    <Link to='/surveys' className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">close</i>
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>

            </div>
        )
    }
}

//values here take in all data in the form
function validate(values) {
    //if errors is empty, we are good to go
    const errors = {};

    //if errors is not empty, redux-form validation watches the errors and stop next steps
    if(!values.title) {
        errors.title = 'You must provide the title.'
    }
    if(!values.subject) {
        errors.subject = 'You must provide the subject.'
    }
    if(!values.content) {
        errors.content = 'You must provide the content.'
    }
    if(!values.recipients) {
        errors.recipients = 'You must provide at least one recipient.'
    }

    //catch invalid emails
    errors.recipients = validateEmails(values.recipients || '');

    return errors;
}


//connect redux-form
//redux-form automatically execute validate
export default reduxForm({
    validate: validate,
    form:'surveyForm',
    //redux-form helper
    //don't clean the form when we decide to back to modify the form before submitting
    destroyOnUnmount: false
})(SurveyForm);
