class UserMsg extends React.Component{
    constructor(...args){
        super(...args);
        
    }
    render (){
        var style = {
            background:this.props.hover ? '#648dff' : null
        }
        return <div style={style} className="user-msg" onClick={this.props.mes_top_user_msg_cb} >高超辉-管理员</div>
    }
}

class UserBlock extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            debug_checked:$.MES.DEBUG
        }
    }
    static contextTypes = {
        _cbs:PropTypes.object
    }
    click_fn = (ev,name,url)=>{
        this.context._cbs.mes_add_iframe(ev,name,url);
        this.props.mes_top_user_msg_cb(ev);
    }
    exit_fn = (ev)=>{
        location.reload();
    }
    debug_change = (ev)=>{
        
        $.MES.DEBUG = !$.MES.DEBUG;
        console.log("debug",$.MES.DEBUG);
        this.props.mes_top_user_msg_cb(ev);
        this.setState({
            debug_checked:$.MES.DEBUG
        });
    }
    render (){
        var style = {
            display:this.props.display
        }
        return <div className="user-block" style={style}>
            <ul className="user-wrap">
                <li onClick={ev=>{this.click_fn(ev,'个人资料','FunctionPage/User/UserView.html')}}>个人资料</li>
                <li onClick={ev=>{this.click_fn(ev,'修改密码','FunctionPage/User/PWDManage.html')}}>修改密码</li>
                <li onClick={ev=>{this.click_fn(ev,'联系我们','FunctionPage/contactsView.html')}}>联系我们</li>
                <li onClick={this.exit_fn.bind(this)}>安全退出</li>
                <li>DEBUG <input className='debug' name='debug' type='checkbox' checked={this.state.debug_checked} onChange={this.debug_change.bind(this)} /></li>
            </ul>
        </div>
    }
}

class MesSearch extends React.Component{
    constructor(...args){
        super(...args);
    }
    input_fn = (e,v)=>{
        console.log(v,client);
        var p = new Promise((resolve,reject)=>{
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetMenuLike",{menuStr:v},d=>{
                if(d.Status == 'Pass'){
                    resolve(d.Data);
                }else{
                    var menuList = [
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Reg API',
                            imgsrc:'../img/menu/test_api.png',
                            bgcolor:'#bd2aef',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Reg API',
                            imgsrc:'../img/menu/test_api.png',
                            bgcolor:'#bd2aef',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Reg API',
                            imgsrc:'../img/menu/test_api.png',
                            bgcolor:'#bd2aef',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Reg API',
                            imgsrc:'../img/menu/test_api.png',
                            bgcolor:'#bd2aef',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Reg API',
                            imgsrc:'../img/menu/test_api.png',
                            bgcolor:'#bd2aef',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'FunctionPage/TableSetting/test_config_report.html',
                        },
                        {
                            contain:'User Manager',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#fb4571',
                            link:'FunctionPage/TableSetting/QuackMiss.html',
                        }
                    ];

                    reject(menuList);
                }
            });
        });
        p.then(d=>{
            console.log("get menu模糊查询",d);
            var newD = [];
            d.forEach(menuO=>{
                var {CONTAIN,IMGSRC,BGCOLOR,LINK} = menuO;
                newD.push({
                    contain:CONTAIN,
                    imgsrc:'../img/menu/' + IMGSRC,
                    bgcolor:BGCOLOR,
                    link:LINK
                });
            });
            this.props.mes_top_search_show_cb(e,newD);
            this.props.mes_top_search_display_cb('block');
            $("#root").one("click",ev=>{
                this.props.mes_top_search_display_cb('none');
            });
        },menuList=>{
            //console.log(menuList);
            // this.props.mes_top_search_show_cb(e,menuList);
            // this.props.mes_top_search_display_cb('block');
            // $("#root").one("click",ev=>{
            //     this.props.mes_top_search_display_cb('none');
            // });
        })
    }


    throttle = (fn,delay)=>{
        var timer;
        return (e)=>{
            var v = e.target.value;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn(e,v);
            },delay);
        }
    }
    render(){
        return <div className="mes-search-wrap">
            <div className="search-img-wrap">
                <div className="search-img"></div>
            </div>
            <input className="mes-search" onInput={ this.throttle(this.input_fn,600) } placeholder="快速启动" />
        </div>
    }
}

class MesSearchItem extends React.Component{
    constructor(...args){
        super(...args);
    }

    static contextTypes = {
        _cbs:PropTypes.object
    }

    click_search_menu = (ev,name,url)=>{
        console.log("search menu click!!");
        //console.log(name,url,this.context._cbs);
        this.context._cbs.mes_add_iframe(ev,name,url);
        this.props.mes_top_search_display_cb('none');
    }

    render(){
        var {bgcolor,imgsrc,contain,link} = this.props.search_d;
        var menuImgStyle = {
            background:bgcolor  
        }
        var imgStyle = {
            background:"url("+ imgsrc +") 0% 0% / 100% 100%"
            //backgroundSize: "100% 100%"
        }
        return <div className="search-menu-item">
            <div className="search-menu">
                <div className="search-menu-img-wrap" style={menuImgStyle}>
                    <div className="search-menu-img" style={imgStyle}></div>
                </div>
                <div className="search-menu-contain" onClick={ ev=>{this.click_search_menu(ev,contain,link)} }>
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}

class MesSearchBlock extends React.Component{
    constructor(...args){
        super(...args);
    }
    render(){
        var menuList = this.props.menuList;
        //console.log('render',this.props.display);
        var mesSearchItems = [];
        menuList.forEach( (menuO,index)=>{
            mesSearchItems.push(<MesSearchItem key={index} search_d={menuO} mes_top_search_display_cb={this.props.mes_top_search_display_cb} >{menuO.contain}</MesSearchItem>);
        });

        return <div className="mes-search-block" style={{display:this.props.display}}>
            <div className="mes-search-block-contain">
                {mesSearchItems}
            </div>
        </div>
    }
}

class MesLogo extends React.Component{
    constructor(...args){
        super(...args);
    }
    render(){
        return <div className="mes-logo"></div>
    }
}

class MesTop extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            user_msg_hover:false,
            user_block_display:'none',
            searchBlock:{
                display:'none',
                menuList:[]
            }
        }
    }
    user_msg_cb = (ev)=>{
        this.setState(prevState=>{
            prevState = {
                user_msg_hover:!prevState.user_msg_hover,
                user_block_display:prevState.user_block_display == 'none' ? 'block' : 'none'
            }
            return prevState;
        });
    }

    setSearchDisplay = display=>{
        //console.log(display,'-----------------------------setSearchDisplay');
        this.setState(prevState=>{
            prevState.searchBlock.display = display;
            return prevState;
        });
    }

    search_show_cb = (ev,menuList)=>{
        //console.log(ev.target,menuList,"-------mes-top");
        this.setState(prevState=>{
            prevState.searchBlock.menuList = menuList;
            return prevState;
        });
    }



    render (){
        return <div className="mes-top">
            <MesLogo></MesLogo>
            <MesSearch mes_top_search_show_cb={this.search_show_cb} mes_top_search_display_cb={this.setSearchDisplay}></MesSearch>
            <MesSearchBlock menuList={this.state.searchBlock.menuList} mes_top_search_display_cb={this.setSearchDisplay} display={this.state.searchBlock.display}></MesSearchBlock>
            <UserMsg hover={this.state.user_msg_hover} mes_top_user_msg_cb={this.user_msg_cb} ></UserMsg>
            <UserBlock display={this.state.user_block_display} mes_top_user_msg_cb={this.user_msg_cb}></UserBlock>
        </div>
    }
}