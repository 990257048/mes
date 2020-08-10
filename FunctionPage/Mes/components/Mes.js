class Mes extends React.Component {
    constructor(...args){
        super(...args);
        $.subscribe("add_iframe",(ev, o) => {    //添加选项卡的接口
            console.log("subscribe!", o);
            var {name, url} = o;
            this.open_iframe(name, url);
        });
    }
    open_iframe = (name, url) => {        //点击侧边栏菜单模块，非父级模块，打开模块
        var {mesIframe, changeIframe, addIframe} = this.props;
        //单击模块（会链接到新的页面）
        //创建新的iframe,新增选项卡，改变当前活动的选项卡
        var existFlag = false;   //是否包含该选项卡未打开
        mesIframe.iframes.forEach(navO => {
            if(navO.url == url){
                existFlag = true;
            }
        });
        if(existFlag){   //存在该选项卡
            changeIframe(url);
        }else{   //不存在该选项卡
            addIframe(name, url);
        }    
    };
    render (){
        return <div id="app">
            <MesTop />
            <MesNav />
            <MesIframeWrap />
            {/* <MenuSideWrap /> */}
        </div>
    }
}
Mes = connect(state => {
    return {
        mesIframe: state.MesIframesReducer
    };
}, dispatch => {
    return {
        changeIframe: url => {
            dispatch(change_iframe(url));
        },
        addIframe: (name, url) => {
            dispatch(add_iframe(name, url));
        }
    };
})(Mes);

//===============================================================================================================================

class MesNav extends React.Component {
    change_menu_side_state = ev => {    //侧边栏显示与隐藏(点击windows执行)
        var {MenuSideData, changeMenusideDisplay, firstOpenMenuside, closeMenuside} = this.props;
        if(MenuSideData.data.length > 0 || MenuSideData.display == 'block'){  
            changeMenusideDisplay();
        }else{   //第一次打开侧边栏时获取主菜单信息
            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenuById", {menu_id:0},e => {
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                })
            });
            p.then(d => {
                var newD = [];
                d.length > 0 && d.forEach(menuO=>{
                    var {ID, CONTAIN, IMGSRC, BGCOLOR, LINK} = menuO;
                    newD.push({
                        id:ID,
                        contain:CONTAIN,
                        imgsrc:'../img/menu/'+IMGSRC,
                        bgcolor:BGCOLOR,
                        link:LINK
                    });
                });
                firstOpenMenuside(newD);
            },e=>{
                throw new Error("获取侧边栏数据失败，请检查后台！");
            });
        }

        $(document).off('click');
        $(document).on('click',function(e){
            var t_node = $(".nav-home,.menu-side-wrap");
            if(t_node.find(e.target).length == 0 && e.target != $(".nav-home")[0] && e.target != $(".menu-side-wrap")[0]){  //点击侧边栏外部隐藏侧边栏
                $(document).off('click');
                closeMenuside();
            }
        });
    }

    exit_fn = () => {
        location.reload();
    }
    render(){
        var {display} = this.props.MenuSideData;
        var {iframe_act_url, iframes} = this.props.mesIframesData;
        var nav_home_class = display == 'none' ? 'nav-home nav-home-close fa fa-windows':'nav-home nav-home-open fa fa-windows';;
        return <div className="mes-nav">
            <div className={nav_home_class} onClick={this.change_menu_side_state.bind(this)}></div>
            <div className="prev-nav">
                <div className="prev-img"></div>
            </div>
            <ul className="nav-ul">
                {
                    iframes.map(({name, url}) => {
                        return <NavBar key={Math.random()} nav_d={{name: name, act_flag: iframe_act_url == url ? true : false}} />
                    })
                }
            </ul>
            <div className="next-nav">
                <div className="next-img"></div>
            </div>
            <div className="close-nav" set-lan="html:closeUp"> 关闭操作 </div>
            <div className="mes-exit" set-lan="html:exit" onClick={this.exit_fn.bind(this)}> 退出 </div>
        </div>
    }
} 
MesNav = connect(state => ({
    mesIframesData:state.MesIframesReducer,
    MenuSideData:state.MesMenuSideReducer
}), dispatch => {
    return {
        changeMenusideDisplay: () => {
            dispatch(change_menuside_display());
        },
        firstOpenMenuside: menuSideD => {
            dispatch(first_open_menuside(menuSideD));
        },
        closeMenuside: () => {
            dispatch(close_menuside());
        }
    };
})(MesNav);

class NavBar extends React.Component {
    nav_close = (ev, name)=>{       //关闭当前选项卡
        var {MesIframes, closeActIframe, closeNoactIframe} = this.props;
        var c_flag = false;  //点击的选项卡是否是当前活动的 
        MesIframes.iframes.forEach(navO=>{
            if(navO.name == name && navO.url == MesIframes.iframe_act_url){
                c_flag = true;
            } 
        });
        if(c_flag){
            closeActIframe(name);
        }else{
            closeNoactIframe(name);
        }
    }

    click_fn = (ev, name)=>{ 
        //防止.close-bar-icon的事件冒泡
        var {changeActIframe} = this.props;
        if( $(ev.target).attr("class") != "close-bar-icon"){
            changeActIframe(name);
        }
    }

    render(){
        var {name, act_flag} = this.props.nav_d;
        if(name == '首页'){
            return <li className={act_flag ? "nav-act" : null} onClick={(ev) => { this.click_fn.call(this, ev, name) }} >
                {name}
            </li>
        }else{
            return <li className={act_flag ? "nav-act" : null} onClick={(ev) => { this.click_fn.call(this, ev, name) }} >
                {name}
                <span className="close-bar-icon" onClick={ev => {this.nav_close.call(this, ev, name)}}></span>
            </li>
        }     
    }
}
NavBar = connect(state => {
    return {
        MesIframes: state.MesIframesReducer
    };
}, dispatch => {
    return {
        changeActIframe: name => {
            dispatch(change_act_iframe(name));
        },
        closeActIframe: name => {
            dispatch(close_act_iframe(name));
        },
        closeNoactIframe: name => {
            dispatch(close_noact_iframe(name));
        }
    };
})(NavBar);

//===============================================================================================================================
class MesIframeWrap extends React.Component {
    render (){
        var {iframes} = this.props;
        return <div className="mes-iframe">
            {
                iframes.map(iframe => {
                    return <MesIframe key={iframe.url} url={iframe.url} />
                })
            }
        </div>
    }
}
MesIframeWrap = connect(state => {
    return {
        iframes: state.MesIframesReducer.iframes
    }
})(MesIframeWrap);


class MesIframe extends React.Component {
    render (){
        var {iframe_act_url, url} = this.props;
        var display = iframe_act_url == url ? "block" : "none";
        if(url == "menu"){
            return <Menu display={display} />
        }else{
            return <iframe src={url} style={{display:display}}></iframe>
        }
    }
}
MesIframe = connect(state => {
    return {
        iframe_act_url: state.MesIframesReducer.iframe_act_url
    }
})(MesIframe);
//===============================================================================================================================

class MenuSideWrap extends React.Component {
    render (){
        var {display, data} = this.props.menu_side_d;
        return <div className='menu-side-wrap' style={ {display:display} }>
            <MenuSide d={data[0]} />
            {
                data.map((subMenuO, i) => {
                    if(i != 0){
                        return <MenuSideSub key={'menu-side'+i} grade={i} d={subMenuO} />
                    }
                })
            }
        </div>
    }
}
MenuSideWrap = connect(state => {
    return {
        menu_side_d: state.MesMenuSideReducer
    }
})(MenuSideWrap);

class MenuSide extends React.Component {
    throttle = (fn, delay)=>{
        var timer;
        return ev => {
            var v = ev.target.value;
            var e = ev.nativeEvent;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn(e,v);
            },delay)
        }
    }
    render (){
        var {d, menuSideSearch} = this.props;
        var MenuSideItems = (d && d.length) ? d.map((menuO, i) => {
            return <MenuSideItem key={'grade1' + menuO.contain + i} d={menuO} grade={0} />
        }) : [];
        return <div className='menu-side'>
            <div className='menu-side-top'></div>
            <div className='menu-side-main'>
                <div className='menu-side-main-contain'>
                    {MenuSideItems}
                </div>
            </div>
            <div className='menu-side-bottom'>
                <div className='menu-side-search'>
                    <span className='menu-side-search-icon fa fa-search'></span>
                    <input type='text' name='menu-side-search' onInput={ this.throttle(menuSideSearch, 600).bind(this) } />
                </div>
            </div>
        </div>
    }
}
MenuSide = connect(state => ({}), dispatch => {
    return {
        menuSideSearch: (ev, value) => {
            dispatch(menu_side_search(ev, value));
        }
    }
})(MenuSide);

class MenuSideSub extends React.Component {
    render (){
        var {d, grade} = this.props;
        return <div className='menu-side-sub'>
            <div className='menu-side-sub-contain'>
                {
                    d.map((menuO, i) => {
                        return <MenuSideItem key={'grade-sub' + grade + menuO.contain + i} d={menuO} grade={grade} />
                    })
                }
            </div>
        </div>
    }
}

class MenuSideItem extends React.Component {
    menu_side_item_click = ev => {
        var {id, contain, link} = this.props.d;
        var {grade, addMenuside, openIframe, closeMenuside} = this.props;
        if(link == "#"){
            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenuById", {menu_id: id}, e => {
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                });
            });
            p.then(d=>{
                var newD = [];
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
                addMenuside(contain, newD, grade);  //添加菜单侧边栏   ADD_MENUSIDE  CLOSE_MENUSIDE
            }, e => {
                throw new Error("获取数据失败！");
            })
        }else{   //打开该模块
            openIframe(contain, link);
            closeMenuside();
        }
    }

    render (){
        var {contain, imgsrc, bgcolor, link} = this.props.d;
        var {grade, menuRoute} = this.props;
        var iconStyle1 = {
            background:bgcolor
        }
        var iconStyle2 = {
            background:'url('+ imgsrc +') 0% 0% / 100% 100%'
        }
        //console.log("menu side item render!",this.context.menuRoute,grade,contain);
        var containStyle = menuRoute[grade] == contain ? {background:'#000'} : null;
        var openStyle = {
            display: link == '#' ? 'block' : 'none'
        }
        return <div className='menu-side-item-wrap' onClick={this.menu_side_item_click.bind(this)}>
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
MenuSideItem = connect(state => {
    return {
        menuRoute: state.MesMenuSideReducer.menuRoute
    };
}, dispatch => {
    return {
        addMenuside: (contain, newD, grade) => {
            dispatch(add_menuside(contain, newD, grade));
        },
        openIframe: (name, url) => {
            dispatch(open_iframe(name, url));
        },
        closeMenuside: () => {
            dispatch(close_menuside());
        }
    };
})(MenuSideItem);