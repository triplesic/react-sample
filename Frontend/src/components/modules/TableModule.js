import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton'

import PropTypes from 'prop-types';
import _ from 'lodash'

import moment from 'moment'

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableModule extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    //height: '300px',
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  handleColumnValue = (param) => {
    return this.props.statusColumns.values[param].value
  }

  handleDeleteRow = (rowObj, rowIndex, e) => {
    this.props.handleDeleteRow(rowObj, rowIndex)
  }

  handleColumnAction = (rowObj, e) => {
    this.props.handleColumnAction(rowObj, this.props.refSection)
  }

  handleLink1Click = (rowObj, e) => {
    this.props.handleLink1(rowObj)
  }

  renderTableHeaderRowColumn(headerName, index) {

    let tableRowColumnHeaderStyle = {
      paddingLeft: '6px',
      paddingRight: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: '2px solid rgb(220, 218, 218)',
      borderBottom: 'unset'
    }

    if (!_.isNil(this.props.columnWidthHeader)) {
      tableRowColumnHeaderStyle = { ...tableRowColumnHeaderStyle, width: this.props.columnWidthHeader[index] }
    }

    return (
      <TableHeaderColumn
        style={tableRowColumnHeaderStyle}
        key={headerName} tooltip={headerName}>{headerName}</TableHeaderColumn>
    )
  }

  renderTableRowColumn(rowObj, rowIndex, dataProp, cellIndex) {
    let cellValue = '-'
    if (this.props.statusColumns != undefined && dataProp == this.props.statusColumns.field) {
      cellValue = this.handleColumnValue(rowObj[dataProp])
    } else if (_.includes(dataProp, '{$datetime}')) {
      cellValue = moment(rowObj[dataProp.replace('{$datetime}', '')]).format('D-MMM-YY HH:mm')
    } else if (_.includes(dataProp, '{$date}')) {
      cellValue = moment(rowObj[dataProp.replace('{$date}', '')]).format('D-MMM-YY')
    } else if (_.includes(dataProp, '{$rowIdx}')) {
      cellValue = rowIndex + 1
    } else if (_.includes(dataProp, '{$link1}')) {
      cellValue = (<FlatButton
        label={_.isNil(rowObj[dataProp.replace('{$link1}', '')]) ? '-' : rowObj[dataProp.replace('{$link1}', '')]}
        primary={true}
        labelStyle={{ color: '#2a7ad2' }}
        onClick={this.handleLink1Click.bind(this, rowObj)}
      ></FlatButton>)
    } else if (_.includes(dataProp, '{$delete}')) {
      cellValue = (<FlatButton
        className='no-print'
        label="X"
        secondary={true}
        style={{ minWidth: 'unset' }}
        onClick={this.handleDeleteRow.bind(this, rowObj, rowIndex)} />)
    } else if (_.includes(dataProp, '{$rep-')) {
      var collectionDataProp = dataProp.substring(0, dataProp.indexOf('{$'))
      var actualDataProp = dataProp.substring(dataProp.indexOf('{$rep-') + 6, dataProp.indexOf('}'))
      cellValue = _.map(rowObj[collectionDataProp], (obj, idx) => {
        return (
          <div
            key={idx}>{obj[actualDataProp]}
          </div>)
      })
    } else if (_.includes(dataProp, '#Action')) {
      let valueLabel = rowObj[dataProp.substring(0, dataProp.indexOf("#"))]
      cellValue = (<FlatButton
        label={valueLabel}
        primary={true}
        labelStyle={{ color: '#2a7ad2' }}
        style={{ minWidth: 'unset', zIndex: '0' }}
        onClick={this.handleColumnAction.bind(this, rowObj)} />)
    }
    else {
      cellValue = _.isNil(rowObj[dataProp]) ? '-' : rowObj[dataProp]
    }

    let tableRowColumnStyle = {
      fontSize: '16px',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      //paddingLeft: '6px', paddingRight: '6px',
      padding: '1px 6px 1px 6px',
      height: '30px',
      border: '1px solid rgb(220, 218, 218)'
    }

    if (!_.isNil(this.props.columnWidth)) {
      tableRowColumnStyle = { ...tableRowColumnStyle, width: this.props.columnWidth[cellIndex] }
    }

    return (
      <TableRowColumn
        style={tableRowColumnStyle}
        key={cellIndex}>
        {cellValue}
      </TableRowColumn>
    )
  }

  renderTable() {
    let tableLayoutStyle = 'fixed'
    if (!_.isNil(this.props.columnWidth)) {
      tableLayoutStyle = 'unset'
    }
    if (!this.props.isLoading) {
      return (
        <div>
          <Table fixedHeader={false} style={{ width: "100%", tableLayout: "auto" }}
            style={{ tableLayout: tableLayoutStyle }}
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={this.props.onRowSelection}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan={this.props.headerColumns.length} tooltip={this.props.headerText + 'xxx'} style={{ textAlign: 'center' }}>
                  <h3>{this.props.headerText}</h3>
                </TableHeaderColumn>
              </TableRow>

              <TableRow
                hoverable={true}
              >
                {this.props.headerColumns.map(
                  this.renderTableHeaderRowColumn.bind(this)
                )}
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
              displayRowCheckbox={false}
              showRowHover={true}
              stripedRows={true}

            >
              {_.map(this.props.data, (rowObj, rowIndex) => {
                return (
                  <TableRow
                    hoverable={true}
                    //hovered={true}
                    key={(this.props.uniqueRow ? rowObj.id : rowIndex)}
                    style={{ height: '30px' }}
                  >
                    {this.props.dataProps.map(
                      this.renderTableRowColumn.bind(this, rowObj, rowIndex)
                    )}
                  </TableRow>
                )
              })
              }
            </TableBody>
            {/* <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter> */}
          </Table>

          {/* <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div> */}
        </div>
      )
    } else {
      return (<div><h2>Loading...</h2></div>)
    }
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    )
  }
}

TableModule.propTypes = {
  //data: PropTypes.array,
  dataProps: PropTypes.array,
  uniqueRow: PropTypes.bool,
  headerColumns: PropTypes.array,
  headerText: PropTypes.string,
  onRowSelection: PropTypes.func,
  isLoading: PropTypes.bool,
  statusColumns: PropTypes.object,
  handleDeleteRow: PropTypes.func,
  handleColumnAction: PropTypes.func,
  handleLink1: PropTypes.func,
  refSection: PropTypes.string,
  columnWidthHeader: PropTypes.array,
  columnWidth: PropTypes.array
}