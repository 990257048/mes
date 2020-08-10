

let Station = () => {

    let {BU, DisplayStationName, Line} = useSelector(state => state.StationGlobalReducer);
    let StationJson = useSelector(state => state.StationJsonReducer);
    let dispatch = useDispatch();

    useEffect(() => {
        //获取工站初始数据
        InitStation({BU, DisplayStationName, Line}).then(d => {
            dispatch(receive_station_json(d.Data));   //加载工站数据到reducer
        }, d => {
            message.error("初始化工站失败！");
        });
    }, []);

    useEffect(() => {
        if(Object.keys(StationJson).length > 0){   //初始化之前 StationJson: {}
            //station json selector
            let {inputs: {Pass, Fail}, outputs: {TXT, currentTableName, Tables}, message} = StationJsonSelector(StationJson);
            dispatch(load_inputs(Pass, Fail));
            console.log(currentTableName, Tables);
            dispatch(load_outputs(TXT, currentTableName, Tables)); 

            //message
        }
    }, [StationJson]);

    return <div id="station">
        <Title />
        <Main />
    </div>
}

let Title = () => {
    let globalState = useSelector(state => state.StationGlobalReducer);
    //console.log(d);

    const style = {marginRight: "15px"};
    return <div className="title">
        <h3 style={{display: "inline-block", padding: "0px 15px", marginRight: "15px"}}>SMT LOADING</h3>
        <span style={{paddingRight: "5px"}}>當前線體：</span>
        <Select size="middle" defaultValue="line1" style={{width: "220px", marginRight: "15px"}}>
            <Option value="line1">line1</Option>
            <Option value="line2">D103FSMTLOADING_1</Option>
            <Option value="line3">line3</Option>
        </Select>
        <Tooltip title="刷新"  placement="bottomRight">
            <Button type="primary" shape="circle" size="small" icon={<RedoOutlined />} style={style}></Button>
        </Tooltip>  
        <Tooltip title="异常反馈"  placement="bottomRight">
            <Button type="primary" shape="circle" size="small" icon={<QuestionCircleOutlined />} style={style}></Button>
        </Tooltip>
        <Tooltip title="异常解决方案"  placement="bottomRight">
            <Button type="primary" shape="circle" size="small" icon={<BulbOutlined />} style={style}></Button>
        </Tooltip>
        <Tooltip title="风格"  placement="bottomRight">
            <Button type="primary" shape="circle" size="small" icon={<BgColorsOutlined />} style={style}></Button>
        </Tooltip>
        <Tooltip title="Station Debug"  placement="bottomRight">
            <Button type="primary" shape="circle" size="small" danger icon={<BugOutlined />} style={style}></Button>
        </Tooltip>
        {/* <Button type="primary" size="small" danger icon={<BugOutlined />} style={style}>Station Debug</Button> */}

        {/* <Button type="primary" shape="circle" size="middle" icon={<QuestionCircleOutlined />} style={style}></Button>
        <Button type="primary" shape="circle" size="middle" icon={<BulbOutlined />} style={style}></Button>
        <Button type="primary" size="small" icon={<IssuesCloseOutlined />} style={style}>操作/注意事项</Button>
        <Button type="primary" size="small" icon={<CommentOutlined />} style={style}>评论/建议</Button>
        <Button type="primary" shape="circle" size="middle" icon={<BgColorsOutlined />} style={style}></Button>
        <Button type="primary" size="middle" danger icon={<BugOutlined />} style={style}>Station Debug</Button> */}
    </div>
}

let Main = () => {
    return <div className="main">
        <Inputs />
        <Outputs />
        <Messages />
        {/* <OutputTable /> */}
        <Layer />
    </div>
} 

