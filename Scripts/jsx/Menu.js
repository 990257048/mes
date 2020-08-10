
class Li extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            type:this.props['data'].type,     //模块类型
            contain:this.props['data'].contain,   //内容
            imgsrc:this.props['data'].imgsrc,   //图标地址
            bgcolor:this.props['data'].bgcolor,  //背景色
            link:this.props['data'].link,      //链接
            id:this.props['data'].id,         //id
            menu_cb:this.props['menu_cb']     //回调
        }
        this.componentWillReceiveProps = ()=>{
            this.setState({
                type:this.props['data'].type,     //模块类型
                contain:this.props['data'].contain,   //内容
                imgsrc:this.props['data'].imgsrc,   //图标地址
                bgcolor:this.props['data'].bgcolor,  //背景色
                link:this.props['data'].link,     //链接
                id:this.props['data'].id,
                menu_cb:this.props['menu_cb']     //回调
            });
        }
    }

    static contextTypes = {
        _cbs:PropTypes.object       
    }

    render(){
        var style = {
            background:this.state.bgcolor
        }
        var style2 = {
            background:"url("+ this.state.imgsrc +")",
            backgroundSize: '100% 100%'
        }
        var click_fn = (ev,state)=>{
            if(state.link == '#'){  //父级模块
                state.menu_cb(ev,state);    //路径：#   this.state.menu_cb(ev,this.state)
            }else{
                this.context._cbs.mes_menu_module(ev,state.contain,state.link);   //链接到新的页面 （路径：！#）
            }
            

        }
        return <span style={style} onClick={(ev)=>{ click_fn(ev,this.state) }} className="module">
            <span style={style2} className="module-img"></span>
            <span className="module-span">{this.state.contain}</span>
        </span> 
    }
}

class Item extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            w:this.props.w,   //菜单总宽
            moduleData:this.props['data'],
            menu_cb:this.props['menu_cb']
        }
        this.componentWillReceiveProps = ()=>{
            this.setState({
                w:this.props.w,
                moduleData:this.props['data'],
                menu_cb:this.props['menu_cb']
            })
        }
    }
    
    // componentWillMount 渲染前 初始化
    // componentWillReceiveProps 参数更新后 更新子组件
    
    setWidth(w,minW,maxNum){
        var col_max = Math.floor(w/minW);
        var col_module_num = col_max >= 1 && col_max <= maxNum ? col_max : col_max > maxNum ? maxNum : 1;
        return "calc(100%/" + col_module_num +")";
    }
    
    render(){
        var style = {
            color:'#000',
            width: this.setWidth(this.state.w,220,5),
            height:'170px',
            padding:'26px 38px',
            float:'left'
        };
        return <li style={style} >
            <Li data={this.state.moduleData} menu_cb={this.state.menu_cb}></Li>
        </li>
    }
} 

class MenuMap extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            // mapArr:[
            // 	{
            // 		name:'主菜单',
            // 		id:'0'
            // 	}...
            // ]
            mapArr:this.props.menu_data
        }
        this.componentWillReceiveProps = ()=>{
            this.setState({
                mapArr:this.props.menu_data
            });
        }
    }
    render(){
        //console.log("last",this.state.mapArr);
        var mapItem = [];
        var maps = this.state.mapArr;
        var len = maps.length;
        for(var i = 0; i < len; i++){
            if(i != len - 1){
                ((i)=>{
                    mapItem.push(<span key={Math.random()} className='menu-map-contain' onClick={(ev)=>{this.props.menu_map_cb(ev,i,maps[i].id)}}>{maps[i].name}</span>);
                    mapItem.push(<span key={Math.random()}> > </span>);
                })(i);
            }else{
                mapItem.push(<span key={Math.random()} className='menu-map-contain'>{maps[i].name}</span>);
            }
            
        }
        return (
            <div className='menu-map'>{mapItem}</div>
        )
    }
}

class MenuTop extends React.Component{   //返回上一层的按钮， 当前菜单位置
    constructor(...args){
        super(...args);
        this.state = {
            mapArr:this.props.menu_map_d,
            menu_map_cb:this.props.menu_map_cb
        }
        this.componentWillReceiveProps = ()=>{
            //console.log("top-test3",this.props.menu_map_d,this.state.mapArr);//*********
            this.setState({
                mapArr:this.props.menu_map_d,
                menu_map_cb:this.props.menu_map_cb
            });
            //console.log("top-test4",this.state);
        }
    }
    render(){
        return <div className='menu-top'>
            <div className='menu-top-contain'>
                <div className='back' onClick={this.props.menu_cb} >
                    <div className='back-contain'></div>
                </div>
                <MenuMap menu_data={this.state.mapArr} menu_map_cb={this.state.menu_map_cb}></MenuMap>
            </div>
        </div>
    }
}



class Menu extends React.Component{     //一页菜单
    constructor(...args){
        super(...args);
        this.state = {
            w:0,
            menuData:[],    //页面显示内容
            linkData:{     //用于链接的数据
                current_id:'0',    //当前页面id
                prev_id:null,      //上一级页面id
                all_id:[           //所有页面id，当前页面为最后一级页面，也是该数组的最后一项
                    {
                        name:'主菜单',
                        id:'0'
                    }
                ]
            },
            MenuSideData:{
                display:'block',    //是否显示侧边栏
                data:[              //数据长度代表级数，一项就是一级
                    [
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'#',  //link值为‘#’时代表有子模块
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'#',
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
                    ],[
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'#',  //link值为‘#’时代表有子模块
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'#',
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
                        }
                    ],[
                        {
                            contain:'System Setting',
                            imgsrc:'../img/menu/system_config.png',
                            bgcolor:'#0181fc',
                            link:'#',  //link值为‘#’时代表有子模块
                        },
                        {
                            contain:'Product Setting',
                            imgsrc:'../img/menu/user_manage.png',
                            bgcolor:'#f69616',
                            link:'#',
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
                        }
                    ]
                ]             
            }
        };
        
        window.onresize = ()=>{
            this.calculatWidth();
        }
        this.componentWillMount = ()=>{ //第一次渲染前执行
            //var data = this.menuData.main;
            var data = [];

            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenu",{MENU_NAME:0},(e)=>{
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                });
            });

            p.then(d =>{
                console.log(d);
                d.forEach((menuO,index)=>{
                    //console.log(menuO,index);
                    data.push({
                        type:1,
                        contain:menuO.MENU_NAME,
                        imgsrc:'../img/menu/' + menuO.CLASS_NAME,
                        bgcolor:menuO.STYLE_NAME,
                        link:menuO.PAGE_PATH,
                        id:menuO.ID
                    });
                });
                this.setState({
                    w:Number($(document.body).css("width").replace("px","")) - 40,
                    menuData:data
                });
            },e=>{
                console.log('error',layer);
            });
            
        }
        var _this = this;
    }
    calculatWidth(){
        var w = Number($(this.refs['menu-wrap']).css("width").replace("px",""));
        this.setState({
            w:w
        });
        
    }
    
    map_call = (ev,index,id)=>{
        //index: 当前点击的是第几个
        //id: 当前点击的菜单id
        //var menuData = id == '#' ? this.menuData.product : id == '0' ? this.menuData.main : this.menuData[id];
        
        var menuData = []; 

        var all_id = this.state.linkData.all_id;
        var d_len = all_id.length - index - 1;
        for(var i = 0; i < d_len; i++){
            all_id.pop();
        } 
        var prev_id =  all_id.length > 1 ? all_id[all_id.length - 2].id : null;
        var linkData = {
            current_id:id,
            prev_id:prev_id,
            all_id:all_id
        }

        var p = new Promise((resolve,reject)=>{
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenu",{MENU_NAME:id},(e)=>{
                if(e.Status == 'Pass'){
                    resolve(e.Data);
                }else{
                    reject(e);
                }
            });
        });
        p.then(d =>{
            d.forEach((menuO,index)=>{
                //console.log(menuO,index);
                menuData.push({
                    type:1,
                    contain:menuO.MENU_NAME,
                    imgsrc:'../img/menu/' + menuO.CLASS_NAME,
                    bgcolor:menuO.STYLE_NAME,
                    link:menuO.PAGE_PATH,
                    id:menuO.ID
                });
            });
            
            this.setState({
                menuData:menuData,
                linkData:linkData
            });

        },e=>{
            console.log('error',layer);
        });

    }

    module_call = (ev,moduleMsg)=>{   //点击模块执行
        console.log("click module run!");
        var current_id = moduleMsg.id;    //当前点击的模块的id
        //var menuData = current_id == '#' ? this.menuData.product : current_id == '0' ? this.menuData.main : this.menuData[current_id]; 				
        
        var menuData = []; 

        var p = new Promise((resolve,reject)=>{
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenu",{MENU_NAME:current_id},(e)=>{
                if(e.Status == 'Pass'){
                    resolve(e.Data);
                }else{
                    reject(e);
                }
            });
        });

        p.then(d =>{
            d.forEach((menuO,index)=>{
                //console.log(menuO,index);
                menuData.push({
                    type:1,
                    contain:menuO.MENU_NAME,
                    imgsrc:'../img/menu/' + menuO.CLASS_NAME,
                    bgcolor:menuO.STYLE_NAME,
                    link:menuO.PAGE_PATH,
                    id:menuO.ID
                });
            });
            var prev_id = this.state.linkData.current_id;
            var all_id = this.state.linkData.all_id;
            all_id.push({
                name:moduleMsg.contain,
                id:current_id
            });
            this.setState({
                menuData:menuData,
                linkData:{
                    current_id:current_id,
                    prev_id:prev_id,
                    all_id:all_id
                }
            });
        },e=>{
            console.log('error',layer);
        });
        
        
    }
    
    back_call = (ev)=>{   //点击返回按钮执行
        console.log("back run!");
        var all_id = this.state.linkData.all_id;
        var len = all_id.length;
        if(len >= 2){   
            var current_id = all_id[len - 2].id;
            var prev_id = len == 2 ? null : all_id[len - 3].id;
            all_id.pop();
            //var menuData = current_id == '0' ? this.menuData.main : current_id == '#' ? this.menuData.product : this.menuData[current_id];
            var menuData = [];
            var p = new Promise((resolve,reject)=>{
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig","GetSubMenu",{MENU_NAME:current_id},(e)=>{
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                });
            });
            p.then(d =>{
                d.forEach((menuO,index)=>{
                    //console.log(menuO,index);
                    menuData.push({
                        type:1,
                        contain:menuO.MENU_NAME,
                        imgsrc:'../img/menu/' + menuO.CLASS_NAME,
                        bgcolor:menuO.STYLE_NAME,
                        link:menuO.PAGE_PATH,
                        id:menuO.ID
                    });
                });
                this.setState({
                    menuData:menuData,
                    linkData:{
                        current_id:current_id,
                        prev_id:prev_id,
                        all_id:all_id
                    }
                });
            },e=>{
                console.log('error',layer);
            });
            
        }
    }
    
    render(){
        console.log("render run!");
        var d = this.state.menuData; 
        var itemArr = [];
        for(var i = 0; i < d.length; i++){
            ((i)=>{
                itemArr.push(<Item key={Math.random()} w={this.state.w} data={d[i]} menu_cb={this.module_call}></Item>);
            })(i);
        }
        return <div className='mes-menu' style={{display:this.props.display}} >
            <MenuTop menu_cb={this.back_call} menu_map_d={this.state.linkData.all_id} menu_map_cb={this.map_call}></MenuTop>
            <ul ref='menu-wrap' className='mul'>
                {itemArr}
            </ul>
        </div>
    }
}




