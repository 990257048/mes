
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
let { TableOutlined, RedoOutlined, CloseOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EditOutlined, DownloadOutlined, StopOutlined } = icons;


let App = () => {
    return <div className="app">
        <Title />
        <Main />
    </div>
}

let Title = () => {
    let dispatch = useDispatch();
    let currentBoard = useSelector(state => state.appReducer.currentBoard);
    let reload = useCallback(() => {
        location.reload();
    }, []);

    return <div className="title">
        <div className="tit-left">
            <Space>
                <Button type={currentBoard == "Today" ? "primary" : "default" } size="middle" icon={<TableOutlined />} onClick={ () => {
                    dispatch(set_current_board("Today"))
                }} >Today Board</Button>

                <Button type={currentBoard == "YesToday" ? "primary" : "default" } size="middle" icon={<TableOutlined />} onClick={() => {
                    dispatch(set_current_board("YesToday"))
                }} >YesTerday Board</Button>

                <Button type={currentBoard == "Quarter" ? "primary" : "default" } size="middle" icon={<TableOutlined />}  onClick={() => {
                    dispatch(set_current_board("Quarter"))
                }} >Quarter Board</Button>
                
                <Button type="primary" size="middle" icon={<RedoOutlined />} onClick={reload}>刷新</Button>
            </Space>
        </div>
    </div>
}


