let { all, takeEvery, call, put, select } = ReduxSagaEffects;


function* mesIframeSaga() {
    console.log("mes iframe saga1 run!");
    yield takeEvery($OPEN_IFRAME, function* ({ name, url }) {  // 打开一个导航栏选项卡
        let iframes = yield select(state => state.MesIframesReducer.iframes);
        //单击模块（会链接到新的页面）
        //创建新的iframe,新增选项卡，改变当前活动的选项卡
        var existFlag = false;   //是否包含该选项卡未打开
        iframes.forEach(navO => {
            if (navO.url == url) {
                existFlag = true;
            }
        });
        if (existFlag) {   //存在该选项卡
            yield put(change_iframe(url));  // 切换iframe（选项卡）
        } else {   //不存在该选项卡
            yield put(add_iframe(name, url));  // 新增iframe（选项卡）
        }
    });
}

function* mesTopSaga() {
    console.log("mes top saga run!");
}

function* mesMenuSaga() {
    console.log("mes menu saga run!");

    yield takeEvery($LOAD_MENU, function* ({ parentMenuID }) {   //初始化菜单
        try {
            let { Data } = yield call(getMenuData, { MENU_NAME: parentMenuID });    //获取菜单数据
            let menuData = Data.map(menuO => {
                var { ID, MENU_NAME, CLASS_NAME, STYLE_NAME, PAGE_PATH, FavoriteFlag } = menuO;
                return {
                    type: 1,
                    contain: MENU_NAME,
                    imgsrc: '../img/menu/' + CLASS_NAME,
                    bgcolor: STYLE_NAME,
                    link: PAGE_PATH,
                    id: ID,
                    fav_flag: FavoriteFlag
                }
            });
            yield put(set_menu_data(menuData));
        } catch (e) {
            message.error(e.Message);
        }
    });

    yield takeEvery($BACK_MENU, function* () {   // 返回上一层菜单操作
        let all_id = yield select(state => state.MesMenuReducer.linkData.all_id);
        if (all_id.length >= 2) {
            let parentMenuID = all_id.slice(-2)[0].id;
            try {
                yield put($load_menu(parentMenuID));
                yield put(back_prev_menu());
            } catch (e) {
                message.error(e);
            }
        }
    });

    yield takeEvery($MENU_MAP_CLICK, function* ({ index, id }) {   // 切换菜单层级操作
        //index: 当前点击的是第几个
        //id: 当前点击的菜单id
        try {
            yield put($load_menu(id));
            yield put(change_menu_map(index, id));
        } catch (e) {
            message.error(e);
        }
    });

    yield takeEvery($PARENT_MODULE_CLICK, function* ({ name, id }) {   // 点击父级模块操作
        try {
            yield put($load_menu(id));
            yield put(click_parent_module(name, id));
        } catch (e) {
            message.error(e);
        }
    });
}

function* mesLayerSaga() {
    console.log("mes layer saga run!");
    yield takeEvery($CLICK_PRIMARY, function* () {  // 提交模块操作(新增或修改)
        let title = yield select(state => state.LayerReducer.title);
        let { id, name, url, des, iconSrc, color } = yield select(state => state.LayerContentReducer.currentModule);
        let parentId = yield select(state => state.MesMenuReducer.linkData.current_id);
        let type = title == "新增模塊" ? "add" : "update";
        let editEmp = client.UserInfo.EMP_NO;

        var updateMenuSendData = {
            ID: id,
            MENU_NAME: name,
            CLASS_NAME: iconSrc,
            STYLE_NAME: color,
            PAGE_PATH: url,
            MENU_DESC: des,
            LANGUAGE_ID: name,
            EDIT_EMP: editEmp
        };
        var createMenuSendData = {
            PARENT_CODE: parentId,
            MENU_NAME: name,
            CLASS_NAME: iconSrc,
            STYLE_NAME: color,
            PAGE_PATH: url,
            MENU_DESC: des,
            LANGUAGE_ID: name,
            EDIT_EMP: editEmp
        };
        // createMenu updateMenu
        var api = type == "add" ? createMenu : updateMenu;
        var sendData = type == "add" ? createMenuSendData : updateMenuSendData;
        try {
            let { Message } = yield call(api, sendData);
            message.success(Message);
            yield put($load_menu(parentId));
            yield put(close_layer());
            yield put(toggle_editmenu());
        } catch (e) {
            message.error(e.Message);
        }
    });

    yield takeEvery($TOGGER_COLLECT, function* ({id}){
        console.log("TOGGER_COLLECT action run");
        try{
            let {Message} = yield call(toggerCollect, {ID: id});
            message.success(Message);
            let current_id = yield select(state => state.MesMenuReducer.linkData.current_id);
            yield put($load_menu(current_id));
        }catch(e){
            message.error(e.Message);
        }
    });
}

function* rootSaga() {
    yield all([mesIframeSaga(), mesTopSaga(), mesMenuSaga(), mesLayerSaga()]);
}

