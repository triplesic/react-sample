import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types'
import _ from 'lodash'

const underlineStyle = {}
const underlineErrorStyle = {
  borderTop: '2px solid #f44438'
}

export default class DropDownModule extends React.Component {

  constructor(props) {
    super(props);
    if (props.isSelectPreValue) {
      this.state = { value: 0 };
    } else {
      this.state = { value: props.value };
    }

  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    if (this.props.onChange != null) {
      this.props.onChange(event, index, value)
    }
  }

  renderDropdown() {
    if (this.props.data) {
      if (this.props.preValue) {
        return (
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={Object.assign({ width: '100%' }, this.props.style)}
            disabled={this.props.isDisable || false}
            autoWidth={false}
          >
            <MenuItem value={0} primaryText={this.props.preValue} key={this.props.preValue} />
            {/* {this.props.data.map((row, index) => (
              <MenuItem value={row.id} primaryText={row.name} key={row.id} />
            ))} */}
            {_.map(this.props.data, (row, index) => (
              <MenuItem value={row.id} primaryText={row.name} key={row.id} />
            ))}
          </DropDownMenu>
        )
      } else {
        return (
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={Object.assign({ width: '100%' }, this.props.style)}
            disabled={this.props.isDisable || false}
            autoWidth={false}
            underlineStyle={(this.props.errorText) ? underlineErrorStyle : underlineStyle}
          >
            {/* {this.props.data.map((row, index) => (
              <MenuItem value={row.id} primaryText={row.name} key={row.id} />
            ))} */}
            {_.map(this.props.data, (row, index) => (
              <MenuItem value={row.id} primaryText={row.name} key={row.id} />
            ))}
          </DropDownMenu>
        )
      }
    }
    else {
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        disabled={this.props.isDisable || false}
        style={Object.assign({ width: '100%' }, this.props.style)}
        autoWidth={false}
      />
    }
  }

  render() {
    return (
      <div className='center-align text-left' style={{ width: '100%' }}>
        {/* <span style={this.props.isRequired ? { color: '#ff4080' } : {}}> */}
        <span style={Object.assign({ width: '12%', fontWeight: '1000' }, this.props.labelStyle)}>
          {this.props.isRequired ? this.props.labelName + '*' : this.props.labelName}
        </span>

        {this.renderDropdown()}
        <div style={{ paddingLeft: '24px', color: '#f44438', fontSize: '12px' }}>{this.props.errorText}</div>
      </div>
    );
  }
}

DropDownModule.propTypes = {
  labelName: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  preValue: PropTypes.string,
  isSelectPreValue: PropTypes.bool,
  isRequired: PropTypes.bool,
  style: PropTypes.object,
  labelStyle: PropTypes.object
}

DropDownModule.defaultProps = {
  isSelectPreValue: false
}