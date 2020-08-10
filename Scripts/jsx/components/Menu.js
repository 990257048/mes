
class Menu extends React.Component {
    constructor(...args){
        super(...args);
        this.componentWillMount = () => {
            //console.log("菜单渲染前。。。");
            var {InitMenuData} = this.props;
            InitMenuData();
        }
        this.componentDidUpdate = ()=>{
            var mesUI = new MesClientUI(client);
            mesUI.SetLanguage("menu");
        }
        window.onresize = ()=>{
            this.calculatWidth();
        }
    }
    calculatWidth (){
        var {changeMenuWidth} = this.props;
        var w = Number($(document.body).css("width").replace("px","")) - 40;
        changeMenuWidth(w);
    }
    render (){
        var {
            MenuState, display, 
            LayerOption, LayerContentOption, 
            closeLayer, clickPrimary, clickCancel
        } = this.props;
        var {menuData, editMenu} = MenuState;
        var itemArr = menuData.map(menuO => {
            return <Item key={Math.random()} data={menuO} />
        });
        editMenu && itemArr.push(<Item key={Math.random()} data={{}} />);
        return <div className='mes-menu' style={{display:display}} >
            <MenuTop />
            <ul ref='menu-wrap' className='mul'>
                {itemArr}
            </ul>
            <Layer 
                option={{LayerOption, LayerContentOption}} 
                onClose={closeLayer} onPrimary={clickPrimary} onCancel={clickCancel} 
            />
            <MenuShadow />
        </div>
    }
}
Menu = connect(state => {
    return {
        MenuState: state.MesMenuReducer,
        LayerOption:state.LayerReducer,
        LayerContentOption:state.LayerContentReducer
    };
}, dispatch => {
    return {
        changeMenuWidth: throttle(w => {
            dispatch(change_menu_w(w));
        }, 100),
        InitMenuData: () => {
            dispatch(initMenuData());
        },
        closeLayer: e => {
            dispatch(click_close(e));
        },
        clickPrimary: e => {
            dispatch(click_primary(e));
        },
        clickCancel: e => {
            dispatch(click_cancel(e));
        }
    };
})(Menu);


class MenuTop extends React.Component {
    render (){
        var {MenuState, backMenu, toggleEditmenu} = this.props;
        var {editMenu} = MenuState;
        return <div className='menu-top'>
            <div className='menu-top-contain'>
                <div className='back' onClick={backMenu}>
                    <div className='back-contain'></div>
                </div>
                <MenuMap />
                <div className={editMenu ? "edit-menu edit-menu-act" : "edit-menu"}  set-lan="html:editMenu" onClick={toggleEditmenu}>
                    <span className="edit-menu-icon glyphicon glyphicon-pencil"></span>
                    {' '}
                    <i>修改菜单</i>
                </div>
            </div>
        </div>
    }
}
MenuTop = connect(state => {
    return {
        MenuState: state.MesMenuReducer
    };
}, dispatch => {
    return {
        backMenu: () => {
            dispatch(back_menu());
        },
        toggleEditmenu: () => {
            dispatch(toggle_editmenu());
        }
    };
})(MenuTop);

class MenuMap extends React.Component {
    render (){
        var {MenuState, menuMapClick} = this.props;
        var maps = MenuState.linkData.all_id;
        return (
            <div className='menu-map'>{
                maps.map((mapO, i) => {
                    var lan = "html:" + mapO.name.replace(/\b (\w)/g, function ($, $1){return $1.toUpperCase()});
                    if(i != maps.length - 1){
                        return [
                            <span key={Math.random()} className='menu-map-contain' set-lan={lan} onClick={() => {menuMapClick(i, mapO.id)}}>{mapO.name}</span>,
                            <span key={Math.random()}> > </span>
                        ];
                    }else{
                        return <span key={Math.random()} className='menu-map-contain' set-lan={lan} >{mapO.name}</span>
                    }
                })
            }</div>
        )
    }
}
MenuMap = connect(state => {
    return {
        MenuState: state.MesMenuReducer
    };
}, dispatch => {
    return {
        menuMapClick: (index, id) => {
            dispatch(menu_map_click(index, id));
        }
    };
})(MenuMap);

class Item extends React.Component {
    setWidth(w, minW, maxNum){ // w:菜单可视区总宽， minW:单个模块最小宽度， maxNum:一行最多可显示的模块数量
        var col_max = Math.floor(w / minW);
        var col_module_num = col_max >= 1 && col_max <= maxNum ? col_max : col_max > maxNum ? maxNum : 1;
        return "calc(100%/" + col_module_num +")";
    }
    render (){
        var {data, w} = this.props;
        var style = {
            color:'#000',
            width: this.setWidth(w, 220, 5),
            height:'170px',
            padding:'26px 38px',
            float:'left'
        };
        return <li style={style} >
            <Li data={data} />
        </li>
    }
}
Item = connect(state => ({
    w: state.MesMenuReducer.w
}))(Item);

class Li extends React.Component {
    module_click (ev, contain, link, id){
        var tClassName = $(ev.target).attr("class").split(" ");
        if(!tClassName.Contain("module-edit") && !tClassName.Contain("module-delete")){ //不是点击修改或删除才进入模块
            var {parentModuleClick, openIframe} = this.props;
            link == '#' ? parentModuleClick(contain, id) : openIframe(contain, link);
        }
    }
    render (){
        var {data, editMenu, addModule, editModule, deleteModule} = this.props;
        var {contain, imgsrc, bgcolor, link, id} = data;
        var moduleStyle = {
            background:bgcolor
        }
        var imgStyle = {
            background:"url("+ imgsrc +")",
            backgroundSize: '100% 100%'
        }
        var iconStyle = {
            display:editMenu ? "inline-block" : "none"
        }
        var layerOption = {
            title:"新增模塊",
            Content:LayerContent,
            w: 880,
            h: 480
        };
        var lan = contain ? ("html:" + contain.replace(/\b (\w)/g, function($, $1){return $1.toUpperCase()})) : "";
        if(contain){
            return <span className="module" style={moduleStyle} onClick={ev => { this.module_click.call(this, ev, contain, link, id)}}>
                <span className="module-edit glyphicon glyphicon-pencil" style={iconStyle} onClick={() => {editModule({...layerOption, title:"修改模塊", id})}}></span>
                <span className="module-delete glyphicon glyphicon-trash" style={iconStyle} onClick={() => {deleteModule(id)}}></span>
                <span className="module-img" style={imgStyle}></span>
                <span className="module-span" set-lan={lan}>{contain}</span>
            </span> 
        }else{
            return <span className="module-add" style={{background:'#d4c3ec'}} onClick={() => {addModule(layerOption)}}>
                <span className="module-img" style={{background:"url(../img/menu/NewModule.png)", backgroundSize: '100% 100%'}}></span>
                <span className="module-span" set-lan="html:addModule" >AddModule</span>
            </span> 
        }
    }
}
Li = connect(state => {
    return {
        editMenu:state.MesMenuReducer.editMenu
    };
}, dispatch => {
    return {
        parentModuleClick: (name, id) => {
            dispatch(parent_module_click(name, id));
        },
        openIframe: (menu, url) => {
            dispatch(open_iframe(menu, url));
        },
        addModule: ({title, Content, w, h}) => {
            dispatch(add_module({title, Content, w, h}));
        },
        editModule: ({title, Content, w, h, id}) => {  //id : 模块id
            dispatch(edit_module({title, Content, w, h, id}));
        },
        deleteModule: id => {
            dispatch(delete_module(id));
        }
    };
})(Li);

class LayerContent extends React.Component {
    render (){
        var {option, changeModuleName, changeModuleUrl, changeModuleDes, changeModuleColor, changeModuleFilterIcon, filterIconFn} = this.props
        var {LayerOption, LayerContentOption} = option;
        var {w, h} = LayerOption;
        var {currentModule, iconSrcCurList} = LayerContentOption;
        var {name, url, des, iconSrc, color, filterIcon} = currentModule;
        var contentStyle = {
            width: w + "px", 
            height: h + "px"
        }
        var previewStyle = {
            background:color
        };
        var previewIconStyle = {
            background: "url(./../img/menu/"+ iconSrc +") 0% 0% / 100% 100%"
        }
        return <div className="layer-content" style={contentStyle}>
            <div className="layer-menu-input-box">
                <div className="m-input">
                    <div className="m-ctr-wrap">
                        <div className="m-ctr">
                            <div className="m-ctr-lab">模块名称：</div>
                            <div className="m-ctr-ipt">
                                <input name="m-name" value={name} onChange={ev => {changeModuleName(ev.target.value)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="m-msg">
                    名称不可超过20个字符，不能含空格
                    </div>
                    <div className="m-ctr-wrap">
                        <div className="m-ctr">
                            <div className="m-ctr-lab">模块路径：</div>
                            <div className="m-ctr-ipt">
                                <input name="m-url" value={url} onChange={ev => {changeModuleUrl(ev.target.value)}} />
                            </div>
                        </div>
                    </div>
                    <div className="m-msg">
                    当创建父級模塊時路徑為“#”
                    </div>
                    <div className="m-ctr-max-wrap">
                        <div className="m-max-ctr">
                            <div className="m-ctr-lab">模块描述：</div>
                            <div className="m-ctr-text">
                                <textarea name="m-des" value={des} onChange={ev => {changeModuleDes(ev.target.value)}}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="layer-menu-showmodule-box">
                <div className="m-preview" style={previewStyle}>
                    <div className="m-preview-icon" style={previewIconStyle}></div>
                    <div className="m-preview-text">{name}</div>
                </div> 
                <div className="m-color">
                    <div className="m-color-lab">顏色值：</div>
                    <div className="m-color-ipt">
                        <input type="text" name="m-color" value={color} onChange={ev => {changeModuleColor(ev.target.value)}} />
                    </div>
                </div>
            </div>
            <div className="layer-show-icon-box">
                <div className="icon-tit">
                    <span className="select-icon">選擇圖標</span>
                    <input type="text" name="select-icon" placeholder="輸入圖標名稱快速查找圖標" value={filterIcon} onInput={ev => {changeModuleFilterIcon(ev.target.value)}} onChange={ev => {filterIconFn(ev.target.value)}}/>
                    <input type="file" name="upload-icon" />
                    <div className="upload-icon">
                        <span>本地上傳圖標:</span>
                    </div>
                </div>
                <div className="icon-list-wrap">
                    <ul>
                        {
                            iconSrcCurList.map((iconSrc, i) => {
                                return <ModuleIcon key={i} iconSrc={iconSrc} />
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    }
}
LayerContent = connect(state => ({}), dispatch => {
    return {
        changeModuleName: name => {
            dispatch(change_module_name(name));
        },
        changeModuleUrl: url => {
            dispatch(change_module_url(url));
        },
        changeModuleDes: des => {
            dispatch(change_module_des(des));
        },
        changeModuleColor: color => {
            dispatch(change_module_color(color));
        },
        changeModuleFilterIcon: filterIcon => {
            dispatch(change_module_filtericon(filterIcon));
        },
        filterIconFn: throttle(icon => {
            dispatch(filter_icon(icon));
        }, 600)
    };
})(LayerContent);

class ModuleIcon extends React.Component{
    render (){
        var {iconSrc, changeModuleIcon} = this.props;
        return <li>
            <div className="icon-li" onClick={() => {changeModuleIcon(iconSrc)}}>
                <img src={"./../img/menu/" + iconSrc} title={iconSrc.split(".")[0]} />
            </div>
        </li>
    }
}
ModuleIcon = connect(state => ({}), dispatch => {
    return {
        changeModuleIcon: iconSrc => {
            dispatch(change_module_icon(iconSrc));
        }
    };
})(ModuleIcon);


class MenuShadow extends React.Component {
    render (){
        var {display} = this.props;
        return <div className="menu-shadow" style={{display}}></div>
    }
}
MenuShadow = connect(state => {
    return {
        display: state.LayerReducer.display
    };
})(MenuShadow);
