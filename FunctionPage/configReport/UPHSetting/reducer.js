

let appInitState = {
    searchValue: "",
    search:{
        lineName: "",
        editTime: "2020-01-01",
        visible: false
    },
    delete:{
        visible: false
    },
    checkedData: []
};

let appReducer = (state = appInitState, action) => {
    switch(action.type){
        case SET_SEARCH_VALUE:
            var {searchValue} = action;
            return {
                ...state,
                searchValue
            }
        case SET_SEARCH_LINENAME:
            var {lineName} = action;
            return {
                ...state,
                search:{
                    ...state.search,
                    lineName
                }
            }
        case SET_SEARCH_EDITTIME:
            var {editTime} = action;
            return {
                ...state,
                search:{
                    ...state.search,
                    editTime
                }
            }
        case SET_SEARCH_VISIBLE:
            var {visible} = action;
            return {
                ...state,
                search:{
                    ...state.search,
                    visible
                }
            }
        case TOGGLE_SEARCH_VISIBLE:
            return {
                ...state,
                search:{
                    ...state.search,
                    visible: !state.search.visible
                }
            }
        case SET_DELETE_VISIBLE:
            var {visible} = action;
            return {
                ...state,
                delete: {
                    ...state.delete,
                    visible
                }
            }
        case TOGGLE_DELETE_VISIBLE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    visible: !state.delete.visible
                }
            }
        case SET_CHECKED_DATA:
            var {checkedData} = action;
            return {
                ...state,
                checkedData
            }
        default:
            return state;
    }
}



// 時間段 Time    Date
// 班別   Calss

// 線別   Line
// 站位   Station

// 機種   Skuno
// 工單   WO

// 計劃目標 PLAN_QTY
// 目標產出 GOAL_QTY

// 應到人數 Come_Person
// 實到人數 Actual_Person

// 標準UPH  UPH_QTY
// 標準人力 Standard_Person
// 落差原因 REASON


let drawerInitState = {
    new:{
        visible: false,
        current: { //
            date_day: [],
            date_night: [],
            line: "",
            station: "",
            skuno: "",
            wo: "",
            plan_qty: "",
            goal_qty: "",
            come_person: "",
            actual_person: "",
            uph_qty: "",
            standard_person: "",
            reason: ""
        },
        load: {
            date_day_all: ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"],
            date_night_all: ["20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00"],
            lineList: [], //["line1", "line2"], 
            stationList: [], //["station1", "station2"],  //
            //skunoList: [], //
            woList: [] //
        }
    },
    edit:{
        visible: false,
        current: { 
            id: "",
            date_day: [],
            date_night: [],
            line: "",
            station: "",
            skuno: "",
            wo: "",
            plan_qty: "",
            goal_qty: "",
            come_person: "",
            actual_person: "",
            uph_qty: "",
            standard_person: "",
            reason: ""
        },
        load: {
            date_day_all: ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"],
            date_night_all: ["20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00"]
        }
    }
};


let drawerReducer = (state = drawerInitState, action) => {
    switch(action.type){
        case SET_DRAWER_VISIBLE:
            var {drawerType, visible} = action;
            var copyState = {...state};
            copyState[drawerType] = {...state[drawerType], visible};
            return copyState;
            
        case TOGGLE_DRAWER_VISIBLE:
            var {drawerType} = action;
            var copyState = {...state};
            copyState[drawerType] = {...state[drawerType], visible: !state[drawerType].visible};
            return copyState;

        case CHANGE_CURRENT_CONTENT: 
            var {drawerType, current} = action;
            var copyState = {...state};
            copyState[drawerType] = {...state[drawerType]};
            var prevCurrent = {...state[drawerType].current};
            copyState[drawerType].current = {...prevCurrent, ...current};
            return copyState;

        case CHANGE_LOAD_CONTENT:
            var {drawerType, load} = action;
            var copyState = {...state};
            copyState[drawerType] = {...state[drawerType]};
            var prevLoad = {...state[drawerType].load};
            copyState[drawerType].load = {...prevLoad, ...load};
            return copyState;


        default:
            return state;
    }
}



let tableInitState = {
    height: 200,
    data: []
};
let tableReducer = (state = tableInitState, action) => {
    switch(action.type){
        case SET_TABLE_HEIGHT:
            var {height} = action;
            return {
                ...state,
                height
            }
        case SET_TABLE_DATA:
            var {data} = action;
            return {
                ...state,
                data
            }
        default:
            return state;
    }
}


let rootReducer = Redux.combineReducers({
    appReducer,
    drawerReducer,
    tableReducer
});