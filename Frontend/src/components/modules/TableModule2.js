import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import numeral from 'numeral';

import FlatButton from 'material-ui/FlatButton'

export default class TableModule2 extends Component {

    renderTableHeaderRowColumn(headerName, index) {
        let className = 'center aligned ' + this.columnWidthMapping(index)
        let headerValueClass = ''
        if (_.isEqual(headerName.toLowerCase(), 'delete')) {
            className = className + ' no-print'
            headerValueClass = headerValueClass + ' no-print'
        }
        // let tableRowColumnHeaderStyle = {
        //   paddingLeft: '6px',
        //   paddingRight: '6px',
        //   fontSize: '16px',
        //   fontWeight: 'bold',
        //   border: '2px solid rgb(220, 218, 218)',
        //   borderBottom: 'unset'
        // }

        // if (!_.isNil(this.props.columnWidthHeader)) {
        //   tableRowColumnHeaderStyle = { ...tableRowColumnHeaderStyle, width: this.props.columnWidthHeader[index] }
        // }

        return (
            // <TableHeaderColumn
            //     style={tableRowColumnHeaderStyle}
            //     key={headerName} tooltip={headerName}>{headerName}
            // </TableHeaderColumn>
            <th
                key={headerName}
                className={className}
            >
                <div className={headerValueClass}>{headerName}</div>
            </th>
        )
    }

    renderTableRowColumn(rowObj, rowIndex, dataProp, cellIndex) {
        let defaultValue = '-'
        if (this.props.isShowBlankCell) { defaultValue = '' }
        let cellValue = (<td></td>)
        if(_.isEmpty(rowObj)){
            return (<div></div>)
        }
        if (this.props.statusColumns != undefined && dataProp == this.props.statusColumns.field) {
            cellValue = this.handleColumnValue(rowObj[dataProp])
        } else if (_.includes(dataProp, '{$link1}')) {
            cellValue = (
                <td className="selectable"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleLink1Click.bind(this, rowObj)}
                        style={{ color: '#2a7ad2' }}>
                        {_.isNil(rowObj[dataProp.replace('{$link1}', '')]) ? defaultValue : rowObj[dataProp.replace('{$link1}', '')]}
                    </a>
                </td>
            )
        }
        else if (_.includes(dataProp, '{$link2}')) {
            cellValue = (
                <td className="selectable"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleLink2Click.bind(this, rowObj)}
                        style={{ color: '#2a7ad2' }}>
                        {_.isNil(rowObj[dataProp.replace('{$link2}', '')]) ? defaultValue : rowObj[dataProp.replace('{$link2}', '')]}
                    </a>
                </td>
            )
        } else if (_.includes(dataProp, '{$link1center}')) {
            cellValue = (
                <td className="selectable"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleLink1Click.bind(this, rowObj)}
                        style={{ color: '#2a7ad2', textAlign: 'center' }}>
                        {_.isNil(rowObj[dataProp.replace('{$link1center}', '')]) ? defaultValue : rowObj[dataProp.replace('{$link1center}', '')]}
                    </a>
                </td>
            )
        } else if (_.includes(dataProp, '{$link2center}')) {
            cellValue = (
                <td className="selectable"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleLink2Click.bind(this, rowObj)}
                        style={{ color: '#2a7ad2', textAlign: 'center' }}>
                        {_.isNil(rowObj[dataProp.replace('{$link2center}', '')]) ? defaultValue : rowObj[dataProp.replace('{$link2center}', '')]}
                    </a>
                </td>
            )
        }
        else if (_.includes(dataProp, '{$datetime}')) {
            let dateValue = moment(rowObj[dataProp.replace('{$datetime}', '')]).format('D-MMM-YY HH:mm')
            if (dateValue == 'Invalid date') { dateValue = defaultValue }
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {dateValue}
                </td>
            )
        } else if (_.includes(dataProp, '{$date}')) {
            let dateValue = moment(rowObj[dataProp.replace('{$date}', '')]).format('D-MMM-YY')
            if (dateValue == 'Invalid date') { dateValue = defaultValue }
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {dateValue}
                </td>
            )

        } else if (_.includes(dataProp, '{$date2}')) {
            let dateValue = moment(rowObj[dataProp.replace('{$date2}', '')], 'DD/MM/YYYY').format('D-MMM-YY')
            if (dateValue == 'Invalid date') { dateValue = defaultValue }
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {dateValue}
                </td>
            )

        } else if (_.includes(dataProp, '{$delete}')) {
            cellValue = (
                <td className="selectable negative center aligned no-print"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleDeleteRow.bind(this, rowObj, rowIndex)}
                        style={{ color: '#ff4080', textAlign: 'center' }}>
                        {"X"}
                    </a>
                </td>
            )
        } else if (_.includes(dataProp, '{$rowIdx}')) {
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {rowIndex + 1}
                </td>
            )
        } else if (_.includes(dataProp, '{$rep-')) {
            var collectionDataProp = dataProp.substring(0, dataProp.indexOf('{$'))
            var actualDataProp = dataProp.substring(dataProp.indexOf('{$rep-') + 6, dataProp.indexOf('}'))
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}
                    style={{ padding: 'unset' }}>
                    {
                        _.map(rowObj[collectionDataProp], (obj, idx) => (
                            <div
                            //style={{ borderBottom: '0.2px #dededf solid', borderTop: '0.2px #dededf solid' }}
                            >
                                {obj[actualDataProp]}
                            </div>
                        ))
                    }
                </td>
            )
        } else if (_.includes(dataProp, '{$center}')) {
            cellValue = (
                <td className='middle aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {_.isNil(rowObj[dataProp.replace('{$center}', '')]) ? defaultValue : rowObj[dataProp.replace('{$center}', '')]}
                </td>
            )
        }else if(_.includes(dataProp, '{$numberDecimal}')){
            cellValue = (
                <td className='right aligned'
                    key={rowIndex + '-' + cellIndex}>
                    {
                        _.isNil(rowObj[dataProp.replace('{$numberDecimal}', '')]) ?
                            defaultValue : numeral(rowObj[dataProp.replace('{$numberDecimal}', '')]).format('0,0.00')
                    }
                </td>
            )
        } else if (_.includes(dataProp, '{$number}')) {
            if (this.props.isShowBlankForZeroNumber) {
                cellValue = (
                    <td className='right aligned'
                        key={rowIndex + '-' + cellIndex}>
                        {
                            _.isNil(rowObj[dataProp.replace('{$number}', '')]) ?
                                defaultValue : _.isEqual(rowObj[dataProp.replace('{$number}', '')], 0) ?
                                    defaultValue : numeral(rowObj[dataProp.replace('{$number}', '')]).format('0,0.[00]')
                        }
                    </td>
                )
            } else {
                cellValue = (
                    <td className='right aligned'
                        key={rowIndex + '-' + cellIndex}>
                        {
                            _.isNil(rowObj[dataProp.replace('{$number}', '')]) ?
                                defaultValue : numeral(rowObj[dataProp.replace('{$number}', '')]).format('0,0.[00]')
                        }
                    </td>
                )
            }

        } else if (_.includes(dataProp, '{$staticLink1}')) {
            cellValue = (
                <td className="selectable"
                    key={rowIndex + '-' + cellIndex}>
                    <a
                        onClick={this.handleStaticLink1Click.bind(this, rowObj)}
                        style={{ color: '#2a7ad2', textAlign: 'center' }}>
                        {dataProp.replace('{$staticLink1}', '')}
                    </a>
                </td>
            )
        }
        else {
            cellValue = (
                <td className='left aligned'
                    key={rowIndex + '-' + cellIndex}>
                    <div style={{ minHeight: '1.4em' }}>
                        {_.isNil(rowObj[dataProp]) ? defaultValue : rowObj[dataProp]}
                    </div>
                </td>
            )
        }

        return cellValue
    }

    renderTable() {
        if (!this.props.isLoading) {
            return (
                <table className="ui striped selectable celled table" style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            {this.props.headerColumns.map(
                                this.renderTableHeaderRowColumn.bind(this)
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(this.props.data, (rowObj, rowIndex) => {
                            return (
                                <tr
                                    key={(this.props.uniqueRow ? rowObj.id : rowIndex)}
                                >
                                    {this.props.dataProps.map(
                                        this.renderTableRowColumn.bind(this, rowObj, rowIndex)
                                    )}
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            )
        } else {
            return (
                <h3>Loading...</h3>
            )
        }
    }

    render() {
        return (
            <div>
                <div className='text-center'>
                    <h3 style={{ color: '#9e9e9e' }}>{this.props.headerText}</h3>
                </div>
                {this.renderTable()}
            </div>
        )
    }

    handleLink1Click = (rowObj, e) => {
        this.props.handleLink1(rowObj)
    }

    handleLink2Click = (rowObj, e) => {
        this.props.handleLink2(rowObj)
    }
    handleStaticLink1Click = (rowObj, e) => {
        this.props.handleStaticLink1(rowObj)
    }

    handleDeleteRow = (rowObj, rowIndex, e) => {
        this.props.handleDeleteRow(rowObj, rowIndex)
    }

    handleColumnValue = (param) => {
        return (
            <td className='left aligned'>
                {this.props.statusColumns.values[param].value}
            </td>
        )
    }

    columnWidthMapping(index) {
        let columnStr = 'one'
        if (this.props.columnWidth) {
            let wideNumber = this.props.columnWidth[index]
            if (_.isEqual(wideNumber, '1')) columnStr = 'one'
            if (_.isEqual(wideNumber, '2')) columnStr = 'two'
            if (_.isEqual(wideNumber, '3')) columnStr = 'three'
            if (_.isEqual(wideNumber, '4')) columnStr = 'four'
            if (_.isEqual(wideNumber, '5')) columnStr = 'five'
            if (_.isEqual(wideNumber, '6')) columnStr = 'six'
            if (_.isEqual(wideNumber, '7')) columnStr = 'seven'
            if (_.isEqual(wideNumber, '8')) columnStr = 'eight'
            if (_.isEqual(wideNumber, '9')) columnStr = 'nine'
            if (_.isEqual(wideNumber, '10')) columnStr = 'ten'
        }
        return columnStr + ' wide'
    }
}

TableModule2.propTypes = {
    data: PropTypes.any,
    // dataProps: PropTypes.array,
    // uniqueRow: PropTypes.bool,
    headerColumns: PropTypes.array,
    headerText: PropTypes.string,
    onRowSelection: PropTypes.func,
    isLoading: PropTypes.bool,
    // statusColumns: PropTypes.object,
    handleDeleteRow: PropTypes.func,
    // handleColumnAction: PropTypes.func,
    handleLink1: PropTypes.func,
    handleLink2: PropTypes.func,
    handleStaticLink1: PropTypes.func,
    // refSection: PropTypes.string,
    // columnWidthHeader: PropTypes.array,
    columnWidth: PropTypes.array,
    isShowBlankCell: PropTypes.bool,
    isShowBlankForZeroNumber: PropTypes.bool
}