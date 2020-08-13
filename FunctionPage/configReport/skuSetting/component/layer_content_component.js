
let WrapCon1 = () => {
    //全局狀態
    let {globalRely, con1: {init, load}} = useSelector(state => state.layerContentReducer);
    let {selectData, currentOperate} = useSelector(state => state.configReportReducer);
    let {BU, SKU_NAME, SKUNO, SKU_TYPE, VERSION, C_SERIES_ID, CUST_PARTNO, CUST_SKU_CODE, SN_RULE, PANEL_RULE, LENGTH, DESCRIPTION} = init;

    let dispatch = useDispatch();
    let setInitValue = o => { dispatch(set_con_init("con1", o)) };
    let setLoadValue = o => { dispatch(set_con_load("con1", o)) };
    let convObj = (base, target) => {
        let o = {};
        Object.keys(target).forEach(key => {
            o[key] = base[key];
        });
        return o;
    };

    useEffect(() => {
        getAllBu().then(e => {
            setLoadValue({BU: e.Data});
        }, e => {
            message.error("getAllBu error!");
        });
        getSeries().then(e => {
            setLoadValue({C_SERIES_ID: e.Data.map(row => row.SERIES_NAME)});
        }, e => {
            message.error("getSeries error!");
        });
        getSNRULE().then(e => {
            setLoadValue({SN_RULE: e.Data.map(row => row.CURVALUE)});
        }, e => {
            message.error("getSNRULE error!");
        });
    }, []);

    useEffect(() => {
        if(currentOperate == "edit"){

            dispatch(set_global_rely(convObj(selectData, globalRely))); //修改操作加载全局依赖值
            setInitValue({...convObj(selectData, init), C_SERIES_ID: selectData.SERIES_NAME});  //修改操作填充值
        }
        // if(currentOperate == "add"){
        //     //init - null  rely - null
        //     dispatch(set_global_rely({})); //全局依赖置空
        //     setInitValue({});   //初始值置空
        // }
    }, [currentOperate, selectData]);


    let save = () => { //点击保存信息
        saveSku(init).then(e => {
            dispatch(set_global_rely({ID: e.Data, SKUNO, SKU_NAME, BU}));
            dispatch(set_next_step("addDrawer"));
            message.success("操作成功！");
        }, e => {
            message.error("操作失败！");
        });
    }
    return (<div className="wrap-con1">
    <div className="con-son">
        <span>BU: </span>
        <Select size="middle" value={BU} style={{width: "100%"}} onChange={v => {setInitValue({BU: v})}}>
            {
                load.BU.map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
    </div>

    <div className="con-son">
        <span>机种名称: </span>
        <Input value={ SKU_NAME } size="middle" onChange={e => {setInitValue({SKU_NAME: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>机种: </span>
        <Input value={ SKUNO } size="middle" onChange={e => {setInitValue({SKUNO: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>机种类型: </span>
        <Select size="middle" value={SKU_TYPE} style={{width: "100%"}} onChange={v => {setInitValue({SKU_TYPE: v})}}>
            {
                load.SKU_TYPE.map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
    </div>

    <div className="con-son">
        <span>机种版本: </span>
        <Input value={ VERSION } size="middle" onChange={e => {setInitValue({VERSION: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>机种所属系列: </span>
        <Select size="middle" value={C_SERIES_ID} style={{width: "100%"}} onChange={v => {setInitValue({C_SERIES_ID: v})}}>
            {
                load.C_SERIES_ID.map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
    </div>

    <div className="con-son">
        <span>客户料号: </span>
        <Input value={ CUST_PARTNO } size="middle" onChange={e => {setInitValue({CUST_PARTNO: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>CodeValue: </span>
        <Input value={ CUST_SKU_CODE } size="middle" onChange={e => {setInitValue({CUST_SKU_CODE: e.target.value})}}  />
    </div>

    <div className="con-son">
        <span>SN编码规则: </span>
        <Select size="middle" value={SN_RULE} style={{width: "100%"}} onChange={v => {setInitValue({SN_RULE: v, LENGTH: v.length})}}>
            {
                load.SN_RULE.map(v => <Option key={v} value={v}>{v}</Option>)
            }
        </Select>
    </div>

    <div className="con-son">
        <span>Panel编码规则: </span>
        <Input value={ PANEL_RULE } size="middle" onChange={e => {setInitValue({PANEL_RULE: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>SN长度: </span>
        <Input value={ LENGTH } size="middle" disabled={true} onChange={e => {setInitValue({LENGTH: e.target.value})}} />
    </div>

    <div className="con-son">
        <span>描述: </span>
        <Input value={ DESCRIPTION } size="middle" onChange={e => {setInitValue({DESCRIPTION: e.target.value})}} />
    </div>

    <div style={{paddingTop: "10px"}}>
        <Button size="middle" type="primary" onClick={save}>保存信息</Button>
    </div>

  </div>);
}













































//===============================================================================================================================

let WrapCon2 = () => {
    //全局状态
    let {ID} = useSelector(state => state.layerContentReducer.globalRely);
    let {tableData} = useSelector(state => state.layerContentReducer.con2.load);
    let dispatch = useDispatch();
    //-----------------------------------------------------------------------------------------------------
    //局部状态
    
    //可见状态，用于显示（下拉框内容）
    const [sfcRouteOptions, setSfcRouteOptions] = useState([]);
    const [testRouteOptions, setTestRouteOptions] = useState([]);
    const [testPcbaRouteOptions, setPcbaTestRouteOptions] = useState([]);
    const [wipRouteOptions, setWipRouteOptions] = useState([]);
    const [testStation, setTestStation] = useState([]);
    const [autoStation, setAutoStation] = useState([]);  //pcba测试路由autostation
    
    //不可见的状态，不用于显示，用于请求数据
    const [sfcRouteCon, setSfcRouteCon] = useState({ROUTE_ID: "", DEFAULT_FLAG:"N", TYPE: "SFC"});
    const [testRouteCon, setTestRouteCon] = useState({TEST_ROUTE_ID: "", DEFAULT_FLAG:"N", NOCHECKTEST_FLAG: "N", AutoStation: ""});
    const [testPcbaRouteCon, setTestPcbaRouteCon] = useState({TEST_ROUTE_ID: "", AutoStation: ""});     
    const [wipRouteCon, setWipRouteCon] = useState({ROUTE_ID: "", DEFAULT_FLAG:"N", TYPE: "WIP"});
    //-----------------------------------------------------------------------------------------------------
    let sfcRouteOnSearch = text => {      //SFC路由查询回调
        getRoute({TYPE: "SFC", StationName: text}).then(e => {
            setSfcRouteOptions(e.Data.map((row, i) => ({key: i, route_id: row.ROUTE_ID, value: row.StationNameSplicing})));
        }, e => {
            setSfcRouteOptions([]);
        });
    }
    let sfcRouteOnSelect = ( text, {route_id}) => {//SFC路由选择时的回调
        setSfcRouteCon({...sfcRouteCon, ROUTE_ID: route_id});
    }
    //-----------------------------------------------------------------------------------------------------
    let testRouteOnSearch = text => {     //测试路由查询回调
        getRoute({TYPE: "TEST", StationName: text}).then(e => {
            setTestRouteOptions(e.Data.map((row, i) => ({key: i, route_id: row.ROUTE_ID, value: row.StationNameSplicing})));
        }, e => {
            setTestRouteOptions([]);
        });
    }
    let testRouteOnSelect = (text, {route_id}) => {   //测试路由选择时的回调
        let stations = text.split("==");
        setTestStation(stations);
        setTestRouteCon({...testRouteCon, TEST_ROUTE_ID: route_id, AutoStation: stations[stations.length - 1]});   // 不能连续setState，只有最后一次生效
    }
    //-----------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------


    let testPcbaRouteOnSearch = text => {    //pcba测试路由查询回调
        getRoute({TYPE: "TEST-PCBA", StationName: text}).then(e => {
            setPcbaTestRouteOptions(e.Data.map((row, i) => ({key: i, route_id: row.ROUTE_ID, value: row.StationNameSplicing})));
        }, e => {
            setPcbaTestRouteOptions([]);
        });
    }
    let testPcbaRouteOnSelect = (text, {route_id}) => {   //PCBA测试路由选择时的回调
        console.log(text);
        setTestPcbaRouteCon({...testPcbaRouteCon, TEST_ROUTE_ID: route_id});
        let stations = text.split("==");
        setAutoStation(stations);
        //设置最后一个工站
        setTestPcbaRouteCon({...testPcbaRouteCon, AutoStation: stations[stations.length - 1]});
    }

    //-----------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------
    let wipRouteOnSearch = text => {    //wip路由查询回调
        getRoute({TYPE: "WIP", StationName: text}).then(e => {
            setWipRouteOptions(e.Data.map((row, i) => ({key: i, route_id: row.ROUTE_ID, value: row.StationNameSplicing})));
        }, e => {
            setWipRouteOptions([]);
        });
    }
    let wipRouteOnSelect = (text, {route_id}) => {   //wip路由选择时的回调
        setWipRouteCon({...wipRouteCon, ROUTE_ID: route_id});
    }
    //-----------------------------------------------------------------------------------------------------
    let showAllRoutes = () => {   //显示绑定的路由
        getAllRoutesBySkuID({SkuId: ID}).then(e1 => {
            dispatch(set_con_load("con2", {tableData: e1.Data.map((row, i) => ({key: i, ...row})) }));
            message.success(e1.Message);
        }, e1 => {
            message.error(e1.Message);
        });
    }
    useEffect(() => {
        showAllRoutes();
    }, []);

    //---------------------------------点击按钮的回调--------------------------------------------------------------------
    let clickAddSfcRoute = () => {
        addRoute({SKU_ID: ID, ...sfcRouteCon}).then(e => {
            showAllRoutes();
            message.success(e.Message);
        }, e => {
            message.error(e.Message);
        });
    };
    let clickAddTestRoute = () => {
        addTestRoute({SKU_ID: ID, ...testRouteCon}).then(e => {
            showAllRoutes();
            message.success(e.Message);
        }, e => {
            message.error(e.Message);
        });
    };
    let clickAddTestPcbaRoute = () => {
        addTestPcbaRoute({SKU_ID: ID, ...testPcbaRouteCon}).then(e => {
            showAllRoutes();
            message.success(e.Message);
        }, e => {
            message.error(e.Message);
        });
    };
    let clickAddWipRoute = () => {
        addRoute({SKU_ID: ID, ...wipRouteCon}).then(e => {
            showAllRoutes();
            message.success(e.Message);
        }, e => {
            message.error(e.Message);
        });
    }
    let tableConfig = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: tableData,
        scroll: {x: 800},
        columns: [
            {
                title: '路由名称',
                dataIndex: 'ROUTE_NAME',
                width: 120,
                fixed: 'left'
            },
            {
                title: '路由类型',
                dataIndex: 'ROUTE_TYPE',
                width: 120
            },
            {
                title: '是否为默认路由',
                dataIndex: 'DEFAULT_FLAG',
                width: 120
            },
            {
                title: '是否卡PCBA测试资料',
                dataIndex: 'CHECK_FLAG',
                width: 160
            },
            {
                title: '默认机种',
                dataIndex: 'DEFAULT_SKUNO'
            },
            {
                title: '操作人',
                dataIndex: 'EDIT_EMP'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 80,//88,
                fixed: 'right',
                render: (row, allRow, no) => {
                    let onConfirm = (e) => {
                        let id = row["ID"];
                        deleteRoute([id]).then(e => {
                            message.success("delete ok!");
                            showAllRoutes();
                        }, e => {
                            message.error("delete error!");
                        });
                    };
                    let onCancel = (e) => {
                        console.log(e);
                        message.error("no");
                    }
                    return <div>
                        <Popconfirm title="你確定要刪除該路由？"  okText="Yes" cancelText="No" placement="topRight" onConfirm={onConfirm} onCancel={onCancel}>
                            <Button type="primary" danger size="small"  loading={false}  icon={<DeleteOutlined />}> 刪除 </Button>  
                        </Popconfirm>
                    </div>
                }
            }
        ]
    }
    //-----------------------------------------------------------------------------------------------------
    return (<div className="wrap-con2"> 
        <div style={{marginBottom: "10px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>SFC路由：</span>
            <AutoComplete 
                options={sfcRouteOptions}
                onSelect={sfcRouteOnSelect}
                onSearch={sfcRouteOnSearch}
                placeholder="SFC路由" 
                style={{marginBottom: "10px"}}
            />
            <Checkbox 
                checked={sfcRouteCon.DEFAULT_FLAG == "N" ? false : true} 
                onChange={() => {setSfcRouteCon({...sfcRouteCon, DEFAULT_FLAG: sfcRouteCon.DEFAULT_FLAG == "N" ? "Y" : "N"})}}
                style={{marginBottom: "10px" }}
            >是否把該路由設置為默認路由？</Checkbox>
            <br/>
            <Button size="small" type="primary" icon={<PlusOutlined />} onClick={clickAddSfcRoute}>添加路由</Button>            
        </div>







        <div style={{marginBottom: "10px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>測試路由：</span>
            <AutoComplete 
                options={testRouteOptions} 
                onSelect={testRouteOnSelect} 
                onSearch={testRouteOnSearch}
                placeholder="測試路由" 
                style={{marginBottom: "10px"}}
            />
            <Checkbox 
                checked={testRouteCon.DEFAULT_FLAG == "N" ? false : true} 
                onChange={() => {setTestRouteCon({...testRouteCon, DEFAULT_FLAG: testRouteCon.DEFAULT_FLAG == "N" ? "Y" : "N"})}}
                style={{marginBottom: "10px" }}
            >是否把該路由設置為默認路由？</Checkbox>
            <br />
            <Select 
                placeholder="測試工站" value={testRouteCon.AutoStation} size="middle" 
                style={{width: "40%", marginBottom: "10px" }}
                onChange={v => {setTestRouteCon({...testRouteCon, AutoStation: v})}}
            >
                {
                    testStation.map(v => <Option key={v} value={v}>{v}</Option>)
                }
            </Select>
            <br />
            <Checkbox 
                checked={testRouteCon.NOCHECKTEST_FLAG == "N" ? false : true} 
                onChange={() => {setTestRouteCon({...testRouteCon, NOCHECKTEST_FLAG: testRouteCon.NOCHECKTEST_FLAG == "N" ? "Y" : "N"})}}
                style={{marginBottom: "10px" }}
            >是否設置不卡PCBA測試資料？</Checkbox>
            <br />
            <Button size="small" type="primary" icon={<PlusOutlined />} onClick={clickAddTestRoute}>添加路由</Button>
        </div>














        <div style={{marginBottom: "10px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>测试路由（PCBA）：</span>
            <AutoComplete 
                options={testPcbaRouteOptions}
                onSelect={testPcbaRouteOnSelect}
                onSearch={testPcbaRouteOnSearch}
                placeholder="TEST-PCBA路由" 
                style={{marginBottom: "10px"}}
            />
            <br/>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>AutoStation：</span>
            <br/>
            <Select 
                placeholder="PCBA測試工站" value={testPcbaRouteCon.AutoStation} size="middle" 
                style={{width: "40%", marginBottom: "10px" }}
                onChange={v => {setTestPcbaRouteCon({...testPcbaRouteCon, AutoStation: v})}}
            >
                {
                    autoStation.map(v => <Option key={v} value={v}>{v}</Option>)
                }
            </Select>
            <br/>
            <Button size="small" type="primary" icon={<PlusOutlined />} onClick={clickAddTestPcbaRoute}>添加路由</Button>            
        </div>

        <div style={{marginBottom: "10px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>WIP路由：</span>
            <AutoComplete 
                options={wipRouteOptions}
                onSelect={wipRouteOnSelect}
                onSearch={wipRouteOnSearch}
                placeholder="WIP路由" 
                style={{marginBottom: "10px"}}
            />
            <Button size="small" type="primary" icon={<PlusOutlined />} onClick={clickAddWipRoute}>添加路由</Button>            
        </div>
        <span style={{lineHeight: "30px", fontWeight: "700"}}>已配置的路由：</span>
        <Table size="small" {...tableConfig} />
    </div>)
}

//===============================================================================================================================



























































let WrapCon3 = () => {
    console.log("con3 render!");
    //全局状态
    let {ID, SKUNO} = useSelector(state => state.layerContentReducer.globalRely);
    let {tableData, stations} = useSelector(state => state.layerContentReducer.con3.load);
    let dispatch = useDispatch();
    //------------------------------------------------------------------------------------------------------------------------
    //局部状态
    const [con, setCon] = useState({STATION_NAME: "", SAP_STATION_CODE: "", WORKORDER_TYPE: ""});
    //------------------------------------------------------------------------------------------------------------------------
    let setValue = (o) => {
        Object.keys(o).length > 0 ? setCon({...con, ...o}) : setCon({STATION_NAME: "", SAP_STATION_CODE: "", WORKORDER_TYPE: ""});
    }
    //------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        console.log("con3 didmount");
        ID != "" &&　getSapStation({SKU_ID: ID}).then(e => {
            dispatch(set_con_load("con3", {stations: e.Data.map(row => row.STATION_NAME) }));
            message.success("getSapStation success!");
        }, e => {
            message.error("getSapStation fail!");
        });
        SKUNO != "" && showSapMap();
    }, []);

    let showSapMap = () => {   //更新抛帐点数据
        getSapMap({SkuNo: SKUNO}).then(e1 => {
            if(Object.prototype.toString.call(e1.Data) == "[object Array]"){
                dispatch(set_con_load("con3", {tableData: e1.Data.map((row, i) => ({key: i, ...row}))}))
            }else{
                dispatch(set_con_load("con3", {tableData: [] }));
            }
            message.success("getSapMap success!");
        }, e1 => {
            message.error("getSapMap fail!");
        });
    }
    //------------------------------------------------------------------------------------------------------------------------
    let clickAddSap = () => {
        addSapStationMap({...con, SKUNO}).then(e => {
            showSapMap();
            message.success("addSapStationMap success!");
        }, e => {
            message.error("addSapStationMap fail!");
        });
    }
    //------------------------------------------------------------------------------------------------------------------------
    let tableConfig = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        dataSource: tableData,
        scroll: {x: 700},
        columns: [
            {
                title: '料号',
                dataIndex: 'SKUNO',
                fixed: 'left'
            },
            {
                title: '工站',
                dataIndex: 'STATION_NAME'
            },
            {
                title: '工单类型',
                dataIndex: 'WORKORDER_TYPE'
            },
            {
                title: '抛帐点',
                dataIndex: 'SAP_STATION_CODE'
            },
            {
                title: '操作人',
                dataIndex: 'EDIT_EMP'
            },
            {
                title: '操作时间',
                dataIndex: 'EDIT_TIME'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 80,//88,
                fixed: 'right',
                render: (row, rowAll, no) => {
                    let onConfirm = () => {
                        deleteSapStationMap([row.ID]).then(e => {
                            showSapMap();
                            message.success("deleteSapStationMap success!");
                        }, e => {
                            message.error("deleteSapStationMap fail!");
                        });
                        message.success("ok");
                    };
                    let onCancel = (e) => {
                        console.log(e);
                        message.error("no");
                    }
                    return <div>
                        <Popconfirm 
                            title="你確定要刪除該拋帳點？"
                            placement="topRight"
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary"  danger size="small"  loading={false}  icon={<DeleteOutlined />}>
                                刪除
                            </Button>  
                        </Popconfirm>
                    </div>
                }
            }
        ]
    }
    return (<div className="wrap-con3">
        <div className="con-son">
            <span>工站名: </span>
            <Select 
                placeholder="工站名" defaultValue="" size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({STATION_NAME: v})}}
            >
                {
                    stations.map(v => <Option key={v} value={v}>{v}</Option>)
                }
            </Select>
        </div>
        <div className="con-son">
            <span>工單類型: </span>
            <Select 
                placeholder="工單類型" defaultValue="" size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({WORKORDER_TYPE: v})}}
            >
                <Option value="REGULAR">{"REGULAR"}</Option>
            </Select>
        </div>
        <div className="con-son">
            <span>拋帳點: </span>
            <Select 
                placeholder="拋帳點" defaultValue="" size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({SAP_STATION_CODE: v})}}
            >
                {
                    ["0010", "0020", "0030", "0040", "0050", "0060", "0070", "0080", "0090", "0100", "0110", "0120", "0130", "0140", "0150", "0160", "0170", "0180", "0190", "0200"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div style={{marginBottom: "20px", paddingTop: "10px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined /> } onClick={clickAddSap} >添加拋帳點</Button>
        </div>
        <span style={{lineHeight: "30px", fontWeight: "700"}}>已配置的拋帳點：</span>
        <Table size="small" {...tableConfig}/>
    </div>)
}

//===============================================================================================================================

let WrapCon4 = () => {
    let {ID, SKUNO} = useSelector(state => state.layerContentReducer.globalRely);
    let {tableData} = useSelector(state => state.layerContentReducer.con4.load);
    let dispatch = useDispatch();
    const [con, setCon] = useState({PACK_TYPE: "", MAX_QTY: "", TRANSPORT_TYPE: "", INSIDE_PACK_TYPE: "", SN_RULE: "", DESCRIPTION: ""});
    let setValue = o => {
        Object.keys(o).length > 0 ? setCon({...con, ...o}) : setCon({PACK_TYPE: "", MAX_QTY: "", TRANSPORT_TYPE: "", INSIDE_PACK_TYPE: "", SN_RULE: "", DESCRIPTION: ""});
    }
    let {PACK_TYPE, MAX_QTY, TRANSPORT_TYPE, INSIDE_PACK_TYPE, SN_RULE, DESCRIPTION} = con;
    let showPackConfig = () => {
        getPackConfig({SkuNo: SKUNO}).then(e => {
            dispatch(set_con_load("con4", {tableData: e.Data.map((row, i) => ({key: i, ...row}))}));
            message.success("getPackConfig success");
        }, e => {
            message.error("getPackConfig error");
        });
    }
    useEffect(() => {
        showPackConfig();
    }, []);
    let clickAddPackConfig = () => {
        addPackConfig({...con, ID: "", SKUNO}).then(e => {
            showPackConfig();
            message.success("addPackConfig success");
        }, e => {
            message.error("addPackConfig error");
        });
    }
    const tableOptions = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        scroll: {x: 800},
        dataSource: tableData,
        columns: [
            {
                title: '料号',
                dataIndex: 'SKUNO',
                fixed: 'left'
            },
            {
                title: '包装类型',
                dataIndex: 'PACK_TYPE',
            },
            {
                title: '运输方式',
                dataIndex: 'TRANSPORT_TYPE',
            },
            {
                title: '内部包装方式',
                dataIndex: 'INSIDE_PACK_TYPE'
            },
            {
                title: '最大数量',
                dataIndex: 'MAX_QTY'
            },
            {
                title: 'SN规则',
                dataIndex: 'SN_RULE'
            },
            {
                title: '描述',
                dataIndex: 'DESCRIPTION'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 80,//88,
                fixed: 'right',
                render: (row, rowAll, no) => {
                    let onConfirm = (e) => {
                        deletePackConfig([row.ID]).then(e => {
                            message.success("deletePackConfig success");
                            showPackConfig();
                        }, e => {
                            message.error("deletePackConfig error");
                        });
                        message.success("ok");
                    };
                    let onCancel = (e) => {
                        console.log(e);
                        message.error("no");
                    }
                    return <div>
                        <Popconfirm 
                            title="你確定要刪除該包裝配置？"
                            placement="topRight"
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button 
                                type="primary" 
                                danger
                                // shape="circle" 
                                size="small" 
                                loading={false} 
                                icon={<DeleteOutlined />} 
                            >
                                刪除
                            </Button>  
                        </Popconfirm>
                    </div>
                }
            }
        ]
    }
    return (<div className="wrap-con4">
        <div className="con-son">
            <span>包装类型: </span>
            <Select 
                placeholder="包装类型" defaultValue={PACK_TYPE} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => { setValue({PACK_TYPE: v})}}
            >
                {
                    ["CARTON", "PALLET"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>最大数量: </span>
            <Input size="middle" value={MAX_QTY} onChange={e => {setValue({MAX_QTY: e.target.value})}} />
        </div>
        <div className="con-son">
            <span>运输方式: </span>
            <Select 
                placeholder="运输方式" defaultValue={TRANSPORT_TYPE} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({TRANSPORT_TYPE: v})}}
            >
                {
                    ["DEFAULT"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>内部包装方式: </span>
            <Select 
                placeholder="运输方式" defaultValue={INSIDE_PACK_TYPE} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({INSIDE_PACK_TYPE: v})}}
            >
                {
                    ["SN", "CARTON", "PALLET"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>SN编码规则: </span>
            <Select 
                placeholder="SN编码规则" defaultValue={SN_RULE} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setValue({SN_RULE: v})}}
            >
                {
                    ["DefCarton", "DefPallet"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>描述: </span>
            <Input size="middle" value={DESCRIPTION} onChange={e => {setValue({DESCRIPTION: e.target.value})}} />
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={clickAddPackConfig} >添加包裝配置</Button>
        </div>
        <div style={{width: "100%", marginTop: "30px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>已存在的包裝配置：</span>
            <Table size="small"  {...tableOptions} />
        </div>
    </div>)
}

let WrapCon5 = () => {
    console.log("con5 rander");
    let {SKUNO} = useSelector(state => state.layerContentReducer.globalRely);

    const [base64, setBase64] = useState("");
    const [url, setURL] = useState("../../../../img/QUACK_PICTURE/" + SKUNO + ".bmp");
    const [fileO, setFileO] = useState({});

    let selectFile = (file) => {
        let windowURL = window.URL || window.webkitURL;
        let dataURL = windowURL.createObjectURL(file);
        setFileO(file);
        setURL(dataURL);
        let worker = new Worker("../../../../Scripts/Setting/BigFileReader.js");
        worker.onmessage = (e) => {
            e.data.Status == "Pass" ? setBase64(e.data.Bas64File) : message.error(e.data.Message);
        }
        worker.onerror = () => {
            message.error("请选择文件！");
        }
        worker.postMessage({ file, filename: file.name, UseType: file.name.match(/\.([^\.]+$)/)[1].toUpperCase(), ExtName: ".jpg,.jpeg,.bmp,.png" });
        return false;
    }

    let upload = () => {
        let data = {SKUNO, File: fileO.name, Bas64File: base64};
        console.log(data);
        uploadQuackImg(data).then(e => {
            message.success("上传成功！");
        }, e => {
            message.error("上传失败！");
        });
    }

    return (<div className="wrap-con5">
        <Upload accept=".bmp" beforeUpload={selectFile} >
            <Button icon={<UploadOutlined />}>上傳本地Quack圖片</Button>
        </Upload>
        <div className="con-img" style={{background: "url("+ url +")  0% 0% / 100% 100%"}}></div>
        <Button type="primary" style={{marginTop: '15px'}} icon={<UploadOutlined />} onClick={upload}>上传</Button>
    </div>)
}
let WrapCon6 = () => {
    let {BU, SKUNO, SKU_NAME} = useSelector(state => state.layerContentReducer.globalRely);
    let {init: {STATION_NAME, QTY, VALID_FLAG}, load } = useSelector(state => state.layerContentReducer.con6);
    let dispatch = useDispatch();
    console.log("con6 rander!!");
    useEffect(() => {
        get2dxStation().then(e => {
            dispatch(set_con_load("con6", {STATION_NAME: e.Data.map(row => row.STATION)}));
        }, e => {
            message.error("get2dxStation error");
        });
        SKUNO != "" && get2dxConfig({SKUNO}).then(e => {
            if(e.Data[0]){
                let {STATION_NAME, QTY, VALID_FLAG} = e.Data[0];
                dispatch(set_con_init("con6", {STATION_NAME, QTY, VALID_FLAG}));
            }
        }, e => {
            message.error("Get2dxConfig error");
        });
    }, []);
    let changeValidFlag = () => {
        dispatch(set_con_init("con6", {VALID_FLAG: VALID_FLAG == "1" ? "0" : "1"}));
    }

    let clickSave2dxConfig = () => {
        save2dxConfig({BU, SKUNO, CODE_NAME: SKU_NAME, STATION_NAME, QTY, VALID_FLAG}).then(e => {
            message.success("保存成功!");
        }, e => {
            message.error("保存失败!");
        });
    }
    return (<div className="wrap-con6">
        <div className="con-son">
            <span>料号: </span>
            <Input size="middle" disabled value={SKUNO} />
        </div>
        <div className="con-son">
            <span>机种名: </span>
            <Input size="middle" disabled value={SKU_NAME} />
        </div>
        <div className="con-son">
            <span>工站: </span>
            <Select 
                placeholder="工站" value={STATION_NAME} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {dispatch(set_con_init("con6", {STATION_NAME: v}))}}
            >
                {
                    load.STATION_NAME.map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>数量: </span>
            <Input size="middle" value={QTY} onChange={e => {dispatch(set_con_init("con6", {QTY: e.target.value}))}} />
        </div>
        <Checkbox style={{marginTop: "10px" }} checked={VALID_FLAG == "1" ? true : false } onChange={changeValidFlag}>
            該配置是否有效？
        </Checkbox>
        <br/>
        <div style={{paddingTop: "10px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={clickSave2dxConfig}>添加2DX配置</Button>
        </div>
    </div>)
}
let WrapCon7 = () => {
    let {currentOperate} = useSelector(state => state.configReportReducer); 
    let {globalRely: {SKUNO}, con7: {init}} = useSelector(state => state.layerContentReducer); 
    let {SKUNO73, SKUVER73, SKUNO800} = init;
    let dispatch = useDispatch();

    let setInitValue = o => {
        dispatch(set_con_init("con7", o));
    }
    let convObj = (base, target) => {
        let o = {};
        Object.keys(target).forEach(key => {
            o[key] = base[key];
        });
        return o;
    };

    useEffect(() => {
        currentOperate == "edit" && get73800Config({SKUNO}).then(e => {  //修改操作填充配置数据
            console.log(e);
            message.success("get73800Config success!");
            e.Data[0] && Object.keys(e.Data[0]).length > 0 && setInitValue(convObj(e.Data[0], init)); 
        }, e => {
            message.error("get73800Config error!");
        });
        setInitValue({SKUNO800: SKUNO});
    }, []);

    // con7init globalraly operate 
    let clickSave73800Config = () => {
        save73800Config(init).then(e => {
            message.success("保存成功！");
        }, e => {
            message.error("保存失败！");
        });
    }

    return (<div className="wrap-con7">
        <div className="con-son">
            <span>73料号: </span>
            <Input size="middle" value={SKUNO73} onChange={e => {setInitValue({SKUNO73: e.target.value})}} />
        </div>
        <div className="con-son">
            <span>73料号版本: </span>
            <Input size="middle" value={SKUVER73} onChange={e => {setInitValue({SKUVER73: e.target.value})}} />
        </div>
        <div className="con-son">
            <span>68料号: </span>
            <Input size="middle" disabled value={SKUNO800} onChange={e => {setInitValue({SKUNO800: e.target.value})}} />
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={clickSave73800Config} >添加配置</Button>
        </div>
    </div>)
}
let WrapCon8 = () => {
    let {currentOperate} = useSelector(state => state.configReportReducer);
    let {globalRely: {SKUNO}, con8: {load}} = useSelector(state => state.layerContentReducer);
    let dispatch = useDispatch();
    let [con, setCon] = useState({STATION: "", LABELNAME: "", LABELTYPE: "", QTY: "", SEQ: ""});
    let {STATION, LABELNAME, LABELTYPE, QTY, SEQ} = con;
    let setConValue = o => {
        Object.keys(o).length > 0 ? setCon({...con, ...o}) : setCon({STATION: "", LABELNAME: "", LABELTYPE: "", QTY: "", SEQ: ""});
    }

    let showLabelConfig = () => {
        getLabelConfig({Skuno: SKUNO}).then(e => {
            dispatch(set_con_load("con8", {tableData: e.Data}));
            message.success("saveLabelConfig success!");
        }, e => {
            message.error("saveLabelConfig error!");
        });
    }

    useEffect(() => {
        //加载下拉数据， 表数据
        getLabelStation().then(e => {
            dispatch(set_con_load("con8", {STATION: e.Data.map(row => row.STATION_NAME)}));
            message.success("getLabelStation success!");
        }, e => {
            message.error("getLabelStation error!");
        });
        currentOperate == "edit" && showLabelConfig();
    }, []);
    let clickSaveLabelConfig = () => {
        saveLabelConfig({...con, SKUNO}).then(e => {
            message.success("saveLabelConfig success!");
            showLabelConfig();
        }, e => {
            message.error("saveLabelConfig error!");
        });
    }

    let tableOptions = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        scroll: {x: 860},
        dataSource: load.tableData,
        columns: [
            {
                title: '机种',
                dataIndex: 'SKUNO',
                fixed: 'left',
                width: 80
            },
            {
                title: '打印工站',
                dataIndex: 'STATION',
                //width: 80
            },
            {
                title: '打印顺序',
                dataIndex: 'SEQ',
                //width: 200
            },
            {
                title: '打印数量',
                dataIndex: 'QTY'
            },
            {
                title: 'Label模板',
                dataIndex: 'LABELNAME',
                width: 220
            },
            {
                title: '模板类型',
                dataIndex: 'LABELTYPE'
            },
            {
                title: '操作人',
                dataIndex: 'EDIT_EMP'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 80,//88,
                fixed: 'right',
                render: (row, rowAll, no) => {
                    let onConfirm = (e) => {
                        deleteLabelConfig([row.ID]).then(e => {
                            message.success("删除成功！");
                            showLabelConfig();
                        }, e => {
                            message.error("删除失败！");
                        });
                    };
                    let onCancel = (e) => {
                        console.log(e);
                        message.error("no");
                    }
                    return <div>
                        <Popconfirm 
                            title="你確定要刪除該Label配置吗？"
                            placement="topRight"
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button 
                                type="primary" 
                                danger
                                // shape="circle" 
                                size="small" 
                                loading={false} 
                                icon={<DeleteOutlined />} 
                            >
                                刪除
                            </Button>  
                        </Popconfirm>
                    </div>
                }
            }

        ]
    }

    return (<div className="wrap-con8">
        <div className="con-son">
            <span>工站: </span>
            <Select 
                placeholder="工站" value={STATION} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setConValue({STATION: v})}}
            >
                {
                    load.STATION.map((v, i) => {
                        return <Option key={i} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>打印模板: </span>
            <Select 
                placeholder="工站" value={LABELNAME} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setConValue({LABELNAME: v})}}
            >
                {
                    ["AG_CARTON_LABEL_PO3", "AG_PALLET_LIST_30-70", "AG_BOXLABEL-1"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>模板类型: </span>
            <Select 
                placeholder="工站" value={LABELTYPE} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setConValue({LABELTYPE: v})}}
            >
                {
                    ["BOXLabel", "SNLabel", "KPLabel", "PalletListLabel", "CartonLabel"].map(v => {
                        return <Option key={v} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>打印數量: </span>
            <Input size="middle" value={QTY} onChange={e => {setConValue({QTY: e.target.value})}}/>
        </div>
        <div className="con-son">
            <span>打印顺序: </span>
            <Input size="middle" value={SEQ} onChange={e => {setConValue({SEQ: e.target.value})}}/>
        </div>
        <div style={{paddingTop: "30px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={clickSaveLabelConfig}>添加Label配置</Button>
        </div>
        <div style={{width: "100%", marginTop: "30px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>已存在的Label配置：</span>
            <Table size="small" {...tableOptions} />
        </div>
    </div>)
}
let WrapCon9 = () => {
    let {AqlTypeArr, aqlLevelArr, tableData1, tableData2} = useSelector(state => state.layerContentReducer.con9.load);
    let {ID} = useSelector(state => state.layerContentReducer.globalRely);
    let dispatch = useDispatch();
    let setLoadValue = o => {
        dispatch(set_con_load("con9", o));
    }
    let [con, setCon] = useState({AqlType: "", aqlLevel: ""});
    let {AqlType, aqlLevel} = con;
    let setConValue = o => {
        Object.keys(o).length > 0 ? setCon({...con, ...o}) : setCon({AqlType: "", aqlLevel: ""});
    }
    useEffect(() => {
        getAllAqlName().then(e => {
            console.log(e);
            setLoadValue({AqlTypeArr: e.Data});
            message.success("getAllAqlName success!");
        }, e => {
            message.error("getAllAqlName error!");
        });
        showTables();
    }, []);
    useEffect(() => {
        AqlType != "" && getAqlLevel({AQLTYPE: AqlType}).then(e => {
            console.log(e);
            setLoadValue({aqlLevelArr: e.Data});
            message.success("getAqlLevel success!");
        }, e => {
            message.error("getAqlLevel error!");
        });
    }, [AqlType]);

    let showTables = () => {
        getSkuAql({SkuId: ID}).then(e => {   //table1
            message.success("getSkuAql success!");
            setLoadValue({tableData1: e.Data});
        }, e => {
            message.error("getSkuAql error!");
        });
        getSkuAqlData({SkuId: ID}).then(e => {   //table2
            message.success("getSkuAqlData success!");
            setLoadValue({tableData2: e.Data});
        }, e => {
            message.error("getSkuAqlData error!");
        });
    }

    let clickAddAqlConfig = () => {
        addAqlConfig({SkuId: ID, ...con}).then(e => {
            message.success("addAqlConfig success!");
            showTables();
        }, e => {
            message.error("addAqlConfig error!");
        });
    }

    
    let table1Options = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        scroll: {x: 600}, 
        dataSource: tableData1,
        columns: [
            {
                title: '料号',
                dataIndex: 'SKUNO',
                fixed: 'left',
                width: 100
            },
            {
                title: 'OBA抽检类型',
                dataIndex: 'AQLTYPE'
            },
            {
                title: '默认等级',
                dataIndex: 'DEFAULLEVEL'
            },
            {
                title: '操作人',
                dataIndex: 'EDIT_EMP'
            },
            {
                title: '操作时间',
                dataIndex: 'EDIT_TIME',
                width: 160
            }
        ]
    }
    let table2Options = {
        pagination: {
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 150, 200],
            showQuickJumper: true,
            hideOnSinglePage: true
        },
        scroll: {x: 730}, 
        dataSource: tableData2,
        columns: [
            {
                title: 'OBA抽检类型',
                dataIndex: 'AQL_TYPE',
                fixed: 'left',
                width: 120
            },
            {
                title: '批次数量',
                dataIndex: 'LOT_QTY'
            },
            {
                title: '等级',
                dataIndex: 'GL_LEVEL'
            },
            {
                title: '抽检数量',
                dataIndex: 'SAMPLE_QTY'
            },
            {
                title: '拒收不良数量',
                dataIndex: 'REJECT_QTY',
                width: 120
            },
            {
                title: '操作人',
                dataIndex: 'EDIT_EMP'
            },
            {
                title: '操作时间',
                dataIndex: 'EDIT_TIME',
                width: 160
            }
        ]
    }
    return (<div className="wrap-con9">
        <div className="con-son">
            <span>OBA抽检类型: </span>
            <Select 
                placeholder="OBA抽检类型" value={AqlType} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setConValue({AqlType: v})}}
            >
                {
                    AqlTypeArr.map((v, i) => {
                        return <Option key={i} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div className="con-son">
            <span>默认等级: </span>
            <Select 
                placeholder="默认等级" value={aqlLevel} size="middle" style={{width: "100%", marginBottom: "10px" }}
                onChange={v => {setConValue({aqlLevel: v})}}
            >
                {
                    aqlLevelArr.map((v, i) => {
                        return <Option key={i} value={v}>{v}</Option>
                    })
                }
            </Select>
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={clickAddAqlConfig}>添加配置</Button>
        </div>

        <div style={{width: "100%", marginTop: "30px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>配置信息1：</span>
            <Table size="small" {...table1Options} />
        </div>

        <div style={{width: "100%", marginTop: "30px"}}>
            <span style={{lineHeight: "30px", fontWeight: "700"}}>配置信息2：</span>
            <Table size="small" {...table2Options} />
        </div>
    </div>)
}