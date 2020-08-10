
let {createStore, combineReducers, applyMiddleware} = Redux;
let {Provider} = ReactRedux;


let store = createStore(combineReducers({
    TableReducer
}), applyMiddleware(thunk, logger))

ReactDOM.render(
    <Provider store={store}>
        <MES_Table />
    </Provider>,
    $("#root")[0]
)
