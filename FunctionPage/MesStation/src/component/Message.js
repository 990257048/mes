
let Messages = () => {
    let visible = useSelector(state => state.StationLayerReducer.outputTable.visible);
    let outputHeight = useSelector(state => state.StationDomSizeReducer.outputHeight);
    let dispatch = useDispatch();
    let messageEle = useRef();
    useEffect(() => {
        dispatch(set_message_h(messageEle.current.clientHeight));
        window.onresize = () => {
            dispatch(set_message_h(messageEle.current.clientHeight));
        }
        return () => {
            window.onresize = null;
        }
    }, [outputHeight]);
    const style = {marginRight: "10px"};
    return <div className="messages" ref={messageEle} style={{height: "calc(100% - "+ outputHeight +"px)"}}>
        <div className="message-title">
            <CommentOutlined />
            {' '}
            <span>回传信息</span>
            <span style={{position: "relative", top: "-0.8px", padding: "0px 10px"}}>
                <Switch size="large" checkedChildren="Table开启" unCheckedChildren="Table关闭" defaultChecked={visible ? true : false} 
                onChange={flag => {dispatch(toggle_table_visible())}} />
            </span>


            <Tooltip title="全部"  placement="bottomRight">
                <Button type="primary" shape="circle" size="small" icon={<CommentOutlined />} style={style}></Button>
            </Tooltip>  
            <Tooltip title="成功"  placement="bottomRight">
                <Button type="default" shape="circle" size="small" icon={<CheckCircleOutlined />} style={style}></Button>
            </Tooltip>
            <Tooltip title="提示"  placement="bottomRight">
                <Button type="default" shape="circle" size="small" icon={<IssuesCloseOutlined />} style={style}></Button>
            </Tooltip>
            <Tooltip title="警告"  placement="bottomRight">
                <Button type="default" shape="circle" size="small" icon={<WarningOutlined />} style={style}></Button>
            </Tooltip>
            <Tooltip title="错误"  placement="bottomRight">
                <Button type="default" danger shape="circle" size="small" icon={<CloseCircleOutlined />} style={style}></Button>
            </Tooltip>


            {/* <Button type="primary" size="small" icon={<CommentOutlined />} style={style}>全部</Button>
            <Button type="default" size="small" icon={<CheckCircleOutlined />} style={style}>成功</Button>
            <Button type="default" size="small" icon={<CloseCircleOutlined />} style={style}>失败</Button> */}
            <Popconfirm 
                title="你確定要刪除全部回传信息？"
                placement="topRight"
                // onConfirm={}
                // onCancel={}
                okText="是"
                cancelText="否"
            >
                <Button type="primary" danger size="small" icon={<DeleteOutlined />} >清空全部</Button>
            </Popconfirm>
        </div>
        {/* <div className="message-action">
            <Button type="primary" size="small" icon={<CommentOutlined />} style={style}>全部</Button>
            <Button type="default" size="small" icon={<CheckCircleOutlined />} style={style}>成功</Button>
            <Button type="default" size="small" icon={<CloseCircleOutlined />} style={style}>失败</Button>
            <Popconfirm 
                title="你確定要刪除全部回传信息？"
                placement="topRight"
                // onConfirm={}
                // onCancel={}
                okText="是"
                cancelText="否"
            >
                <Button type="primary" danger size="small" icon={<DeleteOutlined />} >清空全部</Button>
            </Popconfirm>
            
        </div> */}
        <MessageMain />
    </div>
}


let MessageMain = () => {

    let messageHeight = useSelector(state => state.StationDomSizeReducer.messageHeight);
    let {current, data} = useSelector(state => state.StationMessagesReducer);

    

    let tableConfig = useMemo(() => {
        return {
            size: "small",
            pagination: {
                defaultPageSize: 50,
                pageSizeOptions: [50, 100, 150, 200],
                showQuickJumper: true,
                hideOnSinglePage: true
            },
            dataSource: data,
            scroll: {
                x: 3000, 
                y: messageHeight - 105   //100
            },
            rowClassName: row => {
                switch(row.type){
                    case "success":
                        return "row-success";
                    case "error":
                        return "row-error";
                    default:
                        return "row-default"
                }
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
                    width: 160,
                    fixed: 'right'
                },
                {
                    title: '操作',
                    dataIndex: '',
                    width: 50,//88,
                    fixed: 'right',
                    render: (row, allRow, no) => {
                        
                        return <div>
                            <Popconfirm 
                                title="你確定要刪除該条回传信息？"
                                placement="topRight"
                                // onConfirm={}
                                // onCancel={}
                                okText="是"
                                cancelText="否"
                            >
                                <Tooltip title="刪除"  placement="topRight">
                                    <Button type="primary" shape="circle" size="small" danger={true} icon={<DeleteOutlined />} />  
                                </Tooltip>   
                            </Popconfirm>
                        </div>
                    }
                }
            ]
        
        }
    }, [data, messageHeight])    //[table, messageHeight]

    return <div className="message-main" >
        <OutputTable />
        <Table {...tableConfig} />
    </div>
}