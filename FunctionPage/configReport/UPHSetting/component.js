//技术栈： 弹性布局 antd栅格系统，组件 react函数组件 hooks redux redux-saga

let {useState, useEffect, useRef, useMemo, memo, useCallback} = React;
let {useSelector, useDispatch} = ReactRedux;

let {
    Row, Col, Space,
    Popconfirm, Popover, Tooltip,
    Table, Button, Input, message, Drawer, Checkbox, Select, AutoComplete
} = antd;

let {Search, TextArea} = Input;
let {Option} = Select;
let {RedoOutlined, CloseOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EditOutlined} = icons;

let App = () => {
    return <div id="app">
        <Tit />
        <Main />
    </div>
}

let Tit = () => {
    let searchValue = useSelector(state => state.appReducer.searchValue);
    let searchVisible = useSelector(state => state.appReducer.search.visible);
    let deleteVisible = useSelector(state => state.appReducer.delete.visible);
    let checkedData = useSelector(state => state.appReducer.checkedData);
    let dispatch = useDispatch();

    let deleteAction = useCallback(() => {
        if(checkedData.length > 0 || deleteVisible){
            dispatch(toggle_delete_visible());
        }else{
            message.error("请至少勾选一条数据再操作！");
        }
    }, [checkedData, deleteVisible]);

    let reload = useCallback(() => {
        location.reload();
    }, []);
    
    return <div className="tit">
        <div className="tit-left">
            <Space>
                <Popover 
                    content={SearchContent} 
                    //trigger="click"  
                    visible={searchVisible}
                    placement="bottomLeft"
                >
                    <Button type="primary" size="middle" icon={<SearchOutlined />} onClick={() => {dispatch(toggle_search_visible())}}>
                        查詢
                    </Button>
                </Popover>
                <Button type="primary" size="middle" icon={<PlusOutlined />} onClick={() => {dispatch(toggle_drawer_visible("new"))}}>新增</Button>
                <Popconfirm 
                    title="你確定要刪除选中的数据吗？"
                    placement="bottomRight"
                    visible={deleteVisible}
                    onConfirm={() => { dispatch({type: SAGA_LOT_DELETE_DATA, checkedData}) }}
                    onCancel={() => { dispatch(set_delete_visible(false)) }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button 
                        type={checkedData.length > 0 ? "primary" : "default"} danger size="middle" icon={<DeleteOutlined />} 
                        onClick={deleteAction}
                    >
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        </div>
        <div className="tit-right">
            <Space>
                <Tooltip title="刷新"  placement="bottomRight">
                    <Button type="primary" shape="circle" size="middle" icon={<RedoOutlined />} onClick={reload}></Button>
                </Tooltip>
                <Search 
                    placeholder="请输入料号或工单" 
                    enterButton={true} 
                    value={searchValue}
                    onChange={e => { dispatch(set_search_value(e.target.value)) }}
                    onSearch={value => { dispatch({type: SAGA_FAST_SEARCH, value }) }} 
                />
            </Space>
        </div>
    </div>
}

let SearchContent = () => {
    let {lineName, editTime} = useSelector(state => state.appReducer.search);
    let dispatch = useDispatch();
    let between = useMemo(() => {
        return {
            display: "flex",
            justifyContent: "space-between"
        };
    }, []);
    let right = useMemo(() => {
        return {textAlign: "right"};
    }, []);
    
    return <div className="search-content">
        <Row gutter={16} justify="space-around" align="middle">
            <Col span={6} style={right}>線體名稱：</Col>
            <Col span={18}>
                <Input value={lineName} size="middle" onChange={e => {dispatch(set_search_linename(e.target.value))}}/>
            </Col>
            <Col span={6} style={right}>修改時間：</Col>
            <Col span={18}>
                <Input value={editTime} size="middle" onChange={e => {dispatch(set_search_edittime(e.target.value))}}/>
            </Col>
            <Col span={12} style={between}>
                <Button 
                    key="search-cancel" type="primary" size="small" icon={<CloseOutlined />} 
                    onClick={() => {dispatch(set_search_visible(false))}}
                >取消</Button>    
                <Button 
                    key="search-confirm" type="primary" size="small" icon={<SearchOutlined />} 
                    onClick={() => {dispatch({type: SAGA_SEARCH})}}  //触发saga执行副作用
                >查詢</Button>
            </Col>
        </Row>
    </div>
}

let Main = () => {
    return <div className="main">
        <TableWrap />
        <NewLayer />
        <EditLayer />
    </div>
}

//useMemo  
//1.减少不必要的计算， 第一次渲染前执行， 返回值会保存在缓存区。
//2.缓存引用类型数据（{}, [], function）

//useCallback
//1.useMemo的变体，专门用于缓存函数，一般用于定义事件处理函数，写法更简单一点

let TableWrap = () => {
    let dispatch = useDispatch();
    //全局状态(redux hooks)
    let {height, data} = useSelector(state => state.tableReducer);
    //内部状态机解耦（自定义hooks）
    let [tableConfig, setTableHeight, setTableData] = useTableConfig();
    //引用元素
    let tableEle = useRef();
    //简单副作用不解耦，复杂副作用解耦（rootSaga）
    useMemo(() => {   //渲染前执行
        //设置表数据（global）
        getTableData().then(e => {
            dispatch(set_table_data(e.Data.map((row, i) => ({key: row.ID, no: i + 1, ...row}))));
            message.success(e.Message);
        }, e => {
            message.error(e.Message);
        })
    }, []);
    //设置表高度（global）
    let onResize = useCallback(() => {
        console.log("onresize run!");
        let h = tableEle.current.clientHeight - 80;
        dispatch(set_table_height(h));
    }, []);
    //第一次渲染后执行
    useEffect(() => {
        onResize();
        window.onresize = onResize;
        return () => {
            window.onresize = null;
        }
    }, []);
    //设置表数据
    useEffect(() => { setTableData(data) }, [data]);
    //设置表高度
    useEffect(() => { setTableHeight(height) }, [height]);
    //返回元素
    return <div className="table-wrap" ref={tableEle}>
        <Table {...tableConfig} />
    </div>
}

//-------------------------------------------------------------------------------------------------------------------------------

let NewLayer = () => {

    //rootState
    let {visible, current, load} = useSelector(state => state.drawerReducer.new);
    let {date_day, date_night, line, station, skuno, wo, plan_qty, goal_qty, come_person, actual_person, uph_qty, standard_person, reason} = current;
    let {date_day_all, date_night_all, lineList, stationList, woList} = load;
    let dispatch = useDispatch();

    //selector
    let checkboxOptions1 = useMemo(() => {
        return date_day_all.map(date => ({label: date, value: date }));
    }, [date_day_all]);

    let checkboxOptions2 = useMemo(() => {
        return date_night_all.map(date => ({label: date, value: date }));
    }, [date_night_all]);

    let autoCompleteWoOption = useMemo(() => {
        return woList.map(skuno => ({key: skuno, value: skuno}));
    }, [woList]);

    //actionCreator
    let changeCurrentContent = useCallback(current => change_current_content("new", current), []);

    let changeLoadContent = useCallback(load => change_load_content("new", load), []);

    //回调函数
    let searchWo = useCallback(wo => {   //查询工单
        getWO({wo}).then(e => {
            dispatch(changeLoadContent({woList: e.Data.map(row => row.WORKORDERNO)}));
        }, e => {
            message.error(e.Message);
        });
    }, []);  

    let selectWo = useCallback(wo => {    //选择工单
        dispatch(changeCurrentContent({wo}));
        //带出机种
        getSKU({wo}).then(e => {   
            dispatch(changeCurrentContent({skuno: e.Data[0].SKUNO}));
        }, e => {
            message.error(e.Message);
            dispatch(changeCurrentContent({skuno: ""}));
        });
    }, []);

    let debounce = useCallback((fn, delay) => {   //防抖
        var timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }, []); 


    //副作用
    useEffect(() => {
        getLine({station}).then(e => {
            dispatch(changeLoadContent({lineList: e.Data}));
            dispatch(changeCurrentContent({line: e.Data[0]}));
        }, e => {
            message.error(e.Message);
        })
    }, []);

    useEffect(() => {
        getStation({line}).then(e => {
            dispatch(changeCurrentContent({station: e.Data[0]}));
            dispatch(changeLoadContent({stationList: e.Data}));
        }, e => {
            message.error(e.Message);
            dispatch(changeCurrentContent({station: ""}));
            dispatch(changeLoadContent({stationList: []}));
        })
    }, [line]);

    return <Drawer key="add-uph" title="Add UPH" closable={false} getContainer={false}  width={'760'}  placement="left" 
        visible={visible}
        headerStyle={{padding: "10px"}}
        bodyStyle={{padding: "10px 10px 10px 15px", overflow: "hidden"}}
        footerStyle={{padding: "10px"}}
        style={{position: "absolute"}}
        onClose={() => {dispatch(set_drawer_visible("new", false))}}
        footer={
            <div style={{textAlign: "right", paddingRight: "10px"}}>
                <Space size="middle">
                    <Button size="small" onClick={() => { dispatch(set_drawer_visible("new", false)) }}>
                        取消
                    </Button>
                    <Button size="small"  type="primary" onClick={() => { dispatch({type: SAGA_NEW_OPERATE, data: current}) }}>
                        提交
                    </Button>
                </Space>
            </div>
        }
    >
        <div className="new-drawer-wrap">
            <div className="new-drawer-time">
                <Checkbox.Group size="middle" options={checkboxOptions1} value={date_day} onChange={date_day => {
                    dispatch(changeCurrentContent({date_day}))
                }} />
                {/* <br /> */}
                <p> </p>
                <Checkbox.Group size="middle" options={checkboxOptions2} value={date_night} onChange={date_night => {
                    dispatch(changeCurrentContent({date_night}))
                }} />
            </div>
            <div className="new-drawer-main">
                <Row gutter={16} justify="space-around">
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">线体</div>
                            <div className="new-drawer-control">
                                <Select size="middle" value={line} onChange={line => {
                                    dispatch(changeCurrentContent({line}))
                                }} style={{width: "100%"}}>
                                    {
                                        lineList.map(line => <Option key={line} value={line}>{line}</Option>)
                                    }
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">站位</div>
                            <div className="new-drawer-control">
                                <Select size="middle" value={station} onChange={station => {
                                    dispatch(changeCurrentContent({station}))
                                }} style={{width: "100%"}}>
                                    {
                                        stationList.map(station => <Option key={station} value={station}>{station}</Option>)
                                    }
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">机种</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={skuno} disabled={true} placeholder="SKUNO" />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">工单</div>
                            <div className="new-drawer-control">
                                <AutoComplete 
                                    options={autoCompleteWoOption}
                                    onSelect={selectWo}
                                    onSearch={debounce(searchWo, 500)}
                                    placeholder="Sku" 
                                    style={{width: "100%"}}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">计划目标</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={plan_qty} placeholder="PLAN_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({plan_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">目标产出</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={goal_qty} placeholder="GOAL_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({goal_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">应到人数</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={come_person} placeholder="Come_Person" onChange={e => {
                                    dispatch(changeCurrentContent({come_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">实到人数</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={actual_person} placeholder="Actual_Person" onChange={e => {
                                    dispatch(changeCurrentContent({actual_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">标准UPH</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={uph_qty} placeholder="UPH_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({uph_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="new-drawer-control-wrap">
                            <div className="new-drawer-control-label">标准人力</div>
                            <div className="new-drawer-control">
                                <Input size="middle" value={standard_person} placeholder="Standard_Person" onChange={e => {
                                    dispatch(changeCurrentContent({standard_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={24}> 
                        <div className="new-drawer-control-wrap" style={{height: "100px"}}>
                            <div className="new-drawer-control-label">落产原因</div>
                            <div className="new-drawer-control">
                                <TextArea size="middle" value={reason} placeholder="REASON" onChange={e => {
                                    dispatch(changeCurrentContent({reason: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Drawer>
}


let EditLayer = () => {
    //rootState
    let {visible, current, load} = useSelector(state => state.drawerReducer.edit);
    let {date_day, date_night, line, station, skuno, wo, plan_qty, goal_qty, come_person, actual_person, uph_qty, standard_person, reason} = current;
    let {date_day_all, date_night_all} = load;
    let dispatch = useDispatch();

    //selector
    let checkboxOptions1 = useMemo(() => {
        return date_day_all.map(date => ({label: date, value: date }));
    }, [date_day_all]);

    let checkboxOptions2 = useMemo(() => {
        return date_night_all.map(date => ({label: date, value: date }));
    }, [date_night_all]);

    //actionCreator
    let changeCurrentContent = useCallback(current => change_current_content("edit", current), []);

    let changeLoadContent = useCallback(load => change_load_content("edit", load), []);

    //副作用
    // useEffect(() => {
    //     getLine({station}).then(e => {
    //         dispatch(changeLoadContent({lineList: e.Data}));
    //         dispatch(changeCurrentContent({line: e.Data[0]}));
    //     }, e => {
    //         message.error(e.Message);
    //     })
    // }, []);

    // useEffect(() => {
    //     getStation({line}).then(e => {
    //         dispatch(changeCurrentContent({station: e.Data[0]}));
    //         dispatch(changeLoadContent({stationList: e.Data}));
    //     }, e => {
    //         message.error(e.Message);
    //         dispatch(changeCurrentContent({station: ""}));
    //         dispatch(changeLoadContent({stationList: []}));
    //     })
    // }, [line]);

    return <Drawer key="edit-uph" title="Edit UPH" closable={false} getContainer={false}  width={'760'}  placement="right" 
        visible={visible}
        headerStyle={{padding: "10px"}}
        bodyStyle={{padding: "10px 10px 10px 15px", overflow: "hidden"}}
        footerStyle={{padding: "10px"}}
        style={{position: "absolute"}}
        onClose={() => {dispatch(set_drawer_visible("edit", false))}}
        footer={
            <div style={{textAlign: "right", paddingRight: "10px"}}>
                <Space size="middle">
                    <Button size="small" onClick={() => { dispatch(set_drawer_visible("edit", false)) }}>
                        取消
                    </Button>
                    <Button size="small"  type="primary" onClick={() => { dispatch({type: SAGA_EDIT_OPERATE, data: current}) }}>
                        提交
                    </Button>
                </Space>
            </div>
        }
    >
        <div className="edit-drawer-wrap">
            <div className="edit-drawer-time">
                <Checkbox.Group size="middle" options={checkboxOptions1} value={date_day} disabled={true}/>
                {/* <br /> */}
                <p> </p>
                <Checkbox.Group size="middle" options={checkboxOptions2} value={date_night} disabled={true}/>
            </div>
            <div className="edit-drawer-main">
                <Row gutter={16} justify="space-around">
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">线体</div>
                            <div className="edit-drawer-control">
                                {/* <Select size="middle" value={line}  style={{width: "100%"}} disabled={true}>
                                    {
                                        lineList.map(line => <Option key={line} value={line}>{line}</Option>)
                                    }
                                </Select> */}
                                <Input size="middle" disabled={true} value={line} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">站位</div>
                            <div className="edit-drawer-control">
                                {/* <Select size="middle" value={station} style={{width: "100%"}} disabled={true}>
                                    {
                                        stationList.map(station => <Option key={station} value={station}>{station}</Option>)
                                    }
                                </Select> */}
                                <Input size="middle" disabled={true} value={station} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">机种</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={skuno} disabled={true} placeholder="SKUNO" />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">工单</div>
                            <div className="edit-drawer-control">
                                <AutoComplete 
                                    value={wo}
                                    //options={autoCompleteWoOption}
                                    //onSelect={selectWo}
                                    //onSearch={debounce(searchWo, 500)}
                                    placeholder="Sku" 
                                    style={{width: "100%"}}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">计划目标</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={plan_qty} placeholder="PLAN_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({plan_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">目标产出</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={goal_qty} placeholder="GOAL_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({goal_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">应到人数</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={come_person} placeholder="Come_Person" onChange={e => {
                                    dispatch(changeCurrentContent({come_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">实到人数</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={actual_person} placeholder="Actual_Person" onChange={e => {
                                    dispatch(changeCurrentContent({actual_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">标准UPH</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={uph_qty} placeholder="UPH_QTY" onChange={e => {
                                    dispatch(changeCurrentContent({uph_qty: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}> 
                        <div className="edit-drawer-control-wrap">
                            <div className="edit-drawer-control-label">标准人力</div>
                            <div className="edit-drawer-control">
                                <Input size="middle" value={standard_person} placeholder="Standard_Person" onChange={e => {
                                    dispatch(changeCurrentContent({standard_person: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={24}> 
                        <div className="edit-drawer-control-wrap" style={{height: "100px"}}>
                            <div className="edit-drawer-control-label">落产原因</div>
                            <div className="edit-drawer-control">
                                <TextArea size="middle" value={reason} placeholder="REASON" onChange={e => {
                                    dispatch(changeCurrentContent({reason: e.target.value}))
                                }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Drawer>
}


// let EditLayer = () => {
//     let {visible} = useSelector(state => state.drawerReducer.edit);
//     let dispatch = useDispatch();
//     return <Drawer key="table" title="Edit UPH" closable={false} getContainer={false}  width={'680'}  placement="right" 
//         visible={visible}
//         headerStyle={{padding: "10px"}}
//         bodyStyle={{padding: "10px 10px 10px 15px", overflow: "hidden"}}
//         //footerStyle={{padding: "10px"}}
//         style={{position: "absolute"}}
//         onClose={() => {dispatch(set_drawer_visible("edit", false))}}
//         // footer={
//         //     <div style={{textAlign: "right"}}>
//         //     <Button size="middle"  style={{marginRight: 8}} onClick={() => { }}>
//         //         Cancel
//         //     </Button>
//         //     <Button size="middle"  type="primary" onClick={() => { }}>
//         //         Submit
//         //     </Button>
//         // </div>
//         // }
//     >
//         xxxxxxxxxxx
//     </Drawer>
// }









