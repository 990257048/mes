
//-----------------------------------------------------------------------------------------------------//

class PageMsg extends React.Component{    //提示（当前页数，当前数据量，总数据量）
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='page-msg'>
            当前显示第1到第50条数据，共100条数据
        </div>
    }
}

class PageBox extends React.Component{  //ul-li
    constructor(...args){
        super(...args);
    }

    static contextTypes = {
        table_cb:PropTypes.object
    }

    click_fn = (ev)=>{
        var {name,children} = this.props;
        this.props.cb(ev,name,children);
        //this.context.table_cb.table_change_page(ev,children);
    }

    render(){
        //console.log(this.props);
        return <li className={this.props.act ? 'page-act' : 'page-usual'} onClick={(ev)=>{this.click_fn(ev)}}>{this.props.children}</li>
    }
}

class PageList extends React.Component{  //分页显示 ul
    constructor(...args){
        super(...args);
        this.state = {
            page_list:{
                lot_size: this.props.d.lot_size,    //一批可选择的的页数，默认最多5页可选
                page_sum: this.props.d.page_sum,  //总页数
                current_page: 1 //当前显示第几页
            }

        }

        this.componentWillReceiveProps = ()=>{
            console.log(this.state,this.props);
        }

        // this.componentWillUpdate = ()=>{
        //     console.log("参数，状态更新后，渲染前！",this.state,this.props);
        //     var current_page = this.state.current_page;
        //     this.context.table_cb.table_change_page(current_page);
        // }

        console.log("page-list",this.props.d);  //data_length pageSize


        this.page_control = {
            first_page:{
                name:'first_page',
                content:'<<',
                act_flag:false
            },
            prev_page:{
                name:'prev_page',
                content:'<',
                act_flag:false
            },
            next_page:{
                name:'next_page',
                content:'>',
                act_flag:false
            },
            last_page:{
                name:'last_page',
                content:'>>',
                act_flag:false
            }
        }
    }
    static contextTypes = {
        table:PropTypes.object,
        table_cb:PropTypes.object
    }

    _page_box_call = (ev,name,content)=>{
        //console.log(ev,name,content);

        if(name == 'page_num' && content != this.state.page_list.current_page){
            console.log(content);
            this.context.table_cb.table_change_page(content);
            this.setState(prevState=>{
                prevState.page_list.current_page = content;
                return prevState;
            });
        }
        if(name != 'page_num'){
            var change_page_num;
            var current_page = this.state.page_list.current_page;
            var page_sum = this.state.page_list.page_sum;
            switch(name){
                case 'first_page':
                    change_page_num = 1;
                    break;
                case 'prev_page':
                    change_page_num = current_page == 1 ? 1 : current_page - 1;
                    break;
                case 'next_page':
                    change_page_num = current_page == page_sum ? page_sum : current_page + 1;
                    break;
                case 'last_page':
                    change_page_num = page_sum;
                    break;   
            }

            console.log(change_page_num);
            this.context.table_cb.table_change_page(change_page_num);
            if(change_page_num != current_page){
                this.setState(prevState=>{
                    prevState.page_list.current_page = change_page_num;
                    return prevState;
                });
            }
        }
    }

    render(){
        

        // page_list:{
        //     lot_size: this.props.d.lot_size,    //一批可选择的的页数，默认最多5页可选
        //     page_sum: this.props.d.page_sum,  //总页数
        //     current_page: 1 //当前显示第几页
        // }

        //console.log(this.state.page_list);
        var {lot_size,page_sum,current_page} = this.state.page_list;


        var page_lot_d = ((current_page,lot_size,page_sum)=>{
            var a = current_page <= lot_size ? 1 : current_page % lot_size == 0 ? current_page - lot_size + 1 : current_page - (current_page % lot_size) + 1 ;//起始页码
            var ret = [];
            for(var i = 0; i < lot_size; i++){
                if(a + i <= page_sum){
                    ret.push(a+i);
                };
            }
            return ret;
        })(current_page,lot_size,page_sum);
        var page_class = ((current_page,page_sum,page_lot_d)=>{
            var c;  //类别：1类：前，中，后;   2类：中;   3类：中，后;   4类：前，中，  5类：空(1)
            if(page_lot_d.length == 1 && page_lot_d[0] == 1){
                c = 5;
            }else if(page_lot_d.length == page_sum){
                c = 2;
            }else if(page_lot_d[0] == 1 && current_page == 1){
                c = 3;
            }else if(page_lot_d.slice(-1) == page_sum && current_page == page_sum){
                c = 4;
            }else{
                c = 1;
            }
            return c;
        })(current_page,page_sum,page_lot_d);
        var c_d = ((page_class,page_lot_d,current_page,page_control)=>{
            var c = []
            if([1,4].Contain(page_class)){
                c.push(page_control.first_page,page_control.prev_page);    //插入前面的控件( << , < )
            }
            if([1,2,3,4,5].Contain(page_class)){   //插入中间的控件（页码）
                page_lot_d.forEach((v,i)=>{
                    c.push({
                        name:'page_num',
                        content:v,
                        act_flag:v == current_page ? true : false
                    });
                });
            }
            if([1,3].Contain(page_class)){
                c.push(page_control.next_page,page_control.last_page);  //插入后面的控件（ > , >>）
            }
            //console.log(c,page_class,page_lot_d,current_page);
            return c;
        })(page_class,page_lot_d,current_page,this.page_control);
        

        var PageBoxItem = [];

        //console.log(page_lot_d,page_class,c_d);

        c_d.forEach((page_box,index)=>{
            PageBoxItem.push(<PageBox key={page_box.content} name={page_box.name} act={page_box.act_flag} cb={this._page_box_call} >{page_box.content}</PageBox>);
        });

        // var c_d1 = [
        //     {
        //         name:'first_page',
        //         content:'<<',
        //         act_flag:false
        //     },
        //     {
        //         name:'prev_page',
        //         content:'<',
        //         act_flag:false
        //     },
        //     ...
        //     {
        //         name:'next_page',
        //         content:'>',
        //         act_flag:false
        //     },
        //     {
        //         name:'last_page',
        //         content:'>>',
        //         act_flag:false
        //     },
        // ];


        return <div className='page-list'>
            <ul>
                {PageBoxItem}
            </ul>
        </div>
    }
}

class ReportBot extends React.Component{   //table-bottom
    constructor(...args){
        super(...args);

    }
    render(){
        
        return <div className='report-bot'>
            <PageMsg></PageMsg>
            <PageList d={this.props.d}></PageList>
        </div>
    }
}


//----------------------------------------------------------------------------------------------------//

class TableCell extends React.Component{  //table-tbody-td
    constructor(...args){
        super(...args);
    }

    render(){
        return <td>
            {this.props.children}
        </td>
    }
}

class TableRow extends React.Component{   //table-tbody-tr
    constructor(...args){
        super(...args);
    }

    static contextTypes = {
        table_fields:PropTypes.array
    }

    render(){
        var TableCellItem = [];
        var tr_d = this.props.tr_d;
        var fields = this.context.table_fields;
        fields.forEach((td,index)=>{
            TableCellItem.push(<TableCell key={'td'+index}>{tr_d[td]}</TableCell>);
        });
        return <tr>
            {TableCellItem}
        </tr>
    }
}

class TableHeadCell extends React.Component{  //thead-thead-th
    constructor(...args){
        super(...args);
    }
    render(){
        return <th>{this.props.children}</th>
    }
}

class TableHead extends React.Component{  //table-thead-tr
    constructor(...args){
        super(...args);
    }
    render(){
        var HeadCellItem = [];
        this.props.th_d.forEach((th,index)=>{
            HeadCellItem.push(<TableHeadCell key={'th'+index}>{th}</TableHeadCell>);
        });
        return <tr>
            {HeadCellItem}
        </tr>
    }
}

//-----------------------------------------------------------------------------------------------------//

class ReportTable extends React.Component{  //table
    constructor(...args){
        super(...args);

        this.componentWillMount = ()=>{ //页面渲染后执行(第一次)
            console.log("页面渲染后执行(第一次)");
            this.renderFixed();
        }
        this.componentDidUpdate = ()=>{   //页面渲染后执行(除第一次)
            console.log("页面渲染后执行(除第一次)");
        }
    }

    renderFixed = ()=>{
        //var {fixTit,fixCol} = this.refs; 没用
        //加上延时器原因：该组件渲染后refs对象没有立即加载完成（异步加载的），因此不能立即访问到refs对象！
        setTimeout(()=>{  //主线程执行完成后再执行，就可以访问refs对象！
            var {reportTable,thead,tbody,fixTit,fixCol} = this.refs;
            //console.log($(thead).css("width"),$(tbody).css("height"));  // 31 27
            var $reportTable = $(reportTable);
            var $thead = $(thead);
            var $tbody = $(tbody);
            var $fixTit = $(fixTit);
            var $fixCol = $(fixCol);

            var fixTitAct = $("<div class='fix-tit-act'></div>");
            var fixColAct = $("<div class='fix-col-act'></div>");
            var fixColWidth = ($thead=>{
                var sum_w = 0;
                for(var i = 0; i < this.props.d.fixColNum; i++){
                    sum_w += Number( $thead.find("th").eq(i).css("width").replace("px","") );
                }
                return sum_w;
            })($thead);

            $fixCol.css('width',fixColWidth + 'px');

            fixTitAct.css({
                width: $thead.css("width")
            });
            fixColAct.css({
                height: $tbody.css("height")
            });

            //fix-tit填充tit-fix-v
            var titFixV = $("<div class='tit-fix-v'></div>");
            titFixV.css('width',fixColWidth +'px');

            //fix-tit-act填充 , tit-fix-v填充
            $thead.find('th').each((index,th)=>{
                var thW = $(th).css('width');
                var titActBlock = $("<div class='fix-tit-act-block' >"+ th.innerHTML +"</div>");
                titActBlock.css('width',thW);
                fixTitAct.append(titActBlock);
                if(index < this.props.d.fixColNum){  //tit-fix-v填充
                    var titFixVBlock = $("<div class='tit-fix-v-block'>"+ th.innerHTML +"</div>");
                    titFixVBlock.css('width',thW);
                    titFixV.append(titFixVBlock);
                }
            });    
            
            //fix-col-act填充
            $tbody.find('tr').each((index,tr)=>{
                var colActRow = $("<div class='fix-col-act-row'></div>");
                for(var i = 0; i < this.props.d.fixColNum; i++){
                    var td = $(tr).find('td');
                    var colActBlock = $("<div class='fix-col-act-block'>"+ td[i].innerHTML +"</div>");
                    colActBlock.css('width',td.eq(i).css('width'));
                    colActRow.append(colActBlock);
                }
                fixColAct.append(colActRow);
            });

            $fixTit.append(fixTitAct,titFixV);
            $fixCol.append(fixColAct);

            //滚动条事件
            reportTable.onscroll = ev=>{
                var l = reportTable.scrollLeft;
                var t = reportTable.scrollTop;
                fixTitAct.css('left', -l + 'px');
                fixColAct.css('top', -t + 'px');
            }

        },0);   
    }

    static contextTypes = {
        table:PropTypes.object
    }

    static childContextTypes = {
        table_fields:PropTypes.array
    }

    getChildContext(){
        return {
            table_fields:this.props.d.fields
        }
    }


    render(){
        var TableRowItem = [];
        this.props.d.data.forEach((trO,index)=>{
            ((tr_d,i)=>{
                TableRowItem.push(<TableRow key={'tr'+i} tr_d={tr_d}></TableRow>);
            })(trO,index);
        });
        return <div className='report-table' ref='reportTable'>
            <table>
                <thead ref='thead'>
                    <TableHead th_d={this.props.d.fields}></TableHead>
                </thead>
                <tbody ref='tbody'>
                    {TableRowItem}
                </tbody>
            </table>
            <div className='fix-tit' ref='fixTit'>
                {/* <div className='fix-tit-act'></div> */}
            </div>
            <div className='fix-col' ref='fixCol'>
                {/* <div className='fix-col-act'></div> */}
            </div>
        </div>
    }
}

//-----------------------------------------------------------------------------------------------------//

class Table extends React.Component{
    constructor(...args){
        super(...args);

        this.state = {
            data:this.props.d.data.slice(0,this.props.d.pageSize)
        }

        this.newTable = ((d,pageSize)=>{
            var newT = [];
            var l = d.length % pageSize == 0 ? d.length / pageSize : Math.ceil(d.length / pageSize);
            for(var i = 1; i <= l; i++){
                newT.push(d.slice((i-1) * pageSize , i * pageSize) );
            }
            console.log(newT);
            return newT;
        })(this.props.d.data,this.props.d.pageSize);

    }
    
    

    TablechangePageClick = (current_page)=>{   //点击换页执行
        console.log("changePage!",current_page);
        this.setState({
            data:this.newTable[current_page - 1]
        });
    }

    static childContextTypes = {
        table_cb:PropTypes.object
    }

    getChildContext (){
        return {
            table_cb:{
                table_change_page:this.TablechangePageClick
            }
        }
    }

    render(){
        var {pageSize,fixColNum,fields,data} = this.props.d;
        var len = data.length;

        var tabData = {
            pageSize:pageSize,
            fixColNum:fixColNum,
            fields:fields,
            data:this.state.data
        }
        var botData = {
            lot_size:5,    //一批可选择的的页数，默认最多5页可选
            pageSize:pageSize,    //一页显示的数据条数
            page_sum: len % pageSize != 0 ? Math.ceil(len / pageSize) : len / pageSize   //总页数
        }

        return <div className='table-w'>
            <ReportTable d={tabData}></ReportTable>
            <ReportBot d={botData}></ReportBot>     
        </div>
    }

}




