import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import _ from 'lodash'

import RaisedButton from 'material-ui/RaisedButton'

import TextFieldModule from './modules/TextfieldModule'
import DropdownModule from './modules/DropdownModule'
import TableModule2 from './modules/TableModule2'
import history from '../history'

import unauthorized from '../asset/unauthorized.png'

import {
    ROOT_URL,
    fetchAllProduct,
    fetchAllProductCategory,
    hasPermission
} from '../actions'

class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: {},
            filteredPartNo: '',
            filteredProductName: '',
            filteredCategory: 0,
            filteredRemark: ''
        }
    }
    componentDidMount() {
        this.props.hasPermission(4, this.props.auth.user.id)
        this.props.fetchAllProduct()
        this.props.fetchAllProductCategory()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            productList: nextProps.product.data
        })
    }

    handelPartNoTxt(e) {
        this.setState({
            filteredPartNo: e.target.value
        }, this.filterProduct)
    }

    handleProductNameTxt(e) {
        this.setState({
            filteredProductName: e.target.value
        }, this.filterProduct)
    }

    handleRemarkTxt(e) {
        this.setState({
            filteredRemark: e.target.value
        }, this.filterProduct)
    }

    handleCategoryDropdown(evt, key, value) {
        this.setState({
            filteredCategory: value
        }, this.filterProduct)
    }

    filterProduct() {
        let filteredResult = _.filter(this.props.product.data, product => {
            return (product.partNo.toLowerCase().indexOf(this.state.filteredPartNo.toLowerCase()) > -1)
        })

        filteredResult = _.filter(filteredResult, product => {
            return (product.inventoryName.toLowerCase().indexOf(this.state.filteredProductName.toLowerCase()) > -1)
        })

        filteredResult = _.filter(filteredResult, product => {
            return (product.remark.toLowerCase().indexOf(this.state.filteredRemark.toLowerCase()) > -1)
        })

        filteredResult = _.filter(filteredResult, product => {
            if (this.state.filteredCategory === 0) {
                return true
            } else {
                return (product.categoryId === this.state.filteredCategory)
            }
        })

        this.setState({
            productList: filteredResult
        })
    }

    handleProductSelect(selectedObj) {
        let selectedProductId = selectedObj.id
        this.props.history.push(`/productDetail/${selectedProductId}`)
    }

    handleShowDrawingActalImage(selectedObj) {
        let selectedDrawingId = selectedObj.drawingRevisionId
        if (selectedObj.hasDrawing) {
            window.open(`${ROOT_URL}/api/drawingRevision/${selectedDrawingId}/3d`)
        }
    }

    handlePrintBtn(e) {
        e.preventDefault()
        window.print()
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
        } else if (this.props.product.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h2>Product (Loading...)</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className='row'>
                        <h2>Product Management</h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <TextFieldModule
                                value={this.state.filteredPartNo}
                                labelName='Part No.'
                                hintText='Search Part No.'
                                onChange={
                                    this.handelPartNoTxt.bind(this)
                                }
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <TextFieldModule
                                value={this.state.filteredProductName}
                                labelName='Name'
                                hintText='Search Product Name'
                                onChange={
                                    this.handleProductNameTxt.bind(this)
                                }
                            />
                        </div>
                        <div className='col-md-6'>
                            <DropdownModule
                                data={this.props.category.data}
                                value={this.state.filteredCategory}
                                labelName='Category'
                                preValue='All'
                                isSelectPreValue={true}
                                onChange={this.handleCategoryDropdown.bind(this)} />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <TextFieldModule
                                value={this.state.filteredRemark}
                                labelName='Remark'
                                hintText='Search By Remark'
                                onChange={
                                    this.handleRemarkTxt.bind(this)
                                }
                            />
                        </div>
                        <div className='col-md-6 text-right no-print'>
                            <RaisedButton
                                label="Add"
                                primary={true}
                                className='common-button'
                                onClick={() => history.push('productDetail/new')}
                                disabled={!this.props.permission.canUpdate}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 '>
                            <TableModule2
                                headerColumns={['Part No.', 'Name', 'Drawing', 'Material', 'Remark']}
                                columnWidth={['3', '4', '5', '2', '2']}
                                data={this.state.productList}
                                dataProps={['partNo', 'inventoryName{$link1}', 'drawingRevisionFileName{$link2}', 'material', 'remark']}
                                handleLink1={this.handleProductSelect.bind(this)}
                                handleLink2={this.handleShowDrawingActalImage.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            )
        }

    }

    render() {
        return (this.renderPage())
    }
}

function mapStateToProps(state) {
    return {
        product: state.product,
        category: state.category,
        auth: state.auth,
        permission: state.permission
    }
}
export default connect(mapStateToProps, {
    fetchAllProduct,
    fetchAllProductCategory,
    hasPermission
})(Product)