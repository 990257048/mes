
class MesTop extends React.Component {
    render (){
        return <div className="mes-top">
            <MesLogo />
            <MesSearch />
            <MesSearchBlock />
            <UserMsg />
            <UserBlock />
        </div>
    }
}

class MesLogo extends React.Component {
    render (){
        return <div className="mes-logo"></div>
    }
}

class MesSearch extends React.Component {
    input_fn = (e,v)=>{
        var {setMenulist, closeSearchblock} = this.props;
        var p = new Promise((resolve,reject)=>{
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuLike",  {menuStr: v}, d => {
                if(d.Status == 'Pass'){
                    resolve(d.Data);
                }else{
                    reject(d);
                }
            });
        });
        p.then(d => {
            var newD = d.map(menuO => {
                var {CONTAIN, IMGSRC, BGCOLOR, LINK} = menuO;
                return {
                    contain:CONTAIN,
                    imgsrc:'../img/menu/' + IMGSRC,
                    bgcolor:BGCOLOR,
                    link:LINK
                };
            });
            setMenulist(newD);
            $("#root").one("click", ev => {
                closeSearchblock();
            });
        }, e => {
            throw new Error("獲取數據失敗，請檢查後臺！");
        });
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
    render (){
        return <div className="mes-search-wrap">
            <div className="search-img-wrap">
                <div className="search-img"></div>
            </div>
            <input className="mes-search" set-lan="attr:placeholder=fastFiring" onInput={ this.throttle(this.input_fn.bind(this), 600) } placeholder="快速启动" />
        </div>
    }
}
MesSearch = connect(state => ({}), dispatch => {
    return {
        setMenulist: menuList => {
            dispatch(set_menulist(menuList));
        },
        closeSearchblock: () => {
            dispatch(close_searchblock());
        }
    }
})(MesSearch);


class MesSearchBlock extends React.Component {
    render (){
        var {menuList, display} = this.props.MesTopData.searchBlock;
        return <div className="mes-search-block" style={{display: display}}>
            <div className="mes-search-block-contain">
                {
                    menuList.map((menuO, i) => {
                        return <MesSearchItem key={i} search_d={menuO} />
                    })
                }
            </div>
        </div>
    }
}
MesSearchBlock = connect(state => {
    return {
        MesTopData: state.MesTopReducer
    };
})(MesSearchBlock);

class MesSearchItem extends React.Component {
    click_search_menu = (ev, name, url)=>{
        var {closeSearchblock, openIframe} = this.props;
        openIframe(name, url);
        closeSearchblock();
    }
    render (){
        var {bgcolor, imgsrc, contain, link} = this.props.search_d;
        var imgStyle = {
            background:"url("+ imgsrc +") 0% 0% / 100% 100%"
        }
        return <div className="search-menu-item">
            <div className="search-menu">
                <div className="search-menu-img-wrap" style={{background: bgcolor}}>
                    <div className="search-menu-img" style={imgStyle}></div>
                </div>
                <div className="search-menu-contain" onClick={ ev => {this.click_search_menu(ev,contain,link)} }>
                    {contain}
                </div>
            </div>
        </div>
    }
}
MesSearchItem = connect(state => ({}), dispatch => {
    return {
        closeSearchblock: () => {
            dispatch(close_searchblock());
        },
        openIframe: (name, url) => {
            dispatch(open_iframe(name, url));
        } 
    };
})(MesSearchItem);

class UserMsg extends React.Component {
    render (){
        var {user_msg_hover} = this.props.MesTopData;
        var {changeUserboxState} = this.props;
        var {EMP_NAME, Department, EMP_LEVEL} = client.UserInfo;
        var style = {
            background: user_msg_hover ? '#648dff' : null
        }
        return <div style={style} className="user-msg" onClick={changeUserboxState} >
            {EMP_NAME + Department + "-" + (EMP_LEVEL == 9 ? "管理员" : "作业员")}
        </div>
    }
}
UserMsg = connect(state => {
    return {
        MesTopData: state.MesTopReducer
    };
}, dispatch => {
    return {
        changeUserboxState: () => {
            dispatch(change_userbox_state());
        }
    };
})(UserMsg);

class UserBlock extends React.Component {
    click_fn = (ev, name, url)=>{
        var {openIframe, changeUserboxState} = this.props;
        openIframe(name, url);
        changeUserboxState();
    }
    exit_fn = ev => {
        location.reload();
    }
    debug_change = ev => {
        var {changeUserboxState, changeDebug} = this.props;
        $.MES.DEBUG = !$.MES.DEBUG;
        changeUserboxState();
        changeDebug();
    }
    render (){
        var {user_block_display, debug_flag} = this.props.MesTopData;
        var style = {
            display:user_block_display
        }
        return <div className="user-block" style={style}>
            <ul className="user-wrap">
                <li set-lan="html:Personal" onClick={ev=>{this.click_fn(ev,'个人资料','FunctionPage/User/UserView.html')}}>个人资料</li>
                <li set-lan="html:ChangePWD" onClick={ev=>{this.click_fn(ev,'修改密码','FunctionPage/User/PWDManage.html')}}>修改密码</li>
                <li set-lan="html:Contact" onClick={ev=>{this.click_fn(ev,'联系我们','FunctionPage/contactsView.html')}}>联系我们</li>
                <li set-lan="html:SafetyExit" onClick={this.exit_fn.bind(this)}>安全退出</li>
                <li>DEBUG <input className='debug' name='debug' type='checkbox' checked={debug_flag} onChange={this.debug_change.bind(this)} /></li>
            </ul>
        </div>
    }
}
UserBlock = connect(state => {
    return {
        MesTopData: state.MesTopReducer
    };
}, dispatch => {
    return {
        changeUserboxState: () => {
            dispatch(change_userbox_state());
        },
        changeDebug: () => {
            dispatch(change_debug());
        },
        openIframe: (name, url) => {
            dispatch(open_iframe(name, url));
        }
    };
})(UserBlock);




