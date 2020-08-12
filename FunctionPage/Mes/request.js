

let createRequest = (className, functionName, f) => {    //创建一个请求.
    return data => {
        var fn = typeof f == "function" ? f : d => d;
        var data = fn(data);
        return new Promise((resolve, reject) => {
            client.CallFunction(className, functionName, data, e => {
                if(e.Status == "Pass"){
                    resolve(e);
                }
                else{
                    reject(e);
                }
            });
        })
    }
}

//获取模块,系统头部 (不含父级, 模糊搜索) 
let getMenuLike = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuLike");  // {menuStr} 
//根据父级菜单id获取子菜单数据
let getMenuData = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu");  // {MENU_NAME: 0-首页}
// 新增模块
let createMenu = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "CreatMenu");  // {PARENT_CODE, MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, MENU_DESC, LANGUAGE_ID, EDIT_EMP}
// 修改模块
let updateMenu = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "UpdateMenu");  // {ID, MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, MENU_DESC, LANGUAGE_ID, EDIT_EMP}
// 删除模块 
let deleteMenu = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "DeletetMenu");   // {ID}
// 切换收藏状态
let toggerCollect = createRequest("MESStation.Config.FavoriteMenuConfig", "EditFavoriteMenuByID");   // {MENU_ID}

