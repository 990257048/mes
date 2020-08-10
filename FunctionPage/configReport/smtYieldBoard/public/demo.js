
let {createStore, applyMiddleware, combineReducers} = Redux;
let {Provider} = ReactRedux;

let store = createStore(combineReducers({
    appReducer,
    optionReducer
}), applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    $("#root")[0]
);