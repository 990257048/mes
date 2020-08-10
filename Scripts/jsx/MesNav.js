class NavBar extends React.Component{
    constructor(...args){
        super(...args);
        
        this.state = {
            name:this.props.nav_d.name,
            act_flag:this.props.nav_d.act_flag
        }

        this.componentWillReceiveProps = ()=>{
            this.setState({
                name:this.props.nav_d.name,
                act_flag:this.props.nav_d.act_flag
            });
        }
    }

    static contextTypes = {
        _cbs:PropTypes.object       
    }

    render(){
        var click_fn = (ev,name)=>{ 
            //防止.close-bar-icon的事件冒泡
            if( $(ev.target).attr("class") != "close-bar-icon"){
                this.context._cbs.mes_nav(ev,name);
            }
        }
        if(this.state.name == '首页'){
            return <li className={this.state.act_flag ? "nav-act" : null} onClick={(ev) => { click_fn(ev, this.state.name) }} >
                {this.state.name}
            </li>
        }else{
            return <li className={this.state.act_flag ? "nav-act" : null} onClick={(ev) => { click_fn(ev, this.state.name) }} >
                {this.state.name}
                <span className="close-bar-icon" onClick={(ev)=>{this.context._cbs.mes_nav_close(ev,this.state.name)}}></span>
            </li>
        }
        
    }
}
class MesNav extends React.Component{
    constructor(...args){
        super(...args);

        var nav_act_url = this.props._iframes.iframe_act_url;
        var nav_active;
        var nav_bar = [];
        this.props._iframes.iframes.forEach((navO, index) => {
            nav_bar.push(navO.name);
            if (nav_act_url == navO.url) {
                nav_active = navO.name;
            }
        });

        this.state = {
            nav_active:nav_active,
            nav_bar: nav_bar,  //['首页','机种配置','路由配置','工单WIP','机种WIP']
            nav_home_state:'close'   // closed || open
        }

        this.componentWillReceiveProps = ()=>{
            var nav_act_url = this.props._iframes.iframe_act_url;
            var nav_active;
            var nav_bar = [];
            this.props._iframes.iframes.forEach((navO,index)=>{
                nav_bar.push(navO.name);
                if(nav_act_url == navO.url){
                    nav_active = navO.name;
                }
            });
            this.setState({
                nav_active:nav_active,
                nav_bar:nav_bar
            });
        }

    }

    static contextTypes = {
        _cbs:PropTypes.object
    }

    nav_home_click_fn = ev =>{
        this.context._cbs.mes_nav_home_change(ev);
    }
    exit_fn = (ev)=>{
        location.reload();
    }

    render(){
        var NavBarItem = [];
        var bar = this.state.nav_bar;
        for(var i = 0; i < bar.length; i++){
            ((i)=>{
                NavBarItem.push(<NavBar key={Math.random()} nav_d={{name:bar[i],act_flag:this.state.nav_active == bar[i] ? true :false}}></NavBar>);
            })(i)
        }
        var nav_home_style = this.props.nav_home_state == 'none' ? 'nav-home nav-home-close fa fa-windows':'nav-home nav-home-open fa fa-windows'
        //console.log("nav-home-style",nav_home_style,this.props.nav_home_state);
        return <div className="mes-nav">
            <div className={nav_home_style} onClick={ this.nav_home_click_fn.bind(this) }></div>
            <div className="prev-nav">
                <div className="prev-img"></div>
            </div>
            <ul className="nav-ul">
                {NavBarItem}
            </ul>
            <div className="next-nav">
                <div className="next-img"></div>
            </div>
            <div className="close-nav"> 关闭操作 </div>
            <div className="mes-exit" onClick={this.exit_fn.bind(this)}> 退出 </div>
        </div>
    }
}