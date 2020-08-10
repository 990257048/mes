

let Inputs = () => {
    let {currentInputs, Pass, Fail} = useSelector(state => state.InputsReducer);
    let iptData = currentInputs == "Pass" ? Pass : Fail;
    return <div className="inputs">
        <div className="inputs-title">
            <ImportOutlined />{' '} <span>工站输入</span>
        </div>
        <div className="inputs-main">
            <ScanType />
            {
                iptData.map(iptO => <Ipt key={iptO.ID} {...iptO} />)
            }
            {/* Button */}
            {/* <div key={"fvergr"} className="input-row-wrap" >
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {"运行"}
                </div>
                <div className="input-control" style={{textAlign: "center"}}>
                    <Button type="primary" size="middle">运行</Button>
                </div>
            </div> */}
        </div>
    </div>
}


let ScanType = () => {
    let {currentInputs, Fail} = useSelector(state => state.InputsReducer);
    let dispatch = useDispatch();
    return <div className="input-row-wrap" style={{display: Fail.length > 0 ? "block" : "none"}}>
        <div className="input-label-1">
            当前扫描类型:
        </div>
        <div className="input-control" style={{padding: "5px 10px", textAlign: "center"}}>
            <Radio.Group size="large" value={currentInputs} onChange={e => {dispatch(set_current_inputs(e.target.value))}}>
                <Radio value="Pass"><b>PASS</b></Radio>
                <Radio value="Fail"><b>FAIL</b></Radio>
            </Radio.Group>
        </div>
    </div>
}

let Ipt = (props) => {
    let {ID, DisplayType, DisplayName, Value, DataForUse, ScanFlag, Visable, Enable, Focus} = props;
    
    // {
    //     ID: "001",              //控件标识
    //     DisplayName: "name1",   //控件前面的名字
    //     DisplayType: "TXT",     //控件类型 TXT Select Checkbox（目前是开关） Radio PwdTXT    没用的：Autocomplete LocalChecker FileUpload 
    //     Value: "test value",    //值
    //     DataForUse: [],         //可选项 
    //     ScanFlag: false,        //是否需要扫描枪输入
    //     Visable: true,          //控件是否显示
    //     Enable: true,           //控件是否可操作   
    //     Focus: true             //控件是否處於活動狀態   
    // }
    
    let iptEle = useRef();
    useEffect(() => {
        Focus && iptEle.current.focus();
    }, []);

    switch(DisplayType){
        case "TXT":
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control">
                    <Input ref={iptEle} size="middle" defaultValue={Value} disabled={!Enable} />
                </div>
            </div>
        case "Select":
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control">
                    <Select ref={iptEle} size="middle" defaultValue={Value} disabled={!Enable} style={{width: "100%"}}>
                        {
                            DataForUse.map(text => <Option key={text} value={text}>{text}</Option>)
                        }
                    </Select>
                </div>
            </div>
        case "PwdTXT":
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control">
                    <Input.Password ref={iptEle} size="middle" defaultValue={Value} disabled={!Enable} />
                </div>
            </div>    
        case "Radio":
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control"  style={{border: "1px solid #ddd", padding: "5px 10px", textAlign: "center"}}>
                    <Radio.Group ref={iptEle} defaultValue={Value} disabled={!Enable}>
                        {
                            DataForUse.map(text => <Radio key={text} value={text}>{text}</Radio>)
                        }
                    </Radio.Group>
                </div>
            </div>  
        case "Checkbox":
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control" style={{border: "1px solid #ddd", padding: "5px 10px", textAlign: "left"}}>
                    <Switch ref={iptEle} size="small" checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={Value == "on" ? true : false} disabled={!Enable} onChange={(e) => {console.log(e)}} />
                </div>
            </div>  
        case "Button":
                {/* Button */}
            return <div key={ID} className="input-row-wrap" style={{display: Visable ? "block" : "none"}}>
                <div className="input-label">
                    <SendOutlined /> {' '}
                    {DisplayName}
                </div>
                <div className="input-control" style={{textAlign: "center"}}>
                    <Button ref={iptEle} size="middle" type="primary" disabled={!Enable}>{DisplayName}</Button> 
                    {/* Value */}
                </div>
            </div>
        default:
            return <p></p>
    }
    
}
