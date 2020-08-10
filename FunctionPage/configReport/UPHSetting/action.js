
//--sagaAaction-------------------------------------------------


const SAGA_SEARCH = "多条件查询（saga）";

const SAGA_FAST_SEARCH = "快速查询（saga）";

const SAGA_DELETE_DATA = "删除表数据";

const SAGA_LOT_DELETE_DATA = "批量删除表数据";

const SAGA_NEW_OPERATE = "新增操作";

const SAGA_EDIT_OPERATE = "修改操作"; 


//--appReducer---------------------------------------------------

const SET_SEARCH_VALUE = "设置快速查询的值";
const set_search_value = searchValue => ({
    type: SET_SEARCH_VALUE,
    searchValue
});

const SET_SEARCH_LINENAME = "设置查询线体";
const set_search_linename = lineName => ({
    type: SET_SEARCH_LINENAME,
    lineName
});

const SET_SEARCH_EDITTIME = "设置查询修改时间";
const set_search_edittime = editTime => ({
    type: SET_SEARCH_EDITTIME,
    editTime
});

const SET_SEARCH_VISIBLE = "设置查询框显隐性";
const set_search_visible = visible => ({
    type: SET_SEARCH_VISIBLE,
    visible
});

const TOGGLE_SEARCH_VISIBLE = "切换查询框显隐性";
const toggle_search_visible = () => ({
    type: TOGGLE_SEARCH_VISIBLE
});

const SET_DELETE_VISIBLE = "设置删除块的显隐性";
const set_delete_visible = visible => ({
    type: SET_DELETE_VISIBLE,
    visible
});

const TOGGLE_DELETE_VISIBLE = "切换删除块的显隐性";
const toggle_delete_visible = () => ({
    type: TOGGLE_DELETE_VISIBLE
});

const SET_CHECKED_DATA = "设置已选中的数据";
const set_checked_data = checkedData => ({
    type: SET_CHECKED_DATA,
    checkedData
});


//drawerReducer------------------------------------------------------

const SET_DRAWER_VISIBLE = "设置抽屉显示与隐藏";
const set_drawer_visible = (drawerType, visible) => ({
    type: SET_DRAWER_VISIBLE,
    drawerType, 
    visible
})

const TOGGLE_DRAWER_VISIBLE = "切换抽屉显示与隐藏";
const toggle_drawer_visible = drawerType => ({
    type: TOGGLE_DRAWER_VISIBLE,
    drawerType
});

const CHANGE_CURRENT_CONTENT = "改变当前内容";
const change_current_content = (drawerType, current) => ({
    type: CHANGE_CURRENT_CONTENT,
    drawerType, current
});

const CHANGE_LOAD_CONTENT = "改变预加载内容";
const change_load_content = (drawerType, load) => ({
    type: CHANGE_LOAD_CONTENT,
    drawerType, load
});


//tableReducer------------------------------------------------------

const SET_TABLE_HEIGHT = "设置表格高度";
const set_table_height = height => ({
    type: SET_TABLE_HEIGHT,
    height
});
const SET_TABLE_DATA = "设置表格数据";
const set_table_data = data => ({
    type: SET_TABLE_DATA,
    data
});





//请求--------------------------------------------------------------

let createRequest = (className, functionName, fn) => {
    return data => {
        data = fn ? fn(data) : data ? data : {};
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

let getTableData = createRequest("MESStation.Config.UPHSetting", "GetUPHList");  //全表查询 {}

let getTableDataBySkuOrWo = createRequest("MESStation.Config.UPHSetting", "GetSKUOrWO");   //快速查询 {InputData}

let getTableDataByLineAndDate = createRequest("MESStation.Config.UPHSetting", "GetLineDateInfo");   //快速查询 {Line, Date}

let deleteTableData = createRequest("MESStation.Config.UPHSetting", "DeleteWoPlanInfo");   //删除表数据 {ID}

let deleteLotTableData = createRequest("MESStation.Config.UPHSetting", "DeleteLotWoPlanInfo");   //批量删除表数据 {WoPlan: [{ID}, ...]}

//GetLine
let getLine = createRequest("MESStation.Config.UPHSetting", "GetLine", ({station}) => ({Station: station}));   //获取线体 {} {Station}

//GetStation
let getStation = createRequest("MESStation.Config.UPHSetting", "GetStation", ({line}) => ({Line: line}));   //获取工站 {} {Line}

//GetSKU
let getSKU = createRequest("MESStation.Config.UPHSetting", "GetSKU", ({wo, skuno}) => ({WO: wo, SKU: skuno}));   //获取机种 {} {WO} {SKU}

//GetWO
let getWO = createRequest("MESStation.Config.UPHSetting", "GetWO", ({skuno, wo}) => ({SKUNO: skuno, WO: wo}));   //获取工单 {} {SKUNO} {WO}

//new
let newData = createRequest("MESStation.Config.UPHSetting", "NewWoPlanInfo", ({
    wo, line, date_day, date_night, station, skuno, plan_qty, goal_qty, uph_qty, standard_person, come_person, actual_person, reason
}) => ({
    WO: wo,
    Line: line,
    HOURPERIOD1: date_day.join(),
    HOURPERIOD2: date_night.join(),
    EVENTNAME: station,
    SKUNO: skuno,
    PLAN_QTY: plan_qty,
    GOAL_QTY: goal_qty,
    UPH_QTY: uph_qty,
    MARKPERSON: standard_person,
    COMEPERSON: come_person,
    ACTUALPERSON: actual_person,
    REASON: reason
}));   //新增操作 {...}

//edit
let editData = createRequest("MESStation.Config.UPHSetting", "EditWoPlanInfo", ({
    id, plan_qty, goal_qty, uph_qty, standard_person, come_person, actual_person, reason
}) => ({
    ID: id,
    PLAN_QTY: plan_qty,
    GOAL_QTY: goal_qty,
    UPH_QTY: uph_qty,
    MARKPERSON: standard_person,
    COMEPERSON: come_person,
    ACTUALPERSON: actual_person,
    REASON: reason
}));   //修改操作 {...}



