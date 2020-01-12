import React, { Component } from 'react'
import { connect } from 'react-redux'

import reactLogo from '../asset/react.svg'

import CardModule from './modules/CardModule'

import { findAllPagesPermissionByUserId } from '../actions'

class HomeIndex extends Component {

    constructor(props) {
        super(props)
        this.canViewPage.bind(this)
    }

    cardClick() {
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
        const pageRoleList = this.props.permission.pagePermissionList
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-3 common-vertical-padding'>
                        <CardModule
                            title='Product'
                            subtitle='management'
                            avatar={reactLogo}
                            cardStyle={{ backgroundColor: 'rgb(250, 250, 250)' }}
                            //buttonLabel='Product management'
                            redirect='/product'
                            onClick={this.cardClick}
                            disabled={!this.canViewPage(4)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        permission: state.permission
    };
}

export default connect(mapStateToProps, {
    findAllPagesPermissionByUserId
})(HomeIndex)
