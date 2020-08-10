var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
var enhancer = composeEnhancers ? composeEnhancers(applyMiddleware(thunk, logger)) : applyMiddleware(thunk, logger);
let {createStore, applyMiddleware, combineReducers} = Redux;
let {Provider} = ReactRedux;

let store = createStore(combineReducers({
    appReducer,
    chart1Reducer,
    chart2Reducer,
    chart3Reducer,
    chart4Reducer
}), enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    $("#root")[0]
);