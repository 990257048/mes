//20200420 add by gch (Cloud MES系统 -- 新机种导入, 重写， 内测) 
//技术栈： React, ReactHooks, Redux, ReduxHooks, antDesign
//================================================================================================================================
//解构要用到的全局变量

let {useState, useEffect, useRef, createContext, useContext, useMemo, useCallback} = React;  //react hooks
let {createStore, combineReducers, applyMiddleware, bindActionCreators} = Redux;
let {Provider, connect, useSelector, useDispatch} = ReactRedux; //redux hooks

let {
    Layout, Menu, 
    Table, Pagination, Radio, Divider,
    Drawer, Modal,
    Tooltip, Button,
    DatePicker,
    RangePicker,
    Input, Select,
    Checkbox,  
    Breadcrumb,
    Steps,
    AutoComplete,
    Popover,
    Upload, Popconfirm, message
} = antd;

let {Search} = Input;
let {Step} = Steps;
let {Option} = Select;
let {SubMenu} = Menu;
let {Header, Content, Sider} = Layout;

let {
    UserOutlined, LaptopOutlined, NotificationOutlined,
    PlusOutlined, EditOutlined, CopyOutlined, DeleteOutlined, RedoOutlined, UploadOutlined,
    LikeFilled, MessageFilled, StarFilled, QuestionCircleFilled, AlertFilled, PhoneFilled,
    HeartOutlined, LikeOutlined, MessageOutlined, MonitorOutlined, BarsOutlined
} = icons;

//================================================================================================================================
//configReportReducer action

const SET_TABLE_DATA = "設置表數據";
const set_table_data = data => ({
    type: SET_TABLE_DATA,
    data
});

const SET_SELECT_DATA = "設置選中的數據";
const set_select_data = selectData => ({
    type: SET_SELECT_DATA,
    selectData
})

const SET_CURRENT_OPERATE = "设置当前操作";
const set_current_operate = currentOperate => ({
    type: SET_CURRENT_OPERATE,
    currentOperate
})

const SET_SEARCH_VALUE = "设置搜索内容";
const set_search_value = searchValue => ({
    type: SET_SEARCH_VALUE,
    searchValue
})

const SET_BUTTON_DISABLED = "設置按鈕是否可點擊";
const set_button_disabled = (name, disabled) => ({
    type: SET_BUTTON_DISABLED,
    name, 
    disabled
})

const SET_H = "設置高度";
const set_h = h => ({
    type: SET_H,
    h
})

//================================================================================================================================
//layerReducer action

const SET_VISIBLE = "設置彈出層顯示/隱藏";
const set_visible = (name, visible) => ({
    type: SET_VISIBLE,
    name, visible
})

const SET_CURRENT_STEP = "設置步驟條進度";
const set_current_step = (name, currentStep) => ({
    type: SET_CURRENT_STEP,
    name, currentStep
})

const SET_NEXT_STEP = "跳转到下一个步骤";
const set_next_step = name => ({
    type: SET_NEXT_STEP,
    name
})

//================================================================================================================================
//layerContentReducer action

const SET_GLOBAL_RELY = "设置全局依赖的值";
const set_global_rely = o => ({
    type: SET_GLOBAL_RELY,
    o
})

const SET_CON_INIT = "设置初始内容";
const set_con_init = (con, o) => ({
    type: SET_CON_INIT,
    con, o
})

const SET_CON_LOAD = "设置预加载数据";
const set_con_load = (con, o) => ({
    type: SET_CON_LOAD,
    con, o
})



//================================================================================================================================

let bindEvent = {  //所有的事件(按功能块分类)
    globalOperate: {     //表格上面的操作                            
        addDrawer: (...args) => (dispatch, getState) => {
            //console.log(this, args);
            dispatch(set_visible("addDrawer", true));
            dispatch(set_current_operate("add"));
        },
        reload: (...args) => (dispatch, getState) => {   //重置
            //console.log(args);
            location.reload();
        },
        search: (v) => (dispatch, getState) => {   //快速查詢
            //dispatch(set_search_value(v));
            getSkuByName({Sku_Name: v}).then(e => {
                dispatch(set_table_data(e.Data.map((row, i) => ({...row, NO: i + 0, key: i}))));
                dispatch(set_search_value(""));
                message.success("获取数据成功！");
            }, e => {
                message.error(e.Message);
            });
            console.log(v);
        }
    },
    actions: {    //表格右侧的操作
        copy: (rowData) => (dispatch, getState) => {
            dispatch(set_select_data(rowData));
            dispatch(set_visible("copyModal", true));
        },
        edit: (rowData) => (dispatch, getStata) => {
            dispatch(set_select_data(rowData)); 
            dispatch(set_current_operate("edit"));
            dispatch(set_current_step("editDrawer", 0));
            dispatch(set_visible("editDrawer", true));
        },
        delete: (rowData) => (dispatch, getStata) => {
            dispatch(set_select_data(rowData)); 
            dispatch(set_visible("deleteModal", true));
        }
    },
    table: {      //表格的操作
        // onChange: (selectData) => (dispatch) => {
        //     dispatch(set_select_data(selectData));
        //     if(selectData.length > 1){
        //         dispatch(set_button_disabled("editData", false));
        //         dispatch(set_button_disabled("deleteData", false));
        //     }else{
        //         dispatch(set_button_disabled("editData", true));
        //         dispatch(set_button_disabled("deleteData", true));
        //     }
        // }
    },
    layer:{  //弹出层的操作
        
    },
    layerContent: {
        
    }
}

//================================================================================================================================
















