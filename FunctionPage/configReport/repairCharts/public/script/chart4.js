
let Chart4 = () => {
    let {base: {currentAgingDay, currentRE, allData: {pieData, barData}}, option} = useSelector(state => state.chart4Reducer);
    let dispatch = useDispatch();
    let chartEle = useRef();
    
    //请求饼图数据
    useEffect(() => {
        getRepairWip4PieData().then(e => {
            dispatch(set_chart4_pie_data(e.Data));
        }, e => {
            message.error(e.Message);
        });
    }, []);
    //请求柱形图数据
    useEffect(() => {
        getRepairWip4BarData({AGING_DAY: currentAgingDay}).then(e => {
            dispatch(set_chart4_bar_data(e.Data));
        }, e => {
            message.error(e.Message);
        });
    }, [currentAgingDay]);
    //请求表格数据
    useEffect(() => {
        getRepairWip4TableData({AGING_DAY: currentAgingDay, REPAIR_NAME: currentRE}).then(e => {
            //dispatch(set_chart4_table_data(e.Data.map((row, i) => ({key: i, no: i + 1, ...row}))));
            dispatch(set_chart4_table_data(e.Data.map((row, i) => ({key: i, no: i + 1, ...row}))));
        }, e => {
            message.error(e.Message);
        });
    }, [currentAgingDay, currentRE]);


    //饼图， 柱形图基础数据发生变化，引起配置数据option发生变化(重要)
    useEffect(() => {
        console.log("base change!!");
        pieData.length > 0 && barData.length > 0 && dispatch(set_chart4_option());
    }, [pieData, barData]);


    //渲染图表(option发生变化)
    useEffect(() => {
        let myChart = echarts.init(chartEle.current);
        myChart.setOption(option);
        //绑定事件
        myChart.on("click", ({seriesType, name}) => {
            if(seriesType == "bar"){
                dispatch(set_chart4_current_re(name));
                dispatch(set_chart4_table_visible(true));
            }else{
                dispatch(set_chart4_current_aging_day(name.split(" ")[0]));
                dispatch(set_chart4_current_re("TOTAL"));
            }
        });
        return () => {
            myChart.off("click");
        }
    }, [option]);

    console.log("chart4 rander");
    return <div className="chart4">
        <div className="chart-main" ref={chartEle}></div>
        <Chart4Table />
    </div>
}


let Chart4Table = () => {
    let {currentAgingDay, currentRE, tableVisible, allData: {tableData}} = useSelector(state => state.chart4Reducer.base);
    let dispatch = useDispatch();
    let chartTableEle = useRef();
    const [h, setHeight] = useState(100);
    useEffect(() => {
        tableVisible && setTimeout(() => {setHeight(chartTableEle.current.clientHeight - 130)}, 1);   
    }, [tableVisible]);

    let tableConfig = useMemo(() => {
        return {
            id: "drawer-table",
            size: "small",
            pagination: {
                defaultPageSize: 1000,
                //pageSizeOptions: [20, 50, 100, 150, 200],
                showQuickJumper: true,
                hideOnSinglePage: true
            },
            dataSource: tableData,
            scroll: {
                x: 1860, 
                y: h
            },
            columns: [
                {
                    title: '序號',
                    dataIndex: 'no',
                    fixed: 'left',
                    width: 80
                },
                {
                    title: '序列号',
                    dataIndex: 'SN',
                    fixed: 'left',
                    width: 120
                },
                // {
                //     title: '子板（KP_SN）',
                //     dataIndex: 'KP_SN',
                //     fixed: 'left',
                //     width: 120
                // },
                {
                    title: '料号',
                    dataIndex: 'SKUNO',
                    width: 120
                },
                {
                    title: '工单',
                    dataIndex: 'WORKORDERNO',
                    width: 120
                },
                {
                    title: 'FAIL工站',
                    dataIndex: 'FAIL_STATION',
                    width: 120
                },
                {
                    title: '不良现象',
                    dataIndex: 'SYMPTOM'
                },
                {
                    title: 'LOADING时间',
                    dataIndex: 'LOADING_TIME',
                    width: 180
                },
                {
                    title: 'CHECKIN时间',
                    dataIndex: 'CHECKIN_TIME',
                    width: 180
                },
                {
                    title: 'LOADING在线时间',
                    dataIndex: 'LOADING_AGILE',
                    width: 140
                },
                {
                    title: '维修在线时间',
                    dataIndex: 'REPAIR_AGILE',
                    width: 120
                },
                {
                    title: '维修人',
                    dataIndex: 'REPAIR_NAME',
                    width: 120
                },
                {
                    title: '在线时间分类',
                    dataIndex: 'AGING_DAY',
                    fixed: 'right',
                    width: 120
                }
            ]
        }
        
    }, [h, tableData])

    const [wrapV, setWrapV] = useState(tableVisible);
    const [v, setV] = useState(tableVisible);

    useEffect(() => {
        if(tableVisible){
            setWrapV(true);
            setTimeout(() => {
                setV(true);
            }, 100);
        }else{
            setV(false);
            setTimeout(() => {
                setWrapV(false);
            }, 200);
        }
    }, [tableVisible]);

    console.log("chart4table rander");
    return <div className="chart-table" ref={chartTableEle} style={{display: wrapV ? "block" : "none"}}>
    <Drawer 
        title={<DrawerTit currentAgingDay={currentAgingDay} currentRE={currentRE} />} 
        getContainer={false}  
        placement="left" 
        width={800}
        maskClosable={false}
        visible={v}
        bodyStyle={{padding: "15px"}}
        footerStyle={{padding: "10px 10px 10px 20px"}}
        style={{position: "absolute"}}
        onClose = {() => {dispatch(set_chart4_table_visible(false))}}
    >
        {/* <TableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="drawer-table"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        /> */}
        <Table {...tableConfig} />
    </Drawer>
    </div>
}




let DrawerTit = ({currentAgingDay, currentRE}) => {
    let tableData = useSelector(state => state.chart4Reducer.base.allData.tableData);
    let downExcelFn = () => {
        downExcel(tableData, "test-data-bundle", "down-excel");
    }
    return <div>
        {"每人维修wip详细(  AgingDay : "+ currentAgingDay +" 维修人 : "+ currentRE +" ) "} 
        <Button type="primary" size="small" onClick={downExcelFn}>download excel</Button>
        <a href="" download="" id="down-excel"></a>
    </div>
}



let Float4 = () => {
    console.log("float4 rander")
    let {currentAgingDay, allAgingDay, tableVisible, allData: {pieData}} = useSelector(state => state.chart4Reducer.base);
    let dispatch = useDispatch();
    let sum = useMemo(() => pieData.reduce((prev, next) => (prev + Number(next.SUMS)), 0), [pieData]);
    
    let clickA = useMemo(() => {
        return () => {
            dispatch(set_chart4_current_aging_day("TOTAL"));
            dispatch(set_chart4_current_re("TOTAL"));
            dispatch(set_chart4_table_visible(true));
        }
    }, []);
    
    return <div className="float4">
        <Tooltip title="表格" placement="bottomRight">
            <Button 
                type={tableVisible ? "primary" : "default"} size="middle" icon={<TableOutlined />}  
                style={{position: "relative", top: "2px", marginRight: "15px"}} 
                onClick={() => {dispatch(togger_chart4_table_visible())}}
            ></Button>
        </Tooltip>
        <Space size="middle">
            <span style={{paddingRight: "10px"}}>AgingDay: </span>
        </Space>
        <Select size="middle" value={currentAgingDay} onChange={v => {dispatch(set_chart4_current_aging_day(v))}} style={{width: "110px"}}>
            {
                allAgingDay.map(v => {
                    return <Option key={"option" + v} value={v}>{v}</Option>
                })
            }
        </Select>
        <div className="float-total">
            TOTAL: {' '}
            <a onClick={clickA}>{' '} {sum}pcs </a>
        </div>
    </div>
}