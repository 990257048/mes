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
}

function* mesLayerSaga() {
    console.log("mes layer saga run!");
}

function* rootSaga() {
    yield all([mesIframeSaga(), mesTopSaga(), mesMenuSaga(), mesLayerSaga()]);
}

