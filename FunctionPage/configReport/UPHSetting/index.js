
let {createStore, applyMiddleware} = Redux;
let {Provider} = ReactRedux;

let enhancer = applyMiddleware(sagaMiddleware, thunk, logger);
let store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
