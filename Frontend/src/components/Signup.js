import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextFieldModule from './modules/TextFieldModule'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';

import { signup } from '../actions/AuthActions'

const responseErrStyle = {
    backgroundColor: '#ff4281'
}

const responseSuccessStyle = {
    backgroundColor: '#4CAF50'
}

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            name: '',
            lastname: '',
            isLoading: false,
            errors: {},
            responseMsg: '',
            snackbarStatus: false
        }
    }

    signup() {
        const { errors, isValid } = this.isValid()
        if (!isValid) {
            this.setState({ errors })
        } else {
            this.setState({ errors: {}, isLoading: true })
            this.props.signup(this.state)
                .then(
                res => {
                    this.setState({
                        responseMsg: res.data.message,
                        isLoading: false,
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
    isValid() {
        let errors = {}

        if (_.isEmpty(this.state.username)) {
            errors.username = "This field is required!"
        }
        if (_.isEmpty(this.state.password)) {
            errors.password = "This field is required!"
        }
        if (_.isEmpty(this.state.confirmPassword)) {
            errors.confirmPassword = "This field is required!"
        }
        if (_.isEmpty(this.state.name)) {
            errors.name = "This field is required!"
        }
        if (_.isEmpty(this.state.lastname)) {
            errors.lastname = "This field is required!"
        }

        let passwordValidate = this.validatePassword()

        if (!passwordValidate.isPasswordValid) {
            errors.password = passwordValidate.errMsg.password
            errors.confirmPassword = passwordValidate.errMsg.confirmPassword
        }
        return {
            errors,
            isValid: _.isEmpty(errors)
        }
    }

    validatePassword() {
        let errMsg = {}

        if (!_.isEqual(this.state.password, this.state.confirmPassword)) {
            errMsg.password = "Password not match!"
            errMsg.confirmPassword = "Password not match!"
        } else {
            if (this.state.password.length < 6) {
                errMsg.password = "Password not less than 6 charactors"
                errMsg.confirmPassword = "Password not less than 6 charactors"
            }
        }

        return {
            errMsg,
            isPasswordValid: _.isEmpty(errMsg)
        }
    }



    handleSnackbarClose() {
        this.setState({ snackbarStatus: false })
        if (_.isEmpty(this.state.errors)) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='col-md-5 text-center' style={{ float: 'none', margin: 'auto' }}>
                    <h2>Sign up</h2>

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
                        <TextFieldModule
                            value={this.state.confirmPassword}
                            labelName='Confirm password'
                            hintText='confirm password'
                            type='password'
                            errorText={this.state.errors.confirmPassword}
                            onChange={e => this.setState({ confirmPassword: e.target.value })}
                        />
                    </div>
                    <div className='col-md-12'>
                        <TextFieldModule
                            value={this.state.name}
                            labelName='Name'
                            hintText='Name'
                            errorText={this.state.errors.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className='col-md-12'>
                        <TextFieldModule
                            value={this.state.lastname}
                            labelName='Lastname'
                            hintText='Lastname'
                            errorText={this.state.errors.lastname}
                            onChange={e => this.setState({ lastname: e.target.value })}
                        />
                    </div>
                    <div className='col-md-12'>
                        <RaisedButton
                            label="Sign up"
                            primary={true}
                            className='common-button'
                            disabled={this.state.isLoading}
                            onClick={this.signup.bind(this)} />
                    </div>
                    <Snackbar
                        open={this.state.snackbarStatus}
                        message={this.state.responseMsg}
                        bodyStyle={_.isEmpty(this.state.errors) ? responseSuccessStyle : responseErrStyle}
                        autoHideDuration={3000}
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

export default connect(mapStateToProps, { signup })(Signup)