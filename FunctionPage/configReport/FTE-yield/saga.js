
let { takeEvery, call, put, select, all, take } = ReduxSagaEffects

let appSaga = function* () {

    yield takeEvery($INIT_TABLE_DATA, function* () {
        console.log("table init");

        // try{
        //     let getAllTableData = () => Promise.all([
        //         get_mock_data(["field1", "field2", "field3", "field4", "field5", "field6"], 1000),
        //         get_mock_data(["field1", "field2", "field3", "field4", "field5", "field6"], 0),
        //         get_mock_data(["field1", "field2", "field3", "field4", "field5", "field6"], 1300)
        //     ]);
        //     let allData = yield call(getAllTableData);
        //     yield put( set_all_table_data(...allData) );
        //     message.success("加载数据成功！");
        // }catch(e){
        //     message.error(e.Message);
        // }

        let getAllTableData = () => Promise.all([todayTableData(), yesterdayTableData(), quarterTableData()]);
        let allData = yield call(getAllTableData);   // allData: [{Status, Data, Message}, {...}, {...}]
        allData = allData.map(({Data}) => {
            return typeof Data == "object" ? Data ? Data : [] : [];
        });
        console.log(allData);
        yield put(set_all_table_data(...allData));
        message.success("加载数据成功！");
    });
}

let testSaga = function* () {
    console.log("test saga run !!");
}

let rootSaga = function* () {     //处理异步action 处理所有的请求
    yield all([appSaga(), testSaga()])
}

let ret_table_config = (h, data) => {    // 表格相关配置 （规格 分页 数据源 宽高 交互 列 列宽 操作）

    // "PROJECTNAME": "Dreamliner",
    // "SKUNO": "800-42801",
    // "ASSY": null,
    // "PCB2C": null,
    // "PCB4C": null,
    // "PCBBI": null,
    // "PCBFA": null,
    // "PCBFT": null,
    // "PCBINT": null,
    // "PCBP2": null,
    // "PCBPB": null,
    // "PCBPM": null,
    // "PCBPM2": null,
    // "PCBST": "100",
    // "SYSBI": null,
    // "TOTAL": "100",
    // "ETE_GOAL": "95.2"

    // console.log(data);
    // 设置表字段（由data决定 若data为空设置默认字段）
    // field: key no ... 
    let columns = [];
    if (data.length > 0) {   // 提取字段，生成字段配置
        columns = Object.keys(data[0]).map(field => ({ 
            title: field, 
            dataIndex: field, 
            fixed: field == "no" ? "left" : null,
            width: field == "PROJECTNAME" ? 170 : null
        })).filter(row => row.title != "key");
    } else {
        columns = [{
            title: '序號',
            dataIndex: 'no'
        }];
    }

    return {
        size: "small",
        pagination: {
            size: "small",
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        rowClassName: row => {
            if(Number(row.TOTAL) < Number(row.ETE_GOAL)){
                return "row-error"
            }
        },
        dataSource: data || [],
        scroll: {
            // x: 100,
            y: h || 300
        },
        columns
    }
}
