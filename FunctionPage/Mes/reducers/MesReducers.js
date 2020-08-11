
var MesIframesReducer = (state = {
    iframe_act_url:'menu',
    iframes:[  //控制导航栏，iframe
        {
            name:'首页',
            url:'menu'
        }
    ]
}, action) => {
    switch(action.type){
        case CHANGE_IFRAME:
            var {url} = action;
            return {
                ...state,
                iframe_act_url:url
            };
        case ADD_IFRAME:
            var {name, url} = action;
            var iframes = state.iframes.slice(0, state.iframes.length);
            iframes.push({name, url});
            return {
                iframe_act_url: url,
                iframes
            };
        case CLOSE_ACT_IFRAME:
            var {name} = action;
            var iframe_act_url, iframes;
            state.iframes.forEach((navO, i) => {
                if(navO.name == name){
                    iframe_act_url = state.iframes[i - 1].url;
                }
            });
            iframes = state.iframes.filter((navO, i) => {
                return navO.name != name;
            });
            return {
                iframe_act_url, 
                iframes
            };
        case CLOSE_NOACT_IFRAME:
            var {name} = action;
            return {
                iframe_act_url: state.iframe_act_url,
                iframes: state.iframes.filter(navO => {
                    return navO.name != name;
                })
            };
        case CHANGE_ACT_IFRAME:
            var {name} = action;
            return {
                iframe_act_url: state.iframes.filter(navO => {
                    return navO.name == name;
                })[0].url,
                iframes: state.iframes
            }
        default :
            return state;
    }
}

// var MesMenuSideReducer = (state = {
//     display:'none',    //是否显示侧边栏
//     menuRoute:[],
//     data:[]             
// }, action) => {
//     switch(action.type){
//         case FIRST_OPEN_MENUSIDE:    //第一次打开侧边栏
//             var {menuSideD} = action;
//             return {
//                 display:'block',    //是否显示侧边栏
//                 menuRoute:[],
//                 data:[menuSideD] 
//             };
//         case INIT_MENUSIDE:          //初始化侧边栏
//             var {menuSideD} = action;
//             return {
//                 ...state,
//                 data:[menuSideD]
//             };
//         case ADD_MENUSIDE:          //更新侧边栏内容
//             var {contain, newD, grade} = action;
//             var menuRoute = state.menuRoute.slice(0, grade);
//             menuRoute.push(contain);
//             var data = state.data.slice(0, grade + 1);
//             data.push(newD);
//             return {
//                 ...state,
//                 menuRoute,
//                 data
//             };
//         case CLOSE_MENUSIDE:       //隐藏侧边栏
//             return {
//                 ...state,
//                 display:"none"
//             };
//         case CHANGE_MENUSIDE_DISPLAY:    //切换侧边栏的显示状态（显示 / 隐藏）
//             return {
//                 ...state,
//                 display: state.display == 'none' ? 'block' : 'none'
//             };
//         default :
//             return state;
//     }
// }

var MesTopReducer = (state = {
    user_msg_hover:false,
    user_block_display:'none',
    debug_flag:$.MES.DEBUG,
    searchBlock:{
        display:'none',
        menuList:[]
    }
}, action) => {
    switch(action.type){
        case SET_MENULIST:
            var {menuList} = action;
            return {
                ...state,
                searchBlock:{
                    display:'block',
                    menuList
                }
            };
        case CLOSE_SEARCHBLOCK:
            return {
                ...state,
                searchBlock:{
                    ...state.searchBlock,
                    display:'none'
                }
            };
        case CHANGE_USERBOX_STATE:
            var {user_msg_hover, user_block_display} = state;
            return {
                ...state,
                user_msg_hover:!user_msg_hover,
                user_block_display: user_block_display == 'none' ? 'block' : 'none'
            };
        case CHANGE_DEBUG:
            return {
                ...state,
                debug_flag: !state.debug_flag
            }
        default:
            return state;
    }
}

var MesMenuReducer = (state = {
    w: 0,
    editMenu: false,
    collection: false,
    menuData:[],    //页面显示内容
    linkData:{     //用于链接的数据
        current_id: '0',    //当前页面id
        prev_id: null,      //上一级页面id
        all_id:[           //所有页面id，当前页面为最后一级页面，也是该数组的最后一项
            {
                name:'主菜单',
                id:'0'
            }
        ]
    }
}, action) => {
    switch(action.type){
        case CHANGE_MENU_W:
            var {w} = action;
            return {
                ...state,
                w
            };
        case CHANGE_MENU:     //刷新本頁菜單，刪除或新增菜單后。。
            var {menuData} = action;
            return {
                ...state,
                editMenu: false,
                menuData
            };
        // case INIT_MENU:    //初始化菜单
        //     var {w, menuData} = action;
        //     return {
        //         ...state,
        //         w,
        //         menuData
        //     };
        case SET_MENU_DATA:    //初始化菜单 设置菜单数据
            var {menuData} = action;
            return {
                ...state,
                menuData
            };
        case BACK_PREV_MENU:    //返回上一层菜单
            // var {menuData}  = action;
            var {current_id, all_id} = state.linkData;  //all_id.length只会大于1
            if(all_id.length > 2){
                var c_id, p_id, a_id, index;
                all_id.forEach((idO, i) => {
                    if(idO.id == current_id){
                        c_id = all_id[i - 2].id;
                        p_id = i == 2 ? null : all_id[i - 3].id;
                        index = i;
                    }
                });
                a_id = all_id.slice(0, index);
                return {
                    ...state,
                    // menuData,
                    linkData:{
                        current_id:c_id,
                        prev_id:p_id,
                        all_id:a_id
                    }
                };
            }else{      //all_id.length = 2
                return {
                    ...state,
                    // menuData,
                    linkData:{
                        current_id: all_id[0].id,   //0
                        prev_id: null,
                        all_id:all_id.slice(0, 1)
                    }
                }
            }
        case CHANGE_MENU_MAP:    //切换菜单页
            var {index, id} = action;   //注意：index只会大于1或等于0
            var {all_id} = state.linkData;
            if(index != 0){
                return {
                    ...state,
                    // menuData,
                    linkData:{
                        current_id: id,
                        prev_id: all_id[index - 1].id,
                        all_id: all_id.slice(0, index + 1)
                    }
                };
            }else{
                return {
                    ...state,
                    // menuData,
                    linkData:{
                        current_id: id,
                        prev_id: null,
                        all_id: all_id.slice(0, 1)
                    }
                }
            }
        case CLICK_PARENT_MODULE:   //点击父级模块
            var {name, id} = action;   //menuData：获取的子模块数据， name/id：父级模块名/id
            var {current_id, all_id} = state.linkData;
            return {
                ...state,
                // menuData,
                linkData:{
                    current_id:id,
                    prev_id:current_id,
                    all_id:[
                        ...all_id,
                        {
                            name,
                            id
                        }
                    ]
                }
            };
        case TOGGLE_EDITMENU: //切换修改菜单
            return {
                ...state,
                editMenu:!state.editMenu
            };
        case TOGGLE_COLLECTION:
            return {
                ...state,
                collection: !state.collection
            }
        default:
            return state;
    }
}

var LayerReducer = (state = {
    w:0,
    h:0,
    display:"none",
    title:"",
    Content:LayerContent
}, action) => {
    switch(action.type){
        case SET_LAYER_OPTION:
            var {title, Content, w, h} = action.option;
            return {
                w, h, display:'block', title, Content
            };
        case CLOSE_LAYER:
            return {
                ...state,
                display:'none'
            };
        case OPEN_LAYER:
            return {
                ...state,
                display:'block'
            };
        default: 
            return state;
    }
};

var LayerContentReducer = (state = {
    currentModule:{
        id:"",
        name:"ModuleName",
        url:"FunctionPage/...",
        des:"",
        iconSrc:"module.png",
        color:"red",
        filterIcon:""
    },
    iconSrcCurList:["module.png", "ADF.png", "B33C.png"],
    iconSrcAllList:[]
}, action) => {
    switch(action.type){
        case CHANGE_MODULE_NAME:
            var {name} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    name
                }
            };
        case CHANGE_MODULE_URL:
            var {url} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    url
                }
            };
        case CHANGE_MODULE_DES:
            var {des} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    des
                }
            };
        case CHANGE_MODULE_ICON:
            var {iconSrc} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    iconSrc
                }
            };
        case CHANGE_MODULE_COLOR:
            var {color} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    color
                }
            };
        case CHANGE_MODULE_FILTERICON:
            var {filterIcon} = action;
            return {
                ...state,
                currentModule:{
                    ...state.currentModule,
                    filterIcon
                }
            };
        case INIT_LAYER_CONTENT:
            return {
                ...state,
                currentModule:{
                    id:"",
                    name:"ModuleName",
                    url:"FunctionPage/...",
                    des:"",
                    iconSrc:"module.png",
                    color:"red",
                    filterIcon:""
                }
            };
        case LOAD_LAYER_CONTENT:
            var {id, name, url, des, iconSrc, color} = action;
            return {
                ...state,
                currentModule:{
                    id,
                    name,
                    url,
                    des,
                    iconSrc,
                    color,
                    filterIcon:""
                }
            };
        case LOAD_ALL_ICON:
            var {iconSrcAllList} = action;
            return {
                ...state,
                iconSrcCurList:iconSrcAllList,
                iconSrcAllList
            };
        case FILTER_ICON:
            var {icon} = action;  //iconSrc片段
            return {
                ...state,
                iconSrcCurList: state.iconSrcAllList.filter(iconSrc => {
                    var reg = new RegExp(icon, 'i');
                    return reg.test(iconSrc);
                })
            };
        default:
            return state;
    }
}


