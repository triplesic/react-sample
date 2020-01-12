import React, { Component } from 'react';
import missing from '../asset/missing.png'

const product_img_width  = 200;
const product_img_height = 200;

class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {imgSrc: this.props.imgSrc}
    }

    onError() {
        this.setState({imgSrc: missing});
    }

    render() {
        return (
        <img className={this.props.className || ''} 
                    src={this.state.imgSrc} 
                    onError={this.onError.bind(this)} 
                    height={ this.props.imgHeight || product_img_height } 
                    width={ this.props.imgWidth || product_img_height }
                    style={this.props.style || {'border':'none'}} />
        );
    }
}

export default Picture;
