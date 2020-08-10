
let Chart3 = () => {
    let {daylist, datalist} = useSelector(state => state.chart3Reducer.base.allData);
    let {option} = useSelector(state => state.chart3Reducer);
    let dispatch = useDispatch();
    let chartEle = useRef();
    //请求图表数据
    useEffect(() => {
        getRepairWip3({}).then(e => {
            console.log(e);
            dispatch(set_chart3_all_data(e.Data));
        }, e => {
            message.error("getRepairWip1" + e.Message);
        });
    }, []);
    //设置图表配置数据
    useEffect(() => {
        if(datalist && datalist.length > 0){
            //默认5个人 30天
            let seriesArr = datalist.map(table => {
                const name = table[0].REPAIR_NAME;
                const data = daylist.map(date => {
                    const filterRow = table.filter(row => row.WIP_DAY == date);
                    return filterRow.length > 0 ? filterRow[0].REPAIR_OKTOTAL : 0;
                });
                console.log({name, data});
                return {name, data};
            })
            dispatch(set_chart3_option(daylist, seriesArr)); // daylist: xAxisData
        }
    }, [daylist, datalist]);
    //生成图表
    useEffect(() => {
        // allData.length > 0 && console.log(allData, allData.reduce((pO, nO) => {
        //     console.log(pO, pO[0]);
        //     return pO + "\", \"" + nO[0].REPAIR_NAME;
        // }, ""));
        let myChart = echarts.init(chartEle.current);
        myChart.setOption(option);
    }, [option]);
    return <div className="chart3" ref={chartEle}></div>
}

let Float3 = () => {
    return <div className="float3">
        {/* <Button type="primary" size="middle">Click</Button> */}
    </div>
}