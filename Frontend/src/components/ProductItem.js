import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductImgUrl } from '../actions'
import Picture from './Picture';
import DetailImg from '../asset/View.png'

class ProductItem extends Component {

    constructor(props) {
        super(props);
    }
    addItemToBucket(item, quantity) {
        this.props.addItem(item.id, quantity, item);
    }
    removeItemToBucket(item, quantity) {
        this.props.removeItem(item.id, quantity);
    }
    render() {
        const { itemInfo } = this.props;
        const { readOnly } = this.props;
        if (readOnly) {
            return (
                <div className='img-item-noeffect'>
                    <div className='text-center' >
                        <Picture imgSrc={getProductImgUrl(itemInfo.productId, 1)}
                            imgHeight={this.props.imgHeight}
                            imgWidth={this.props.imgWidth} />

                    </div>
                    <div className='app-font-color text-center'>{itemInfo.product.name}({itemInfo.unit.name})</div>
                    <div className='app-font-color text-center'>{itemInfo.price} &nbsp; บาท</div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className='img-item'>
                        <div className='text-center image-container'>
                            <img className='after' src={DetailImg} />
                            <Picture imgSrc={getProductImgUrl(itemInfo.productId, 1)} style={{ 'border': '2px solid rgb(252,176,64)' }} />
                        </div>
                    </div>
                    <div className='text-center'>
                        <div className='app-font-color text-left'>{itemInfo.product.name}({itemInfo.unit.name})</div>
                        <div className='app-bold-font-color text-left'>{itemInfo.product.price} &nbsp; บาท</div>
                        <span onClick={() => this.addItemToBucket(itemInfo, 1)} className='bold-sign-character'>+</span> &nbsp;
                        <span href='#' onClick={() => this.removeItemToBucket(itemInfo, 1)} className='bold-sign-character'>-</span>
                    </div>
                </div>
            );
        }
    }
}

export default ProductItem;