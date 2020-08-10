

//配置
//================================================================================================================================

let configReportInitState = {
    selectData: {}, //選中待操作的數據
    currentOperate: "",  //当前操作
    searchValue: "",  //快速搜索的内容
    buttons: {
        globalOperate:[
            {
                name: "addDrawer",
                content: "新增",
                icon: PlusOutlined,
                disabled: false
            }
        ]
    },
    table: {
        w: 1650,
        h: 0,
        data: [],
        ...mainTableConfig
    }
}

let configReportReducer = (state = configReportInitState, action) => {
    switch (action.type){
        case SET_TABLE_DATA:
            var {data} = action;
            return {
                ...state,
                table: {
                    ...state.table,
                    data
                }
            };

        case SET_SELECT_DATA:
            var {selectData} = action;
            return {
                ...state,
                selectData
            };

        case SET_CURRENT_OPERATE:
            var {currentOperate} = action;
            return {
                ...state,
                currentOperate
            };
        case SET_SEARCH_VALUE:
            var {searchValue} = action;
            return {
                ...state,
                searchValue
            };
        case SET_BUTTON_DISABLED:
            var {name, disabled} = action;
            return {
                ...state,
                buttons: {
                    ...state.buttons,
                    globalOperate: state.buttons.globalOperate.map(btn => {
                        return {
                            ...btn,
                            disabled: btn.name === name ? disabled : btn.disabled
                        };
                    })
                }
            };
        case SET_H:
            var {h} = action;
            return {
                ...state,
                table: {
                    ...state.table,
                    h
                }
            };
        default:
            return state;
    }
}

//================================================================================================================================

let layerInitState = [
    {
        name: "addDrawer",
        visible: false,
        currentStep: 0
    },
    {
        name: "editDrawer",
        visible: false,
        currentStep: 0
    },
    {
        name: "copyModal",
        visible: false
    },
    {
        name: "deleteModal",
        visible: false
    }
];

let layerReducer = (state = layerInitState, action) => {
    switch(action.type){
        case SET_VISIBLE:
            var {name, visible} = action;
            return state.map(layO => {
                if(layO.name === name){
                    return {
                        ...layO,
                        visible
                    }
                }
                return layO
            })
        case SET_CURRENT_STEP:
            var {name, currentStep} = action;
            return state.map(layO => {
                if(layO.name === name){
                    return {
                        ...layO,
                        currentStep
                    }
                }
                return layO
            });
        case SET_NEXT_STEP:
            var {name} = action;
            return state.map(layO => {
                if(layO.name === name){
                    return {
                        ...layO,
                        currentStep: layO.currentStep + 1
                    }
                }
                return layO
            });
        default:
            return state;
    }
}

//================================================================================================================================

let layerContentInitState = {
    globalRely:{   //全局依赖的数据及临时数据
        BU: "", //"MFGII",
        ID: "", //"MFGII000000000000000000000000002PWM",
        SKUNO: "", //"22222",
        SKU_NAME: "" //"22222"
    }, 
    con1: {
        init: { //初始的值(当前显示的值)
            BU: "MCEBU",
            SKU_NAME: "",
            SKUNO: "",
            SKU_TYPE: "",
            VERSION: "NA",
            C_SERIES_ID: "",
            CUST_PARTNO: "",
            CUST_SKU_CODE: "",
            SN_RULE: "",
            PANEL_RULE: "",
            LENGTH: "",
            DESCRIPTION: ""
        },
        load: {  //预加载的值（下拉框的数据, 表格的数据。。。）
            BU: [],
            SKU_TYPE: ["MODEL", "PCBA"],
            C_SERIES_ID: [],
            SN_RULE: []
        }
    },
    con2: {
        init: {},
        load: {
            tableData: []
        }
    },
    con3: {
        init: {},
        load: {
            tableData: [],
            stations: []
        }
    },
    con4: {
        init: {},
        load: {
            tableData: []
        }
    },
    con6: {
        init: {
            STATION_NAME: "",
            QTY: "",
            VALID_FLAG: "0"
        },
        load: {
            STATION_NAME: []
        }
    },
    con7: {
        init: {
            SKUNO73: "", 
            SKUVER73: "", 
            SKUNO800: ""
        },
        load: {}
    },
    con8: {
        init: {}, 
        load: {
            STATION: [],
            tableData: []
        }
    },
    con9: {
        init: {},
        load: {
            AqlTypeArr: [],
            aqlLevelArr: [],
            tableData1: [],
            tableData2: []
        }
    }
};

let layerContentReducer = (state = {...layerContentInitState}, action) => {
    switch(action.type){
        case SET_GLOBAL_RELY:
            var {o} = action;
            return {
                ...state,
                globalRely: Object.keys(o).length > 0 ? {...state.globalRely, ...o} : {
                    ...layerContentInitState.globalRely
                }
            }

        case SET_CON_INIT:
            var {con, o} = action;
            var newState = {...state};
            newState[con] = {
                ...state[con],
                init: Object.keys(o).length > 0 ? {...state[con].init, ...o} : {
                    ...layerContentInitState[con].init
                }
            }
            return newState;
        case SET_CON_LOAD:
            var {con, o} = action;
            var newState = {...state};
            newState[con] = {
                ...state[con],
                load: Object.keys(o).length > 0 ? {...state[con].load, ...o} : {
                    ...layerContentInitState[con].load
                }
            }
            return newState;
        default:
            return state;
    }
}


