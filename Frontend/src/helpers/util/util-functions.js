import moment from 'moment'

export function createOrderEventReqObject(orderSeq, itemId, quantity) {
    if (!orderSeq) {
        return { stockId: itemId, quantity }
    } 
    else {
        return { orderSeq, stockId: itemId, quantity }
    }
}

export function calculateTotalInBucket(bucket) {
    return _.map(bucket, chosenItem => chosenItem.quantity * chosenItem.item.price)
                    .reduce((sum, n) => sum + n)
}

export function formatDate(dateArr){
    return new Date(Date.UTC(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4], dateArr[5]));
}

export const convertPairValues = (statuses, keyName, valueName) => {
    return _.map(statuses, elem => {
        let statusCd = elem[keyName]
        let statusNm = elem[valueName]
        return { 'key': statusCd, 'value': statusNm }
    })
}

export const pairAdapter = (pairs) => {
    return _.map(pairs, pair => {
        return { id: pair.key, name: pair.value }
    })
}

export const popObject = (objects) => {
    if ((objects != undefined || objects != null) && Object.keys(objects).length > 0){
        const key =  Object.keys(objects)[0]
        return objects[key]
    }else{
        return {}
    }
}

export const transfromObjectsToArray = (objects) => {
    if (!_.isEmpty(objects)){
        let result =  _.map(objects, (value, key) => {
                        return value
                    })
        return result
    }else {
        return {}
    }
}

export const dateRangeAdapter = (dateRangeObj) => {
    let result = Object.assign({}, dateRangeObj)
    if (dateRangeObj.startDate != undefined || dateRangeObj.startDate != null) {
        result.startDate = moment(dateRangeObj.startDate, 'DD/MM/YYYY').toDate()
    }
    if (dateRangeObj.endDate != undefined || dateRangeObj.endDate != null) {
        result.endDate = moment(dateRangeObj.endDate + '23:59:59', 'DD/MM/YYYY HH:mm:ss').toDate()
    }
    return result
}

export const convertDrawingValues = (workOrderDrawing) => {
    return _.map(workOrderDrawing, drawing => {
        const {id} = drawing
        const name = drawing.fileName + `(${drawing.revision})`
        return {id, name}
    })
}

export const findMinDefaultDate = (engineerStartDate, productionStartDate, deliveryStartDate) => {
    let allStartDates = _.compact([engineerStartDate, productionStartDate, deliveryStartDate])
    let baseDate = moment([2000, 1, 1])
    let min = 99999
    let minDate = null
    for (let i = 0; i < allStartDates.length; i++) {
        let diffDate = Math.abs(baseDate.diff(allStartDates[i], 'days'))
        if (diffDate < min) {
            minDate = allStartDates[i]
            min = diffDate
        }
    }
    return minDate
}

export const findMaxDefaultDate = (engineerEndDate, productionEndDate, deliveryEndDate) => {
    let allEndDates = _.compact([engineerEndDate, productionEndDate, deliveryEndDate])
    let baseDate = moment([2000, 1, 1])
    let max = 0
    let maxDate = null
    for (let i = 0; i < allEndDates.length; i++) {
        let diffDate = Math.abs(baseDate.diff(allEndDates[i], 'days'))
        if (diffDate > max) {
            maxDate = allEndDates[i]
            max = diffDate
        }
    }
    return maxDate
}

const absoluteMonth = (theDate) => {
    let months = Number(moment(theDate).format("MM"))
    let years = Number(moment(theDate).format("YYYY"))
    return months + years
}

export const findAbsoluteMonthDiff = (firstDt, secondDt) => {
    if (firstDt != undefined && secondDt != undefined) {
        let diffMonth = absoluteMonth(secondDt) - absoluteMonth(firstDt)
        return Math.abs(diffMonth)
    }
    return 0
}

export const findMonthDiff = (firstDt, secondDt) => {
    if (firstDt != undefined && secondDt != undefined) {
        let diffMonth = Math.abs(moment(secondDt).diff(moment(firstDt), 'months', true))
        return diffMonth
    }
    return 0
}
