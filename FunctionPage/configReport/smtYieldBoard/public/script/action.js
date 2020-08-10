
//app reducer
const SET_CURRENT_DATE = "设置当前日期";
const set_current_date = currentDate => ({
    type: SET_CURRENT_DATE,
    currentDate
});

const TOGGER_SHIFT = "切换班别";
const togger_shift = () => ({
    type: TOGGER_SHIFT
});

const SET_CURRENT_LINE = "设置当前线体";
const set_current_line = currentLine => ({
    type: SET_CURRENT_LINE,
    currentLine
});

const LOAD_ALL_LINE = "加载全部线体";
const load_all_line = allLine => ({
    type: LOAD_ALL_LINE,
    allLine
});

const TOGGER_PLAY = "切换播放与暂停";
const togger_play = () => ({
    type: TOGGER_PLAY
});

const TOGGER_VISIABLE = "切换抽屉显示状态";
const togger_visiable = () => ({
    type: TOGGER_VISIABLE
});

const SET_VISIABLE = "设置抽屉是否显示";
const set_visiable = visiable => ({
    type: SET_VISIABLE,
    visiable
});

//option reducer
const SET_CHART_DATA = "设置统计图数据";
const set_chart_data = ({xAxisData, pass, fail, yie}) => ({
    type: SET_CHART_DATA,
    xAxisData, pass, fail, yie
});

const SET_TABLE_DATA = "设置表格数据";
const set_table_data = tableData => ({
    type: SET_TABLE_DATA,
    tableData
});




//请求

let getLine = () => {
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SMTYiledChartReport", "GetLine", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    })
}

let getchartData = (data) => {  //白班
    //data: {LINE, TIME}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SMTYiledChartReport", "GetDayChartInfor", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    })
}

let getNightChartData = (data) => {  //晚班
    //data: {LINE, TIME}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SMTYiledChartReport", "GetNightChartInfor", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    })
}



//GetNightChartInfor

//"Class":"MESStation.Config.SMTYiledChartReport","Function":"GetDayChartInfor","Data":{"LINE":"D92FS1A"}}