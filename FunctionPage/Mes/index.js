$.subscribe("loadMenu",function (ev){    //生成系統結構
    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    var enhancer = composeEnhancers ? composeEnhancers(applyMiddleware(thunk, logger)) : applyMiddleware(thunk, logger);
    var store = createStore(combineReducers({
        MesIframesReducer,
        MesMenuSideReducer,
        MesTopReducer,
        MesMenuReducer,
        LayerReducer,
        LayerContentReducer
    }), enhancer);
    ReactDOM.render(
        <Provider store={store}>
            <Mes />
        </Provider>,
        $("#root")[0]
    )
});