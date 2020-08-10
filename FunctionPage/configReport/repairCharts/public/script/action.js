//appReducer action------------------------------------------------------------------------------------------------------------

const SET_CUTTENT_CHART = "切换到当前图表";
const set_current_chart = currentChart => ({
    type: SET_CUTTENT_CHART,
    currentChart
});


//chart1Reducer action------------------------------------------------------------------------------------------------------------
const SET_CHART1_ALL_DATA = "设置图1的基础数据";
const set_chart1_all_data = allData => ({
    type: SET_CHART1_ALL_DATA,
    allData
});

const SET_CHART1_OPTION = "设置图1的配置数据";
const set_chart1_option = (xAxisData, serie1Data, serie2Data, serie3Data) => ({
    type: SET_CHART1_OPTION,
    xAxisData, serie1Data, serie2Data, serie3Data
});


//chart2Reducer action------------------------------------------------------------------------------------------------------------

const SET_CHART2_ALL_DATA = "设置图2的基础数据";
const set_chart2_all_data = allData => ({
    type: SET_CHART2_ALL_DATA,
    allData
});

const SET_CHART2_OPTION = "设置图2的配置数据";
const set_chart2_option = (xAxisData, seriesArr) => ({
    type: SET_CHART2_OPTION,
    xAxisData, seriesArr
});

const SET_CHART2_OPTION_SERIES = "设置图2的系列数据";
const set_chart2_option_series = seriesArr => ({
    type: SET_CHART2_OPTION_SERIES,
    seriesArr
});


//chart3Reducer action------------------------------------------------------------------------------------------------------------
const SET_CHART3_ALL_DATA = "设置图3的基础数据";
const set_chart3_all_data = allData => ({
    type: SET_CHART3_ALL_DATA,
    allData
});

const SET_CHART3_OPTION = "设置图3的配置数据";
const set_chart3_option = (xAxisData, seriesArr) => ({
    type: SET_CHART3_OPTION,
    xAxisData, seriesArr
});


//chart4Reducer action------------------------------------------------------------------------------------------------------------


const SET_CHART4_TABLE_VISIBLE = "设置图4的表格显示状态";
const set_chart4_table_visible = tableVisible => ({
    type: SET_CHART4_TABLE_VISIBLE,
    tableVisible
});

const TOGGER_CHART4_TABLE_VISIBLE = "切换图4的表格显示状态";
const togger_chart4_table_visible = () => ({
    type: TOGGER_CHART4_TABLE_VISIBLE
});

const SET_CHART4_PIE_DATA = '设置图4的饼图基础数据';
const set_chart4_pie_data = pieData => ({
    type: SET_CHART4_PIE_DATA,
    pieData
});
const SET_CHART4_BAR_DATA = '设置图4的柱形图基础数据';
const set_chart4_bar_data = barData => ({
    type: SET_CHART4_BAR_DATA,
    barData
});
const SET_CHART4_TABLE_DATA = '设置图4的表格基础数据';
const set_chart4_table_data = tableData => ({
    type: SET_CHART4_TABLE_DATA,
    tableData
});
const SET_CHART4_CURRENT_AGING_DAY = '设置图4的当前AgingDay';
const set_chart4_current_aging_day = currentAgingDay => ({
    type: SET_CHART4_CURRENT_AGING_DAY,
    currentAgingDay
});
const SET_CHART4_CURRENT_RE = '设置图4的当前维修人';
const set_chart4_current_re = currentRE => ({
    type: SET_CHART4_CURRENT_RE,
    currentRE
});

const SET_CHART4_OPTION = "设置图4的配置数据";
const set_chart4_option = () => ({
    type: SET_CHART4_OPTION
});



//apis----------------------------------------------------------------------------------------------------------------------------

let getRepairWip1 = (data) => {
    //data: {WIP_DAY_FROM, WIP_DAY_TO} | {}  默认30天
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_1", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRepairWip2 = (data) => {
    //data: {WIP_DAY_FROM, WIP_DAY_TO} | {}  默认30天
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_2", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRepairWip3 = (data) => {
    //data: {WIP_DAY_FROM, WIP_DAY_TO} | {}  默认30天
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_3", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRepairWip4PieData = () => {
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_4", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRepairWip4BarData = (data) => {
    //data: {AGING_DAY}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_4_Link1", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRepairWip4TableData = (data) => {
    //data: {AGING_DAY, REPAIR_NAME}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.RepairWip", "RepairWip_4_Link2", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}
//RepairWip_3
//RepairWip_2

