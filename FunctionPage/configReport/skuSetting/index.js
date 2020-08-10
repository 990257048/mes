let composeEnhancers = self.parent.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
let enhancer = composeEnhancers ? composeEnhancers(applyMiddleware(thunk, logger)): applyMiddleware(thunk, logger);
let store = createStore(combineReducers({
    configReportReducer,
    layerReducer,
    layerContentReducer
}), enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    $("#root")[0]
);
