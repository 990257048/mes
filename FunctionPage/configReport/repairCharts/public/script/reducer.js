let appInitState = {
    allCharts:{
        chart1: "SRG Repair WIP 趨勢圖",
        chart2: "個人WIP數量趨勢圖",
        chart3: "個人每日維修數量趨勢圖",
        chart4: "Repair Bonepile"
    },
    currentChart:"chart1"
};


let appReducer = (state = appInitState, action) => {
    switch(action.type){
        case SET_CUTTENT_CHART:
            var {currentChart} = action;
            return {
                ...state,
                currentChart
            }
        default:
            return state;
    }
}
//chart1Reducer--------------------------------------------------------------------------------------------------------------------------------
let chart1InitState = {
    base: {
        allData: [] //[{WIP_DAY, PRODUCTION_WIP, REPAIR_WIP, TARGET}, {...}, ...]
    },
    option: {
        title: {
            left: 'center',
            top:'30',
            text: 'SRG REPAIR WIP',
        },
        tooltip: {  //提示框
            trigger: 'axis',
            padding: 10,
            //formatter: '{a0}: {c0} <br /> {a1}: {c1} <br /> {a2}: {c2} <br /> {a3}: {c3}'
        },
        legend: {  //图例
            left: '80',
            bottom: '27',
            data: ['产线WIP', '维修WIP', 'Target'],
            textStyle: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        toolbox: {   //工具栏
            show: true,
            top: '25',
            right: '30',
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // axisPointer: {  //指示器
        //     // show: true,
        //     // snap: true,
        //     type: 'shadow'
        // },
        calculable: true,
        grid: {
            left: '80',
            top: '130',
            right: '80',
            bottom:'100',
            tooltip: {
                axisPointer: {
                    show: true,
                    type: "shadow"
                }
            }
        },
        xAxis: [
            {
                name:'',
                type: 'category',
                data: ['4月1号', '4月2号', '4月3号', '4月4号', '4月5号', '4月6号', '4月7号', '4月8号', '4月9号', '4月10号', '4月11号', '4月12号', '4月13号', '4月14号', '4月15号'],
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight:700
                }
            }
        ],
        yAxis: [
            {
                name:'产线wip(pcs)',
                type: 'value',
                min: 0,
                max: 60000,
                interval: 10000,
                // axisLabel: {
                //     formatter: '{value}pcs'
                // },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
                
            },
            {
                type: 'value',
                name: '维修wip(pcs)',
                min: 0,
                max: 1200,
                interval: 200,
                // axisLabel: {
                //     formatter: '{value}pcs'
                // },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
            }
        ],
        dataZoom: [      //放縮
            {
                show: true,
                xAxisIndex: 0,
                filterMode: 'empty',
                width: '50%',
                height: 30,
                right: '100',
                bottom: '25',
                start: 50,
                end: 100,
                showDataShadow: false
            }
        ],
        series: [  //['产线WIP', '维修WIP', 'Target'],
            {
                name: '产线WIP',
                type: 'line',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#5aec12' },
                data:[5000, 5600, 5400, 4800, 4600, 5700, 5100, 5600, 6200, 6000, 4900, 5200, 5800, 5500, 4800],
                smooth: true,
            },
            {
                name: '维修WIP',
                type: 'line',
                yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#f50707' },
                data: [800, 800, 860, 880, 920, 910, 740, 780, 990, 900, 720, 1000, 890, 750, 880],
                smooth: true,
            },
            {
                name: 'Target',
                type: 'line',
                yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#0fcae8' },
                smooth: true,
                data: [1000, 900, 960, 980, 1020, 1110, 1040, 800, 980, 960, 740, 1200, 1090, 1050, 1080],
            }
            
        ]
    },
};

let chart1Reducer = (state = chart1InitState, action) => {
    switch(action.type){
        case SET_CHART1_ALL_DATA:
            var {allData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData
                }
            }
        case SET_CHART1_OPTION:
            var {xAxisData, serie1Data, serie2Data, serie3Data} = action;
            var xAxis = [...state.option.xAxis];
            xAxis[0].data = xAxisData;
            var series = [...state.option.series];
            series[0].data = serie1Data.map(v => Number(v));
            series[1].data = serie2Data.map(v => Number(v));
            series[2].data = serie3Data.map(v => Number(v));
            return {
                ...state,
                option: {
                    ...state.option,
                    xAxis,
                    series
                }
            };
        default:
            return state;
    }
}
//chart2Reducer--------------------------------------------------------------------------------------------------------------------------------
let chart2InitState = {
    base: {
        allData: [] //
    },
    option: {
        title: {
            left: 'center',
            top:'30',
            text: '個人WIP數量趨勢圖',
        },
        tooltip: {  //提示框
            trigger: 'axis',
            padding: 10,
            //formatter: '{a0}: {c0} <br /> {a1}: {c1} <br /> {a2}: {c2} <br /> {a3}: {c3}'
        },
        legend: {  //图例
            type: 'scroll',
            orient: 'vertical',
            right: '60',
            top: 'center',//'150',
            bottom: '100',
            width: '160',
            height: '100%',
            data: ['维修WIP', 'Target'],
            selected: {   //系列选中状态 
                // '系列1': true,
                // '系列2': true,
                // '系列3': false,
                // ...
            },
            textStyle: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        toolbox: {   //工具栏
            show: true,
            top: '25',
            right: '30',
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // axisPointer: {  //指示器
        //     show: true,
        //     snap: true,
        //     type: 'line'
        // },
        calculable: true,
        grid: {
            left: '80',
            top: '130',
            right: '180',
            bottom:'100',
            tooltip: {
                axisPointer: {
                    show: true,
                    type: "shadow"
                }
            }
        },
        xAxis: [
            {
                name:'',
                type: 'category',
                data: ['4月1号', '4月2号', '4月3号', '4月4号', '4月5号', '4月6号', '4月7号', '4月8号', '4月9号', '4月10号', '4月11号', '4月12号', '4月13号', '4月14号', '4月15号'],
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight:700
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '维修wip(pcs)',
                min: 0,
                max: 120,
                interval: 10,
                // axisLabel: {
                //     formatter: '{value}pcs'
                // },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
            }
        ],
        dataZoom: [      //放縮
            {
                show: true,
                xAxisIndex: 0,
                filterMode: 'empty',
                width: '50%',
                height: 30,
                right: '25%',
                bottom: '25',
                start: 50,
                end: 100,
                showDataShadow: false
            }
        ],
        series: [  
            {
                name: '维修WIP',
                type: 'line',
                //yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                //itemStyle: { color: '#f50707' },
                data: [800, 800, 860, 880, 920, 910, 740, 780, 990, 900, 720, 1000, 890, 750, 880],
                barWidth:'30%'
            },
            {
                name: 'Target',
                type: 'line',
                //yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                //itemStyle: { color: '#0fcae8' },
                data: [1000, 900, 960, 980, 1020, 1110, 1040, 800, 980, 960, 740, 1200, 1090, 1050, 1080],
            }
        ]
    }
};


let chart2Reducer = (state = chart2InitState, action) => {
    switch(action.type){
        case SET_CHART2_ALL_DATA:
            var {allData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData
                }
            }
        case SET_CHART2_OPTION:
            var {xAxisData, seriesArr} = action; // seriesArr: [{name, data}, {...}, ...]
            var legend = {...state.option.legend};
            //legend.data = seriesArr.map(({name}) => name);        //图例
            seriesArr.forEach(({name}, i) => {
                legend.data.push(name);
                i >= 5 ? (legend.selected[name] = false): (legend.selected[name] = true)
            });
            var xAxis = [...state.option.xAxis];
            xAxis[0].data = xAxisData;                            //横坐标
            var series = seriesArr.map(({name, data}) => ({       //系列
                name, 
                type: 'line',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                smooth: true,
                data: data.map(v => Number(v))
            }));
            return {
                ...state,
                option: {
                    ...state.option,
                    legend,
                    xAxis,
                    series
                }
            }
        case SET_CHART2_OPTION_SERIES:   //目前没用到
            var {seriesArr} = action;
            var legend = {...state.option.legend};
            legend.data = seriesArr.map(({name}) => name);        //图例
            var series = seriesArr.map(({name, data}) => ({       //系列
                name, 
                type: 'line',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                data: data.map(v => Number(v))
            }));
            return {
                ...state,
                option: {
                    ...state.option,
                    legend,
                    series
                }
            }
        default:
            return state;
    }
}
//chart3Reducer--------------------------------------------------------------------------------------------------------------------------------
let chart3InitState = {
    base: {
        allData: [] //
    },
    option: {
        title: {
            left: 'center',
            top:'30',
            text: '個人每日維修數量趨勢圖',
        },
        tooltip: {  //提示框
            trigger: 'axis',
            padding: 10,
            //formatter: '{a0}: {c0} <br /> {a1}: {c1} <br /> {a2}: {c2} <br /> {a3}: {c3}'
        },
        legend: {  //图例
            type: 'scroll',
            orient: 'vertical',
            right: '60',
            top: 'center',//'150',
            bottom: '100',
            width: '160',
            height: '100%',
            data: ['维修WIP', 'Target'],
            selected: {   //系列选中状态 
                // '系列1': true,
                // '系列2': true,
                // '系列3': false,
                // ...
            },
            textStyle: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        toolbox: {   //工具栏
            show: true,
            top: '25',
            right: '30',
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // axisPointer: {  //指示器
        //     show: true,
        //     snap: true,
        //     type: 'line'
        // },
        calculable: true,
        grid: {
            left: '80',
            top: '130',
            right: '180',
            bottom:'100',
            tooltip: {
                axisPointer: {
                    show: true,
                    type: "shadow"
                }
            }
        },
        xAxis: [
            {
                name:'',
                type: 'category',
                data: ['4月1号', '4月2号', '4月3号', '4月4号', '4月5号', '4月6号', '4月7号', '4月8号', '4月9号', '4月10号', '4月11号', '4月12号', '4月13号', '4月14号', '4月15号'],
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight:700
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '维修数量(pcs)',
                min: 0,
                max: 50,
                interval: 5,
                // axisLabel: {
                //     formatter: '{value}pcs'
                // },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
            }
        ],
        dataZoom: [      //放縮
            {
                show: true,
                xAxisIndex: 0,
                filterMode: 'empty',
                width: '50%',
                height: 30,
                right: '25%',
                bottom: '25',
                start: 50,
                end: 100,
                showDataShadow: false
            }
        ],
        series: [  
            {
                name: '维修WIP',
                type: 'line',
                //yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                //itemStyle: { color: '#f50707' },
                data: [800, 800, 860, 880, 920, 910, 740, 780, 990, 900, 720, 1000, 890, 750, 880],
                barWidth:'30%'
            },
            {
                name: 'Target',
                type: 'line',
                //yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                //itemStyle: { color: '#0fcae8' },
                data: [1000, 900, 960, 980, 1020, 1110, 1040, 800, 980, 960, 740, 1200, 1090, 1050, 1080],
            }
        ]
    }
};

let chart3Reducer = (state = chart3InitState, action) => {
    switch(action.type){
        case SET_CHART3_ALL_DATA:
            var {allData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData
                }
            }
        case SET_CHART3_OPTION:
            var {xAxisData, seriesArr} = action; // seriesArr: [{name, data}, {...}, ...]
            var legend = {...state.option.legend};
            //默认前5个系列显示
            seriesArr.forEach(({name}, i) => {
                legend.data.push(name);
                i >= 5 ? (legend.selected[name] = false): (legend.selected[name] = true)
            });
            var xAxis = [...state.option.xAxis];
            //设置横坐标值
            xAxis[0].data = xAxisData;                            //横坐标
            //设置所有系列
            var series = seriesArr.map(({name, data}) => ({       //系列
                name, 
                type: 'line',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                smooth: true,
                data: data.map(v => Number(v))
            }));
            return {
                ...state,
                option: {
                    ...state.option,
                    legend,
                    xAxis,
                    series
                }
            }
        default:
            return state;
    }
}
//chart4Reducer--------------------------------------------------------------------------------------------------------------------------------
let chart4InitState = {
    base: {
        currentAgingDay: "TOTAL",  //  TOTAL  <30  30-60  61-180  181-360  >361
        allAgingDay: ["TOTAL", "<30", "30-60", "61-180", "181-360", ">361"],
        currentRE: "TOTAL",    //当前维修人
        tableVisible: false,
        allData: {
            pieData: [],
            barData: [],
            tableData: []
        }
    },
    option: {
        title: {
            left: 'center',
            top:'30',
            text: 'Repair Bonepile',
        },
        tooltip: {  //提示框
            trigger: 'axis',
            padding: 10,
            //formatter: '{a0}: {c0} <br /> {a1}: {c1} <br /> {a2}: {c2} <br /> {a3}: {c3}'
        },
        legend: {  //图例
            type: 'scroll',
            //orient: 'vertical',
            left: 'center',
            bottom: '25',
            data: ['维修WIP', '<30 day', '30-60 day', '61-180 day', '181-360 day', '>361 day'],
            selected: {   //系列选中状态 
                // '系列1': true,
                // '系列2': true,
                // '系列3': false,
                // ...
            },
            textStyle: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        toolbox: {   //工具栏
            show: true,
            top: '25',
            right: '30',
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // axisPointer: {  //指示器
        //     show: true,
        //     snap: true,
        //     type: 'line'
        // },
        axisPointer: {
            show: false
        },
        calculable: true,
        grid: {
            left: '80',
            top: '130',
            right: '80',
            bottom:'100',
            tooltip: {
                axisPointer: {
                    show: true,
                    type: "line"
                }
            }
        },
        xAxis: [
            {
                name:'',
                type: 'category',
                //data:["譚活源", "林光偉", "劉志清", "萬富榮", "池寧勇", "李錦培", "李光", "謝維松", "劉遠才", "李計量", "戴杏輝", "賀秀高", "石帆", "謝果洋", "李?亮", "戴杏輝", "李秀", "曾建民", "張同慶", "龐銀川", "劉俊"],
                data: ["譚活源"],
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight:700
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '维修wip(pcs)',
                min: 0,
                max: 100,
                interval: 100,
                // axisLabel: {
                //     formatter: '{value}pcs'
                // },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
            }
        ],
        // dataZoom: [      //放縮
        //     {
        //         show: true,
        //         xAxisIndex: 0,
        //         filterMode: 'empty',
        //         width: '50%',
        //         height: 30,
        //         right: '25%',
        //         bottom: '25',
        //         start: 0,
        //         end: 100,
        //         showDataShadow: false
        //     }
        // ],
        //color: ['#83af9b', '#c8c8a9', '#f9cdad', '#fc9d9a','#fc4365'],
        //['#b5c29a', '#8a977b', '#f4d000', '#e58308', '#dc5712']
        series: [  
            {
                name: 'AgingDay分布',
                type: 'pie',
                center: ['70%', '40%'],
                //roseType: 'area',  //radius
                radius: ['18%', '30%'],
                // width: 100,
                // height: 100,
                // top: 100,
                // right: 100,
                data: //seriesData,
                [
                   { value: 30, name: '<30 day' }, 
                   { value: 10, name: '30-60 day' },
                   { value: 5, name: '61-180 day' },
                   { value: 4, name: '181-360 day' },
                   { value: 3, name: '>361 day' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    //color:['#33ef04','#ffeb00','#fd6e6e', '#ff0000'],
                },
                label: {
                    show: true,
                    position: 'outside',
                    //formatter: 'Aging Day: {b}\n 数量: {c}pcs\n 占比： {d}%',
                    formatter: '{b}  数量: {c}pcs ', // 占比: {d}%',
                    lineHeight:25,
                    fontSize: 14,
                    fontWeight:400,
                }
            },
            {
                name: '维修WIP',
                type: 'bar',
                //yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#5aec12' },
                //data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                data: [1],
                barWidth:'50%'
            }
        ]
    }
};


let chart4Reducer = (state = chart4InitState, action) => {
    switch(action.type){
        case SET_CHART4_TABLE_VISIBLE:
            var {tableVisible} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    tableVisible
                }
            }
        case TOGGER_CHART4_TABLE_VISIBLE:
            return {
                ...state,
                base: {
                    ...state.base,
                    tableVisible: !state.base.tableVisible
                }
            }
        case SET_CHART4_PIE_DATA:
            var {pieData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData: {
                        ...state.base.allData,
                        pieData
                    }
                }
            }
        case SET_CHART4_BAR_DATA:
            var {barData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData: {
                        ...state.base.allData,
                        barData
                    }
                }
            }
        case SET_CHART4_TABLE_DATA:
            var {tableData} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    allData: {
                        ...state.base.allData,
                        tableData
                    }
                }
            }
        case SET_CHART4_CURRENT_AGING_DAY:
            var {currentAgingDay} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    currentAgingDay
                }
            }
        case SET_CHART4_CURRENT_RE:
            var {currentRE} = action;
            return {
                ...state,
                base: {
                    ...state.base,
                    currentRE
                }
            }
        case SET_CHART4_OPTION:
            var {pieData, barData} = state.base.allData;
            var colorArr = [["#9090ff", "#5656d0"], ["#ea92ff", "#a847bf"], ["#95ec95", "#4ebb4e"], ["#ff7474", "#4176ff"], ["#ffe390", "#f7c222"]];
            var option = {...state.option};
            option.xAxis[0].data = barData.map(({REPAIR_NAME}) => REPAIR_NAME);   
            option.series[0].data = ["<30", "30-60", "61-180", "181-360", ">361"].map((key, i) => {
                let filterData = pieData.filter(({AGING_DAY}) => AGING_DAY == key);
                let {AGING_DAY, SUMS} = filterData.length > 0 ? filterData[0] : {AGING_DAY: key, SUMS: 0};
                //let {AGING_DAY, SUMS} = pieData.filter(({AGING_DAY}) => AGING_DAY == key)[0];
                // console.log({
                //     name: AGING_DAY + " day",
                //     value: Number(SUMS),
                //     itemStyle: {
                //         color: {
                //             colorStops: [{
                //                 offset: 0, color: colorArr[i][0]
                //             }, {
                //                 offset: 1, color: colorArr[i][1]
                //             }]
                //         }
                //     }
                // });
                return {
                    name: AGING_DAY + " day",
                    value: Number(SUMS),
                    itemStyle: {
                        color: {
                            colorStops: [{
                                offset: 0, color: colorArr[i][0]
                            }, {
                                offset: 1, color: colorArr[i][1]
                            }]
                        }
                    }
                }
            });
            option.series[1].data = barData.map(({SUMS}) => Number(SUMS));
            return {...state, option};
        default:
            return state;
    }
}
//--------------------------------------------------------------------------------------------------------------------------------





