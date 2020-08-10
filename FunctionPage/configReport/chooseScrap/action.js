// action / actionCreator     sagaAction / reducerAction
// sagaAction

const $INIT_TABLE_DATA = "初始化表数据";
const $init_table_data = () => ({ type: $INIT_TABLE_DATA });

const $FAST_QUERY = "快速查询表数据";
const $fast_query = (v, setv) => ({ type: $FAST_QUERY, v, setv});

const $QUERY = "多条件查詢表數據";
const $query = (o) => ({ type: $QUERY, o });

const $SCRAP = "报废操作";
const $scrap = () => ({type: $SCRAP});

const $DELETE = "删除操作";
const $delete = () => ({type: $DELETE});

const $DOWNLOAD_EXCEL = "downloadExcel操作";
const $downloadExcel = (setLoading) => ({type: $DOWNLOAD_EXCEL, setLoading });

// reducerAction
const SET_TABLE_DATA = "设置表数据";
const set_table_data = data => ({ type: SET_TABLE_DATA, data });

const SET_CHECKED_DATA = "设置已经选中的数据（待操作的数据）";
const set_checked_data = checkedData => ({ type: SET_CHECKED_DATA, checkedData });

//actionCreator 

//api
let createRequest = (className, functionName, fn) => {
    return data => {
        var data = data ? fn ? fn(data) : data : {};
        return new Promise((resolve, reject) => {
            self.parent.client.CallFunction(className, functionName, data, e => {
                if(e.Status == "Pass"){
                    resolve(e);
                }else{
                    reject(e);
                }
            });
        });
    }
}

// 初始化表数据 by old_qsn查询
let getTableData = createRequest("MESStation.Config.QuackScrap", "SelectQScrapConfig");    // {OLD_QSN, BU}
// by date 查询
let queryTableData = createRequest("MESStation.Config.QuackScrap", "AddQScrapConfig");     //{BU, startTime, endTime}
// 批量报废
let scrapOperation = createRequest("MESStation.Config.QuackScrap", "UpdateQScrapConfig");     //{QuacksUP: [{OLD_QSN, BU_NAME}, ...]
// 批量删除
let deleteOperation = createRequest("MESStation.Config.QuackScrap", "DeleteQScrapConfig");     //{QuacksDE: [{OLD_QSN, BU_NAME}, ...]





