
let actionNames = {

    SAGA_TABLE_RENDER_PREV: "表格渲染前，获取表数据",
    SAGA_QUERY_DATA1: "多条件查询表数据",
    SAGA_QUERY_DATA2: "快速查询表数据",
    SAGA_LOGIN: "登录操作",
    SAGA_LOGIN_SUCCESS_GET_TABLE: "登录成功获取表数据",
    SAGA_DELETE: "删除TN操作",

    SET_QUERY_TYPE: "设置查询类型",
    SET_QUERY_VALUE: "设置查询内容",

    SET_TABLE_DATA: "设置表格数据",
    SET_TABLE_HEIGHT: "设置表格高度",

    SET_EDIT_DRAWER_STATE: "设置抽屉状态"
};

let createRootActions = dispatch => {
    let actionCreators = {
        saga_table_render_prev: () => ({type: actionNames.SAGA_TABLE_RENDER_PREV}),
        saga_query_data1: () => ({type: actionNames.SAGA_QUERY_DATA1}),
        saga_query_data2: (value) => ({type: actionNames.SAGA_QUERY_DATA2, value}),
        saga_login: (d) => ({type: actionNames.SAGA_LOGIN, d}),
        saga_login_success_get_table: () => ({type: actionNames.SAGA_LOGIN_SUCCESS_GET_TABLE}),
        saga_delete: (d) => ({type: actionNames.SAGA_DELETE, d}),

        set_query_type: queryType => ({type: actionNames.SET_QUERY_TYPE, queryType}),
        set_query_value: queryValue => ({type: actionNames.SET_QUERY_VALUE, queryValue}),

        set_table_data: data => ({type: actionNames.SET_TABLE_DATA, data}),
        set_table_height: height => ({type: actionNames.SET_TABLE_HEIGHT, height}),

        set_edit_drawer_state: o => ({type: actionNames.SET_EDIT_DRAWER_STATE, o}),
    }
    return bindActionCreators(actionCreators, dispatch);
};

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

//获取表数据
let getTable = createRequest("MESStation.Config.TOEliminate", "FSelectTONOConfig", ({queryType, queryValue, value}) => ({TO_NO: queryValue || value || undefined, TYPE: queryType}));   //{TO_NO 可空}

let sec_login = createRequest("MESStation.Config.TOEliminate", "FLoginSecond", ({login_user, login_pwd}) => ({EMP_NO: login_user, EMP_PASSWORD: login_pwd}))

let getDn = createRequest("MESStation.Config.TOEliminate", "FSelectDNNOConfig", ({current_to}) => ({TO_NO: current_to}))

let deleteDN = createRequest("MESStation.Config.TOEliminate", "FUpdateTONOConfig");   // {TO_NO, DN_NO} 
