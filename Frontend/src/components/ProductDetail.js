import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import update from 'immutability-helper'
import is from 'is-js'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import unauthorized from '../asset/unauthorized.png'

import {
    ROOT_URL,
    getProductDetail,
    updateProductDetail,
    getAllUnitTypes,
    getDrawingRevisionByProductId,
    uploadNew3dDrawingRevision,
    upload3dDrawingRevision,
    upload2dDrawingRevision,
    uploadActualImgDrawingRevision,
    fetchAllDepartments,
    getInventoryDetail,
    fetchInventoryTransactionByInventId,
    fetchAllInventoryType,
    fetchAllCategory,
    addInventoryProduct,
    updateInventory,
    addInventoryTransaction,
    fetchAllUsers,
    getNextInventoryNo,
    hasPermission
} from '../actions'

import TextFieldModule from './modules/TextfieldModule'
import DropdownModule from './modules/DropdownModule'
import TableModule2 from './modules/TableModule2'
import DrawingRevisionComponent from './DrawingRevisionComponent'

const responseErrStyle = {
    backgroundColor: '#ff4281'
}

const responseSuccessStyle = {
    backgroundColor: '#4CAF50'
}

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isProcessing: false,
            snackbarStatus: false,
            responseMsg: '',
            errors: {},
            isDrawingDialogOpen: false,
            selectedDrawingRevision: {},
            inventoryDetail: {},
            detail: {},
            isTransactionDialogOpen: false,
            transaction: {},
        }
        this.handleResponseOK = this.handleResponseOK.bind(this)
        this.handleResponseError = this.handleResponseError.bind(this)
    }

    componentDidMount() {
        this.props.hasPermission(4, this.props.auth.user.id)
        const { productId } = this.props.match.params

        this.props.fetchAllInventoryType()
        this.props.fetchAllCategory()
        this.props.fetchAllDepartments()
        this.props.getAllUnitTypes()
        this.props.fetchAllUsers()
        this.props.getNextInventoryNo("FinishedGoods")

        if (productId === 'new') {
            // Add new Product
            this.setState({
                isLoading: false,
                inventoryDetail: { quantity: 0, departmentId: 1, inventoryTypeId: 4 },
                detail: { weight: 0 },
                isTransactionLoading: false,
                inventoryTransaction: {},
            })
        } else {
            this.props.getDrawingRevisionByProductId(productId)
            this.props.getProductDetail(productId)
                .then(
                    res => {
                        this.setState({
                            isLoading: false
                            , detail: res.data.obj
                        })
                        this.fetchInventoryDetail(res.data.obj.inventoryId)
                    })

        }
    }

    fetchInventoryDetail(inventoryId) {
        this.props.getInventoryDetail(inventoryId)
            .then(
                res => {
                    this.setState({
                        isLoading: false,
                        inventoryDetail: res.data.obj
                    })
                })
        this.props.fetchInventoryTransactionByInventId(inventoryId)
            .then(
                res => {
                    this.setState({
                        isTransactionLoading: false,
                        inventoryTransaction: res.data.obj
                    })
                })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category != undefined) {
            this.setState({
                categoryList: _.filter(this.props.category.data, (cat) => {
                    return cat.inventoryTypeId === 4
                })
            })
        }

        if (nextProps.nextInvtStr != undefined && this.props.match.params.productId === 'new') {
            this.setState({
                inventoryDetail: update(this.state.inventoryDetail, { inventoryNo: { $set: nextProps.nextInvtStr } })
            })
        }
    }

    handleBackBtnClick() {
        this.props.history.push('/product')
    }

    handleAddUpdateBtnClick() {
        this.setState({ errors: {} })
        
        const { errors, isValid } = this.isValid()

        if (!isValid) {
            this.setState({ errors })
            return
        }

        if (_.isEqual(this.state.detail, this.props.detail) && _.isEqual(this.state.inventoryDetail, this.props.inventoryDetail)) {
            // If user doesn't modify any information, do nothing!
            return
        }

        this.setState({ isProcessing: true })
        if (this.props.match.params.productId === 'new') {
            this.setState({
                inventoryDetail: update(this.state.inventoryDetail,
                    {
                        departmentId: { $set: 1 },
                        inventoryTypeId: { $set: 4 }
                    })
            }, () => {
                this.props.addInventoryProduct(this.state.inventoryDetail, this.state.detail)
                    .then(
                        res => {
                            this.setState({
                                errors: {},
                                isProcessing: false,
                                responseMsg: res.data.message,
                                snackbarStatus: true
                            }, () => {
                                this.props.getDrawingRevisionByProductId(res.data.obj.id)
                                this.props.getProductDetail(res.data.obj.id)
                                    .then(
                                        res2 => {
                                            this.setState({
                                                isLoading: false
                                                , detail: res2.data.obj
                                            })
                                            // this.fetchInventoryDetail(res2.data.obj.inventoryId)
                                        })
                                this.props.history.push(`/productDetail/${res.data.obj.id}`)
                            }
                            )
                        },
                        err => {
                            let errData = _.isEmpty(err.response) ? err.name : err.response.data
                            let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
                            this.setState({
                                errors: errData,
                                isProcessing: false,
                                responseMsg: errMsg,
                                snackbarStatus: true
                            })
                        }
                    )
            })

        } else {
            //Update inventory
            this.props.updateInventory(this.state.inventoryDetail, this.state.inventoryDetail.id)
                .then(
                    res => {
                        this.setState({
                            errors: {},
                            isProcessing: false,
                            responseMsg: res.data.message,
                            snackbarStatus: true
                        }, this.fetchInventoryDetail(this.state.inventoryDetail.id))
                    },
                    err => {
                        let errData = _.isEmpty(err.response) ? err.name : err.response.data
                        let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
                        this.setState({
                            errors: errData,
                            isProcessing: false,
                            responseMsg: errMsg,
                            snackbarStatus: true
                        })
                    })

            //Update product detail
            this.props.updateProductDetail(this.state.detail.id, this.state.detail).then(
                res => {
                    this.setState({
                        errors: {},
                        isProcessing: false,
                        responseMsg: res.data.message,
                        snackbarStatus: true
                    })
                },
                err => {
                    let errData = _.isEmpty(err.response) ? err.name : err.response.data
                    let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
                    this.setState({
                        errors: errData,
                        isProcessing: false,
                        responseMsg: errMsg,
                        snackbarStatus: true
                    })
                }
            )
        }
    }

    handleNewDrawingBtnClick() {
        this.setState({
            selectedDrawingRevision: {},
            isDrawingDialogOpen: true
        })
    }

    handleDrawingDialogClose() {
        this.setState({ isDrawingDialogOpen: false })
    }

    handleTransactionDialogClose() {
        this.setState({ isTransactionDialogOpen: false })
    }
    handleAddReduceTransactionBtnClick() {
        this.setState({ isTransactionDialogOpen: true })
    }
    handleTransactionDialogBackBtnClick() {
        this.handleTransactionDialogClose()
    }

    isTransactionDialogValid() {
        let errors = {}

        if (_.isNil(this.state.transaction.quantity)) {
            errors.transactionQuantity = "This field is required!"
        }
        else if (!is.numeric(this.state.transaction.quantity)) {
            errors.transactionQuantity = "Enter number only"
        }

        if (_.isNil(this.state.transaction.detail)) {
            errors.transactionDetail = "This field is required!"
        }
        return {
            errors, isValid: _.isEmpty(errors)
        }
    }

    handleTransactionDialogOKBtnClick() {
        const { errors, isValid } = this.isTransactionDialogValid()
        if (!isValid) {
            this.setState({ errors })
            return
        }
        const inventoryId = this.state.inventoryDetail.id

        this.setState({
            errors: {},
            isDialogProcessing: true,
            transaction: update(this.state.transaction, { inventoryId: { $set: inventoryId } })
        },
            () => this.props.addInventoryTransaction(this.state.transaction)
                .then(
                    res => {
                        this.setState({
                            errors: {},
                            isProcessing: false,
                            responseMsg: res.data.message,
                            snackbarStatus: true,
                            isDialogProcessing: false,
                            transaction: {}
                        })
                        this.handleTransactionDialogClose()
                        this.fetchInventoryDetail(inventoryId)
                    },
                    err => {
                        let errData = _.isEmpty(err.response) ? err.name : err.response.data
                        let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
                        this.setState({
                            errors: errData,
                            isProcessing: false,
                            responseMsg: errMsg,
                            snackbarStatus: true,
                            isDialogProcessing: false
                        })
                    })
        )
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isValid() {
        let errors = {}

        // validate ------- inventory obj -------
        if (_.isEmpty(this.state.inventoryDetail.inventoryNo)) {
            errors.inventoryNo = "This field is required!"
        }

        if (_.isEmpty(this.state.inventoryDetail.name)) {
            errors.name = "This field is required!"
        }

        if(_.isEmpty(this.state.detail.partNo)){
            errors.partNo = "This field is required!"
        }

        if (_.isNil(this.state.inventoryDetail.quantity)) {
            errors.quantity = "This field is required!"
        }

        // if (_.isNil(this.state.inventoryDetail.inventoryTypeId)) {
        //     errors.inventoryTypeId = 'This field is required!'
        // }

        if (_.isNil(this.state.inventoryDetail.categoryId) || this.state.inventoryDetail.categoryId === 0) {
            errors.categoryId = 'Please select one item!'
        }

        if (_.isNil(this.state.inventoryDetail.unitTypeId) || this.state.inventoryDetail.unitTypeId === 0) {
            errors.unitTypeId = 'Please select one item'
        }

        // if (_.isNil(this.state.inventoryDetail.departmentId)) {
        //     errors.departmentId = 'Please select one item!'
        // }

        // ------- validate product obj --------
        if (_.isNil(this.state.detail.weight)) {
            errors.weight = "This field is required!"
        }

        else if (!is.numeric(this.state.detail.weight)) {
            errors.weight = "Enter number only"
        }

        return {
            errors, isValid: _.isEmpty(errors)
        }
    }

    handleSnackbarClose() {
        this.setState({ snackbarStatus: false })
    }

    handleDrawingRevisionSelect(selectedObj) {
        this.setState({
            selectedDrawingRevision: selectedObj,
            isDrawingDialogOpen: true
        })
    }

    uploadNew3dDrawing(evt) {
        this.setState({ isProcessing: true })
        let data = new FormData();
        data.append('file', evt.target.files[0])
        const { productId } = this.props.match.params

        this.props.uploadNew3dDrawingRevision(this.state.detail.id, data)
            .then(
                res => {
                    this.handleResponseOK(res)
                    this.setState({ isDrawingDialogOpen: false })
                    this.props.getDrawingRevisionByProductId(productId)
                    this.setState({
                        detail: update(this.state.detail, { partNo: { $set: res.data.obj.fileName } })
                    })
                }
                , err => {
                    this.handleResponseError(err)
                })
    }

    upload3dDrawing(evt) {
        this.setState({ isProcessing: true })
        let data = new FormData();
        data.append('file', evt.target.files[0])
        const { productId } = this.props.match.params

        this.props.upload3dDrawingRevision(this.state.selectedDrawingRevision.id, data)
            .then(
                res => {
                    this.handleResponseOK(res)
                    this.setState({
                        isDrawingDialogOpen: false,
                        detail: update(this.state.detail, { partNo: { $set: res.data.obj.fileName } })
                    })
                    this.props.getDrawingRevisionByProductId(productId)
                }
                , err => {
                    this.handleResponseError(err)
                })
    }

    upload2dDrawing(evt) {
        this.setState({ isProcessing: true })
        let data = new FormData();
        data.append('file', evt.target.files[0])
        const { productId } = this.props.match.params

        this.props.upload2dDrawingRevision(this.state.selectedDrawingRevision.id, data)
            .then(
                res => {
                    this.handleResponseOK(res)
                    this.setState({ isDrawingDialogOpen: false })
                    this.props.getDrawingRevisionByProductId(productId)
                }
                , err => {
                    this.handleResponseError(err)
                })
    }

    updateActualImage(evt) {
        this.setState({ isProcessing: true })
        let data = new FormData();
        data.append('file', evt.target.files[0])
        const { productId } = this.props.match.params

        this.props.uploadActualImgDrawingRevision(this.state.selectedDrawingRevision.id, data)
            .then(
                res => {
                    this.handleResponseOK(res)
                    this.setState({ isDrawingDialogOpen: false })
                    this.props.getDrawingRevisionByProductId(productId)
                }
                , err => {
                    this.handleResponseError(err)
                })
    }

    handleResponseOK(res) {
        this.setState({
            errors: {},
            isProcessing: false,
            responseMsg: res.data.message,
            snackbarStatus: true,
            isLoading: false
        })
    }

    handleResponseError(err) {
        let errData = _.isEmpty(err.response) ? err.name : err.response.data
        let errMsg = _.isEmpty(err.response) ? err + '' : err.response.data.message
        this.setState({
            errors: errData,
            isProcessing: false,
            responseMsg: errMsg,
            snackbarStatus: true,
            isLoading: false
        })
    }

    renderPage() {
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
        } else if (this.state.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h2>Product Detail (Loading...)</h2>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h2>Product Detail</h2>
                        </div>
                        <div className='col-md-6 text-right no-print'>
                            <FlatButton label="Back"
                                secondary={true}
                                className='common-button'
                                onClick={this.handleBackBtnClick.bind(this)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-5'>
                            <TextFieldModule
                                value={this.state.inventoryDetail.inventoryNo}
                                labelName='No.'
                                hintText='Product No.'
                                errorText={this.state.errors.inventoryNo}
                                onChange={
                                    e => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { inventoryNo: { $set: e.target.value } })
                                    })
                                } />
                        </div>
                        <div className='col-md-7'>
                            <TextFieldModule
                                value={this.state.inventoryDetail.name}
                                labelName='Name *'
                                hintText='Product name'
                                errorText={this.state.errors.name}
                                onChange={
                                    e => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { name: { $set: e.target.value } })
                                    })
                                } />
                        </div>

                    </div>

                    <div className='row'>
                        {/* <div className='col-md-4'>
                            <DropdownModule
                                data={this.props.departmentList}
                                value={this.state.inventoryDetail.departmentId}
                                labelName='Department'
                                errorText={this.state.errors.departmentId}
                                onChange={
                                    (evt, key, value) => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { departmentId: { $set: value } })
                                    })
                                } />
                        </div>
                        <div className='col-md-4'>
                            <DropdownModule
                                data={this.props.inventoryType.data}
                                value={4}
                                //value={this.state.filterInventType}
                                labelName='Inventory Type'
                                errorText={this.state.errors.inventoryTypeId}
                                isDisable={true}
                                labelStyle={{ width: '35%' }}
                            //preValue='All'
                            //isSelectPreValue={true}
                            //onChange={this.handleInventTypeDropdown.bind(this)}
                            />
                        </div> */}
                        <div className='col-md-4'>
                            <TextFieldModule
                                value={this.state.detail.partNo}
                                labelName='Part No.'
                                hintText='Part No.'
                                errorText={this.state.errors.partNo}
                                onChange={
                                    e => this.setState({
                                        detail: update(this.state.detail, { partNo: { $set: e.target.value } })
                                    })
                                }
                                labelStyle={{ width: '25%' }}
                            />
                        </div>
                        <div className='col-md-4'>
                            <DropdownModule
                                //data={this.props.category.data}
                                data={this.state.categoryList}
                                value={this.state.inventoryDetail.categoryId}
                                labelName='Category *'
                                labelStyle={{ width: '25%' }}
                                errorText={this.state.errors.categoryId}
                                onChange={
                                    (evt, key, value) => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { categoryId: { $set: value } })
                                    })
                                } />
                        </div>
                        <div className='col-md-2'>
                            <TextFieldModule
                                value={this.state.detail.weight}
                                labelName='Weight'
                                postLabelName='Kg'
                                hintText='Product weight'
                                errorText={this.state.errors.weight}
                                onChange={
                                    e => this.setState({
                                        detail: update(this.state.detail, { weight: { $set: e.target.value } })
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <TextFieldModule
                                value={this.state.detail.material}
                                labelName='Material'
                                hintText='Product material'
                                errorText={this.state.errors.material}
                                onChange={
                                    e => this.setState({
                                        detail: update(this.state.detail, { material: { $set: e.target.value } })
                                    })
                                }
                            />
                        </div>
                        <div className='col-md-6'>
                            <TextFieldModule
                                value={this.state.inventoryDetail.remark}
                                labelName='Remark'
                                hintText='remark'
                                errorText={this.state.errors.remark}
                                onChange={
                                    e => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { remark: { $set: e.target.value } })
                                    })
                                } />
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-md-3'>
                            <TextFieldModule
                                value={this.state.inventoryDetail.quantity}
                                numberFormat={true}
                                labelName='Quantity'
                                hintText='Quantity'
                                errorText={this.state.errors.quantity}
                                disabled={!(this.props.match.params.productId === 'new')}
                                onChange={
                                    e => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { quantity: { $set: e.target.value.replace(/[^0-9]+/g, "") } })
                                    })
                                }
                            />
                        </div>
                        <div className='col-md-4'>
                            <DropdownModule
                                value={this.state.inventoryDetail.unitTypeId}
                                data={this.props.unitTypeList}
                                labelName='Unit Type *'
                                errorText={this.state.errors.unitTypeId}
                                onChange={
                                    (evt, key, value) => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { unitTypeId: { $set: value } })
                                    })
                                }
                                labelStyle={{ width: '25%' }}
                            />
                        </div>
                        <div className='col-md-3'>
                            <TextFieldModule
                                value={this.state.inventoryDetail.basePrice}
                                numberFormat={true}
                                labelName='Base Price'
                                hintText='Base Price'
                                errorText={this.state.errors.basePrice}
                                onChange={
                                    e => this.setState({
                                        inventoryDetail: update(this.state.inventoryDetail, { basePrice: { $set: e.target.value.replace(/[^0-9]+/g, "") } })
                                    })
                                }
                                labelStyle={{ width: '25%' }}
                            />
                        </div>
                        <div className='col-md-2 text-right'>
                            <RaisedButton label={this.props.match.params.productId === 'new' ? 'Add' : 'Update'}
                                primary={true}
                                className='common-button'
                                onClick={this.handleAddUpdateBtnClick.bind(this)}
                                disabled={this.state.isProcessing || !this.props.permission.canUpdate} />
                        </div>
                    </div>

                    <hr style={{ borderTop: '1px solid #eee !important' }} />

                    <div className='row'>
                        {/* <div className='col-md-4'>
                            <DropdownModule
                                value={this.state.detail.unitTypeId}
                                data={this.props.unitTypeList}
                                labelName='Unit Type'
                                onChange={
                                    (evt, key, value) => this.setState({
                                        detail: update(this.state.detail, { unitTypeId: { $set: value } })
                                    })
                                }
                            />
                        </div> */}
                    </div>

                    <div className='row'>
                        <div className='col-md-12 text-right'>
                            <RaisedButton label='New Drawing'
                                primary={true}
                                className='common-button'
                                onClick={this.handleNewDrawingBtnClick.bind(this)}
                                disabled={(this.props.match.params.productId === 'new')
                                    || this.state.isProcessing
                                    || !this.props.permission.canUpdate}
                            />
                        </div>
                        <div className='col-md-12'>
                            <TableModule2
                                headerText='Drawing Revision'
                                headerColumns={['Name', 'Revision', 'Date']}
                                data={this.props.match.params.productId === 'new' ? null : this.props.drawingRevisionList}
                                dataProps={['fileName{$link1}', 'revision', 'revisionDate{$datetime}']}
                                handleLink1={this.handleDrawingRevisionSelect.bind(this)}
                            />
                        </div>
                    </div>

                    {/* <hr style={{ borderTop: '1px solid #eee !important' }} /> */}

                    {/* <div className='row'>
                        <div className='col-md-12 text-right'>
                            <RaisedButton label={' + / - '}
                                primary={true}
                                className='common-button'
                                onClick={this.handleAddReduceTransactionBtnClick.bind(this)}
                                disabled={this.props.match.params.productId === 'new'} />
                        </div>
                    </div> */}

                    {/* <div className='row'>
                        <div className='col-md-12'>
                            <TableModule2
                                headerText='Transaction'
                                headerColumns={['Quantity', 'Lot#', 'PO#', 'Detail', 'Requested By', 'Date']}
                                data={this.state.inventoryTransaction}
                                dataProps={['quantity{$number}', 'lotNumber', 'poNumber', 'detail', 'requestedByUserName', 'createdDate{$datetime}']}
                                isLoading={this.state.isTransactionLoading}
                            />
                        </div>
                    </div> */}

                    <Dialog
                        title="Update Drawing"
                        //actions={actions}
                        modal={false}
                        open={this.state.isDrawingDialogOpen}
                        onRequestClose={this.handleDrawingDialogClose.bind(this)}
                        autoScrollBodyContent={true}
                        autoDetectWindowHeight={false}
                    >
                        <DrawingRevisionComponent
                            canUpdate={this.props.permission.canUpdate}
                            drawingRevision={this.state.selectedDrawingRevision}
                            uploadNew3dDrawing={this.uploadNew3dDrawing.bind(this)}
                            upload3dDrawing={this.upload3dDrawing.bind(this)}
                            upload2dDrawing={this.upload2dDrawing.bind(this)}
                            updateActualImage={this.updateActualImage.bind(this)}
                        />
                    </Dialog>

                    <Dialog
                        title="Add Inventory Transaction"
                        modal={false}
                        open={this.state.isTransactionDialogOpen}
                        onRequestClose={this.handleTransactionDialogClose.bind(this)}
                        autoScrollBodyContent={true}
                    >
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <TextFieldModule
                                        value={this.state.transaction.quantity}
                                        labelName='Quantity'
                                        hintText='amount of item'
                                        errorText={this.state.errors.transactionQuantity}
                                        onChange={
                                            e => this.setState({
                                                transaction: update(this.state.transaction, { quantity: { $set: e.target.value } })
                                            })
                                        } />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <TextFieldModule
                                        value={this.state.transaction.lotNumber}
                                        labelName='Lot#'
                                        hintText='lot number'
                                        errorText={this.state.errors.transactionLotNumber}
                                        onChange={
                                            e => this.setState({
                                                transaction: update(this.state.transaction, { lotNumber: { $set: e.target.value } })
                                            })
                                        } />
                                </div>
                                <div className='col-md-4'>
                                    <TextFieldModule
                                        value={this.state.transaction.poNumber}
                                        labelName='PO# / Order#'
                                        hintText='PO or Order number'
                                        errorText={this.state.errors.transactionPoNumber}
                                        onChange={
                                            e => this.setState({
                                                transaction: update(this.state.transaction, { poNumber: { $set: e.target.value } })
                                            })
                                        }
                                        labelStyle={{ width: '35%' }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <TextFieldModule
                                        value={this.state.transaction.detail}
                                        labelName='Detail'
                                        hintText='Description for add transaction'
                                        errorText={this.state.errors.transactionDetail}
                                        onChange={
                                            e => this.setState({
                                                transaction: update(this.state.transaction, { detail: { $set: e.target.value } })
                                            })
                                        } />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <DropdownModule
                                        value={this.state.transaction.requestedByUserId}
                                        data={this.props.users}
                                        labelName='Requested by'
                                        errorText={this.state.errors.requestedByUserId}
                                        onChange={
                                            (evt, key, value) => this.setState({
                                                transaction: update(this.state.transaction, { requestedByUserId: { $set: value } })
                                            })
                                        }
                                        labelStyle={{ width: '30%' }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-7 text-center'>
                                    <RaisedButton label='OK'
                                        primary={true}
                                        className='common-button'
                                        disabled={this.state.isDialogProcessing}
                                        onClick={this.handleTransactionDialogOKBtnClick.bind(this)}
                                    />
                                    <RaisedButton label="Cancel"
                                        secondary={true}
                                        className='common-button'
                                        onClick={this.handleTransactionDialogBackBtnClick.bind(this)}
                                    />
                                </div>
                            </div>

                        </div>
                    </Dialog>

                    <div className='row'>
                        <div className='col-md-6 text-right'>
                            <Snackbar
                                open={this.state.snackbarStatus}
                                message={this.state.responseMsg}
                                bodyStyle={_.isEmpty(this.state.errors) ? responseSuccessStyle : responseErrStyle}
                                autoHideDuration={2000}
                                onRequestClose={this.handleSnackbarClose.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            this.renderPage()
        )
    }
}

function mapStateToProps(state) {
    return {
        detail: state.product.detail,
        nextInvtStr: state.inventory.nextInvtStr,
        inventoryDetail: state.inventory.detail,
        unitTypeList: state.unitType.data,
        drawingRevisionList: state.drawingRevision.data,
        departmentList: state.department.data,
        inventoryTransaction: state.inventoryTransaction,
        inventoryType: state.inventoryType,
        category: state.category,
        inventoryTransaction: state.inventoryTransaction,
        users: state.users,
        auth: state.auth,
        permission: state.permission
    }
}

export default connect(mapStateToProps, {
    getProductDetail,
    updateProductDetail,
    getAllUnitTypes,
    getDrawingRevisionByProductId,
    uploadNew3dDrawingRevision,
    upload3dDrawingRevision,
    upload2dDrawingRevision,
    uploadActualImgDrawingRevision,
    fetchAllDepartments,
    getInventoryDetail,
    fetchInventoryTransactionByInventId,
    fetchAllInventoryType,
    fetchAllCategory,
    addInventoryProduct,
    updateInventory,
    addInventoryTransaction,
    fetchAllUsers,
    getNextInventoryNo,
    hasPermission
})(ProductDetail)