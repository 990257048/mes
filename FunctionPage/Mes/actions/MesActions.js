//系統頭部
var SET_MENULIST = 'SET_MENULIST';
var set_menulist = menuList => ({
    type: SET_MENULIST,
    menuList
});
var CLOSE_SEARCHBLOCK = 'CLOSE_SEARCHBLOCK';
var close_searchblock = () => ({
    type:CLOSE_SEARCHBLOCK
});
var CHANGE_USERBOX_STATE = 'CHANGE_USERBOX_STATE';
var change_userbox_state = () => ({
    type:CHANGE_USERBOX_STATE
});
var CHANGE_DEBUG = 'CHANGE_DDEBUG';
var change_debug = () => ({
    type:CHANGE_DEBUG
});


//导航栏点击windows
var CHANGE_MENUSIDE_DISPLAY = 'CHANGE_MENUSIDE_DISPLAY';   //切换侧边栏显示状态
var change_menuside_display = () => ({
    type: CHANGE_MENUSIDE_DISPLAY
});
var FIRST_OPEN_MENUSIDE = 'FIRST_OPEN_MENUSIDE';   //第一次打开侧边栏
var first_open_menuside = menuSideD => ({
    type:FIRST_OPEN_MENUSIDE,
    menuSideD
});
//关闭选项卡
var CLOSE_ACT_IFRAME = 'CLOSE_ACT_IFRAME';   //关闭当前活动的选项卡
var close_act_iframe = name => ({
    type:CLOSE_ACT_IFRAME,
    name
});
var CLOSE_NOACT_IFRAME = 'CLOSE_NOACT_IFRAME';  //关闭非活动的选项卡
var close_noact_iframe = name => ({
    type:CLOSE_NOACT_IFRAME,
    name
});
//切换选项卡
var CHANGE_ACT_IFRAME = 'CHANGE_ACT_IFRAME';
var change_act_iframe = name => ({
    type:CHANGE_ACT_IFRAME,
    name
});




//菜单侧边栏搜索
var INIT_MENUSIDE = 'INIT_MENUSIDE';
var init_menuside = menuSideD => ({
    type:INIT_MENUSIDE,
    menuSideD
});
var menu_side_search = (ev, value) => dispatch => {
    var p = new Promise((resolve, reject)=>{
        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuByLikeMenuName", {menu_name:value}, e => {
            if(e.Status == 'Pass'){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });
    p.then(d => {
        var newD = d.map(({ID, CONTAIN, BGCOLOR, IMGSRC, LINK}) => {
            return {
                id:ID,
                contain:CONTAIN,
                bgcolor:BGCOLOR,
                imgsrc:'../img/menu/' + IMGSRC,
                link:LINK
            }
        });
        dispatch(init_menuside(newD));
    }, e => {
        throw new Error("获取侧边栏菜单失败，status标志为Fail！");
    });
}

//添加菜单侧边栏
var ADD_MENUSIDE = "ADD_MENUSIDE";
var CLOSE_MENUSIDE = "CLOSE_MENUSIDE";
var close_menuside = () => ({
    type:CLOSE_MENUSIDE
});

var add_menuside = (contain, newD, grade) => dispatch => {   //点击侧边栏菜单模块，父级模块
    $(document).off('click');
    $(document).on('click',function(e){
        var t_node = $(".nav-home,.menu-side-wrap");
        if(t_node.find(e.target).length == 0 && e.target != $(".nav-home")[0] && e.target != $(".menu-side-wrap")[0]){  //点击侧边栏外部，关闭侧边栏
            $(document).off('click');
            dispatch(close_menuside());
        }
    });
    dispatch({
        type: ADD_MENUSIDE,
        contain, 
        newD, 
        grade
    }); 
};

var CHANGE_IFRAME = "CHANGE_IFRAME";   //切换iframe（选项卡）
var ADD_IFRAME = "ADD_IFRAME";
var change_iframe = url => ({
    type:CHANGE_IFRAME,
    url
});
var add_iframe = (name, url) => ({
    type:ADD_IFRAME,
    name,
    url
});

var open_iframe = (name, url) => (dispatch, getState) => {     //跳轉頁面入口
    var mesIframe = getState().MesIframesReducer;
    //单击模块（会链接到新的页面）
    //创建新的iframe,新增选项卡，改变当前活动的选项卡
    var existFlag = false;   //是否包含该选项卡未打开
    mesIframe.iframes.forEach(navO => {
        if(navO.url == url){
            existFlag = true;
        }
    });
    if(existFlag){   //存在该选项卡
        dispatch(change_iframe(url));
    }else{   //不存在该选项卡
        dispatch(add_iframe(name, url));
    }    
}


//菜单
//宽度变化
var CHANGE_MENU_W = 'CHANGE_MENU_W';
var change_menu_w = w => ({
    type:CHANGE_MENU_W,
    w
});

//菜单初始化
var INIT_MENU = 'INIT_MENU';
var init_menu = (w, menuData) => ({
    type:INIT_MENU,
    w,
    menuData
});

var initMenuData = () => dispatch => {
    var p = new Promise((resolve, reject) => {
        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME: 0}, e => {   //获取第一页菜单数据
            if(e.Status == 'Pass'){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });
    p.then(d => {
        var menuData = d.map( menuO => {
            var {ID, MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH} = menuO;
            return {
                type: 1,
                contain: MENU_NAME,
                imgsrc: '../img/menu/' + CLASS_NAME,
                bgcolor: STYLE_NAME,
                link: PAGE_PATH,
                id: ID
            }
        });
        dispatch(init_menu(Number($(document.body).css("width").replace("px","")) - 40, menuData));
    }, e => {
        throw new Error("获取菜单数据失败，请检查后台！");
    });
}
//返回上一层菜单
var BACK_PREV_MENU = 'BACK_PREV_MENU';
var back_prev_menu = menuData => ({
    type:BACK_PREV_MENU,
    menuData
});
var back_menu = () => (dispatch, getState) => {
    var {all_id} = getState().MesMenuReducer.linkData;
    if(all_id.length >= 2){   
        var p = new Promise((resolve, reject) => {
            client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME: all_id.slice(-2)[0].id}, e => {
                if(e.Status == 'Pass'){
                    resolve(e.Data);
                }else{
                    reject(e);
                }
            });
        });
        p.then(d =>{
            var menuData = d.map(menuO => {
                var {MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, ID} = menuO;
                return {
                    type:1,
                    contain:MENU_NAME,
                    imgsrc:'../img/menu/' + CLASS_NAME,
                    bgcolor:STYLE_NAME,
                    link:PAGE_PATH,
                    id:ID
                };
            });
            dispatch(back_prev_menu(menuData));
        }, e => {
            throw new Error("获取菜单数据失败，请检查后台！");
        });
    }        
}
//点击菜单导航切换菜单页
var CHANGE_MENU_MAP = 'CHANGE_MENU_MAP';
var change_menu_map = (index, id, menuData) => ({
    type:CHANGE_MENU_MAP,
    index,
    id,
    menuData
});
var menu_map_click = (index, id) => (dispatch, getState) => {
    //index: 当前点击的是第几个
    //id: 当前点击的菜单id
    var {all_id} = getState().MesMenuReducer.linkData;
    var p = new Promise((resolve, reject) => {
        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME:id}, e => {
            if(e.Status == 'Pass'){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });
    p.then(d => {
        var menuData = d.map(menuO => {
            var {MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, ID} = menuO;
            return {
                type:1,
                contain:MENU_NAME,
                imgsrc:'../img/menu/' + CLASS_NAME,
                bgcolor:STYLE_NAME,
                link:PAGE_PATH,
                id:ID
            };
        });
        dispatch(change_menu_map(index, id, menuData));
    }, e => {
        throw new Error("请求菜单数据失败，请检查后台！");
    });
}

//菜单页点击模块（父级）
var CLICK_PARENT_MODULE = 'CLICK_PARENT_MODULE';
var click_parent_module = (menuData, name, id) => ({
    type:CLICK_PARENT_MODULE,
    menuData,
    name,
    id
});
var parent_module_click = (name, id) => dispatch => {   //点击模块(父级)执行
    var p = new Promise((resolve, reject) => {
        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME:id}, e => {
            if(e.Status == 'Pass'){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });
    p.then(d => {
        var menuData = d.map(menuO => {
            var {MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, ID} = menuO;
            return {
                type:1,
                contain:MENU_NAME,
                imgsrc:'../img/menu/' + CLASS_NAME,
                bgcolor:STYLE_NAME,
                link:PAGE_PATH,
                id:ID
            };
        });
        dispatch(click_parent_module(menuData, name, id));
    }, e => {
        throw new Error("请求子模块数据失败，请检查后台！");
    });
}

//刷新模塊
var CHANGE_MENU = 'CHANGE_MENU';
var change_menu = menuData => ({
    type: CHANGE_MENU,
    menuData
}); 
//新增模块
var SET_LAYER_OPTION = 'SET_LAYER_OPTION';
var set_layer_option = option => ({
    type:SET_LAYER_OPTION,
    option
});
var add_module = ({title, Content, w, h}) => dispatch => {    //打開彈出框
    dispatch(set_layer_option({title, Content, w, h}));   //显示弹出框
    dispatch(init_layer_content());                       //初始化弹出框
    dispatch(get_all_icon());                             //加载所有图标
}

//新增模块时弹出层内容的变化， 其它內容置空, 加載所有圖標數據
var INIT_LAYER_CONTENT = 'INIT_LAYER_CONTENT';
var init_layer_content = () => ({
    type:INIT_LAYER_CONTENT
});
var LOAD_ALL_ICON = 'LOAD_ALL_ICON';
var load_all_icon = iconSrcAllList => ({
    type: LOAD_ALL_ICON,
    iconSrcAllList
});
var get_all_icon = () => (dispatch, getState) => { //获取所有图标数据，加载所有图标
    var layerContentState = getState().LayerContentReducer;
    if(layerContentState.iconSrcAllList.length == 0){
        var p = new Promise((reject, resolve) => {
            client.CallFunction("MESStation.Config.QuackPicUpload", "GetAllFile", {}, e => {
                if(e.Status == "Pass"){
                    reject(e.Data);
                }else{
                    resolve(e);
                }
            });
        });
        p.then(d => {
            var iconSrcList = d.map(iconSrc => {
                return iconSrc.match(/\\[^\\]+.png/)[0].replace("\\","");
            });
            dispatch(load_all_icon(iconSrcList)); 
        }, e => {
            throw new Error("获取图标数据失败，请检查后台！");
        });
    }else{
        dispatch(load_all_icon(layerContentState.iconSrcAllList));
    }
}



//修改菜单
var TOGGLE_EDITMENU = 'TOGGLE_EDITMENU';
var toggle_editmenu = () => ({
    type:TOGGLE_EDITMENU
});
//我要收藏
var TOGGLE_COLLECTION = "切换我要收藏的状态";
var toggle_collection = () => ({
    type: TOGGLE_COLLECTION
});

//点击修改菜单
var LOAD_LAYER_CONTENT = 'LOAD_LAYER_CONTENT';
var load_layer_content = ({id, name, url, des, iconSrc, color}) => ({
    type:LOAD_LAYER_CONTENT,
    id,
    name, 
    url, 
    des, 
    iconSrc, 
    color
});

var load_layer_content_data = id => dispatch => {   //id：模块id
    var p = new Promise((reject, resolve) => {
        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuInformation", {MenuId: id}, e => {
            if(e.Status == "Pass"){
                reject(e.Data);
            }else{
                resolve(e);
            }
        });
    });
    p.then(d => {
        var {MENU_NAME, PAGE_PATH, MENU_DESC, CLASS_NAME, STYLE_NAME} = d;
        var layOption = {
            id,
            name:MENU_NAME,
            url:PAGE_PATH,
            des:MENU_DESC,
            iconSrc:CLASS_NAME,
            color:STYLE_NAME
        };
        dispatch(load_layer_content(layOption));
    }, e => {
        throw new Error("获取模块基本数据失败，请检查后台！");
    });
};

var edit_module = ({title, Content, w, h, id}) => dispatch => {
    dispatch(set_layer_option({title, Content, w, h}));   //显示弹出框
    dispatch(load_layer_content_data(id));                //初始化弹出框(填充获取的模块数据)
    dispatch(get_all_icon());                             //加载所有图标
};

//删除菜单
// Class":"MESStation.GlobalConfig.SystemMenuConfig",
// "Function":"DeletetMenu","Data":{"ID":"MFGII0000000000000000000000000001GA"}}
var delete_module = id => (dispatch, getState) => {
    var parentId = getState().MesMenuReducer.linkData.current_id;
    swal({
        title: '刪除模塊?',
        text: '你確定要刪除該模塊？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    }, () => {
        setTimeout(() => {
            var p = new Promise((resolve, reject) => {
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "DeletetMenu", {ID: id}, e => {
                    if(e.Status == "Pass"){
                        resolve(e);
                    }else{
                        reject(e);
                    }
                });
            });
            p.then(e => {
                swal({
                    title: '刪除成功',
                    text: e.Message,
                    type: 'success',
                }, () => {
                    var p1 = new Promise((resolve, reject) => {
                        client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME:parentId}, e => {
                            if(e.Status == 'Pass'){
                                resolve(e.Data);
                            }else{
                                reject(e);
                            }
                        });
                    });
                    p1.then(d => {
                        var menuData = d.map(menuO => {
                            var {MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, ID} = menuO;
                            return {
                                type:1,
                                contain:MENU_NAME,
                                imgsrc:'../img/menu/' + CLASS_NAME,
                                bgcolor:STYLE_NAME,
                                link:PAGE_PATH,
                                id:ID
                            };
                        });
                        dispatch(change_menu(menuData));
                    }, e => {
                        throw new Error("请求子模块数据失败，请检查后台！");
                    });
                });
            }, e => {
                swal(
                    '刪除失敗',
                    e.Message,
                    'error'
                );
                throw new Error("刪除操作失敗，請檢查後臺！");
            });
        }, 100);
    });
};

//弹出层
var CLOSE_LAYER = 'CLOSE_LAYER';
var OPEN_LAYER = 'OPEN_LAYER';
var close_layer = () => ({
    type:CLOSE_LAYER
});
var open_layer = () => ({
    type:OPEN_LAYER
});

var click_close = () => dispatch => {
    dispatch(close_layer());
}
var click_primary = ev => (dispatch, getState) => {
    //var lay = $(ev.target).parents(".mes-layer");  //整個彈出層節點
    var state = getState();
    var type = state.LayerReducer.title == "新增模塊" ? "add" : "update";
    var {id, name, url, des, iconSrc, color} = state.LayerContentReducer.currentModule;
    var parentId = state.MesMenuReducer.linkData.current_id;
    var editEmp = client.UserInfo.EMP_NO;
    var updateMenuSendData = {
        ID:id,
        MENU_NAME:name,
        CLASS_NAME:iconSrc,
        STYLE_NAME:color,
        PAGE_PATH:url,
        MENU_DESC:des,
        LANGUAGE_ID:name,
        EDIT_EMP:editEmp
    };
    var createMenuSendData = {
        PARENT_CODE:parentId,
        MENU_NAME:name,
        CLASS_NAME:iconSrc,
        STYLE_NAME:color,
        PAGE_PATH:url,
        MENU_DESC:des,
        LANGUAGE_ID:name,
        EDIT_EMP:editEmp
    };
    var className = "MESStation.GlobalConfig.SystemMenuConfig"
    var functionName = type == "add" ? "CreatMenu" : "UpdateMenu";
    var sendData = type == "add" ? createMenuSendData : updateMenuSendData;
    var p = new Promise((resolve, reject) => {
        client.CallFunction(className, functionName, sendData, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
    p.then(e => {
        swal({
            title: type == "add" ? '新增成功' : '修改成功',
            text: e.Message,
            type: 'success',
        }, () => {
            var p1 = new Promise((resolve, reject) => {
                client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", {MENU_NAME:parentId}, e => {
                    if(e.Status == 'Pass'){
                        resolve(e.Data);
                    }else{
                        reject(e);
                    }
                });
            });
            p1.then(d => {
                var menuData = d.map(menuO => {
                    var {MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, ID} = menuO;
                    return {
                        type:1,
                        contain:MENU_NAME,
                        imgsrc:'../img/menu/' + CLASS_NAME,
                        bgcolor:STYLE_NAME,
                        link:PAGE_PATH,
                        id:ID
                    };
                });
                dispatch(close_layer());
                dispatch(change_menu(menuData));
            }, e => {
                throw new Error("请求子模块数据失败，请检查后台！");
            });
        });
    }, e => {
        throw new Error("獲取數據失敗，請檢查後臺！");
    });
}
var click_cancel = () => dispatch => {
    dispatch(close_layer());
}

//彈出層內容
var CHANGE_MODULE_NAME = 'CHANGE_MODULE_NAME';
var change_module_name = name => ({
    type:CHANGE_MODULE_NAME,
    name
});
var CHANGE_MODULE_URL = 'CHANGE_MODULE_URL';
var change_module_url = url => ({
    type:CHANGE_MODULE_URL,
    url
});
var CHANGE_MODULE_DES = 'CHANGE_MODULE_DES';
var change_module_des = des => ({
    type:CHANGE_MODULE_DES,
    des
});
var CHANGE_MODULE_COLOR = 'CHANGE_MODULE_COLOR';
var change_module_color = color => ({
    type:CHANGE_MODULE_COLOR,
    color
});
var CHANGE_MODULE_ICON = 'CHANGE_MODULE_ICON';
var change_module_icon = iconSrc => ({
    type:CHANGE_MODULE_ICON,
    iconSrc
});
var CHANGE_MODULE_FILTERICON = 'CHANGE_MODULE_FILTERICON';
var change_module_filtericon = filterIcon => ({
    type:CHANGE_MODULE_FILTERICON,
    filterIcon
});
var FILTER_ICON = 'FILTER_ICON';  //筛选图标
var filter_icon = icon => ({
    type:FILTER_ICON,
    icon
});

var throttle = (fn, delay) => {
    var timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}


