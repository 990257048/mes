
let { takeEvery, call, put, select, all, take } = ReduxSagaEffects

let appSaga = function* () {

    yield takeEvery($INIT_TABLE_DATA, function* () {
        try{
            let {Data, Message} = yield call(getTableData);
            yield put( set_table_data(Data) );
            message.success(Message);
        }catch(e){
            message.error(e.Message);
        }
        
    });

    yield takeEvery($FAST_QUERY, function* ({v, setv}) {    //快速查询
        try{
            let {Data, Message} = yield call(getTableData, {OLD_QSN: v});
            yield put( set_table_data(Data) );
            message.success(Message);
            setv("");   // 清空搜索框内的值
        }catch(e){
            message.error(e.Message);
        }
    });

    yield takeEvery($QUERY, function* ({o}) {   //多条件查询
        let {queryType, BU, startTime, endTime, qsn} = o;
        try{
            if(queryType == "DATE"){   //按时间查询
                let {Data, Message} = yield call(queryTableData, {BU, startTime, endTime});
                yield put( set_table_data(Data) );
                message.success(Message);
            }
            if(queryType == "QSN"){    //按qsn查询
                let {Data, Message} = yield call(getTableData, {BU, OLD_QSN: qsn});
                yield put( set_table_data(Data) );
                message.success(Message);
            }
        }catch(e){
            message.error(e.Message);
        }
    });

    yield takeEvery($SCRAP, function* () {   // 报废操作
        console.log("scrap!");
        try{
            let checkedData = yield select(state => state.appReducer.checkedData);
            let {Message} = yield call(scrapOperation, {QuacksUP: checkedData.map(row => ({OLD_QSN: row.OLD_QSN, BU_NAME: row.BU_NAME})) });
            message.success(Message);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }catch(e){
            message.error(e.Message);
        }
    });

    yield takeEvery($DELETE, function* () {  // 删除操作
        console.log("delete!");
        try{
            let checkedData = yield select(state => state.appReducer.checkedData);
            let {Message} = yield call(deleteOperation, {QuacksDE: checkedData.map(row => ({OLD_QSN: row.OLD_QSN, BU_NAME: row.BU_NAME})) });
            message.success(Message);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }catch(e){
            message.error(e.Message);
        }
    });

    yield takeEvery($DOWNLOAD_EXCEL, function* ({setLoading}) {    // down excel 操作
        console.log("down excel111!");
        let allData = yield select(state => state.appReducer.tableData);
        setLoading(true);   // 打开loading状态
        // 注意： downExcel会有一些异步处理及大量复杂计算占用资源，而setLoading会改变组件内部状态，由于react底层改变状态的机制，大量计算和异步会阻断react改变状态，使setLoading(true) 不生效,
        //       因此需要让setLoading(true)先执行成功后再进行大量复杂计算（down Excel）,这里用延时保证setLoading(true)执行成功！！
        setTimeout(() => {  
            downExcel(allData, "quack-sn", "down-excel", function () {  // download Excel完毕后会执行
                setLoading(false);  // 关闭loading状态    
                message.success("download excel 已完成！");
            });
        }, 500);  
    });
}

let testSaga = function* () {
    console.log("test saga run !!");
}

let rootSaga = function* () {     //处理异步action 处理所有的请求
    yield all([appSaga(), testSaga()])
}

let ret_table_config = (dispatch, h, data) => {    // 表格相关配置 （规格 分页 数据源 宽高 交互 列 列宽 操作）
    return {
        size: "small",
        pagination: {
            size: "middle",
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: data || [],
        scroll: {
            // x: 2000,
            y: h || 300
        },
        rowSelection: {
            type: "checkbox",
            onChange: (key, row) => { dispatch(set_checked_data(row)) }
        },
        columns: [
            {
                title: '序號',
                dataIndex: 'no'
            },
            {
                title: 'BU_NAME',
                dataIndex: 'BU_NAME'
            },
            {
                title: 'OLD_QSN',
                dataIndex: 'OLD_QSN'
            },

            {
                title: 'SCRAP_CAUSE',
                dataIndex: 'SCRAP_CAUSE'
            },
            {
                title: 'DFROM_ID',
                dataIndex: 'DFROM_ID'
            },
            {
                title: 'DTO_DATE',
                dataIndex: 'DTO_DATE'
            },
            {
                title: 'RFROM_DATE',
                dataIndex: 'RFROM_DATE'
            }
        ]
    }
}
