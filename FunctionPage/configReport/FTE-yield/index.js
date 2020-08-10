

let store = createStore(combineReducers({
    appReducer
}), applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("root"));
