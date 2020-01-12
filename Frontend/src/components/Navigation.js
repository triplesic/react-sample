import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import reactLogo from '../asset/react.svg'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import LoginPersonIco from 'material-ui/svg-icons/social/person';

import AddPersonIco from 'material-ui/svg-icons/social/person-add';
import ExistToApp from 'material-ui/svg-icons/action/exit-to-app';

import { logout } from '../actions/AuthActions'
import { findAllPagesPermissionByUserId } from '../actions'

import history from '../history'

import PropTypes from 'prop-types'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.canViewPage(this)
    }

    logout(e) {
        e.preventDefault()
        this.props.logout()
        this.props.history.push('/login');
    }

    componentDidMount() {
        this.props.findAllPagesPermissionByUserId(this.props.auth.user.id)
    }

    componentWillReceiveProps(nextProps) {
    }

    canViewPage(pageId) {
        try {
            let page = _.find(this.props.permission.pagePermissionList, function (pageRole) { return pageRole.page.id == pageId });
            return page.canView
        } catch (error) {
            return false
        }
    }

    render() {
        const { pathname } = this.props.location;
        const { isAuthenticated, user } = this.props.auth;

        const userLink = (
            <div className='col-md-11 xs-only-text-center text-right no-print' style={{ padding: 'unset' }}>
                <div className='col-md-9 text-left'>
                    <FlatButton
                        label={'Product'}
                        primary={true}
                        className='common-button'
                        style={{ margin: '0.5 em' }}
                        onClick={() => history.push('/product')}
                        disabled={!this.canViewPage(4)}
                    />
                </div>
                <div className='col-md-2'>
                    <div className='col-md-9' style={{ padding: 'unset' }}>
                        <FlatButton
                            label={this.props.auth.user.name}
                            secondary={true}
                            className='common-button'
                            style={{ margin: '0.5 em' }}
                        />
                    </div>
                    <div className='col-md-3'>
                        <RaisedButton
                            className='common-button'
                            label="Logout"
                            labelPosition="before"
                            secondary={true}
                            icon={<ExistToApp />}
                            onClick={this.logout.bind(this)}
                        />
                    </div>
                </div>


            </div>
        )

        const guestLink = (
            <div className='col-md-11 xs-only-text-center text-right no-print'>
                <div className='col-md-7'>

                </div>
                <div className='col-md-4'>
                    <Link to='signup' >
                        <RaisedButton
                            className='common-button'
                            label="Sign up"
                            labelPosition="before"
                            secondary={true}
                            icon={<AddPersonIco />}
                        />
                    </Link>
                    <Link to='login' >
                        <RaisedButton
                            className='common-button'
                            label="Login"
                            labelPosition="before"
                            primary={true}
                            icon={<LoginPersonIco />}
                        />
                    </Link>
                </div>

            </div>
        )

        return (
            <div className='global-toolbar no-print'>
                <div className='row' style={{ 'margin': '0rem' }}>
                    <div className='col-md-1 xs-only-text-center'>
                        <Link to='/'>
                            <span >
                                <img className='img-responsive' src={reactLogo} width="50" height="50" />
                            </span>
                        </Link>
                    </div>
                    {isAuthenticated ? userLink : guestLink}
                </div>
                <hr style={{ border: 'unset' }} />
            </div>
        );
    }
}

Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        permission: state.permission
    }
}

export default withRouter(connect(mapStateToProps, { logout, findAllPagesPermissionByUserId })(Navigation));