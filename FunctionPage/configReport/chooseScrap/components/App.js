
// react hooks

let { useState, useEffect, useCallback, useMemo, memo, useRef } = React;
let { useSelector, useDispatch } = ReactRedux;
let {
    Row, Col, Space,
    Popconfirm, Popover, Tooltip,
    Table, Button, Input, message, Drawer, Checkbox, Radio, Select, AutoComplete, DatePicker
} = antd;

let { Search, TextArea } = Input;
let { Option } = Select;
let { RangePicker } = DatePicker;
let { RedoOutlined, CloseOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EditOutlined, DownloadOutlined, StopOutlined } = icons;


let App = () => {
    return <div className="app">
        <Title />
        <Main />
    </div>
}

let Title = () => {

    let dispatch = useDispatch();
    // root state
    let checkedDataLength = useSelector(state => state.appReducer.checkedData.length);
    let allDataLength = useSelector(state => state.appReducer.tableData.length);

    // local state
    let [visible, setVisible] = useState({scrap: false, delete: false});   // 显隐性
    let [downExcelLoading, setLoading] = useState(false);    // download excel 控制loading的状态
    let [val, setVal] = useState("");

    // cb
    let reload = useCallback(() => {  // 点击刷新的回调
        location.reload();
    });

    let scrapHandle = useCallback(() => {  // 点击报废按钮的回调
        if(checkedDataLength > 0){
            setVisible({...visible, scrap: true});
        }else{
            message.error("请至少勾选一条数据再操作！");
        }
    }, [checkedDataLength]);

    let deleteHandle = useCallback(() => {  // 点击删除按钮的回调
        if(checkedDataLength > 0){
            setVisible({...visible, delete: true});
        }else{
            message.error("请至少勾选一条数据再操作！");
        }
    }, [checkedDataLength]);

    return <div className="title">
        <div className="tit-left">
            <Space>
                <Popover placement="bottomLeft" content={QueryPop} trigger="click">
                    <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                </Popover>
                <Popconfirm
                    title="你確定要报废这些QSN吗？"
                    placement="topRight"
                    visible={visible.scrap}
                    onConfirm={() => { dispatch($scrap()) }}    //报废
                    onCancel={() => { setVisible({...visible, scrap: false}) }}
                    okText="是"
                    cancelText="否"
                >
                    <Button type={checkedDataLength > 0 ? "primary" : "default"} danger size="middle" icon={<StopOutlined />} onClick={ scrapHandle }>报废</Button>
                </Popconfirm>
                <Popconfirm
                    title="你確定要删除选中的数据吗？"
                    placement="topRight"
                    visible={visible.delete}
                    onConfirm={() => { dispatch($delete()) }}  // 删除
                    onCancel={() => { setVisible({...visible, delete: false}) }}
                    okText="是"
                    cancelText="否"
                >
                    <Button type={checkedDataLength > 0 ? "primary" : "default"} danger size="middle" icon={<DeleteOutlined />} onClick={ deleteHandle } >删除</Button>
                </Popconfirm>
                <span style={{color: "red", display: checkedDataLength > 0 ? 'block' : 'none'}}> 已勾选 {checkedDataLength} 条数据待操作！ </span>
            </Space>
        </div>
        <div className="tit-right">
            <Space>
                <Tooltip title="刷新">
                    <Button size="middle" type="primary" shape="circle" icon={<RedoOutlined />} onClick={reload}></Button>
                </Tooltip>
                <Tooltip title="download Excel">
                    <Button size="middle" type="primary" shape="circle" danger loading={downExcelLoading} onClick={() => {
                        dispatch($downloadExcel(setLoading))
                    }} icon={<DownloadOutlined />} ></Button>
                    <a href="" download="" id="down-excel"></a>
                </Tooltip>
                
                <Search size="middle" placeholder="请输入QSN快速查询" value={val} enterButton={true} 
                    onChange={(e) => { setVal(e.target.value) }} 
                    onSearch={v => { dispatch($fast_query(v, setVal)) }}
                ></Search>
            </Space>
        </div>
    </div>
}

let QueryPop = () => {
    // rootState / rootStateSelector
    // localState / localStateSelector
    // actionCreator / actionCreator整合 / state连锁反应
    // callback定义事件
    // effect副作用 / saga
    // typescript less umi dva antv antd 
    let dispatch = useDispatch();
    //local state:
    let [queryState, setQueryState] = useState({
        queryType: "DATE",   // DATE QSN
        BU: "AGBU",          // AGBU WNBU DSBU SAVBU MFGV
        startTime: moment(), // 當前時間: 是一个moment對象，下同
        endTime: moment(),
        qsn: ""              // OLD QSN
    });

    let setQueryVal = useCallback((o) => {    //設置查詢狀態值，對setQueryState簡單封裝
        setQueryState({ ...queryState, ...o })
    }, [queryState]);

    // local state selector
    let _queryState = useMemo(() => {   // 衍生新的queryState，用于传到后台
        return {
            ...queryState,
            startTime: queryState.startTime.format("YYYY/MM/DD"),
            endTime: queryState.endTime.format("YYYY/MM/DD"),
            qsn: queryState.qsn.replace(/([ \t\n]+| +|\n+|\t+)/g, ",")
        }
    }, [queryState]);

    let labelStyle = useMemo(() => {   // label 樣式
        return {
            textAlign: "right",
            fontWeight: "500"
        }
    }, []);

    return <div className="query-pop">
        <Row gutter={20} justify="space-around">
            <Col span={6} style={labelStyle}>查询类型：</Col>
            <Col span={18}>
                <Radio.Group size="middle" value={queryState.queryType} onChange={(e) => { setQueryVal({ queryType: e.target.value }) }}>
                    <Radio value="DATE">按時間查詢</Radio>
                    <Radio value="QSN">按OLD-QSN查詢</Radio>
                </Radio.Group>
            </Col>
            <Col span={6} style={labelStyle}>BU：</Col>
            <Col span={18}>
                <Select size="middle" value={queryState.BU} onChange={(v) => { setQueryVal({ BU: v }) }} className="query-select">
                    {
                        ["AGBU(MFGII)", "WNBU(MFGVI)", "DSBU(MFGI)", "SAVBU(MFGVIII)", "MFGV(F21)"].map(bu => {
                            return <Option key={bu} value={bu.replace(/\([\w\W]+\)/g, "")}> {bu} </Option>
                        })
                    }
                </Select>
            </Col>
            <Col span={6} style={{ ...labelStyle, display: queryState.queryType == "DATE" ? "block" : "none" }}>
                開始時間：
            </Col>
            <Col span={18} style={{ ...labelStyle, display: queryState.queryType == "DATE" ? "block" : "none" }}>
                {/* <RangePicker showTime className="query-select" /> */}
                <DatePicker className="query-select" value={queryState.startTime} onChange={momemtDate => { setQueryVal({ startTime: momemtDate }) }} />
            </Col>
            <Col span={6} style={{ ...labelStyle, display: queryState.queryType == "DATE" ? "block" : "none" }}>
                結束時間：
            </Col>
            <Col span={18} style={{ ...labelStyle, display: queryState.queryType == "DATE" ? "block" : "none" }}>
                <DatePicker className="query-select" value={queryState.endTime} onChange={momemtDate => { setQueryVal({ endTime: momemtDate }) }} />
            </Col>

            <Col span={6} style={{ ...labelStyle, display: queryState.queryType == "QSN" ? "block" : "none" }}>
                OLD QSN：
            </Col>
            <Col span={18} className="col-textarea" style={{ ...labelStyle, display: queryState.queryType == "QSN" ? "block" : "none" }}>
                <Input.TextArea placeholder="請輸入OLD_QSN(每個QSN需要用空格或者換行隔開)" value={queryState.qsn} onChange={e => { setQueryVal({ qsn: e.target.value }) }} style={{ height: "180px" }} />
            </Col>

            <Col className="col-query-btn">
                <Button size="small" type="primary" icon={<SearchOutlined />} onClick={() => { dispatch($query(_queryState)) }}>查询</Button>
            </Col>
        </Row>
    </div>
}


