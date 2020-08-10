
let Main = () => {
    return <div className="main">
        <TableWrap />
    </div>
}

let TableWrap = () => {
    let dispatch = useDispatch();
    let tableWrapEle = useRef();
    // rootState
    let {currentBoard, tableHeight, todayTableData, yesTodayTableData, quarterTableData} = useSelector(state => state.appReducer);

    // filter  筛选
    let currentData = useMemo(() => {    // 当前要用到的tableData
        switch(currentBoard){
            case "Today":
                return todayTableData;
            case "YesToday":
                return yesTodayTableData;
            case "Quarter":
                return quarterTableData;
            default: 
                return [];
        }
    }, [currentBoard, todayTableData, yesTodayTableData, quarterTableData])    

    // 得到表格配置数据
    let tableConfig = useMemo(() => {
        let c = ret_table_config(tableHeight, currentData);
        return c;
    }, [currentData, tableHeight]);


    // console.log(tableConfig);

    // cb
    let resize = useCallback(() => {    //浏览器大小发生变化时的回调
        let h = tableWrapEle.current.clientHeight - 90;   //得到高度
        dispatch(set_table_height(h));    //设置高度
    }, [tableWrapEle]);

    // componentWillMount
    useMemo(() => {
        dispatch($init_table_data());    //初始化所有数据(三张表数据)
    }, []);

    // componentDidMount
    useEffect(() => {    // 监听可视口变化，调整表格高度
        resize();
        window.onresize = resize;
        return () => {
            window.onresize = null;
        }
    }, []);

    return <div className="table-wrap" ref={tableWrapEle} >
        <Table {...tableConfig} />
    </div>
}