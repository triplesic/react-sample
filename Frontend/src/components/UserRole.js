import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextFieldModule from './modules/TextfieldModule'
import DropdownModule from './modules/DropdownModule'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import Snackbar from 'material-ui/Snackbar'

import unauthorized from '../asset/unauthorized.png'
import * as UIUtil from '../helpers/util/ui-utils'
import update from 'immutability-helper'

import {
    hasPermission,
    fetchAllUsers,
    fetchAllRoles,
    updateUserRole,
    findAllPagesPermissionByUserId,
    changePassword,
    hideSnackbarMsg
} from '../actions'

class UserRole extends Component {
    constructor(props) {
        super(props)
        this.canUpdatePage.bind(this)
        this.state = {
            users: [],
            snackbarStatus: false,
            responseMsg: '',
            isChangePasswordDialogOpen: false,
            changePasswordUserId: 0,
            passwordNoEncrypted: '',
            passwordNoEncrypted2: '',
            errors: {}
        }
    }

    canUpdatePage(pageId) {
        try {
            let page = _.find(this.props.permission.pagePermissionList, function (pageRole) { return pageRole.page.id == pageId });
            return page.canUpdate
        } catch (error) {
            return false
        }
    }

    componentDidMount() {
        this.props.hasPermission(10, this.props.auth.user.id)
        this.props.findAllPagesPermissionByUserId(this.props.auth.user.id)
        this.props.fetchAllUsers()
        this.props.fetchAllRoles()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users != undefined) {
            this.setState({
                users: nextProps.users
            })
        }
        if (!_.isEmpty(nextProps.snackbarMsg.responseMsg)) {
            this.setState({
                responseMsg: nextProps.snackbarMsg.responseMsg,
                snackbarStatus: true
            })
        }
    }

    updateUserList() {
        this.props.updateUserRole(this.state.users)
    }

    handleNameChange(idx, e) {
        let userState = this.state.users
        userState[idx].name = e.target.value
        this.setState({
            users: userState
        })
    }

    handleLastNameChange(idx, e) {
        let userState = this.state.users
        userState[idx].lastname = e.target.value
        this.setState({
            users: userState
        })
    }

    handleRoleDropdownChange(idx, evt, key, value) {
        let userState = this.state.users
        userState[idx].roleId = value
        this.setState({
            users: userState
        })
    }

    handleSnackbarClose() {
        this.setState({ snackbarStatus: false })
        this.props.hideSnackbarMsg()
    }

    handleChangePasswordDialogClose() {
        this.setState({
            isChangePasswordDialogOpen: false,
            passwordNoEncrypted: '',
            passwordNoEncrypted2: ''
        })
    }

    handleChangePasswordDialogOpen(idx) {
        let userState = this.state.users
        this.setState({
            isChangePasswordDialogOpen: true,
            changePasswordUserId: userState[idx].id,
            errors: update(this.state.errors, {
                passwordNoEncrypted: { $set: '' },
                passwordNoEncrypted2: { $set: '' }
            })
        })
    }

    handleChangePassword() {
        if (this.state.passwordNoEncrypted == this.state.passwordNoEncrypted2) {
            let userDto = { id: this.state.changePasswordUserId, passwordNoEncrypted: this.state.passwordNoEncrypted }
            this.props.changePassword(userDto)
            this.setState({
                isChangePasswordDialogOpen: false
            })
        } else {
            this.setState({
                errors: update(this.state.errors, {
                    passwordNoEncrypted: { $set: 'password not match!!' },
                    passwordNoEncrypted2: { $set: 'password not match!!' }
                })
            })
        }

    }

    checkConfirmPassword() {
        if (this.state.passwordNoEncrypted.length < 6) {
            this.setState({
                errors: update(this.state.errors, {
                    passwordNoEncrypted: { $set: 'Password not less than 6 charactors' },
                    passwordNoEncrypted2: { $set: '' }
                })
            })
        }else if (this.state.passwordNoEncrypted == this.state.passwordNoEncrypted2) {
            this.setState({
                errors: {}
            })
        } else {
            this.setState({
                errors: update(this.state.errors, {
                    passwordNoEncrypted: { $set: 'password not match!!' },
                    passwordNoEncrypted2: { $set: 'password not match!!' }
                })
            })
        }
    }

    render() {
        if (!this.props.permission.canView) {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <img src={unauthorized} className='img-fluid' style={{ width: '100px' }} />
                            <h2>No permission to access this page</h2>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h1>User Role Management</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            {
                                _.map(this.state.users, (user, idx) => {
                                    return (
                                        this.renderUserRecord(user, idx)
                                    )
                                })}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 text-right no-print'>
                            <RaisedButton
                                label="Update"
                                primary={true}
                                className='common-button'
                                onClick={this.updateUserList.bind(this)}
                                disabled={!this.canUpdatePage(10)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-8 text-center'>
                            <Snackbar
                                open={this.state.snackbarStatus}
                                message={this.state.responseMsg}
                                bodyStyle={_.isEmpty(this.state.errors) ? UIUtil.responseSuccessStyle : UIUtil.responseErrStyle}
                                autoHideDuration={2000}
                                onRequestClose={this.handleSnackbarClose.bind(this)}
                            />
                        </div>

                        <Dialog
                            title="Change Password"
                            modal={false}
                            open={this.state.isChangePasswordDialogOpen}
                            onRequestClose={this.handleChangePasswordDialogClose.bind(this)}
                            autoScrollBodyContent={true}
                        >
                            {/* <div className='container'> */}
                            {/* <div className='row'> */}
                            <div className='col-md-12 text-center'>
                                <TextFieldModule
                                    value={this.state.passwordNoEncrypted}
                                    labelName='New password'
                                    labelStyle={{ whiteSpace: 'nowrap', width: '30%' }}
                                    type='password'
                                    disabled={!this.canUpdatePage(10)}
                                    errorText={this.state.errors.passwordNoEncrypted}
                                    onChange={
                                        e => {
                                            this.setState({
                                                passwordNoEncrypted: e.target.value
                                            }, this.checkConfirmPassword)
                                        }
                                    }
                                />
                                <TextFieldModule
                                    value={this.state.passwordNoEncrypted2}
                                    labelName='Confirm new password'
                                    labelStyle={{ whiteSpace: 'nowrap', width: '30%' }}
                                    type='password'
                                    disabled={!this.canUpdatePage(10)}
                                    errorText={this.state.errors.passwordNoEncrypted2}
                                    onChange={
                                        e => {
                                            this.setState({
                                                passwordNoEncrypted2: e.target.value
                                            }, this.checkConfirmPassword)
                                        }
                                    }
                                />
                                <RaisedButton
                                    label="Change password"
                                    primary={true}
                                    className='common-button'
                                    onClick={this.handleChangePassword.bind(this)}
                                    disabled={!this.canUpdatePage(10)}
                                />
                            </div>
                            {/* </div> */}
                            {/* </div> */}
                        </Dialog>

                    </div>

                </div>

            )
        }

    }

    renderUserRecord(user, idx) {
        return (
            <div className='row'>
                <div className='col-md-3'>
                    <TextFieldModule
                        value={user.username}
                        labelName='Username'
                        hintText='Username'
                        disabled={true}
                    />
                </div>
                <div className='col-md-3'>
                    <TextFieldModule
                        value={user.name}
                        labelName='Name'
                        hintText='Name'
                        disabled={!this.canUpdatePage(10)}
                        onChange={
                            this.handleNameChange.bind(this, idx)
                        }
                    />
                </div>
                <div className='col-md-3'>
                    <TextFieldModule
                        value={user.lastname}
                        labelName='Lastname'
                        hintText='Lastname'
                        disabled={!this.canUpdatePage(10)}
                        onChange={
                            this.handleLastNameChange.bind(this, idx)
                        }
                    />
                </div>
                <div className='col-md-2'>
                    <DropdownModule
                        data={this.props.roles}
                        value={user.roleId}
                        labelName='Role'
                        isDisable={!this.canUpdatePage(10)}
                        onChange={this.handleRoleDropdownChange.bind(this, idx)}
                    />
                </div>
                <div className='col-md-1'>
                    <RaisedButton
                        label="change password"
                        labelStyle={{ fontSize: '10px', whiteSpace: 'nowrap' }}
                        primary={true}
                        className='common-button'
                        onClick={this.handleChangePasswordDialogOpen.bind(this, idx)}
                        disabled={!this.canUpdatePage(10)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        permission: state.permission,
        users: state.users,
        roles: state.permission.roles,
        snackbarMsg: state.snackbarMsg,
    }
}

export default connect(mapStateToProps, {
    hasPermission,
    fetchAllUsers,
    fetchAllRoles,
    updateUserRole,
    findAllPagesPermissionByUserId,
    changePassword,
    hideSnackbarMsg
})(UserRole)