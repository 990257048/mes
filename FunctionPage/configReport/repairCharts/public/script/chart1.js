
let Chart1 = () => {
    let allData = useSelector(state => state.chart1Reducer.base.allData);
    let option = useSelector(state => state.chart1Reducer.option);
    let dispatch = useDispatch();
    let chartEle = useRef();
    //请求图表数据
    useEffect(() => {
        getRepairWip1({}).then(e => {
            dispatch(set_chart1_all_data(e.Data));
        }, e => {
            message.error("getRepairWip1" + e.Message);
        });
    }, []);
    //设置图表配置数据
    useEffect(() => {
        let xAxisData = [], serie1Data = [], serie2Data = [], serie3Data = [];
        allData.forEach(({WIP_DAY, PRODUCTION_WIP, REPAIR_WIP, TARGET}) => {
            xAxisData.push(WIP_DAY);
            serie1Data.push(PRODUCTION_WIP);
            serie2Data.push(REPAIR_WIP);
            serie3Data.push(TARGET);
        });
        dispatch(set_chart1_option(xAxisData, serie1Data, serie2Data, serie3Data));
    }, [allData]);
    //生成图表
    useEffect(() => {
        let myChart = echarts.init(chartEle.current);
        myChart.setOption(option);
    }, [option]);
    return <div className="chart1" ref={chartEle}></div>
}

let Float1 = () => {
    return <div className="float1">
        {/* <Button type="primary" size="middle">Click</Button> */}
    </div>
}