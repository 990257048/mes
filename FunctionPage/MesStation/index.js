
let {createStore, combineReducers, applyMiddleware} = Redux;
let {Provider} = ReactRedux;

let store = createStore(combineReducers({
    StationGlobalReducer,
    StationJsonReducer,
    InputsReducer,
    OutputsReducer,
    StationMessagesReducer,
    StationLayerReducer,
    StationDomSizeReducer
}), applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <Station />
    </Provider>,
    $("#root")[0]
);