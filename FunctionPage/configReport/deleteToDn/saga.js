
let rootSaga = (({takeEvery, take, all, call, put, select}) => {
    


    let saga_table_render_prev = function* (){
        try{
            let {Data, Message} = yield call(getTable, {TO_NO: ""});
            message.success(Message);
            actions.set_table_data(Data.map((row, i) => ({no: i + 1, key: row.TO_NO, ...row})));

        } catch (e){
            message.error(e.Message);
        }
    }

    let saga_query_data1 = function* (){
        try{
            let {queryType, queryValue} = yield select(state => state.queryReducer);
            console.log(queryType, queryValue);
            let {Data, Message} = yield call(getTable, {queryType, queryValue});
            message.success(Message);
            actions.set_table_data(Data.map((row, i) => ({no: i + 1, key: row.TO_NO, ...row})));

        } catch (e){
            message.error(e.Message);
        }
    }

    let saga_query_data2 = function* ({value}){
        try{
            let {Data, Message} = yield call(getTable, {value});
            message.success(Message);
            actions.set_table_data(Data.map((row, i) => ({no: i + 1, key: row.TO_NO, ...row})));

        } catch (e){
            message.error(e.Message);
        }
    }





    //-----------------------------------------------

    let saga_login = function* ({d}){
        try{
            let {Message} = yield call(sec_login, d);
            message.success(Message);
            actions.set_edit_drawer_state({login: true});
        }catch(e){
            message.error(e.Message);
        }
    }

    let saga_login_success_get_table = function*(){
        try{
            let {current_to} = yield select(state => state.editDrawerReducer);
            let {Data} = yield call(getDn, {current_to});
            actions.set_edit_drawer_state({tableData: Data.map((row, i) => ({key: row.DN_NO, no: i + 1, ...row}))});
        }catch(e){
            message.error(e.Message);
        }
    }

    let saga_delete = function* ({d}){
        console.log(JSON.stringify(d));
        try{
            let {TO_NO, DN_NO} = d;
            let {Message} = yield call(deleteDN, {TO_NO, DN_NO});
            message.success(Message);
        }catch(e){
            message.error(e.Message);
        }
    }

    let appSaga = function* (){
        console.log("app saga run!");
        yield takeEvery(actionNames.SAGA_TABLE_RENDER_PREV, saga_table_render_prev);
        yield takeEvery(actionNames.SAGA_QUERY_DATA1, saga_query_data1);
        yield takeEvery(actionNames.SAGA_QUERY_DATA2, saga_query_data2);
        
        
        yield takeEvery(actionNames.SAGA_LOGIN, saga_login);
        yield takeEvery(actionNames.SAGA_LOGIN_SUCCESS_GET_TABLE, saga_login_success_get_table)
        yield takeEvery(actionNames.SAGA_DELETE, saga_delete);
    }
    
    let testSaga = function* (){
        console.log("test saga run!");
    }
    
    return function* (){
        yield all([appSaga(), testSaga()]);
    }
})(ReduxSagaEffects);


let useTableConfig = () => {
    let tableInitConfig = {
        size: "small",
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: [],
        scroll: {
            x: 800, 
            y: 200
        },
        columns: [
            {
                title: '序號',
                dataIndex: 'no',
                fixed: 'left'
            },
            {
                title: 'TO号',
                dataIndex: 'TO_NO'
            },
            {
                title: 'DN类型',
                dataIndex: 'DN_CUSTOMER'
            },
            {
                title: '创建時間',
                dataIndex: 'CREATETIME'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 60,//88,
                fixed: 'right',
                render: (row, allRow, no) => {
                    
                    return <div>
                        <Tooltip title="操作"  placement="topRight">
                                <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} onClick={() => {
                                    actions.set_edit_drawer_state({visible: true, current_to: row.TO_NO})
                                }} />  
                        </Tooltip>   
                    </div>
                }
            }
        ]
    }

    let [tableConfig, setTableConfig] = useState(tableInitConfig);
    let setTableHeight = height => {
        console.log(height);
        setTableConfig({
            ...tableConfig, 
            scroll: {
                ...tableConfig.scroll, 
                y: height
            }
        });
    }
    let setTableData = data => {
        setTableConfig({...tableConfig, dataSource: data});
    }
    return [tableConfig, setTableHeight, setTableData]
}


let retTableConfig = (data) => {
    let tableInitConfig = {
        size: "small",
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: data || [],
        scroll: {
            x: 680,
            //y: height || 400
        },
        columns: [
    //   "TO_NO": "0000066967",
    //   "DN_NO": "5810033670",
    //   "DN_CUSTOMER": "BCQ001",
    //   "CREATETIME": "2020-07-14 08:11"

            {
                title: '序號',
                dataIndex: 'no'
            },
            {
                title: 'TO号',
                dataIndex: 'TO_NO'
            },
            {
                title: 'DN号',
                dataIndex: 'DN_NO'
            },
            {
                title: '创建時間',
                dataIndex: 'CREATETIME'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 60,//88,
                fixed: 'right',
                render: (row, allRow, no) => {
                    
                    return <div>
                        {/* <Tooltip title="删除"  placement="topRight">
                                <Button type="primary" danger={true} shape="circle" size="small" icon={<DeleteOutlined />} onClick={() => {
                                    console.log(row);
                                }} />  
                        </Tooltip>    */}
                        <Popconfirm 
                            title="你確定要刪除这笔数据吗？"
                            placement="topRight"
                            onConfirm={() => {actions.saga_delete(row)}}
                            //onCancel={() => {console.log("cancel")}}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type="primary" danger={true} shape="circle" size="small" icon={<DeleteOutlined />} />
                        </Popconfirm>           
                    </div>
                }
            }
        ]
    }
    return tableInitConfig;
}