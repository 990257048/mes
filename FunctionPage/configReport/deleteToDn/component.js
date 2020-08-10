
let {useState, useEffect, useCallback, useMemo, memo, useRef} = React;
let {useSelector, useDispatch} = ReactRedux;
let {
    Row, Col, Space,
    Popconfirm, Popover, Tooltip,
    Table, Button, Input, message, Drawer, Checkbox, Radio, Select, AutoComplete
} = antd;

let {Search, TextArea} = Input;
let {Option} = Select;
let {RedoOutlined, CloseOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EditOutlined} = icons;


let App = () => {
    return <div className="app">
        <Title />
        <Main />
    </div>
}

let Title = () => {
    let reload = useCallback(() => {
        location.reload();
    });
    return <div className="title">
        <div className="tit-left">
            <Space>
                <Popover placement="bottomLeft" content={QueryPop} trigger="click">
                    <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                </Popover>
                {/* <Button size="middle" type="primary" icon={<EditOutlined />}>操作</Button> */}
            </Space>
        </div>
        <div className="tit-right">
            <Space>
                <Tooltip title="刷新">
                    <Button size="middle" type="primary" shape="circle" icon={<RedoOutlined />} onClick={reload}></Button>
                </Tooltip>
                <Search size="middle" placeholder="请输入TO快速查询" enterButton={true} onSearch={v => actions.saga_query_data2(v)}></Search>
            </Space>
        </div>
    </div>
}

let QueryPop = () => {
    let {queryType, queryValue} = useSelector(state => state.queryReducer);

    let typeChange = useCallback(e => {
        actions.set_query_type(e.target.value);
    }, [])

    let valueChange = useCallback(e => {
        actions.set_query_value(e.target.value);
    }, []);

    return <div className="query-pop">
        <Row gutter={16} justify="space-around" align="middle">
            <Col span={6} style={{textAlign: "right"}}>查询类型：</Col>
            <Col span={18}>
                <Radio.Group size="middle" value={queryType} onChange={typeChange}>
                    <Radio value="TO">TO号</Radio>
                    <Radio value="DN">DN号</Radio>
                </Radio.Group>
            </Col>
            <Col span={6} style={{textAlign: "right"}}>查询内容：</Col>
            <Col span={18}>
                <Input size="middle" value={queryValue} onChange={valueChange}/>
            </Col>
            <Col>
                <Button size="small" type="primary" icon={<SearchOutlined />} onClick={actions.saga_query_data1}>查询</Button>
            </Col>
        </Row>
    </div>
}


let Main = () => {
    return <div className="main">
        <TableWrap />
        <FloatEdit />
    </div>
}

let TableWrap = () => {
    let {height, data} = useSelector(state => state.tableReducer);
    let [tableConfig, setTableHeight, setTableData] = useTableConfig();
    let tableWrapEle = useRef();
    useMemo(() => {
        //获取表数据
        actions.saga_table_render_prev();
    }, []);

    //界面宽高发生变化时的回调
    let resize = useCallback(() => {     
        let h = tableWrapEle.current.clientHeight - 90;
        actions.set_table_height(h);
    }, []);

    //防抖
    let debounce = useCallback((fn, delay) => {
        var timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }, []);

    //绑定事件
    useEffect(() => {
        resize();
        window.onresize = debounce(resize, 100);
        return () => {
            window.onresize = null;
        }
    }, []);

    //表数据变化时同步到局部状态
    useEffect(() => { setTableData(data) }, [data]);

    //表格高度变化时同步到局部状态
    useEffect(() => { setTableHeight(height) }, [height]);
    
    return <div className="table-wrap" ref={tableWrapEle}>
        <Table {...tableConfig} />
    </div>
}

let FloatEdit = () => {
    // visible: false,   //抽屉状态
    // login: false,     //是否登录
    // login_user: "",
    // login_pwd: "",
    // tableData: []
    let {visible, login, login_user, login_pwd, tableData, current_to} = useSelector(state => state.editDrawerReducer);

    useMemo(() => {
        current_to && actions.saga_login_success_get_table();
    }, [current_to]);

    let tableConfig = useMemo(() => {
        return retTableConfig(tableData);
    }, [tableData]);

    return <Drawer title={"Edit Data"} closable={false} getContainer={false}  width={780} placement="right" 
        visible={visible}
        headerStyle={{padding: "10px"}}
        bodyStyle={{padding: "10px 10px 10px 15px", overflow: "hidden"}}
        footerStyle={{padding: "10px"}}
        style={{position: "absolute"}}
        onClose={() => {actions.set_edit_drawer_state({visible: false})}}
        // footer={
        //     <div style={{textAlign: "right"}}>
        //         <Button size="small"  style={{marginRight: 8}} onClick={() => { actions.set_edit_drawer_state({visible: false}) }}>
        //             取消
        //         </Button>
        //         <Button size="small"  type="primary" onClick={() => { actions.saga_delete("xxxxxxxxxxxxx") }}>
        //             删除
        //         </Button>
        //     </div>
        // }
    >
        <div className="edit-drawer-wrap">
            <div className="edit-drawer-login"  style={{display: login ? "none" : "block"}}>
                <Row gutter={16} justify="space-around">
                <Col span={10}>
                    <div className="edit-drawer-control-wrap">
                        <div className="edit-drawer-control-label">二级账号：</div>
                        <div className="edit-drawer-control">
                            <Input size="middle" placeholder="user" value={login_user} onChange={e => {
                                actions.set_edit_drawer_state({login_user: e.target.value})
                            }} />
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className="edit-drawer-control-wrap">
                        <div className="edit-drawer-control-label">密码：</div>
                        <div className="edit-drawer-control">
                            <Input.Password size="middle" placeholder="pwd" value={login_pwd} onChange={e => {
                                actions.set_edit_drawer_state({login_pwd: e.target.value})
                            }} />
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <div className="edit-drawer-control-wrap">
                        <div className="edit-drawer-control-label"></div>
                        <div className="edit-drawer-control">
                            <Button size="middle" type="primary" onClick={() => {
                                actions.saga_login({login_user, login_pwd})
                            }}>登录</Button>
                        </div>
                    </div>
                </Col>
                </Row>
            </div>
            <div className="edit-drawer-table"  style={{display: login ? "block" : "none"}}>
                <Table {...tableConfig} />
            </div>
        </div>
    </Drawer>
}

