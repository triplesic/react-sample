import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import FlatButton from 'material-ui/FlatButton'

import TextFieldModule from './modules/TextfieldModule'

import { ROOT_URL } from '../actions'

export default class DrawingRevisionComponent extends Component {

    constructor(props) {
        super(props)
    }

    renderData() {
        // FYI - 3D has been changed to 2D ***
        if (_.isEmpty(this.props.drawingRevision)) {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <TextFieldModule
                                value={this.props.drawingRevision.fileName}
                                labelName='2D'
                                hintText='Upload 2D Drawing'
                                disabled={true}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FlatButton label="Upload"
                                secondary={true}
                                className='common-button'
                                containerElement='label'
                                disabled={this.props.isProcessing || !this.props.canUpdate}
                            >
                                <input type="file" ref="uploadDrawing"
                                    style={{ 'display': 'none' }}
                                    onChange={this.props.uploadNew3dDrawing}
                                />
                            </FlatButton>
                        </div>
                    </div>

                    <hr style={{ borderTop: '1px solid #eee !important' }} />
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <TextFieldModule
                                value={this.props.drawingRevision.fileName}
                                labelName='2D'
                                hintText='Upload 2D Drawing'
                                disabled={true}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FlatButton label="Upload"
                                secondary={true}
                                className='common-button'
                                containerElement='label'
                                disabled={this.props.isProcessing || !this.props.canUpdate}
                            >
                                <input type="file" ref="uploadDrawing"
                                    style={{ 'display': 'none' }}
                                    onChange={this.props.upload3dDrawing}
                                />
                            </FlatButton>

                            <Link
                                target=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    "_blank"
                                    :
                                    ""}
                                to=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    `${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/3d`
                                    :
                                    '#'}>
                                <FlatButton label="Download"
                                    primary={true}
                                    className='common-button'
                                    containerElement='label'
                                    disabled={_.isEmpty(this.props.drawingRevision.fileName)}
                                />
                            </Link>
                        </div>
                        <div className='col-md-12'>
                            <Link
                                target=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    "_blank"
                                    :
                                    ""}
                                to=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    `${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/3d`
                                    :
                                    '#'}>
                                {/* <img
                                    src={`${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/3d`}
                                    className='img-responsive'
                                    style={
                                        _.isNil(this.props.drawingRevision.id) ?
                                            { height: '0px' } : { height: '200px' }} /> */}
                            </Link>
                        </div>
                    </div>

                    <hr style={{ borderTop: '1px solid #eee !important' }} />

                    <div className='row'>
                        <div className='col-md-5'>
                            <TextFieldModule
                                value={_.isEmpty(this.props.drawingRevision.fileName) ? '' : 'Mold_' + this.props.drawingRevision.fileName}
                                labelName='Mold'
                                hintText='Upload Mold Drawing'
                                disabled={true}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FlatButton label="Upload"
                                secondary={true}
                                className='common-button'
                                containerElement='label'
                                disabled={this.props.isProcessing || !this.props.canUpdate}
                            >
                                <input type="file" ref="uploadDrawing"
                                    style={{ 'display': 'none' }}
                                    onChange={this.props.upload2dDrawing}
                                />
                            </FlatButton>

                            <Link
                                target=
                                {this.props.drawingRevision.has2dDrawing
                                    ?
                                    "_blank"
                                    :
                                    ""}
                                to=
                                {this.props.drawingRevision.has2dDrawing
                                    ?
                                    `${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/2d`
                                    :
                                    '#'}>
                                <FlatButton label="Download"
                                    primary={true}
                                    className='common-button'
                                    containerElement='label'
                                    disabled={!this.props.drawingRevision.has2dDrawing}
                                />
                            </Link>
                        </div>
                    </div>

                    <hr style={{ borderTop: '1px solid #eee !important' }} />

                    <div className='row'>
                        <div className='col-md-5'>
                            <TextFieldModule
                                value={_.isEmpty(this.props.drawingRevision.fileName) ? '' : 'ACTUAL_' + this.props.drawingRevision.fileName}
                                labelName='Actual'
                                hintText='Upload Actual Product'
                                disabled={true}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FlatButton label="Upload"
                                secondary={true}
                                className='common-button'
                                containerElement='label'
                                disabled={this.props.isProcessing || !this.props.canUpdate}
                            >
                                <input type="file" ref="uploadDrawing"
                                    style={{ 'display': 'none' }}
                                    onChange={this.props.updateActualImage}
                                />
                            </FlatButton>

                            <Link
                                target=
                                {this.props.drawingRevision.hasActualImage
                                    ?
                                    "_blank"
                                    :
                                    ""}
                                to=
                                {this.props.drawingRevision.hasActualImage
                                    ?
                                    `${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/actualImage`
                                    :
                                    '#'}>
                                <FlatButton label="Download"
                                    primary={true}
                                    className='common-button'
                                    containerElement='label'
                                    disabled={!this.props.drawingRevision.hasActualImage}
                                />
                            </Link>
                        </div>
                        <div className='col-md-12'>
                            <Link
                                target=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    "_blank"
                                    :
                                    ""}
                                to=
                                {!_.isEmpty(this.props.drawingRevision.fileName)
                                    ?
                                    `${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/actualImage`
                                    :
                                    '#'}>
                                {/* <img
                                    src={`${ROOT_URL}/api/drawingRevision/${this.props.drawingRevision.id}/actualImage`}
                                    className='img-responsive'
                                    style={!this.props.drawingRevision.hasActualImage ?
                                        { height: '0px' } : { height: '200px' }} /> */}
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            this.renderData()
        )
    }
}