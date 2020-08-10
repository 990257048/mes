
let {useState, useEffect, useMemo, useRef, createContext, useContext} = React;
let {useSelector, useDispatch} = ReactRedux;
let {Drawer, Table, Button, DatePicker, Select, Tooltip, Space, message} = antd;
let {Option} = Select;
let {PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, BarChartOutlined, TableOutlined} = icons;

let App = () => {
    let currentChart = useSelector(state => state.appReducer.currentChart);
    let [Chart, Float] = useMemo(() => {
        switch(currentChart){
            case "chart1":
                return [Chart1, Float1]
            case "chart2":
                return [Chart2, Float2]
            case "chart3":
                return [Chart3, Float3]
            case "chart4":
                return [Chart4, Float4]
            default:
                return [<div></div>, <div></div>]
        }
    }, [currentChart]);
    return <div className="app">
        <Chart />
        <FloatWrap son={Float}/>
    </div>
}

let FloatWrap = ({son}) => {
    let Ch = son;
    let {allCharts, currentChart} = useSelector(state => state.appReducer);
    let dispatch = useDispatch();
    return <div className="float-wrap">
        <Space size="middle">
            <span style={{display: "inline-block", width: "80px", textAlign: "right", fontSize: "16px", fontWeight: "600"}}>
                当前： 
            </span>
        </Space>
        <Select value={allCharts[currentChart]} size="middle" 
          onChange={(text, row) => {dispatch(set_current_chart(row.chart))}} 
          style={{width: "200px", marginRight: "15px"}}>
            {
                Object.keys(allCharts).map(k => allCharts[k]).map((chartName, i) => {
                    return <Option key={i} chart={"chart" + (i + 1)} value={chartName}>{chartName}</Option>
                }) 
            }
        </Select>
        {/* <Button type="primary" size="middle" icon={<RedoOutlined />} onClick={() => {location.reload()}} style={{marginRight: "15px"}} >
            刷新
        </Button> */}
        <Ch />
    </div>
}


