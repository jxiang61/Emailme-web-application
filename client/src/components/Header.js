import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import '../display/dashboard.css';
import Payments from "./Payments";


class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google" className="ui light-blue google button-small">
                            <span style={{marginTop:'10px'}} className='brown-text text-darken-4'>
                                <i className="google icon"/>
                                Login with Google
                            </span>
                        </a>
                    </li>
                )
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key='1.5' style={{margin: '0 0 10px 30px'}}>
                        <i className='material-icons black-text'>attach_money</i>
                    </li>,
                    <li key='2'>
                        <span className='brown-text text-darken-4'>

                            Credits: {this.props.auth.credits}
                        </span>
                    </li>,
                    <li key='3' style={{marginLeft:'10px'}}>
                        <a href="/api/logout">
                            <span className='brown-text text-darken-4'>
                                <i className="google icon"/>
                                Logout
                            </span>
                        </a>
                    </li>
                    ]
        }
    }

    renderLeft() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">
                        <Link
                            id='emailme'
                            to={'/'}
                            className="left brand-logo"
                        >
                            <span className='brown-text text-darken-4'>Emailme</span>
                        </Link>
                    </a></li>
                )
            default:
                return [
                    <li key="5">
                        <Link
                            id='emailme'
                            to={'/'}
                            className="left brand-logo"
                        >
                            <span className='brown-text text-darken-4'>Emailme</span>
                        </Link>
                    </li>,
                    <li key='6'>
                        <span style={{marginLeft:'150px'}}>
                            <Link to='/surveys' className='btn-small'>
                                Dashboard
                            </Link>
                        </span>
                    </li>
                ]
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue lighten-5">
                    <ul>
                        {this.renderLeft()}
                    </ul>
                    <ul className="right ">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);
