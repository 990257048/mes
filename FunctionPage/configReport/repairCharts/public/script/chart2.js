
let Chart2 = () => {
    let allData = useSelector(state => state.chart2Reducer.base.allData);
    let option = useSelector(state => state.chart2Reducer.option);
    let dispatch = useDispatch();
    let chartEle = useRef();
    //请求图表数据
    useEffect(() => {
        getRepairWip2({}).then(e => {
            console.log(e);
            dispatch(set_chart2_all_data(e.Data));
        }, e => {
            message.error("getRepairWip1" + e.Message);
        });
    }, []);
    //设置图表配置数据
    useEffect(() => {
        //set_chart2_option /xAxisData, seriesArr
        if(allData.length > 0){
            let xAxisData = allData[0].map(row => row.WIP_DAY);
            //默认5个人 30天
            let seriesArr = allData.map(table => {
                const name = table[0].REPAIR_NAME
                const data = table.map(row => row.REPAIR_WIP);
                return {name, data} 
            });
            dispatch(set_chart2_option(xAxisData, seriesArr));
        }
        console.log(allData);
        
    }, [allData]);
    //生成图表
    useEffect(() => {
        let myChart = echarts.init(chartEle.current);
        myChart.setOption(option);
    }, [option]);
    return <div className="chart2" ref={chartEle}></div>
}

let Float2 = () => {
    return <div className="float2">
        {/* <Button type="primary" size="middle">Click</Button> */}
    </div>
}