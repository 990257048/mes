function createThunkMiddleware(extraArgument) {
    return function (_ref) {
      var dispatch = _ref.dispatch,
          getState = _ref.getState;
      return function (next) {
        return function (action) {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      };
    };
  }
  
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;


//20200504 add by gch (redux promise middleware)

// var promise = _ref => next => action => {
//   if(action instanceof Promise){
//     action.then(e => {

//     }, e => {

//     });
//     return () => {

//     };
//   }else{
//     return next(action);
//   }

// }







//20200108 ADD BY GCH (redux-logger)
// var createLoggerMiddleware = reducerStr => store => next => action => {
//   var type = Object.prototype.toString.call(reducerStr);
//   if(type == "[object Array]" || type == "[object Array]"){
//     var state = getState();
  
//     console.group("操作一次");
//     console.time("本次操作用时:");
//     console.log("操作前State:", state);
//     console.log("action:", action);
//     next(action);
//     console.log("操作后State:", state);
//     console.timeEnd("本次操作用时:");
//     console.groupEnd();
//   }else{
//     next(action);
//   }
//   var state = getState();
  
//   console.group("操作一次");
//   console.time("本次操作用时:");
//   console.log("操作前State:", state);
//   console.log("action:", action);
//   next(action);
//   console.log("操作后State:", state);
//   console.timeEnd("本次操作用时:");
//   console.groupEnd();
// }
var logger = ({dispatch, getState}) => next => action => {
  var prevState = getState();
  console.groupCollapsed("操作:", action.type);
  console.time("本次操作用时");
  console.log("action:", action);
  console.log("操作前state:", prevState);
  next(action);
  var currentState = getState();
  console.log("操作后state:", currentState);
  console.timeEnd("本次操作用时");
  console.groupEnd();
}

  