import React from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import numeral from 'numeral';

import _ from 'lodash'

export default class TextFieldModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showValue: ''
        }
    }

    componentDidMount() {
        if (this.props.numberFormat) {
            this.setNumberValue(this.props.value)
        } else if (this.props.numberFormatDecimal) {
            this.setNumberDecimalValue(this.props.value)
        }
        else {
            this.setNormalValue(this.props.value)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.numberFormat) {
            this.setNumberValue(nextProps.value)
        } else if (this.props.numberFormatDecimal) {
            this.setNumberDecimalValue(nextProps.value)
        } else {
            this.setNormalValue(nextProps.value)
        }
    }

    setNumberValue(value) {
        let numberOnlyStr = value
        if (typeof value === 'string') {
            let numberOnlyStr = value.replace(/[^0-9]+/g, "")
        }
        this.setState({
            showValue: _.isNil(numberOnlyStr) || numberOnlyStr === '' ? '' : numeral(numberOnlyStr).format('0,0')
        })
    }

    //This function just show only, do not use for entering value
    setNumberDecimalValue(value) {
        let numberOnlyStr = value
        if (typeof value === 'string') {
            let numberOnlyStr = value.replace(/[^0-9.]+/g, "")
        }
        // check last charactor if '.' will add 00
        if (typeof numberOnlyStr == 'string' && numberOnlyStr.substr(numberOnlyStr.length - 1) == '.') {
            numberOnlyStr += '00'
        }
        this.setState({
            showValue: _.isNil(numberOnlyStr) || numberOnlyStr === '' ? '' : numeral(numberOnlyStr).format('0,0[.]00')
        })
    }

    setNormalValue(value) {
        this.setState({
            showValue: value
        })
    }

    handleChange = (event) => {
        if (this.props.onChange != null) {
            this.props.onChange(event)
        }
    };

    render() {
        return (
            <div className='center-align' style={{ width: '100%' }}>
                {/* <span style={this.props.isRequired ? { width: '12%', color: '#ff4080' } : { width: '12%' }}> */}
                <span style={Object.assign({ width: '12%', fontWeight: '1000' }, this.props.labelStyle)}>
                    {this.props.isRequired ? this.props.labelName + '*' : this.props.labelName}
                </span>
                <TextField
                    hintText={this.props.hintText}
                    errorText={this.props.errorText}
                    // value={_.isNil(this.props.value) ? '' : this.props.numberFormat ? numeral(this.props.value).format('0,0') : this.props.value}
                    // value={_.isNil(this.props.value) ? '' : this.props.value}
                    value={_.isNil(this.state.showValue) ? '' : this.state.showValue}
                    // value={this.state.showValue}
                    style={Object.assign({ paddingLeft: '10px' }, this.props.style)}
                    type={this.props.type}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    fullWidth={true}
                    inputStyle={Object.assign({ marginLeft: '10px' }, this.props.inputStyle)}
                    multiLine={this.props.multiLine}
                    rows={this.props.rows}
                    rowsMax={this.props.rowsMax}
                    floatingLabelText={this.props.floatingLabelText}
                />
                {this.renderPostLabel()}
            </div>
        );
    }

    renderPostLabel() {
        if (this.props.postLabelName) {
            return (
                <span style={Object.assign({ width: '12%', fontWeight: '1000' }, this.props.postLabelStyle)}>
                    {this.props.isRequired ? this.props.postLabelName + '*' : this.props.postLabelName}
                </span>
            )
        }
    }
}



TextFieldModule.propTypes = {
    labelName: PropTypes.string,
    postLabelName: PropTypes.string,
    floatingLabelText: PropTypes.string,
    errorText: PropTypes.string,
    hintText: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    isRequired: PropTypes.bool,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    numberFormat: PropTypes.bool,
    numberFormatDecimal: PropTypes.bool
}

TextFieldModule.defaultProps = {
    disabled: false
}