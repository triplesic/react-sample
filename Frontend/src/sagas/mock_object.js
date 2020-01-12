export const work_order_mock = 
{
data:
    {
    obj:
        {
        id:1,
        workOrderNumber:'0001', 
        orderNumber:'ORD1000', 
        customer: 'Honda', 
        drawNo: '001',
        productName: 'ET 345',
        quantity: '100',
        startDate: '11/10/2017',
        endDate: '15/10/2017'
        }
    }
}

export const engineer_order_mock = 
{
data:
    {
    obj:
        {
            id:2,
            statusCd: '002',
            startDate: '12/10/2017',
            endDate: '15/10/2017',
            userId: '001'
        }
    }
}

export const production_order_mock = 
{
data:
    {
    obj:
        {
            id:1,
            statusCd: '001',
            startDate: '13/10/2017',
            endDate: '15/10/2017',
            userId: '001'
        }
    }
}

export const delivery_order_mock = 
{
data:
    {
    obj:
        {
            id:3,
            startDate: '11/10/2017',
            endDate: '15/11/2017'  
        }
    }
}

export const engineer_qa_collaboration_mock =
{
data:
{
    obj: [
    {
        id: 1,
        engineeringWorkOrderId: 1,
        revision: 1,
        type: "CNCX",
        statusId: 7,
        statusCd: "102",
        qcDetailCNCPartDtoList: null,
        qcDetailMaterialDtoList: null,
        engineeringQACollaborationImageDtoList: null,
        qcDetailDailyDto: null,
        createdDt: "2018-01-08T18:08:07",
        qty: "",
        statusNm: "ENGINEERING_PENDING",
        createdDtStr: "08/01/2018"
        }
    ],
    message: "",
    code: "OK"
    }
}

export const production_qa_collaboration_mock =
{
data:
    {
    obj: [
    {
    id: 1,
    productionWorkOrderId: 2,
    workOrderId: 4,
    revision: 2,
    type: "CNC",
    statusId: 7,
    statusCd: "102",
    qcDetailCNCPartDtoList: null,
    qcDetailMaterialDtoList: null,
    productionQACollaborationImageDtoList: null,
    qcDetailDailyDto: null,
    createdDt: "2018-01-17T15:16:21",
    responsibleUserId: 2,
    qty: "",
    statusNm: "ENGINEERING_PENDING",
    createdDtStr: "17/01/2018"
    }
    ],
    message: "",
    code: "OK"
    }
}

export const all_work_orders_mock = 
{
data:
    {
    obj: [
    {
    id: 1,
    workOrderNumber: "WO-000002",
    quantity: 290,
    customerName: "Toyota",
    productName: "TEST INVENTORY",
    startDate: "13/12/2017",
    endDate: "19/12/2017"
    },
    {
    id: 2,
    workOrderNumber: "WO-000002",
    quantity: 22,
    customerName: "Honda",
    productName: "TEST INVENTORY",
    startDate: "03/01/2018",
    endDate: "12/01/2018"
    },
    {
    id: 3,
    workOrderNumber: "WO-000003",
    quantity: 21,
    customerName: "Honda",
    productName: "Tst002",
    startDate: null,
    endDate: null
    },
    {
    id: 4,
    workOrderNumber: "WO-000004",
    quantity: 32,
    customerName: "Toyota",
    productName: "Tst002",
    startDate: "03/01/2018",
    endDate: "11/01/2018"
    },
    {
    id: 5,
    workOrderNumber: "WO-000005",
    quantity: 3343,
    customerName: "Honda",
    productName: "Tst002",
    startDate: "01/01/2018",
    endDate: "03/01/2018"
    }
    ],
    message: "",
    code: "OK"
    }
}