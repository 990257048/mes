// action / actionCreator     sagaAction / reducerAction
// sagaAction

const $INIT_TABLE_DATA = "初始化表数据";
const $init_table_data = () => ({ type: $INIT_TABLE_DATA });

// reducerAction

const SET_CURRENT_BOARD = "设置当前看板";
const set_current_board = currentBoard => ({type: SET_CURRENT_BOARD, currentBoard});

const SET_TABLE_HEIGHT = "设置表格高度";
const set_table_height = tableHeight => ({type: SET_TABLE_HEIGHT, tableHeight});

const SET_TODAY_TABLE_DATA = "设置今天的看板数据";
const set_today_table_data = data => ({type: SET_TODAY_TABLE_DATA, data});

const SET_YESTODAY_TABLE_DATA = "设置昨天的看板数据";
const set_yestoday_table_data = data => ({type: SET_YESTODAY_TABLE_DATA, data});

const SET_QUARTER_TABLE_DATA = "设置本季度的看板数据";
const set_quarter_table_data = data => ({type: SET_QUARTER_TABLE_DATA, data});

const SET_ALL_TABLE_DATA = "设置所有的表数据";
const set_all_table_data = (todayTableData, yesTodayTableData, quarterTableData) => ({type: SET_ALL_TABLE_DATA, todayTableData, yesTodayTableData, quarterTableData})

//actionCreator 

//api
let createRequest = (className, functionName, fn) => {
    return data => {
        var data = data ? fn ? fn(data) : data : {};
        return new Promise((resolve, reject) => {
            self.parent.client.CallFunction(className, functionName, data, e => {
                resolve(e);
            });
        });
    }
}

// 今天的
let todayTableData = createRequest("MESStation.Config.TE_FPY_KANBAN", "TE_FPY_Today_KANBAN");
// 昨天的
let yesterdayTableData = createRequest("MESStation.Config.TE_FPY_KANBAN", "TE_FPY_Yesterday_KANBAN");
// 当前季度的
let quarterTableData = createRequest("MESStation.Config.TE_FPY_KANBAN", "TE_FPY_Quarter_KANBAN");


// mock


// 获取模拟数据

let get_mock_data = (field, len) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mock_data(field, len));
        }, 100);
    });
}

let mock_data = (field, len) => {    //ret [] [{...}]
    let data = [];    
    if(len > 0){
        for(var i = 1; i <= len; i++){
            let row = {};
            field.forEach(fie => {
                row[fie] = "测试数据" + i;
            });
            data.push(row);
        }
    }
    return data;
}



