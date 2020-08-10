
let {useState, useEffect, useMemo, useRef, createContext, useContext} = React;
let {useSelector, useDispatch} = ReactRedux;
let {Drawer, Button, DatePicker, Select, Tooltip, Space, message, Table} = antd;
let {Option} = Select;
let {PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, BarChartOutlined, TableOutlined} = icons;

let App = () => {
    return <div className="app">
        <ChartBoard />
        <Btns />
        <Lay />
    </div>
}

let ChartBoard = () => {
    let option = useSelector(state => state.optionReducer.chartOption);
    let currentLine = useSelector(state => state.appReducer.currentLine);
    let chartEle = useRef();
    //生成链接路径
    let retLinkHref = useMemo(() => {
        return (times, CountType) => {   //CountType: Pass | Fail
            return "/FunctionPage/Report/Report.html?ClassName=MESReport.BaseReport.AOIStationReport&RunFlag=1&Line="+ currentLine +"&Interval="+ times +"&CountType=" + CountType;
        }
    }, [currentLine]);
    //用于跳转到新选项卡， 发布已经订阅好的“add_iframe”接口
    let linkFn = useMemo(() => {
        return (name, url) => {
            self.parent.$.publishMoreTime("add_iframe", {name, url});
        }
    }, []);
    useEffect(() => {
        var myChart = echarts.init(chartEle.current);
        myChart.on("click", ({name, seriesName, componentSubType}) => {
            var type = seriesName == "Pass数量(pcs)" ? "Pass" :  "Fail";
            if (componentSubType == 'bar') {
                location.href = retLinkHref(name, type);
                //使用新框架再使用，代替上面的跳转方式
                //linkFn( "smtYieldLink_" + currentLine + "_" + name + "_" + type, retLinkHref(name, type) );
            }
        });
        myChart.setOption(option);
        return () => {
            myChart.off("click");
        }
    }, [option]);
    return <div className="chart-board" ref={chartEle}></div>
}

let Btns = () => {
    const dateFormat = 'YYYY/MM/DD';
    let {currentDate, dayShift, currentLine, allLine, play, visiable} = useSelector(state => state.appReducer);
    let dispatch = useDispatch();
    //延时循环执行fn
    let delayFor = useMemo(() => {
        return (arr, fn, time) => {   
            var len = arr.length;
            var current = 0;
            var flag = true;
            temp(arr[0]);
            function temp(val) {
                fn(val);
                current++;
                if (current < len) {
                    flag && setTimeout(() => {
                        temp(arr[current]);
                    }, time);
                } else {   //循环执行结束
                    setTimeout(() => {
                        current = 0;
                        temp(arr[current]);
                    }, time)
                }
            }
            return [() => {
                flag = false;
            }, () => {
                flag = true;
                temp(arr[current]);
            }]
        }
    }, []);
    //获取线体
    useEffect(() => {
        getLine().then(e => {
            dispatch(load_all_line(e.Data));
            e.Data.length > 0 && dispatch(set_current_line(e.Data[0]));
        }, e => {
            message.error(e.Message);
        });
    }, []);
    //获取图表数据
    useEffect(() => {
        //白班
        currentLine != "" && dayShift && getchartData({LINE: currentLine, TIME: currentDate}).then(e => {
            const [pass, fail, yie, xAxisData , tableData] = e.Data;
            dispatch(set_chart_data({xAxisData, pass, fail, yie}));
            dispatch(set_table_data(tableData.map((row, i) => ({...row, key: i})) ));
        }, e => {
            message.error(e.Message);
        });
        //夜班
        currentLine != "" && !dayShift && getNightChartData({LINE: currentLine, TIME: currentDate}).then(e => {
            const [pass, fail, yie, xAxisData , tableData] = e.Data;
            dispatch(set_chart_data({xAxisData, pass, fail, yie}));
            dispatch(set_table_data(tableData.map((row, i) => ({...row, key: i})) ));
        }, e => {
            message.error(e.Message);
        });
    }, [currentLine, currentDate, dayShift]);
    //开始播放
    let temp_fn = useMemo(() => {
        if(allLine.length > 0){
            return delayFor(allLine, line => {
                dispatch(set_current_line(line));
            }, 3000);
        }else{
            return [() => {}, () => {}];
        }
    }, [allLine]);
    //控制暂停继续
    useEffect(() => {
        if(play){
            temp_fn[1]();    //继续播放
        }else{
            temp_fn[0]();    //暂停播放
        }
    }, [play]);
    return <div className="btns">
        <Button 
            type={visiable ? "primary" : "default"} 
            size="middle" 
            icon={<TableOutlined />} 
            style={{marginRight: "15px"}}
            onClick={() => {dispatch(togger_visiable())}}
        >Table</Button>
        <Button 
            type="primary" 
            size="middle" 
            icon={<RedoOutlined />} 
            style={{marginRight: "15px"}}
            onClick={() => {location.reload()}}
        >
            刷新
        </Button>
        <Button 
            type="primary" 
            size="middle" 
            icon={play ? <PlayCircleOutlined /> : <PauseCircleOutlined />} 
            style={{marginRight: "30px"}} 
            onClick={() => {dispatch(togger_play())}}
        >
            {play ? "暂停" : "播放"}
        </Button>
        {/* <Button type="primary" size="middle" icon={<BarChartOutlined />} style={{marginRight: "10px"}}>Chart</Button> */}
        
        {/* 时间 线体*/}
        <Space size="middle">
            <span>日期：</span>
        </Space>
        <DatePicker 
            size="middle" 
            defaultValue={moment(currentDate, dateFormat)} 
            format={dateFormat} 
            onChange={(moment, date) => {dispatch(set_current_date(date))}}
            style={{marginRight: "15px"}}
        />
        <Space size="middle">
            <span>线体：</span>
        </Space>
        <Select key="select_line" size="middle" value={currentLine} style={{width: "100px", marginRight: "15px"}} onChange={v => { dispatch(set_current_line(v)) }}>
            {
                allLine.map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
        <Space size="middle">
            <span>班别：</span>
        </Space>
        <Select key="select_shift" size="middle" defaultValue={dayShift ? "白班" : "晚班"} style={{width: "100px"}} 
            onChange={v => { dispatch(togger_shift()) }}
        >
            {
                ["白班", "晚班"].map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
    </div>
}

let Lay = () => {
    let {visiable, currentDate, currentLine, dayShift} = useSelector(state => state.appReducer);
    let tableData = useSelector(state => state.optionReducer.tableData);
    let dispatch = useDispatch();
    const [display, setDisplay] = useState("none");
    const [v, setV] = useState(false);
    //控制抽屉
    useEffect(() => {   
        if(visiable){
            setDisplay("block");
            setTimeout(() => {
                setV(true);
            }, 50);
        }else{
            setV(false);
            setTimeout(() => {
                setDisplay("none");
            }, 200);
        }
    }, [visiable]);
    //生成链接路径
    let retLinkHref = useMemo(() => {
        return (times, CountType) => {   //CountType: Pass | Fail
            return "/FunctionPage/Report/Report.html?ClassName=MESReport.BaseReport.AOIStationReport&RunFlag=1&Line="+ currentLine +"&Interval="+ times +"&CountType=" + CountType;
        }
    }, [currentLine]);
    //用于跳转到新选项卡， 发布已经订阅好的“add_iframe”接口
    let linkFn = useMemo(() => {
        return (name, url) => {
            self.parent.$.publishMoreTime("add_iframe", {name, url});
        }
    }, []);
    //表格配置
    let tableConfig = useMemo(() => {
        return {
            size: "small",
            pagination: {
                defaultPageSize: 50,
                pageSizeOptions: [50, 100, 150, 200],
                showQuickJumper: true,
                hideOnSinglePage: true
            },
            dataSource: tableData,
            columns: [
                {
                    title: '时间段',
                    dataIndex: 'TIMES',
                    width: 140
                },
                {
                    title: 'PASS数量',
                    dataIndex: 'PASS',
                    width: 100,
                    render: (text, row) => {
                        return <a href={retLinkHref(row.TIMES, "Pass")}>{text}</a>;
                        //注意：跳转到新的iframe不能让a标签直接跳转，会跳到系统外，需要自行绑定事件来使用已经自定义好的跳转接口
                        //使用新框架再启用,代替上面的跳转方式
                        //return <a onClick={() => {linkFn("smtYieldLink_" + currentLine + "_" + row.TIMES + "_Pass", retLinkHref(row.TIMES, "Pass"))} }>{text}</a>;
                    }
                },
                {
                    title: 'Fail数量',
                    dataIndex: 'FAIL',
                    width: 100,
                    render: (text, row) => {
                        return <a href={retLinkHref(row.TIMES, "Fail")}>{text}</a>;
                        //使用新框架再启用,代替上面的跳转方式
                        //return <a onClick={() => {linkFn("smtYieldLink_" + currentLine + "_" + row.TIMES + "_Fail", retLinkHref(row.TIMES, "Fail"))} }>{text}</a>;
                    }
                },
                {
                    title: '良率',
                    dataIndex: 'YIELD',
                    width: 100
                },
                {
                    title: '目标良率',
                    dataIndex: 'TARGET',
                    width: 100
                }
            ]
        }
    }, [tableData]);
    return <div className="lay" style={{display: display}}>
      <Drawer 
        title={"SMT YIELD TABLE DATA ( 日期：" + currentDate + " 线体：" + currentLine + " " + (dayShift ? "白班" : "晚班") +" )"} 
        closable={false} 
        getContainer={false}  
        placement="left" 
        width={540}
        mask={false}
        //maskClosable={false}
        visible={v}
        headerStyle={{padding: "10px 10px 10px 15px", fontSize: "14px", fontWeight: "600"}}
        bodyStyle={{padding: "15px 15px 15px 25px"}}
        footerStyle={{padding: "10px 10px 10px 20px"}}
        style={{position: "absolute"}}
        footer={
            <div style={{textAlign: "right"}}>
                <Button size="small"  style={{marginRight: 8}} onClick={() => {dispatch(togger_visiable())}}>
                    Cancel
                </Button>
                <Button size="small"  type="primary" onClick={() => {dispatch(togger_visiable())}}>
                    Submit
                </Button>
            </div>
        }
      >
          <Table {...tableConfig} />
      </Drawer>
    </div>
}