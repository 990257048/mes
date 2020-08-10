let {connect} = ReactRedux;

class MES_Table extends React.Component {
    componentWillMount = () => {
        let {init} = this.props;
        init();
    }
    render(){
        return <div className="mes-table">
            <TableTop />
            <TableMain />
            <TableBot />

            <GlobalShadow />
            <Lay />
        </div>
    }
}
MES_Table = connect(sttate => ({}), dispatch => ({
    init: () => {   //初始化表格组件
        dispatch(init());
    }
}))(MES_Table);

class TableTop extends React.Component {
    render (){
        let {topOperate, input_search, change_input_search, search} = this.props;
        return <div className="table-top">
            <div className="operate-box">
                {
                    topOperate.map(({name, c, icon, act}) => (<OperateButton key={name} name={name} c={c} icon={icon} act={act} />))
                }
            </div>
            <div className="search-box">
                <input type="text" name="search" value={input_search} onChange={e => {change_input_search(e.target.value)}} />
                <span className="fa fa-search" onClick={search}></span>
            </div>
        </div>
    }
}
TableTop = connect(state => ({
    topOperate: state.TableReducer.operate.topOperate,
    input_search: state.TableReducer.baseConfig.input_search
}), dispatch => ({
    change_input_search: value => {
        dispatch(change_input_search(value));
    },
    search: () => {
        dispatch(search());
    }
}))(TableTop);


class OperateButton extends React.Component {
    render (){
        let {name, c, icon, act, topOperateButtonClick} = this.props;
        return <div className="operate-button">
            <button className={c + " " + icon} act={act ? "y" : "n"}  onClick={() => { !act && topOperateButtonClick(name)}}>{" " + name}</button>
        </div>
    }
}
OperateButton = connect(() => ({}), dispatch =>({
    topOperateButtonClick: name => {
        dispatch(topOperateButtonClick(name));
    }
}))(OperateButton);

class TableBot extends React.Component {
    render (){
        return <div className="table-bot">
            <div className="bot-content">
                <Tip />
                <Paginate />
            </div>
            
        </div>
    }
}

class Tip extends React.Component {
    render (){
        return <div className="tip">
            {this.props.tip}
        </div>
    }
}
Tip = connect(state => ({
    tip: state.TableReducer.baseConfig.tip
}))(Tip);

class Paginate extends React.Component {   //分页
    render (){
        let {paginate: {page_total, page_act, input_page}} = this.props.baseConfig;
        let {change_input_page} = this.props;
        return <div className="paginate">
            {
                ["<", page_act, ">"].map(s => (<PageNum key={"page" + s} d={s} />))
            }
            <span>  跳转页：</span>
            <input name="skip" value={input_page} onChange={e => {change_input_page(e.target.value)}} /> 
            <PageNum d="GO" />
            <span>{"共计" + page_total + "页"}</span>
        </div>
    }
}
Paginate = connect(state => ({
    baseConfig: state.TableReducer.baseConfig
}), dispatch => ({
    change_input_page: value => {
        dispatch(change_input_page(value));
    }
}))(Paginate);

class PageNum extends React.Component {   //分页
    render (){
        var {skip} = this.props;
        return <div className="page-num" onClick={() => {skip(this.props.d)}}>
            {this.props.d}
        </div>
    }
}
PageNum = connect(() => ({}), dispatch => ({
    skip: content => {
        dispatch(skip(content));
    }
}))(PageNum);


class TableMain extends React.Component {

    constructor(...args){
        super(...args);
        this.componentDidMount = () => {
            this.props.setFixTit();
        }
        let throttle = (fn, wait) => {    //节流
            var timer;
            return (..._args) => {
                clearTimeout(timer);
                var _this = this;
                timer = setTimeout(() => {
                    fn.apply(_this, _args);
                }, wait);
            }
        }
        window.onresize = throttle(() => {
            console.log("resize");
            this.props.setFixTit();
        }, 100);
    }


    render (){
        let {
            main:{
                table, field: {
                    components: {
                        left, right
                    } 
                }
            }
        } = this.props.tableState;
        // return <div className="table-main"  ref={this.tableEvent.bind(this)}>
        return <div className="table-main" ref="tableMain" > 
            {
                left.length > 0 ? <TableLeft /> : null
            }
            <TableCenter />
            {
                right.length > 0 ? <TableRight right={right} len={table.length} /> : null
            }
        </div>
    }
}
TableMain = connect(state => ({
    tableState: state.TableReducer
}), () => ({
    setFixTit
}))(TableMain);

class TableLeft extends React.Component {
    componentDidUpdate (){
        console.log("left componentDidUpdate");
        this.props.setFixTit();
    }
    render (){
        let {table, field:{
            fieldList, components:{
                left, fixedColNum
            }}
        } = this.props.main;
        let {rows, page_act} = this.props.paginate;
        let d = table.map((row, index) => {
            var temp = {};
            left.forEach(v => {
                if(v === "no"){
                    temp[v] = index + 1 + rows * (page_act - 1);
                }else{
                    temp[v] = v;
                }
            })
            for(var i = 0; i < fixedColNum; i++){
                var prop = Object.keys(fieldList)[i]; 
                var field = fieldList[prop];
                var v = row[prop];
                temp[field] = v;
            }
            return temp;
        })
        return <div className="table-left">
            <Table d={d} />
        </div>
    }
}
TableLeft = connect(state => ({
    main: state.TableReducer.main,
    paginate: state.TableReducer.baseConfig.paginate
}), () => ({
    setFixTit
}))(TableLeft)
class TableCenter extends React.Component {
    componentDidUpdate (){
        console.log("center componentDidUpdate");
        this.props.setFixTit();
    }
    render (){
        let {table, field:{
            fieldList, components:{
                fixedColNum
            }}
        } = this.props.main;
        let d = table.map(row => {
            var temp = {};
            Object.keys(fieldList).filter((key, i) => {
                return i >= fixedColNum;
            }).forEach(key => {
                var prop = fieldList[key];
                temp[prop] = row[key];
            });
            // for(var i = 0; i < fixedColNum; i++){
            //     var prop = Object.keys(fieldList)[i];
            //     delete row[prop];
            // }
            //return row;
            return temp;
        })
        return <div className="table-center" style={{flex: 1}}>
            <Table d={d} />
        </div>
    }
}
TableCenter = connect(state => ({
    main: state.TableReducer.main
}), () => ({
    setFixTit
}))(TableCenter); 

class TableRight extends React.Component {
    componentDidUpdate (){
        console.log("right componentDidUpdate");
        this.props.setFixTit();
    }
    render (){
        let {right, len} = this.props;
        let d = [];
        for(var i = 0; i < len; i++){
            var temp = {};
            right.forEach(v => {
                temp[v] = v;
            });
            d.push(temp);
        }
        return <div className="table-right">
            <Table d={d} />
        </div>
    }
}
TableRight = connect(() => ({}), () => ({
    setFixTit
}))(TableRight);

//表格
class Table extends React.Component {
    render (){
        var {d, fieldList} = this.props;
        var Rows = d.map((row, index) => {
            return <Row key={"row" + (index + 1)} d={row} i={index + 1} />
        });
        d.length > 0 && Rows.unshift(<Row key="row0" d={d[0]} f={fieldList} i="0" />);
        return <table>
            <tbody>
                { Rows }
            </tbody>
        </table>
    }
}
Table = connect(state => ({
    fieldList: state.TableReducer.main.field.fieldList
}))(Table)
class Row extends React.Component {
    render (){
        var {d, f, i} = this.props;
        var Cells = [];
        if(i !== "0"){
            Cells = Object.keys(d).map(key => {
                return <Td key={key} d={d[key]} i={i}/>
            })
        }else{
            Cells = Object.keys(d).map(key => {
                return <Th key={key} d={f[key] ? f[key] : key} />
            })
        }
        return <tr>
            { Cells }
        </tr>
    }
}

class Th extends React.Component {
    render (){
        var {d} = this.props;
        return <th>{d}</th>
    }
}

class Td extends React.Component {
    render (){
        var {d, i, operate:{button}} = this.props;
        switch(d){
            case "select":
                return <td> <CheckBox /> </td>;
            case "operate":
                let Btns = button.map(btnO => {
                    return <Button key={btnO.name} d={btnO} i={i} /> 
                })
                return <td> {Btns} </td>;
            default:
                return <td> {d} </td>
        }
    }
}
Td = connect(state => ({
    operate: state.TableReducer.operate
}))(Td);


// Operate 操作组件
class CheckBox extends React.Component {
    render (){
        return <input type="checkbox" name="checkbox" />
    }
}

class Button extends React.Component {
    render (){
        let {name, c, icon} = this.props.d
        let {i, operateButtonClick} = this.props;
        return <button className={c + " " + icon} name="common-button" onClick={() => {operateButtonClick(name, i)}} >
            {" " + name}
        </button>
    }
}
Button = connect(() => ({}), dispatch => ({
    operateButtonClick: (name, i) => {
        dispatch(operateButtonClick(name, i));
    }
}))(Button);

//全局阴影
class GlobalShadow extends React.Component {
    render (){
        let {display} = this.props;
        return <div className="global-shadow" style={{display}}></div>
    }
}
GlobalShadow = connect(state => ({
    display: state.TableReducer.layer.display
}))(GlobalShadow);

//弹出层组件
class Lay extends React.Component {  //弹出层外框
    componentDidMount (){
        this.bindEvent();
    }
    bindEvent (){
        var {lay, layTit} = this.refs;
        let lay_style = getComputedStyle(lay);  //计算弹出层规格
        let tabMain_style = getComputedStyle($(".mes-table")[0]);  //计算表格规格
        let lay_wh = {
            w: Number(lay_style.width.replace("px", "")) , 
            h: Number(lay_style.height.replace("px", "")) , 
        };
        let tabMain = {
            w: Number(tabMain_style.width.replace("px", "")) , 
            h: Number(tabMain_style.height.replace("px", "")) , 
        };
        layTit.onmousedown = (mouseEv) => {
            let lay_coor = {x: lay.offsetLeft, y: lay.offsetTop};
            let mouse_coor = {x: mouseEv.clientX, y: mouseEv.clientY};
            document.body.onmousemove = e => {
                let temp_mouse_coor = {x: e.clientX, y: e.clientY};
                let new_lay_coor = {
                    x: lay_coor.x + temp_mouse_coor.x - mouse_coor.x,
                    y: lay_coor.y + temp_mouse_coor.y - mouse_coor.y
                };
                let {x, y} = new_lay_coor;
                let l = x < 0 ? 0 : ((x + lay_wh.w > tabMain.w) ? (tabMain.w - lay_wh.w) : x); 
                let t = y < 0 ? 0 : ((y + lay_wh.h > tabMain.h) ? (tabMain.h - lay_wh.h) : y);
                lay.style.left = l + "px";
                lay.style.top = t + "px";
            }
        }
        document.body.onmouseup = () => {
            document.body.onmousemove = null;
        }
    }
    render (){
        let {display, width, height, title, Component} = this.props.layer;
        let style = {
            display, 
            width: width + "px", 
            height: height + "px",
            position: "absolute",
            left: "calc(50% - "+ width / 2 +"px)",
            top: "calc(50% - "+ height / 2 +"px)"
        };
        return <div className="lay" ref="lay" style={style}>
            <div className="lay-tit">
                <div className="lay-tit-content fa fa-lightbulb-o" ref="layTit">{" " + title}</div>
                {/* <div className="lay-tit-close fa fa-close"></div> */}
            </div>
            <div className="lay-main">
                <Component />
            </div>
        </div>
    }
}
Lay = connect(state => ({
    layer: state.TableReducer.layer
}))(Lay);


class LayerTip extends React.Component {
    render (){
        let {content, operate: {button}} = this.props.layerTipState;
        
        return <div className="layer-tip">
            <div className="layer-msg">
                <p>{content}</p>
            </div>
            <div className="layer-btn-box">
                {
                    button.map((btnO, i) => <Button key={"btn" + i} d={btnO} />)
                }            
            </div>
        </div> 
    }
}
LayerTip = connect(state => ({
    layerTipState: state.LayerTipReducer
}))(LayerTip);








