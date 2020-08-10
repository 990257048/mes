
let Main = () => {
    return <div className="main">
        <TableWrap />
    </div>
}

let TableWrap = () => {
    let dispatch = useDispatch();
    // rootState
    let tableData = useSelector(state => state.appReducer.tableData);
    // useRef
    let tableWrapEle = useRef();
    // localState
    let [h, setH] = useState(200);    // 表表高度
    // selector
    let tableConfig = useMemo(() => {    // 计算衍生数据
        return ret_table_config(dispatch, h, tableData);
    }, [h, tableData]);
    // 回调函数
    let resize = useCallback(() => {    //浏览器可视区发生变化时的回调
        let tableHeight = tableWrapEle.current.clientHeight - 90;
        setH(tableHeight);
    }, []);
    // 生命周期 componentWillMount componentDidMount
    useMemo(() => {
        //初始化表数据
        dispatch($init_table_data());
    }, []);
    useEffect(() => {
        resize();
        window.onresize = resize;
        return () => {
            window.onresize = null;
        }
    }, []);
    return <div className="table-wrap" ref={tableWrapEle}>
        <Table {...tableConfig} />
    </div>
}