// Shows the surveyForm and SurveyFormReview

import React from "react";
import {reduxForm} from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

// just use the component state to decide which SurveyForm to show
// also, we can choose to create new route or use redux to do it
class SurveyNew extends React.Component {
    //init state
    //true: show review form
    //false: show the new form
    state = {showFormReview: false};

    renderContent() {
        if(this.state.showFormReview === true) {
            return <SurveyFormReview
                onCancel={() => this.setState({showFormReview: false})}
            />
        }

        //define the onSurveySubmit() function, and pass it as the props to SurveyForm component
        //in the redux-form, once user submits it, call this function
        return <SurveyForm
            onSurveySubmit={() => this.setState({showFormReview: true})
            }
        />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
