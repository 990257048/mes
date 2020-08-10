
let rootReducer = (() => {
    let appInitState = {};
    let appReducer = (state = appInitState, action) => {
        return state;
    }

    let queryInitState = {
        queryType: "TO",  //TO | DN
        queryValue: ""
    };
    let queryReducer = (state = queryInitState, action) => {
        switch(action.type){
            case actionNames.SET_QUERY_TYPE:
                var {queryType} = action;
                return {...state, queryType}
            case actionNames.SET_QUERY_VALUE:
                var {queryValue} = action;
                return {...state, queryValue}
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
            case actionNames.SET_TABLE_DATA:
                var {data} = action;
                return {
                    ...state, data
                }
            case actionNames.SET_TABLE_HEIGHT:
                var {height} = action;
                return {
                    ...state, height
                }
            default: 
                return state;
        }
    }


    let editDrawerInitState = {
        visible: false,   //抽屉状态
        login: false,     //是否登录
        login_user: "",
        login_pwd: "",
        tableData: [],

        current_to: ""
    };
    let editDrawerReducer = (state = editDrawerInitState, action) => {
        switch(action.type){
            case actionNames.SET_EDIT_DRAWER_STATE:
                var {o} = action;
                return {...state, ...o};
            default:
                return state;
        }
    }







    return combineReducers({
        appReducer,
        queryReducer,
        tableReducer,
        editDrawerReducer
    });
})();