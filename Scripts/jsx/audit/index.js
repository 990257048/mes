
let {createStore, combineReducers, applyMiddleware} = Redux;
let {Provider} = ReactRedux;


let store = createStore(combineReducers({
    headReducer,
    TableReducer,
    LayerTipReducer
}), applyMiddleware(thunk, logger))

ReactDOM.render(
    <Provider store={store}>
        <Audit />
    </Provider>,
    $("#audit")[0]
)
