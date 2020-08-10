

let s1 = {};

let t1 = {
    "Status": "Pass",
    "Message": "Station 'CELL-ASSY' Input successfull.",
    "Data": {
      "Station": {
        "Line": "D103FSMTLOADING_1",
        "BU": "MFGII",
        "LoginUser": {
          "ID": "000000000000000000000000000EPR",
          "FACTORY": "LH",
          "EMP_NO": "F1335257",
          "EMP_NAME": null,
          "EMP_LEVEL": "9",
          "DPT_NAME": "",
          "EMP_PWD": null,
          "ListStr": [],
          "LoginUser": null,
          "BU": "MFGII",
          "Language": "CHINESE",
          "SystemName": "MES",
          "DBTYPE": 0,
          "IP": "",
          "G_ValidCode": "",
          "MastLogin": true,
          "DBPools": {},
          "Apis": {}
        },
        "IP": "127.0.0.1",
        "Inputs": [
          {
            "ID": "MFGII0000000000000000000000000006BX",
            "Name": "TEXT",
            "DisplayType": "TXT",
            "DataSourceAPI": null,
            "DataSourceAPIPara": null,
            "RefershType": null,
            "DisplayName": "PCBASN",
            "RememberLastInput": "0",
            "SeqNo": 0.0,
            "Value": "123465",
            "ScanFlag": 0.0,
            "Visable": true,
            "Enable": true,
            "DataForUse": [],
            "InputDataloaders": [],
            "Dataloaders": [],
            "DataCheckers": [],
            "ActionRunners": []
          },
          {
            "ID": "MFGII000000000000000000000000000991",
            "Name": "LocationSelect",
            "DisplayType": "Autocomplete",
            "DataSourceAPI": "MESStation.Config.CProcessConfig.GetAllProcess",
            "DataSourceAPIPara": "SN:123",
            "RefershType": "EveryTime",
            "DisplayName": " Process",
            "RememberLastInput": "0",
            "SeqNo": 1.0,
            "Value": "",
            "ScanFlag": 0.0,
            "Visable": true,
            "Enable": true,
            "DataForUse": [],
            "InputDataloaders": [],
            "Dataloaders": [],
            "DataCheckers": [],
            "ActionRunners": []
          },
          {
            "ID": "MFGII0000000000000000000000000006BW",
            "Name": "TEXT",
            "DisplayType": "TXT",
            "DataSourceAPI": null,
            "DataSourceAPIPara": null,
            "RefershType": null,
            "DisplayName": "ACTIONCODE",
            "RememberLastInput": "0",
            "SeqNo": 2.0,
            "Value": "",
            "ScanFlag": 0.0,
            "Visable": true,
            "Enable": true,
            "DataForUse": [],
            "InputDataloaders": [],
            "Dataloaders": [],
            "DataCheckers": [],
            "ActionRunners": []
          },
          {
            "ID": "MFGII00000000000000000000000000025W",
            "Name": "TEXT",
            "DisplayType": "TXT",
            "DataSourceAPI": null,
            "DataSourceAPIPara": null,
            "RefershType": null,
            "DisplayName": "SN",
            "RememberLastInput": "0",
            "SeqNo": 3.0,
            "Value": "",
            "ScanFlag": 0.0,
            "Visable": true,
            "Enable": true,
            "DataForUse": [],
            "InputDataloaders": [],
            "Dataloaders": [],
            "DataCheckers": [],
            "ActionRunners": []
          }
        ],
        "DisplayOutput": [],
        "LabelPrint": [],
        "FailStation": null,
        "StationMessages": [
          {
            "Message": "123465 OK",
            "State": 1
          }
        ],
        "ScanKP": [],
        "ScanLabel": [],
        "ConfirmMessage": [],
        "ReadQuackTxt": false,
        "ReadWeight": false,
        "QuackPicture": null,
        "CurrentClassName": "",
        "ReadAOITxt": false,
        "StopReadAOITxt": true,
        "HasSendStopMessage": false,
        "Packing_FullCarton_Voice": false,
        "LinkMESHelper": false,
        "DisplayName": "CELL-ASSY",
        "StationName": "CELL-ASSY",
        "ID": "MFGII0000000000000000000000000000S3"
      },
      "NextInput": {
        "ID": "MFGII000000000000000000000000000991",
        "Name": "LocationSelect",
        "DisplayType": "Autocomplete",
        "DataSourceAPI": "MESStation.Config.CProcessConfig.GetAllProcess",
        "DataSourceAPIPara": "SN:123",
        "RefershType": "EveryTime",
        "DisplayName": " Process",
        "RememberLastInput": "0",
        "SeqNo": 1.0,
        "Value": "",
        "ScanFlag": 0.0,
        "Visable": true,
        "Enable": true,
        "DataForUse": [],
        "InputDataloaders": [],
        "Dataloaders": [],
        "DataCheckers": [],
        "ActionRunners": []
      },
      "StationLabel": null,
      "ScanType": "Pass"
    },
    "MessageCode": null,
    "StartTime": "2020-06-02 09:44:46",
    "EndTime": "2020-06-02 09:44:46",
    "ProccessTime": 0.033502,
    "IP": "127.0.0.1",
    "MessagePara": [],
    "MessageID": "MSGID951591062286564",
    "ClientID": "CID641591058400766"
  }


//=========================================================================================================================


let StationGlobalInitState = {    //全局参数
    BU: self.parent.client.UserInfo.BU,                         //全局对象
    DisplayStationName: $.MES.getQueryString("StationName"),    //路由传参
    Line: localStorage.getItem($.MES.CK_LINE_NAME),             //本地存储
    AllLine: JSON.parse(localStorage.getItem($.MES.CK_LINE_LIST)),   //需要进一步筛选线体
};

let StationGlobalReducer = (state = StationGlobalInitState, action) => {
    return state;
}


//=========================================================================================================================

let StationJsonReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_STATION_JSON:
            return action.d;
        default:
            return state;
    } 
}

//StationJsonReducer selector

let StationJsonSelector = StationJson => {   //重点*****
    let inputs = {Pass: [], Fail: []};
    let outputs = {TXT: [], currentTableName: "", Tables: []};
    let message = {};
    //inputs.Pass
    if(Object.prototype.toString.call(StationJson.Station.Inputs) == "[object Array]" && StationJson.Station.Inputs.length > 0){
        inputs.Pass = StationJson.Station.Inputs.map(({ID, DisplayName, DisplayType, RefershType, Value, ScanFlag, Visable, Enable, DataForUse}, i) => {
            return {
                ID,
                DisplayName, 
                DisplayType,
                Value,
                Visable, 
                Enable,
                ScanFlag: ScanFlag ? true : false,  //0.0 - false
                DataForUse: DisplayType == "Select" ? (RefershType ? DataForUse : []) : DataForUse,
                Focus: false//i <= 1 ? true : false 
            };
        });
    }
    //inputs.Fail -----------------
    if( Object.prototype.toString.call(StationJson.Station.FailStation) == "[object Object]" 
        && Object.keys(StationJson.Station.FailStation).length > 0
        && StationJson.Station.FailStation.Inputs.length > 0
    ){
        inputs.Fail = StationJson.Station.Inputs.map(({ID, DisplayName, DisplayType, RefershType, Value, ScanFlag, Visable, Enable, DataForUse}) => {
            return {
                ID,
                DisplayName, 
                DisplayType,
                Value,
                Visable, 
                Enable,
                ScanFlag: ScanFlag ? true : false,  //0.0 - false
                DataForUse: RefershType ? DataForUse : [] 
            };
        });
    }
    //outputs
    if(Object.prototype.toString.call(StationJson.Station.DisplayOutput) == "[object Array]"  && StationJson.Station.DisplayOutput.length > 0){
        StationJson.Station.DisplayOutput.map(({DisplayType, Name, Value}) => {
            switch(DisplayType){
                case "TXT":
                    outputs.TXT.push({Name, Value: Value == "" ? "暂无数据" : Value}); //Value == "" ? "暂无数据" : Value
                    break;
                case "Table":
                    outputs.Tables.push({
                        Name, 
                        data: Object.prototype.toString.call(Value) == "[object Array]" ? Value : []
                    });
                    break;
                default:
                    break;
            }
        });
        if(outputs.Tables.length > 0){
            outputs.currentTableName = outputs.Tables[0].Name;
        }
    }
    //message

    // {
    //     "Message": "SN::'FCW23130H0A'加载成功.",
    //     "State": 1
    //   },
    //   {
    //     "Message": "Workorder:'002385016657'加载成功.",
    //     "State": 1
    //   },

    // StationJson.Station.StationMessages
    // StationJson.Station.FailStation.StationMessages

    return {inputs, outputs, message};
}

//=========================================================================================================================

let InputsInitState = {
    currentInputs: "Pass",          //Pass || Fail
    Pass: [
        {
            ID: "001",              //控件标识
            DisplayName: "工单",   //控件前面的名字
            DisplayType: "TXT",     //控件类型 TXT Select Checkbox（目前是开关） Radio PwdTXT    没用的：Autocomplete LocalChecker FileUpload 
            Value: "",    //值
            DataForUse: [],         //可选项 
            ScanFlag: false,        //是否需要扫描枪输入
            Visable: true,          //控件是否显示
            Enable: true            //控件是否可操作      
        }, 
        {
            ID: "002",
            DisplayName: "物料条码",
            DisplayType: "TXT",
            Value: "",
            DataForUse: [],
            ScanFlag: false,
            Visable: true,
            Enable: true
        },
        {
            ID: "003",
            DisplayName: "连板数量",
            DisplayType: "TXT",
            Value: "",            //"on" || ""
            DataForUse: [],
            ScanFlag: false,
            Visable: true,
            Enable: true
        },
        {
            ID: "004",
            DisplayName: "序列号",
            DisplayType: "TXT",
            Value: "",
            DataForUse: [],
            ScanFlag: false,
            Visable: true,
            Enable: true
        },
        // {
        //     ID: "001",              //控件标识
        //     DisplayName: "工单",   //控件前面的名字
        //     DisplayType: "TXT",     //控件类型 TXT Select Checkbox（目前是开关） Radio PwdTXT    没用的：Autocomplete LocalChecker FileUpload 
        //     Value: "test value",    //值
        //     DataForUse: [],         //可选项 
        //     ScanFlag: false,        //是否需要扫描枪输入
        //     Visable: true,          //控件是否显示
        //     Enable: true            //控件是否可操作      
        // }, 
        // {
        //     ID: "002",
        //     DisplayName: "物料条码",
        //     DisplayType: "Select",
        //     Value: "test1",
        //     DataForUse: ["test1", "test2", "test3"],
        //     ScanFlag: false,
        //     Visable: true,
        //     Enable: true
        // },
        // {
        //     ID: "003",
        //     DisplayName: "连板数量",
        //     DisplayType: "Checkbox",
        //     Value: "on",            //"on" || ""
        //     DataForUse: [],
        //     ScanFlag: false,
        //     Visable: true,
        //     Enable: true
        // },
        {
            ID: "0040",
            DisplayName: "序列号",
            DisplayType: "Radio",
            Value: "test1",
            DataForUse: ["test1", "test2", "test3"],
            ScanFlag: false,
            Visable: true,
            Enable: true
        },
        // {
        //     ID: "005",
        //     DisplayName: "name5",
        //     DisplayType: "PwdTXT",
        //     Value: "",
        //     DataForUse: [],
        //     ScanFlag: false,
        //     Visable: true,
        //     Enable: true
        // }
    ],
    Fail: [
        {
            ID: "0011",              //控件标识
            DisplayName: "工单",   //控件前面的名字
            DisplayType: "TXT",     //控件类型 TXT Select Checkbox（目前是开关） Radio PwdTXT    没用的：Autocomplete LocalChecker FileUpload 
            Value: "",    //值
            DataForUse: [],         //可选项 
            ScanFlag: false,        //是否需要扫描枪输入
            Visable: true,          //控件是否显示
            Enable: true            //控件是否可操作      
        }, 
        {
            ID: "0021",
            DisplayName: "物料条码",
            DisplayType: "TXT",
            Value: "",
            DataForUse: [],
            ScanFlag: false,
            Visable: true,
            Enable: true
        }
    ]
};


let InputsReducer = (state = InputsInitState, action) => {
    switch(action.type){
        case LOAD_INPUTS:
            var {Pass, Fail} = action;
            return {
                ...state,
                Pass,
                Fail
            }
        case SET_CURRENT_INPUTS:
            var {currentInputs} = action;
            return {
                ...state,
                currentInputs
            }
        default:
            return state;
    }
}

//=========================================================================================================================

let OutputsInitState = {
    TXT: [
        // 用户 线体 工单 料号 客户 工单数量 投入数量 总数量 剩余数量 单板机种 Deviation:
        {
            Name: "用户",
            Value: "F1335257" 
        },
        {
            Name: "线体",
            Value: "D103FSMTLOADING_1" 
        },
        {
            Name: "工单",
            Value: "002384A00001" 
        },
        {
            Name: "料号",
            Value: "000-1111" 
        },
        {
            Name: "客户",
            Value: "思科" 
        },
        {
            Name: "工单数量",
            Value: "1000" 
        },
        {
            Name: "投入数量",
            Value: "200" 
        },
        // {
        //     Name: "总数量",
        //     Value: "112" 
        // },
        // {
        //     Name: "剩余数量",
        //     Value: "444" 
        // },
        // {
        //     Name: "单板机种",
        //     Value: "D10-3F-ASSY" 
        // },
        // {
        //     Name: "Deviation",
        //     Value: "F1335257" 
        // }
    ],
    currentTableName: "table1",
    Tables: [
        {
            Name: "table1",
            data: [
                {
                    key: '1', no: 1, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '2', no: 2, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '3', no: 3, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '4', no: 4, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '5', no: 5, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '6', no: 6, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '7', no: 7, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                }
            ]
        },
        {
            Name: "table2",
            data: [
                {
                    key: '1', no: 1, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '2', no: 2, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '3', no: 3, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '4', no: 4, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '5', no: 5, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '6', no: 6, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                }
            ]
        },
        {
            Name: "table3",
            data: [
                {
                    key: '1', no: 1, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '2', no: 2, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '3', no: 3, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '4', no: 4, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                },
                {
                    key: '5', no: 5, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
                }
            ]
        }
    ]
}


let OutputsReducer = (state = OutputsInitState, action) => {
    switch(action.type){
        case LOAD_OUTPUTS:
            var {TXT, currentTableName, Tables} = action;
            return {
                ...state,
                TXT, 
                currentTableName,
                Tables
            };
        case CHANGE_CURRENT_TABLE_NAME: 
            var {currentTableName} = action;
            return {
                ...state,
                currentTableName
            };
        default: 
            return state;
    }
}

//=========================================================================================================================

// let StationMessagesInitState = [
//     {
//         State: 1,
//         Message: "加载SN成功！"
//     },
//     {
//         State: 0,
//         Message: "连接Helper失败！"
//     },
// ]

let StationMessagesInitState = {
    current: "all",  // success error
    data: [
        {
            key: '1', no: 1, type: "success", message: "MES Helper 连接成功！", dateTime: "2020-05-25 09:00:00"
        },
        {
            key: '2', no: 2, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25 09:00:00"
        },
        {
            key: '3', no: 3, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25 09:00:00"
        },
        {
            key: '4', no: 4, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25 09:00:00"
        },
        {
            key: '5', no: 5, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25 09:00:00"
        },
        {
            key: '6', no: 6, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '7', no: 7, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '8', no: 8, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '9', no: 9, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '10', no: 10, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '11', no: 11, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '12', no: 12, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '13', no: 13, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '14', no: 14, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '15', no: 15, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '16', no: 16, type: "error", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '17', no: 17, type: "success", message: "xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        },
        {
            key: '18', no: 18, type: "success", message: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dateTime: "2020-05-25"
        }
    ]
};
let StationMessagesReducer = (state = StationMessagesInitState, action) => {
    return state;
}

//=========================================================================================================================
//对工站所有弹出层的控制
let StationLayerInitState = {
    outputTable:{
        visible: false
    }
};

let StationLayerReducer = (state = StationLayerInitState, action) => {

    switch(action.type){
        case TOGGLE_TABLE_VISIBLE:
            return {
                ...state,
                outputTable: {
                    ...state.outputTable,
                    visible: !state.outputTable.visible
                }
            }
        default: 
            return state;
    }
}


//=========================================================================================================================
// 动态捕捉dom元素宽高

let StationDomSizeInitState = {
    outputHeight: 0,
    messageHeight: 0
};

let StationDomSizeReducer = (state = StationDomSizeInitState, action) => {
    switch(action.type){
        case SET_OUTPUT_H:
            var {h} = action;
            return {
                ...state,
                outputHeight: h
            }
        case SET_MESSAGE_H:
            var {h} = action;
            return {
                ...state,
                messageHeight: h
            }
        default:
            return state;
    }
}

