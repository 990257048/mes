
let Outputs = () => {
    let optData = useSelector(state => state.OutputsReducer.TXT);
    let dispatch = useDispatch();
    let outputEle = useRef();
    useEffect(() => {
        dispatch(set_output_h(outputEle.current.clientHeight));
        window.onresize = () => {
            dispatch(set_output_h(outputEle.current.clientHeight));
        }
        return () => {
            window.onresize = null;
        }
    }, [optData]);
    return <div className="outputs" ref={outputEle}>
        <div className="outputs-title">
            <MenuUnfoldOutlined /> {' '}
            <span>工站输出</span>
            
        </div>
        <div className="outputs-main">
            <Row gutter={20}>
                {
                    // Name: "User",
                    // Value: "F1335257" 
                    optData.map(({Name, Value}) => {
                        return <Col key={Name} span={6}>
                            <div className="output-row-wrap">
                                <div className="output-label"> 
                                    <div className="output-label-son">
                                        {/* <CaretRightOutlined />{' '} */}
                                        {Name + ' :'} 
                                    </div>
                                </div>
                                <div className="output-control">{Value} </div>
                            </div>    
                        </Col>
                    })
                }
            </Row>
        </div>
    </div>
}


let OutputTable = () => {

    let visible = useSelector(state => state.StationLayerReducer.outputTable.visible);
    let {currentTableName, Tables} = useSelector(state => state.OutputsReducer);

    let tableData = useMemo(() => {
        let filterTable = Tables.filter(({Name}) => (Name == currentTableName));  //[{Name, data}] | []
        let tableData = [];
        if(filterTable.length > 0){
            tableData = Tables.filter(({Name}) => (Name == currentTableName))[0].data; 
        }
        return tableData
    }, [currentTableName, Tables]);

    const [wrapVisible, setWrapVisible] = useState(visible);
    const [drawerVisible, setDrawerVible] = useState(visible);

    const [h, setH] = useState(100);
    let tableWrapEle = useRef();

    useEffect(() => {
        if(visible){
            setWrapVisible(true);
            setTimeout(() => {
                setDrawerVible(true);
            }, 100);
        }else{
            setDrawerVible(false);
            setTimeout(() => {
                setWrapVisible(false);
            }, 200);
        }
    }, [visible]);

    useEffect(() => {
        wrapVisible && setH(tableWrapEle.current.clientHeight - 100);
    }, [wrapVisible]);

    let tableConfig = useMemo(() => {
        return {
            size: "small",
            pagination: {
                defaultPageSize: 50,
                pageSizeOptions: [50, 100, 150, 200],
                showQuickJumper: true,
                hideOnSinglePage: true
            },
            dataSource: tableData,
            scroll: {
                x: 1200, 
                y: h
            },
            columns: [
                {
                    title: '序號',
                    dataIndex: 'no',
                    width: 70,
                    fixed: 'left'
                },
                {
                    title: '信息類型',
                    dataIndex: 'type',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '回傳信息',
                    dataIndex: 'message'
                },
                {
                    title: '回傳時間',
                    dataIndex: 'dateTime',
                    width: 120,
                    fixed: 'right'
                }
            ]
        
        }
    }, [tableData, h]);

    return <div className="output-table" ref={tableWrapEle} style={{display: wrapVisible ? "block" : "none"}}>
        <Drawer key="table" title={<OutputTableTitle />} closable={false} getContainer={false}  width={'100%'} height={'100%'} placement="top" 
            visible={drawerVisible}
            headerStyle={{padding: "10px"}}
            bodyStyle={{padding: "10px 10px 10px 15px", overflow: "hidden"}}
            //footerStyle={{padding: "10px"}}
            style={{position: "absolute"}}
            onClose={() => {}}
            // footer={
            //     <div style={{textAlign: "right"}}>
            //         <Button size="middle"  style={{marginRight: 8}} onClick={() => { }}>
            //             Cancel
            //         </Button>
            //         <Button size="middle"  type="primary" onClick={() => { }}>
            //             Submit
            //         </Button>
            //     </div>
            // }
        >
            <Table {...tableConfig} />
        </Drawer>
    </div>
}

let OutputTableTitle = () => {
    let {currentTableName, Tables} = useSelector(state => state.OutputsReducer);
    let dispatch = useDispatch();
    let tableName = Tables.map(({Name}) => Name);  //["table1", "table2", ...] | []
    return <div className="output-table-title">
        <span style={{paddingRight: "10px"}}>OutputTable: </span>
        {
            tableName.length > 1 ? 
            tableName.map(name => <Button 
                key={name} type={name == currentTableName ? "primary" : "default"} size="small" icon={<TableOutlined />} 
                style={{marginRight: "10px"}} 
                onClick={() => {dispatch(change_current_table_name(name))}}
            >{name}</Button>) : 
            tableName.length == 1 ? <span>{tableName[0]}</span> : []
        }
    </div>
}

