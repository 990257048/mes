
let {useState, useEffect, useRef, memo, useCallback, useMemo, createContext, useContext, useReducer} = React;
let {useSelector, useDispatch} = ReactRedux;
let {Drawer, Modal, Popconfirm, Button, DatePicker,Input, Select, Tooltip, Space, Table, Row, Col, Radio, Switch, message} = antd;
let {Option} = Select;
let {
    PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, BarChartOutlined, TableOutlined,
    DeleteOutlined, CommentOutlined,
    BugOutlined, BulbOutlined, QuestionCircleOutlined, BgColorsOutlined, 
    CheckCircleOutlined, CloseCircleOutlined, WarningOutlined, IssuesCloseOutlined,
    PartitionOutlined, RightOutlined, LineOutlined, SendOutlined, ImportOutlined, MenuUnfoldOutlined,
    CaretRightOutlined
} = icons;




//---------------------------------------------------------------------------------------------------------------------------
// StationJsonReducer

const RECEIVE_STATION_JSON = "接收工站回传数据";
const receive_station_json = d => ({
    type: RECEIVE_STATION_JSON,
    d
});


//---------------------------------------------------------------------------------------------------------------------------
// InputsReducer

const LOAD_INPUTS = "设置inputs数据";
const load_inputs = (Pass, Fail) => ({
    type: LOAD_INPUTS,
    Pass, Fail
});

const SET_CURRENT_INPUTS = '设置当前扫描类型';
const set_current_inputs = currentInputs => ({
    type: SET_CURRENT_INPUTS,
    currentInputs
});



//---------------------------------------------------------------------------------------------------------------------------
// OutputsReducer

const LOAD_OUTPUTS = "加载outputs数据";
const load_outputs = (TXT, currentTableName, Tables) => ({
    type: LOAD_OUTPUTS,
    TXT, currentTableName, Tables
});


const CHANGE_CURRENT_TABLE_NAME = "改变当前显示的outputs表格";
const change_current_table_name = currentTableName => ({
    type: CHANGE_CURRENT_TABLE_NAME,
    currentTableName
});

//---------------------------------------------------------------------------------------------------------------------------
// StationLayerReducer

const TOGGLE_TABLE_VISIBLE = '切换表格的显示与隐藏';
const toggle_table_visible = () => ({
    type: TOGGLE_TABLE_VISIBLE
});

//---------------------------------------------------------------------------------------------------------------------------
// StationDomSizeReducer

const SET_OUTPUT_H = '设置output区的高度';
const set_output_h = h => ({
    type: SET_OUTPUT_H,
    h
});

const SET_MESSAGE_H = '设置message区的高度';
const set_message_h = h => ({
    type: SET_MESSAGE_H,
    h
});

//---------------------------------------------------------------------------------------------------------------------------
// MES Station 数据交互

let InitStation = (data) => {
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Stations.CallStation", "InitStation", data, d => {
            if(d.Status == "Pass"){
                resolve(d);
            }else{
                reject(d);
            }
        });
    });
}

let InputHandle = (data) => {
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Stations.CallStation", "StationInput", data, d => {
            if(d.Status == "Pass"){
                resolve(d);
            }else{
                reject(d);
            }
        });
    });
}


//"Class":"MESStation.Stations.CallStation",
//"Function":"InitStation",
//"Data":{"BU":"MFGII","DisplayStationName":"SFC_LH_SMT_LOADING","Line":"D103FSMTLOADING_1"}}







