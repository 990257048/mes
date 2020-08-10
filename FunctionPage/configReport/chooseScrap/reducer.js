const appInitState = {
    tableData: [],
    checkedData: []
};

let appReducer = (state = appInitState, action) => {
    switch(action.type){
        case SET_TABLE_DATA:
            var {data} = action;
            var tableData = data.map((row, i) => ({...row, key: "row" + (i + 1), no: i+ 1 }));
            return {...state, tableData}
        case SET_CHECKED_DATA:
            var {checkedData} = action;
            return {...state, checkedData}
        default: 
            return state;
    }
}