import {Link} from 'react-router-dom';
import React from "react";
import {connect} from 'react-redux';

import history from "../../history";
import Modal from "../Modal";
import {fetchSurvey, deleteSurvey} from "../../actions";

class SurveyDelete extends React.Component {
    //after we finished loading this page, this.props will be automatically rendered for us
    componentDidMount() {
        this.props.fetchSurvey(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                {/*if there's a function inside onClick={}, the function cannot have () at its tail*/}
                <button onClick={() => {this.props.deleteSurvey(id)}} className="ui button negative">
                    Delete
                </button>
                <Link to='/surveys' className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.survey) {
            return 'Are you sure you want to delete this survey?';
        }
        return `Are you sure you want to delete the survey with title: ${this.props.survey.title}?`
    }

    render() {
        return (
            <Modal
                title="Delete Survey"
                content= {this.renderContent()}
                action={this.renderActions()}
                onDismiss={() => history.push('/surveys')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {survey: state.surveys[ownProps.match.params.id]}
}


export default connect(mapStateToProps, {
    fetchSurvey: fetchSurvey,
    deleteSurvey: deleteSurvey
})(SurveyDelete);
