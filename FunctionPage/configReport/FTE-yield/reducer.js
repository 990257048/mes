const appInitState = {
    currentBoard: "Today", // Today | YesToday | Quarter
    tableHeight: 200,
    todayTableData: [],
    yesTodayTableData: [],
    quarterTableData: [],
};

let appReducer = (state = appInitState, action) => {
    switch (action.type) {
        case SET_CURRENT_BOARD:
            var { currentBoard } = action;
            return { ...state, currentBoard }

        case SET_TABLE_HEIGHT:
            var { tableHeight } = action;
            return { ...state, tableHeight }

        case SET_TODAY_TABLE_DATA:
            var { data } = action;
            var todayTableData = data.map((row, i) => ({ ...row, key: "today-row" + (i + 1), no: i + 1 }));
            return { ...state, todayTableData }

        case SET_YESTODAY_TABLE_DATA:
            var { data } = action;
            var yesTodayTableData = data.map((row, i) => ({ ...row, key: "yestoday-row" + (i + 1), no: i + 1 }));
            return { ...state, yesTodayTableData }

        case SET_QUARTER_TABLE_DATA:
            var { data } = action;
            var quarterTableData = data.map((row, i) => ({ ...row, key: "quarter-row" + (i + 1), no: i + 1 }));
            return { ...state, quarterTableData }

        case SET_ALL_TABLE_DATA:
            var { todayTableData, yesTodayTableData, quarterTableData } = action;
            return {
                ...state,
                todayTableData:  todayTableData.map((row, i) => ({key: "today-row" + (i + 1), no: i + 1, ...row })),
                yesTodayTableData: yesTodayTableData.map((row, i) => ({key: "yestoday-row" + (i + 1), no: i + 1, ...row })),
                quarterTableData: quarterTableData.map((row, i) => ({key: "quarter-row" + (i + 1), no: i + 1, ...row }))
            }
        default:
            return state;
    }
}