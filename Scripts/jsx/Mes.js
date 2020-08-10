class MesIframe extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            url:this.props.iframe_d.url
        }
    }
    render(){
        if(this.state.url == "menu"){
            return <Menu display={this.props.iframe_d.display}></Menu>
        }else{
            return <iframe src={this.state.url} style={{display:this.props.iframe_d.display}}></iframe>
        }
        
    }
}

class MesIframeWrap extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            iframe_act_url:this.props._iframes.iframe_act_url,
            iframes:this.props._iframes.iframes
        }
        this.componentWillReceiveProps = ()=>{
            this.setState(this.props._iframes);
        }
    }
    
    render(){
        var iframes = this.state.iframes;
        var iframeItem = [];
        for(var i = 0; i < iframes.length; i++){
            ((i)=>{
                iframeItem.push(<MesIframe key={iframes[i].url} iframe_d={{url:iframes[i].url,display:this.state.iframe_act_url == iframes[i].url ? 'block' :'none'}} ></MesIframe>);
            })(i);
        }
        return <div className="mes-iframe">
            {iframeItem}
        </div>
    }
}




//***********************************侧边栏*************************************** */

class MenuSideItem extends React.Component{
    constructor(...args){
        super(...args);

    }


    static contextTypes = {
        _cbs:PropTypes.object,
        menuRoute:PropTypes.array     
    }
    
    
    click_fn = ev=>{
        console.log("MenuSideItem click !");
        var {id,contain,link} = this.props.d;
        var grade = this.props.grade;
        if(link == '#'){   //父级模块
            //根据id获取子级模块的内容
            //console.log(id,client.CallFunction);
            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenuById",{menu_id:id},e=>{
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                });
            });
            p.then(d=>{
                console.log("pass",d);
                var newD = [];
                //         id:'0',
                //         contain:'System Setting',
                //         imgsrc:'../img/menu/system_config.png',
                //         bgcolor:'#0181fc',
                //         link:'#',  //link值为‘#’时代表有子模块
                //     },
                d.length > 0 && d.forEach(menuO=>{
                    var {ID,CONTAIN,IMGSRC,BGCOLOR,LINK} = menuO;
                    newD.push({
                        id:ID,
                        contain:CONTAIN,
                        imgsrc:'../img/menu/'+IMGSRC,
                        bgcolor:BGCOLOR,
                        link:LINK
                    });
                });

                this.context._cbs.mes_add_menu_side(ev,contain,newD,grade);

            },e=>{
                console.log("fail",e);
                //test
                // var d = [
                //     {
                //         id:'0',
                //         contain:'System Setting',
                //         imgsrc:'../img/menu/system_config.png',
                //         bgcolor:'#0181fc',
                //         link:'#',  //link值为‘#’时代表有子模块
                //     }
                // ]
                // this.context._cbs.mes_add_menu_side(ev,contain,d,grade);
            })


        }else{   //非父级模块
            //直接打开该模块
            this.context._cbs.mes_add_iframe(ev,contain,link);   
            this.context._cbs.mes_nav_home_change(ev);    //关闭侧边栏
        }
    }

    render(){
        var {contain,imgsrc,bgcolor,link} = this.props.d;
        var grade = this.props.grade;
        var iconStyle1 = {
            background:bgcolor
        }
        var iconStyle2 = {
            background:'url('+ imgsrc +') 0% 0% / 100% 100%'
        }
        //console.log("menu side item render!",this.context.menuRoute,grade,contain);
        var containStyle = this.context.menuRoute[grade] == contain ? {background:'#000'} : null;
        var openStyle = {
            display: link == '#' ? 'block' : 'none'
        }
        return <div className='menu-side-item-wrap' onClick={this.click_fn.bind(this)} >
            <div className='menu-side-item'>
                <div className='menu-side-item-icon' style={ iconStyle1 }>
                    <div className='menu-side-item-icon-contain' style={ iconStyle2 }></div>
                </div>
                <div className='menu-side-item-contain' style={containStyle} >{contain}</div>
                <div className='menu-side-item-open' style={ openStyle }>
                    <div className='menu-side-item-open-icon'> > </div>
                </div>
            </div>
        </div> 
    }
}

class MenuSideSub extends React.Component{   //子侧边栏
    constructor(...args){
        super(...args);
    }
    render(){
        //console.log('menu-side-sub',this.props.d);
        var MenuSideItems = [];
        this.props.d.forEach((menuO,index)=>{
            MenuSideItems.push(<MenuSideItem key={'grade-sub' + this.props.grade + menuO.contain + index} d={menuO} grade={this.props.grade}></MenuSideItem>);
        });
        return <div className='menu-side-sub'>
            <div className='menu-side-sub-contain'>
                {MenuSideItems}
            </div>
        </div>
    }
}

class MenuSide extends React.Component{   //菜单第一侧边栏
    constructor(...args){
        super(...args);
    }

    static contextTypes = {
        _cbs:PropTypes.object
    }

    input_fn = (ev,v)=>{
        console.log(ev,v);
        var p = new Promise((resolve,reject)=>{
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetMenuByLikeMenuName",{menu_name:v},e=>{
                console.log(e);
                if(e.Status == 'Pass'){
                    resolve(e.Data);
                }else{
                    reject(e);
                }
            });
        });
        p.then(d=>{
            var newD = [];
            d.forEach(menuO=>{
                var {ID,CONTAIN,BGCOLOR,IMGSRC,LINK} = menuO;
                newD.push({
                    id:ID,
                    contain:CONTAIN,
                    bgcolor:BGCOLOR,
                    imgsrc:'../img/menu/' + IMGSRC,
                    link:LINK
                });
            });
            this.context._cbs.mes_reset_menu_side(newD);
        },e=>{
            console.log('fail');
        });
        
    }

    throttle = (fn,delay)=>{
        var timer;
        return ev=>{
            var v = ev.target.value;
            var e = ev.nativeEvent;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn(e,v);
            },delay)
        }
    }

    render(){
        //console.log("menuside",this.props.d);
        var MenuSideItems = [];
        this.props.d && this.props.d.length > 0 && this.props.d.forEach( (menuO,index)=>{
            MenuSideItems.push(<MenuSideItem key={'grade1' + menuO.contain + index} d={menuO} grade={0}></MenuSideItem>);
        });
        return <div className='menu-side'>
            {/* <div className='menu-side-top fa fa-home'> 主菜单</div> */}
            <div className='menu-side-top'></div>
            <div className='menu-side-main'>
                <div className='menu-side-main-contain'>
                    {MenuSideItems}
                </div>
            </div>
            <div className='menu-side-bottom'>
                <div className='menu-side-search'>
                    <span className='menu-side-search-icon fa fa-search'></span>
                    <input type='text' name='menu-side-search' onInput={ this.throttle(this.input_fn,600).bind(this) } />
                </div>
            </div>
        </div>
    }
}

class MenuSideWrap extends React.Component{   //菜单侧边栏容器
    constructor(...args){
        super(...args);
    }

    static childContextTypes = {
        menuRoute:PropTypes.array
    }

    getChildContext () {
        return {
            menuRoute:this.props.menu_side_d.menuRoute
        }
    }

    render(){
        var {display,data} = this.props.menu_side_d;
        var MenuSideSubItems = [];
        data.forEach((menuItem,index)=>{
            if(index != 0){
                MenuSideSubItems.push(<MenuSideSub key={'menu-side'+index} grade={index} d={menuItem}></MenuSideSub>);
            }
        });
        //console.log(data[0]);
        return <div className='menu-side-wrap' style={ {display:display} }>    {/*temp */}
            <MenuSide d={data[0]}></MenuSide>
            {MenuSideSubItems}
            {/* <MenuSideSub></MenuSideSub> */}
        </div>
    }
}

//***************************************************************************** */




class Mes extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            _iframes:{
                iframe_act_url:'menu',
                iframes:[  //控制导航栏，iframe
                    {
                        name:'首页',
                        url:'menu'
                    }
                    // {
                    //     name:'机种配置',
                    //     url:'FunctionPage/SKU/skunoControl.html'
                    // }
                ]
            },
            MenuSideData:{
                display:'none',    //是否显示侧边栏
                menuRoute:[],
                data:[              //数据长度代表级数，一项就是一级
                    // [
                    //     {
                    //         id:'0',
                    //         contain:'System Setting',
                    //         imgsrc:'../img/menu/system_config.png',
                    //         bgcolor:'#0181fc',
                    //         link:'#',  //link值为‘#’时代表有子模块
                    //     }...
                    // ],[
                    //     {
                    //         id:'0',
                    //         contain:'System Setting',
                    //         imgsrc:'../img/menu/system_config.png',
                    //         bgcolor:'#0181fc',
                    //         link:'#',  //link值为‘#’时代表有子模块
                    //     }...
                    // ],[
                    //     {
                    //         id:'0',
                    //         contain:'System Setting',
                    //         imgsrc:'../img/menu/system_config.png',
                    //         bgcolor:'#0181fc',
                    //         link:'#',  //link值为‘#’时代表有子模块
                    //     }...
                    // ],...
                ]             
            }
        }
        console.log("---------------------------------------------------------------------------------",$.subscribe);
        $.subscribe("add_iframe",(ev,o)=>{    //添加选项卡的接口
            //console.log("subscribe!",o);
            var {name,url} = o;
            this.add_iframe(ev,name,url);
        })
    }

    add_iframe = (ev,name,url)=>{
        this.menu_module_click_call(ev,name,url);
    }

    nav_change_call = (ev,name)=>{
        console.log("nav change run!",name);

        var current_url;
        this.state._iframes.iframes.forEach((navO,index)=>{
            if(navO.name == name){
                current_url = navO.url;
            }
        });

        if(current_url != this.state._iframes.iframe_act_url){   //改变状态后刷新状态，否则不刷新状态
            this.setState((prevState,prop)=>{
                prevState._iframes.iframe_act_url = current_url;
                return prevState;
            });
        }
    }

    nav_close_call = (ev,name)=>{
        console.log("close nav run!",name);
        var c_flag = false;  //点击的选项卡是否是当前活动的 
        this.state._iframes.iframes.forEach(navO=>{
            if(navO.name == name && navO.url == this.state._iframes.iframe_act_url){
                c_flag = true;
            } 
        });

        if(c_flag){
            this.setState(prevState=>{
                prevState._iframes.iframe_act_url = prevState._iframes.iframes.slice(-2)[0].url;
                prevState._iframes.iframes.pop();
                return prevState;
            });
        }else{
            this.setState(prevState=>{
                prevState._iframes.iframes.forEach((navO,index)=>{
                    if(navO.name == name){
                        prevState._iframes.iframes.splice(index,1);
                    }
                });
                return prevState;
            });
        }

    }

    change_menu_side_state = ev =>{    //侧边栏显示与隐藏(点击windows执行)
        console.log("change_menu_side_state run!");

        if(this.state.MenuSideData.data.length > 0 || this.state.MenuSideData.display == 'block'){   
            this.setState(prevState=>{
                prevState.MenuSideData.display =  prevState.MenuSideData.display == 'none' ? 'block' : 'none';
                return prevState;
            });
        }else{   //第一次打开侧边栏时获取主菜单信息
            console.log("change_menu_side_state");
            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenuById",{menu_id:0},e=>{
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                })
            });
            p.then(d=>{
                console.log(d);
                var newD = [];
                    //         id:'0',
                    //         contain:'System Setting',
                    //         imgsrc:'../img/menu/system_config.png',
                    //         bgcolor:'#0181fc',
                    //         link:'#',  //link值为‘#’时代表有子模块
                    //     },
                d.length > 0 && d.forEach(menuO=>{
                    var {ID,CONTAIN,IMGSRC,BGCOLOR,LINK} = menuO;
                    newD.push({
                        id:ID,
                        contain:CONTAIN,
                        imgsrc:'../img/menu/'+IMGSRC,
                        bgcolor:BGCOLOR,
                        link:LINK
                    });
                });
                this.setState(prevState=>{
                    prevState.MenuSideData.data.push(newD);
                    prevState.MenuSideData.display = 'block';
                    return prevState;
                });
            },e=>{
                console.log('fail',e);
            })
        }


        
        var _this = this;
        $(document).off('click');
        $(document).on('click',function(e){
            var t_node = $(".nav-home,.menu-side-wrap");
            if(t_node.find(e.target).length == 0 && e.target != $(".nav-home")[0] && e.target != $(".menu-side-wrap")[0]){
                //console.log("未比对成功！");
                $(document).off('click');
                _this.setState( prevState=>{
                    prevState.MenuSideData.display = 'none';
                    return prevState;
                } );
            } else{
                console.log("比对成功！");
            }
        });

    }

    add_menu_side = (ev,click_menu_name,menu_side_data,grade)=>{    //添加侧边栏
        console.log("add menu side!",grade,click_menu_name,menu_side_data);
        this.setState(prevState=>{
            prevState.MenuSideData.menuRoute.splice(grade);
            prevState.MenuSideData.menuRoute.push(click_menu_name);
            prevState.MenuSideData.data.splice(grade + 1);
            prevState.MenuSideData.data.push(menu_side_data);
            return prevState;
        });

        var _this = this;
        $(document).off('click');
        $(document).on('click',function(e){
            var t_node = $(".nav-home,.menu-side-wrap");
            if(t_node.find(e.target).length == 0 && e.target != $(".nav-home")[0] && e.target != $(".menu-side-wrap")[0]){
                //console.log("未比对成功！");
                $(document).off('click');
                _this.setState( prevState=>{
                    prevState.MenuSideData.display = 'none';
                    return prevState;
                } );
            } else{
                console.log("比对成功！");
            }
        });

    }

    reset_menu_side = (menu_side_data)=>{
        this.setState(prevState=>{
            prevState.MenuSideData.menuRoute = [];
            prevState.MenuSideData.data = [menu_side_data];
            return prevState;
        });
    }

    menu_module_click_call = (ev,name,url)=>{
        console.log("mes: module click run!",name,url);
        //单击模块（会链接到新的页面）
        //创建新的iframe,新增选项卡，改变当前活动的选项卡

        var existFlag = false;   //是否包含该选项卡未打开
        this.state._iframes.iframes.forEach((navO,index)=>{
            if(navO.url == url){
                existFlag = true;
            }
        });

        if(existFlag){   //存在该选项卡
            this.setState(prevState=>{
                prevState._iframes.iframe_act_url = url;
                return prevState;
            });
        }else{   //不存在该选项卡
            this.setState(prevState=>{
                prevState._iframes.iframe_act_url = url;
                prevState._iframes.iframes.push({
                    name:name,
                    url:url
                });
                return prevState;
            });
        }
    }


    static childContextTypes = {
        _cbs:PropTypes.object
    }
    getChildContext(){
        return {
            _cbs:{
                mes_nav:this.nav_change_call,
                mes_nav_close:this.nav_close_call,
                mes_menu_module:this.menu_module_click_call,
                mes_add_iframe:this.add_iframe,
                mes_nav_home_change:this.change_menu_side_state,
                mes_add_menu_side:this.add_menu_side,
                mes_reset_menu_side:this.reset_menu_side
            }
        }
    }
    render (){
        //<MesNav _iframes={this.state._iframes}></MesNav>
        return <div id="app">
            <MesTop></MesTop>
            <MesNav _iframes={this.state._iframes} nav_home_state={this.state.MenuSideData.display}></MesNav>
            <MesIframeWrap _iframes={this.state._iframes} ></MesIframeWrap>
            <MenuSideWrap menu_side_d={this.state.MenuSideData}></MenuSideWrap>
        </div>
    }
}

