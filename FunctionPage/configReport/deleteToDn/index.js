
let enhancer = applyMiddleware(sagaMiddleware, thunk, logger);
let store = createStore(rootReducer, enhancer);
let actions = createRootActions(store.dispatch);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
);



