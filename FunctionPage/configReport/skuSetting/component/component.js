
//================================================================================================================================
//根组件

let App = () => {
    return <div className="app">
        <Con />
    </div>
} 

//================================================================================================================================
//报表主体

let Con = () => {
    //----------------------------------------------------------------------------------------------------------------------------
    var {w, h, columns, data, rowSelection, pagination } = useSelector(state => state.configReportReducer.table); 
    var dispatch = useDispatch();
    let conMain = useRef();
    //----------------------------------------------------------------------------------------------------------------------------
    let set_table_h = () => {
        var h = Number(getComputedStyle(conMain.current).height.replace("px","")) - 83;
        dispatch(set_h(h));
    }
    //----------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {   //componentDidMount
        getSkuList().then(e => {
            dispatch(set_table_data(e.Data.map((row, i) => ({...row, NO: i + 1, key: i}))));
        }, e => {
            message.error("getSkuList error!");
        });
        set_table_h();
        window.onresize = () => {
            set_table_h();
        }
        return () => {
            window.onresize = null;
        }
    }, []);
    //----------------------------------------------------------------------------------------------------------------------------
    return <div className="con">
        <ConTit />
        <div className="con-main" ref={conMain}>
            <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} size="small" scroll={{x: w, y: h}}/>
            <AddDrawer />
            <EditDrawer />
            <CopyModal />
            <DeleteModal />
        </div>
    </div>
}

//================================================================================================================================
//报表头

let ConTit = () => {
    var {buttons: {globalOperate}, searchValue} = useSelector(state => state.configReportReducer);

    var dispatch = useDispatch();
    let bindAction = (cb, ...args) => {
        bindActionCreators(cb, dispatch)(...args);
    };
    return <div className="con-tit">
      <div className="global-operate">
        {
            globalOperate.map((btn, i) => (
                <Button 
                    key={btn.name} 
                    type="primary" 
                    icon={<btn.icon />} 
                    disabled={btn.disabled} 
                    style={ i != btn.length - 1 ? {marginRight: 10} : null } 
                    onClick={() => {bindAction(bindEvent.globalOperate[btn.name], btn.name)} }
                >
                    {btn.content}
                </Button>
            ))
        }
      </div>
      <div className="global-search">
        <Tooltip title="重置">
            <Button type="primary" icon={<RedoOutlined />} style={{marginRight: 10}} 
               onClick={() => {bindAction(bindEvent.globalOperate.reload)}} 
            />
        </Tooltip>
        
        <Search placeholder="请输入料号" enterButton={true} value={searchValue} onChange={ e => {dispatch(set_search_value(e.target.value))}}
            onSearch={(value, inputEv) => {bindAction(bindEvent.globalOperate.search, value, inputEv)}} 
        />
      </div>
    </div>
}

//================================================================================================================================
//弹出层组件

let AddDrawer = () => {
    var {visible, currentStep} = useSelector(state => state.layerReducer.filter(({name}) => (name == "addDrawer"))[0]);
    var dispatch = useDispatch();
    return <Drawer key="addData" title="addData" closable={false} getContainer={false}  width={800} placement="left" 
        visible={visible}
        headerStyle={{padding: "15px"}}
        bodyStyle={{padding: "15px 15px 15px 25px"}}
        footerStyle={{padding: "10px"}}
        style={{position: "absolute"}}
        onClose={() => { dispatch(set_visible("addDrawer", false)) }}
        footer={
            <div style={{textAlign: "right"}}>
                <Button size="middle"  style={{marginRight: 8}} onClick={() => { dispatch(set_visible("addDrawer", false)) }}>
                    Cancel
                </Button>
                <Button size="middle"  type="primary" onClick={() => { dispatch(set_visible("addDrawer", false)) }}>
                    Submit
                </Button>
            </div>
        }
    >
    {/* ===================== content start ==================================== */}
        <div className="drawer-content" > 
            <div className="drawer-content-left" > 
                <Steps 
                    size="small" initial={0} current={currentStep} direction="vertical" style={{marginBottom: '10px'}} 
                    onChange={num => { dispatch(set_current_step("addDrawer", num)) }} 
                > 
                    <Step title="机种信息" />
                    <Step title="绑定路由" />
                    <Step title="抛账点" />
                    <Step title="包装配置" />
                    <Step title="Quack上传" />
                    <Step title="2DX配置" />
                    <Step title="73&800配置" />
                    <Step title="Label配置" />
                    <Step title="Aql配置" />
                </Steps>
            </div>                  
            <div className="drawer-content-right" >
                <WrapCon currentStep={currentStep} />
            </div>
        </div>
    {/* ======================= content end ===================================== */}
    </Drawer>
}

let EditDrawer = () => {
    var {visible, currentStep} = useSelector(state => state.layerReducer.filter(({name}) => (name == "editDrawer"))[0]);
    var dispatch = useDispatch();
    return <Drawer key="editDrawer" title="editDrawer" closable={false} getContainer={false}  width={800} placement="right" 
        visible={visible}
        headerStyle={{padding: "15px"}}
        bodyStyle={{padding: "15px 15px 15px 25px"}}
        footerStyle={{padding: "10px"}}
        style={{position: "absolute"}}
        onClose={() => { dispatch(set_visible("editDrawer", false)) }}
        footer={
            <div style={{textAlign: "right"}}>
                <Button size="middle"  style={{marginRight: 8}} onClick={() => { dispatch(set_visible("editDrawer", false)) }}>
                    Cancel
                </Button>
                <Button size="middle"  type="primary" onClick={() => { dispatch(set_visible("editDrawer", false)) }}>
                    Submit
                </Button>
            </div>
        }
    >
    {/* ===================== content start ==================================== */}
        <div className="drawer-content" > 
            <div className="drawer-content-left" > 
                <Steps 
                    initial={0} 
                    current={currentStep} 
                    direction="vertical" 
                    onChange={num => { dispatch(set_current_step("editDrawer", num)) }} 
                    size="small" 
                    style={{marginBottom: '10px'}} 
                > 
                    <Step title="机种信息" />
                    <Step title="绑定路由" />
                    <Step title="抛账点" />
                    <Step title="包装配置" />
                    <Step title="Quack上传" />
                    <Step title="2DX配置" />
                    <Step title="73&800配置" />
                    <Step title="Label配置" />
                    <Step title="Aql配置" />
                </Steps>
            </div>                  
            <div className="drawer-content-right" >
                <WrapCon currentStep={currentStep} />
            </div>
        </div>
    {/* ======================= content end ===================================== */}
    </Drawer>
}

let CopyModal = () => {
    let {visible} = useSelector(state => state.layerReducer.filter(({name}) => (name == "copyModal"))[0]);
    let {SKUNO} = useSelector(state => state.configReportReducer.selectData); 
    let [newSku, setNewSku] = useState("");

    var dispatch = useDispatch();
    let clickOK = () => {
        copySkunoConfig({OldSku: SKUNO, NewSku: newSku}).then(e => {
            message.success("copySkunoConfig success!");
            setNewSku("");
            dispatch(set_visible("copyModal", false));
            getSkuList().then(e => {
                dispatch(set_table_data(e.Data.map((row, i) => ({...row, NO: i + 1, key: i}))));
            }, e => {
                message.error("getSkuList error!");
            });
        }, e => {
            message.error("copySkunoConfig error!");
        });
    }
    let clickCancel = () => {
        dispatch(set_visible("copyModal", false));
    }
    return <Modal key="copyModal" title="copyModal" visible={visible} onOk={ clickOK } onCancel={ clickCancel } >
        <span style={{lineHeight: '30px', fontWeight: 700}}>參照機種:</span>
        <Input size="middle" placeholder="參照機種" value={SKUNO} disabled />
        <span style={{lineHeight: '30px', fontWeight: 700}}>新機種:</span>
        <Input size="middle" placeholder="新機種" value={newSku} onChange={e => {setNewSku(e.target.value)}} />
        <p style={{lineHeight: '30px', fontWeight: 700}}>你確定要新增該新機種嗎？</p>
    </Modal>
}

let DeleteModal = () => {
    let {ID} = useSelector(state => state.configReportReducer.selectData); 
    let {visible} = useSelector(state => state.layerReducer.filter(({name}) => (name == "deleteModal"))[0]);
    let dispatch = useDispatch();
    let clickOK = () => {
        deleteSkunoConfig({SkuID: ID}).then(e => {
            message.success("deleteSkunoConfig success!");
            dispatch(set_visible("deleteModal", false));
            getSkuList().then(e => {
                dispatch(set_table_data(e.Data.map((row, i) => ({...row, NO: i + 1, key: i}))));
            }, e => {
                message.error(e.Message);
            });
        }, e => {
            message.error("deleteSkunoConfig error!");
        });
    }
    let clickCancel = () => {
        dispatch(set_visible("deleteModal", false));
    }
    return <Modal key="deleteAction" title="deleteAction" visible={visible} onOk={ clickOK } onCancel={ clickCancel } >
        <p>你確定要刪除這條數據嗎？</p>
    </Modal>
}

//============================================================================================//
//Drawer Content

let WrapCon = ({currentStep}) => {
    var C;
    switch (currentStep){
        case 0:
            C = <WrapCon1 />;
            break;
        case 1:
            C = <WrapCon2 />;
            break;
        case 2:
            C = <WrapCon3 />;
            break;
        case 3:
            C = <WrapCon4 />;
            break;
        case 4:
            C = <WrapCon5 />;
            break;
        case 5:
            C = <WrapCon6 />;
            break;
        case 6:
            C = <WrapCon7 />;
            break;
        case 7:
            C = <WrapCon8 />;
            break;
        case 8:
            C = <WrapCon9 />;
            break;
        default:
            C = <div></div>;
            break;
    }
    return C;
}

