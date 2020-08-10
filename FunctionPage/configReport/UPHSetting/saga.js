
let {all, takeEvery, takeLatest, throttle, take, call, fork, select, put} = ReduxSagaEffects;



let saga_search = function* (){
    let {lineName, editTime} = yield select(state => state.appReducer.search);
    try{
        let {Data, Message} = yield call(getTableDataByLineAndDate, {Line: lineName, Date: editTime});
        yield put(set_table_data(Data.slice(0, 10).map((row, i) => ({key: row.ID, no: i+1, ...row}))));
        yield put(set_search_visible(false));
        message.success(Message);
    } catch(e){
        message.error(e.Message);
    }
}

let saga_fast_search = function* (action){
    try{
        let {Data, Message} = yield call(getTableDataBySkuOrWo, {InputData: action.value});
        yield put(set_table_data(Data.map((row, i) => ({key: row.ID, no: i+1, ...row}))));
        yield put(set_search_value(""));
        message.success(Message);
    } catch(e){
        message.error(e.Message);
    }
}

let saga_lot_delete_data = function* (action){
    try{
        let e1 = yield call(deleteLotTableData, {WoPlan: action.checkedData.map(row => ({ID: row.ID}))} );
        message.success(e1.Message);
        yield put(set_delete_visible(false));
        let e2 = yield call(getTableData);
        yield put(set_table_data(e2.Data.map((row, i) => ({key: row.ID, no: i+1, ...row}))));
        message.success(e2.Message);
    } catch(e){
        message.error(e.Message);
    }
}

let saga_delete_data = function* (action){
    try{
        let e1 = yield call(deleteTableData, {ID: action.ID});
        message.success(e1.Message);
        let e2 = yield call(getTableData);
        yield put(set_table_data(e2.Data.map((row, i) => ({key: row.ID, no: i+1, ...row}))));
        message.success(e2.Message);
    } catch(e){
        message.error(e.Message);
    }
}

let sgga_new_operate = function* ({data}){
    try{
        console.log(data);
        let {Message} = yield call(newData, data);
        message.success(Message);
    } catch(e){
        message.error(e.Message);
    }
}

let saga_edit_operate = function* ({data}){
    console.log(data);
    try{
        let {Message} = yield call(editData, data);
        message.success(Message);
    } catch(e){
        message.error(e.Message);
    }
}


let appSaga = function* (){
    yield takeEvery(SAGA_SEARCH, saga_search);
    yield takeEvery(SAGA_FAST_SEARCH, saga_fast_search);
    yield takeEvery(SAGA_LOT_DELETE_DATA, saga_lot_delete_data);
    yield takeEvery(SAGA_DELETE_DATA, saga_delete_data);
    yield takeEvery(SAGA_NEW_OPERATE, sgga_new_operate);
    yield takeEvery(SAGA_EDIT_OPERATE, saga_edit_operate);
}

let testSaga = function* (){
    console.log("run test saga!!");
}


let rootSaga = function* (){
    yield all([appSaga(), testSaga()]);
}


//==page/util===========================





//==自定义Hooks==========================

let useTableConfig = () => {
    let initConfig = {
        size: "small",
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: [],
        scroll: {
            x: 4400, 
            y: 200
        },
        rowSelection:{
	        type: "checkbox",
	        onChange: (keys, table) => { store.dispatch(set_checked_data(table)) }
        },
        columns: [
            {
                title: '序號',
                dataIndex: 'no',    
                width: 70,
                fixed: 'left'
            },
            {
                title: 'WORKORDER',
                dataIndex: 'WORKORDER',   
                fixed: 'left'
            },
            {
                title: 'SKUNO',
                dataIndex: 'SKUNO'
            },
            {
                title: 'LINE_NAME',
                dataIndex: 'LINE_NAME'
            },
            {
                title: 'UPHDATE',
                dataIndex: 'UPHDATE'
            },
            {
                title: 'HOURPERIOD',
                dataIndex: 'HOURPERIOD'
            },
            {
                title: 'CLASS_NAME',
                dataIndex: 'CLASS_NAME'
            },
            {
                title: 'EVENTNAME',
                dataIndex: 'EVENTNAME'
            },
            {
                title: 'WORKORDER_QTY',
                dataIndex: 'WORKORDER_QTY'
            },
            {
                title: 'PLAN_QTY',
                dataIndex: 'PLAN_QTY'
            },
            {
                title: 'GOAL_QTY',
                dataIndex: 'GOAL_QTY'
            },
            {
                title: 'UPH_QTY',
                dataIndex: 'UPH_QTY'
            },
            {
                title: 'MARKPERSON',
                dataIndex: 'MARKPERSON'
            },
            {
                title: 'COMEPERSON',
                dataIndex: 'COMEPERSON'
            },
            {
                title: 'ACTUALPERSON',
                dataIndex: 'ACTUALPERSON'
            },
            {
                title: 'REASON',
                dataIndex: 'REASON',
                width: 270,
            },
            {
                title: 'LASTEDITTIME',
                dataIndex: 'LASTEDITTIME'
            },
            {
                title: 'LASTEDITOR',
                dataIndex: 'LASTEDITOR'
            },
            {
                title: 'DATA1',
                dataIndex: 'DATA1'
            },
            {
                title: 'DATA2',
                dataIndex: 'DATA2'
            },
            {
                title: 'DATA3',
                dataIndex: 'DATA3'
            },
            {
                title: 'CODENAME',
                dataIndex: 'CODENAME'
            },
            {
                title: 'REST_QTY',
                dataIndex: 'REST_QTY'
            },
            {
                title: 'LEAVE_QTY',
                dataIndex: 'LEAVE_QTY'
            },
            {
                title: 'ABSENT_QTY',
                dataIndex: 'ABSENT_QTY'
            },
            {
                title: 'BORROW_QTY',
                dataIndex: 'BORROW_QTY'
            },
            {
                title: 'LOAN_QTY',
                dataIndex: 'LOAN_QTY'
            },
            {
                title: 'DUTY',
                dataIndex: 'DUTY'
            },
            {
                title: 'EDIT_TIME',
                dataIndex: 'EDIT_TIME',
                width: 170,
            },
            {
                title: 'EDITOR',
                dataIndex: 'EDITOR'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 90,//88,
                fixed: 'right',
                render: (row, allRow, no) => {
                    return <div>
                        <Space>
                            <Tooltip title="修改"  placement="topRight">
                                <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} onClick={() => {
                                    //console.log(row, send_data_selector(row));
                                    store.dispatch(change_current_content("edit", send_data_selector(row)));
                                    store.dispatch(set_drawer_visible("edit", true));
                                }}></Button>
                            </Tooltip>
                            <Popconfirm 
                                title="你確定要刪除该条数据吗？"
                                placement="topRight"
                                //visible={true}
                                //onVisibleChange={(...args) => {console.log(args)}}
                                onConfirm={() => {store.dispatch({type: SAGA_DELETE_DATA, ID: row.ID})}}
                                //onCancel={(...args) => {console.log(args)}}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="primary" shape="circle" danger size="small" icon={<DeleteOutlined />} ></Button>
                            </Popconfirm>
                        </Space>
                    </div>
                }
            }
        ]
    };
    let [tableConfig, setTableConfig] = useState(initConfig);
    let setTableHeight = height => {
        setTableConfig({
            ...tableConfig,
            scroll: {
                ...tableConfig.scroll,
                y: height
            }
        });
    }
    let setTableData = data => {
        setTableConfig({
            ...tableConfig,
            dataSource: data
        });
    }
    return [tableConfig, setTableHeight, setTableData];
}


let send_data_selector = row => ({
    id: row.ID,
    actual_person: row.ACTUALPERSON,
    date_day: row.CLASS_NAME == "SHIFT 1" ? [row.HOURPERIOD] : [],
    date_night: row.CLASS_NAME != "SHIFT 1" ? [row.HOURPERIOD] : [],
    come_person: row.COMEPERSON,
    station: row.EVENTNAME,
    goal_qty: row.GOAL_QTY,
    line: row.LINE_NAME,
    standard_person: row.MARKPERSON,
    plan_qty: row.PLAN_QTY,
    reason: row.REASON ? row.REASON : "",
    skuno: row.SKUNO,
    uph_qty: row.UPH_QTY,
    wo: row.WORKORDER
});

// ID: id,
//     PLAN_QTY: plan_qty,
//     GOAL_QTY: goal_qty,
//     UPH_QTY: uph_qty,
//     MARKPERSON: standard_person,
//     COMEPERSON: come_person,
//     ACTUALPERSON: actual_person,
//     REASON: reason




// ABSENT_QTY: 0
// ACTUALPERSON: 33                  actual_person
// BORROW_QTY: 26
// CLASS_NAME: "SHIFT 1"             date_day / date_night
// CODENAME: "TG3442"
// COMEPERSON: 40                    come_person
// DATA1: "2020-01-02"
// DATA2: null
// DATA3: null
// DUTY: "牙韓擇"
// EDITOR: "G7006541"
// EDIT_TIME: "2020-04-22 15:14:04"
// EVENTNAME: "PACKOUT"            station
// GOAL_QTY: 190                   goal_qty
// HOURPERIOD: "15:00-16:00"       date_day / date_night
// ID: "B07F3L072020-01-0215:00-16:00PACKOUT"
// LASTEDITOR: null
// LASTEDITTIME: null
// LEAVE_QTY: 0
// LINE_NAME: "B07F3L07"            line
// LOAN_QTY: 0
// MARKPERSON: 59                   standard_person
// PLAN_QTY: 190                    plan_qty
// REASON: null                     reason
// REST_QTY: 7
// SKUNO: "1000699"                 skuno
// UPHDATE: "2020-01-02"
// UPH_QTY: 190                     uph_qty
// WORKORDER: "002166021184"        wo
// WORKORDER_QTY: 8000
// key: "B07F3L072020-01-0215:00-16:00PACKOUT"
// no: 1


