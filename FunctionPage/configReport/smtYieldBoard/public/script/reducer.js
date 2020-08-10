let date = new Date();

let appInitState = {
    currentDate: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
    dayShift: date.getHours() >= 8 && date.getHours() <= 20 ? true : false,
    currentLine: "",
    allLine: [],
    play: true,
    visiable: false
};

let appReducer = (state = appInitState, action) => {
    switch(action.type){
        case SET_CURRENT_DATE:
            var {currentDate} = action;
            return {...state, currentDate};
        case TOGGER_SHIFT:
            return {...state, dayShift: !state.dayShift};
        case SET_CURRENT_LINE:
            var {currentLine} = action;
            return {...state, currentLine};
        case LOAD_ALL_LINE:
            var {allLine} = action;
            return {...state, allLine};
        case TOGGER_PLAY:
            return {...state, play: !state.play};
        case TOGGER_VISIABLE:
            return {...state, visiable: !state.visiable};
        case SET_VISIABLE:
            var {visiable} = action;
            return {...state, visiable};
        default:
            return state;
    }
}

let optionInitState = {
    chartOption: {
        title: {
            left: '30',
            top:'30',
            text: 'SMT YIELD BOARD',
        },
        tooltip: {  //提示框
            trigger: 'axis',
            padding: 10,
            //formatter: '{a0}: {c0} <br /> {a1}: {c1} <br /> {a2}: {c2} <br /> {a3}: {c3}'
        },
        legend: {  //图例
            left: 'center',
            bottom: '25',
            // data: ['ActualPass(pcs)', 'ActualFail(pcs)', 'ActualYield(%)', 'TargetYield(%)'],
            data: ['Pass数量(pcs)', 'Fail数量(pcs)', '良率(%)', '目标良率(%)'],
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
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        grid: {
            left: '70',
            top: '140',
            right: '80',
            bottom:'100',
            tooltip: {
                axisPointer: {
                    type: "shadow"
                }
            }
        },
        xAxis: [
            {
                name:'',
                type: 'category',
                data: ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00','19:00-20:00'],
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight:700
                }
            }
        ],
        yAxis: [
            {
                name:'數量(pcs)',
                type: 'value',
                min: 0,
                max: 600,
                interval: 60,
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
                
            },
            {
                type: 'value',
                name: '良率(%)',
                min: -100,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value}%'
                },
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 50
                }
            }
        ],
        series: [
            //data: ['Pass数量(pcs)', 'Fail数量(pcs)', '良率(%)', '目标良率(%)'],
            {
                name: 'Pass数量(pcs)',
                type: 'bar',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#5aec12' },
                data:[140, 170, 150, 120, 150, 0, 0, 0, 0, 0, 0, 0],
                barWidth:'30%'
            },
            {
                name: 'Fail数量(pcs)',
                type: 'bar',
                label: { show: true, position: "top", formatter: '{c}pcs' },
                itemStyle: { color: '#f50707' },
                data:[10, 18, 15, 11, 12, 0, 0, 0, 0, 0, 0, 0],
                barWidth:'30%'
            },
            {
                name: '良率(%)',
                type: 'line',
                yAxisIndex: 1,
                label: { show: true, position: "bottom", formatter: '{c}%' },
                itemStyle: { color: '#0fcae8' },
                data: [90, 90, 89, 93, 98, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: '目标良率(%)',
                type: 'line',
                yAxisIndex: 1,
                label: { show: true, position: "top", formatter: '{c}%' },
                itemStyle: { color: '#0085f3' },
                data:[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            }
        ]
    },
    tableData: []
}

let optionReducer = (state = optionInitState, action) => {
    switch(action.type){
        case SET_CHART_DATA:
            var {xAxisData, pass, fail, yie} = action;
            var xAxis = [...state.chartOption.xAxis];
            xAxis[0].data = xAxisData; 
            var series = [...state.chartOption.series];
            series[0].data = pass.map(n => Number(n));
            series[1].data = fail.map(n => Number(n));
            series[2].data = yie.map(n => Number(n));
            return {
                ...state,
                chartOption: {
                    ...state.chartOption,
                    xAxis,
                    series
                }
            };
        case SET_TABLE_DATA:
            var {tableData} = action;
            return {
                ...state,
                tableData
            };
        default:
            return state;
    }
}