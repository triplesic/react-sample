import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextFieldModule from './modules/TextFieldModule'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';

import { login } from '../actions/AuthActions'

import _ from 'lodash'

const responseErrStyle = {
    backgroundColor: '#ff4281'
}

const responseSuccessStyle = {
    backgroundColor: '#4CAF50'
}

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errors: {},
            snackbarStatus: false,
            responseMsg: '',

        }
    }

    componentDidMount() {
    }

    isValid() {
        let errors = {}

        if (_.isEmpty(this.state.username)) {
            errors.username = "This field is required!"
        }
        if (_.isEmpty(this.state.password)) {
            errors.password = "This field is required!"
        }
        return {
            errors,
            isValid: _.isEmpty(errors)
        }
    }

    login() {
        const { errors, isValid } = this.isValid()

        if (!isValid) {
            this.setState({ errors })
        }
        else {
            this.setState({ errors: {}, isLoading: true })
            this.props.login(this.state)
                .then(
                res => {
                    this.setState({
                        responseMsg: res.data.message,
                        snackbarStatus: true
                    })
                },
                err => {
                    let errData = _.isEmpty(err.response) ? err.name : err.response.data
                    let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
                    this.setState({
                        errors: errData,
                        responseMsg: errMsg,
                        isLoading: false,
                        snackbarStatus: true
                    })
                }
                )
        }
    }

    handleSnackbarClose() {
        this.setState({ snackbarStatus: false })
        if (_.isEmpty(this.state.errors)) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='col-md-5 text-center' style={{ float: 'none', margin: 'auto' }}>
                    <h2>Login</h2>
                    <div className='col-md-12'>
                        <TextFieldModule
                            value={this.state.username}
                            labelName='Username'
                            hintText='username'
                            errorText={this.state.errors.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className='col-md-12'>
                        <TextFieldModule
                            value={this.state.password}
                            labelName='Password'
                            hintText='password'
                            type='password'
                            errorText={this.state.errors.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>

                    <div className='col-md-12'>
                        <RaisedButton
                            label="Login"
                            primary={true}
                            className='common-button'
                            disabled={this.state.isLoading}
                            onClick={this.login.bind(this)} />
                    </div>
                    <Snackbar
                        open={this.state.snackbarStatus}
                        message={this.state.responseMsg}
                        bodyStyle={_.isEmpty(this.state.errors) ? responseSuccessStyle : responseErrStyle}
                        autoHideDuration={2000}
                        onRequestClose={this.handleSnackbarClose.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { login })(Login)