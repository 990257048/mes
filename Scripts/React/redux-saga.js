/******/ var sagaMiddleware = (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js")["default"];
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
  
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
  
      return target;
    };
  
    return _extends.apply(this, arguments);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
  /*!*********************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
    \*********************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectWithoutPropertiesLoose; });
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
  
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  
    return target;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/core/dist/io-6de156f3.js":
  /*!***********************************************************!*\
    !*** ./node_modules/@redux-saga/core/dist/io-6de156f3.js ***!
    \***********************************************************/
  /*! exports provided: $, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, _, a, a0, a1, a2, a3, a4, a5, a6, a7, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$", function() { return apply; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return ALL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return logError; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return CALL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return wrapSagaDispatch; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return identity; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return FORK; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return GET_CONTEXT; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return buffers; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return detach; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return JOIN; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return take; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return fork; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return cancel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return call; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return actionChannel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return PUT; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return sliding; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return RACE; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return SELECT; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return TAKE; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return delay; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return race; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return effectTypes; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return takeMaybe; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return put; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return putResolve; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return all; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CPS; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a0", function() { return cps; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a1", function() { return spawn; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a2", function() { return join; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a3", function() { return select; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a4", function() { return cancelled; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a5", function() { return flush; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a6", function() { return getContext; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a7", function() { return setContext; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CANCEL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return check; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ACTION_CHANNEL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return expanding; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CANCELLED; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FLUSH; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SET_CONTEXT; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return internalErr; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getMetaInfo; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return kTrue; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return createAllStyleChildCallbacks; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return createEmptyArray; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return none; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return once; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return assignWithSymbols; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return makeIterator; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return remove; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return shouldComplete; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return noop; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return flatMap; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return getLocation; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return createSetContextWarning; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return asyncIteratorSymbol; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return shouldCancel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return shouldTerminate; });
  /* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @redux-saga/symbols */ "./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js");
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @redux-saga/is */ "./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js");
  /* harmony import */ var _redux_saga_delay_p__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @redux-saga/delay-p */ "./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js");
  
  
  
  
  
  var konst = function konst(v) {
    return function () {
      return v;
    };
  };
  
  var kTrue = /*#__PURE__*/konst(true);
  
  var noop = function noop() {};
  
  if ( true && typeof Proxy !== 'undefined') {
    noop = /*#__PURE__*/new Proxy(noop, {
      set: function set() {
        throw internalErr('There was an attempt to assign a property to internal `noop` function.');
      }
    });
  }
  
  var identity = function identity(v) {
    return v;
  };
  
  var hasSymbol = typeof Symbol === 'function';
  var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
  
  function check(value, predicate, error) {
    if (!predicate(value)) {
      throw new Error(error);
    }
  }
  
  var assignWithSymbols = function assignWithSymbols(target, source) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(target, source);
  
    if (Object.getOwnPropertySymbols) {
      Object.getOwnPropertySymbols(source).forEach(function (s) {
        target[s] = source[s];
      });
    }
  };
  
  var flatMap = function flatMap(mapper, arr) {
    var _ref;
  
    return (_ref = []).concat.apply(_ref, arr.map(mapper));
  };
  
  function remove(array, item) {
    var index = array.indexOf(item);
  
    if (index >= 0) {
      array.splice(index, 1);
    }
  }
  
  function once(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
  
      called = true;
      fn();
    };
  }
  
  var kThrow = function kThrow(err) {
    throw err;
  };
  
  var kReturn = function kReturn(value) {
    return {
      value: value,
      done: true
    };
  };
  
  function makeIterator(next, thro, name) {
    if (thro === void 0) {
      thro = kThrow;
    }
  
    if (name === void 0) {
      name = 'iterator';
    }
  
    var iterator = {
      meta: {
        name: name
      },
      next: next,
      "throw": thro,
      "return": kReturn,
      isSagaIterator: true
    };
  
    if (typeof Symbol !== 'undefined') {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }
  
    return iterator;
  }
  
  function logError(error, _ref2) {
    var sagaStack = _ref2.sagaStack;
    /*eslint-disable no-console*/
  
    console.error(error);
    console.error(sagaStack);
  }
  
  var internalErr = function internalErr(err) {
    return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
  };
  
  var createSetContextWarning = function createSetContextWarning(ctx, props) {
    return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
  };
  
  var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array
  
  var createEmptyArray = function createEmptyArray(n) {
    return Array.apply(null, new Array(n));
  };
  
  var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
    return function (action) {
      if (true) {
        check(action, function (ac) {
          return !Object.isFrozen(ac);
        }, FROZEN_ACTION_ERROR);
      }
  
      return dispatch(Object.defineProperty(action, _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SAGA_ACTION"], {
        value: true
      }));
    };
  };
  
  var shouldTerminate = function shouldTerminate(res) {
    return res === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TERMINATE"];
  };
  
  var shouldCancel = function shouldCancel(res) {
    return res === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"];
  };
  
  var shouldComplete = function shouldComplete(res) {
    return shouldTerminate(res) || shouldCancel(res);
  };
  
  function createAllStyleChildCallbacks(shape, parentCallback) {
    var keys = Object.keys(shape);
    var totalCount = keys.length;
  
    if (true) {
      check(totalCount, function (c) {
        return c > 0;
      }, 'createAllStyleChildCallbacks: get an empty array or object');
    }
  
    var completedCount = 0;
    var completed;
    var results = Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["array"])(shape) ? createEmptyArray(totalCount) : {};
    var childCallbacks = {};
  
    function checkEnd() {
      if (completedCount === totalCount) {
        completed = true;
        parentCallback(results);
      }
    }
  
    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }
  
        if (isErr || shouldComplete(res)) {
          parentCallback.cancel();
          parentCallback(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEnd();
        }
      };
  
      chCbAtKey.cancel = noop;
      childCallbacks[key] = chCbAtKey;
    });
  
    parentCallback.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCallbacks[key].cancel();
        });
      }
    };
  
    return childCallbacks;
  }
  
  function getMetaInfo(fn) {
    return {
      name: fn.name || 'anonymous',
      location: getLocation(fn)
    };
  }
  
  function getLocation(instrumented) {
    return instrumented[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SAGA_LOCATION"]];
  }
  
  var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
  var ON_OVERFLOW_THROW = 1;
  var ON_OVERFLOW_DROP = 2;
  var ON_OVERFLOW_SLIDE = 3;
  var ON_OVERFLOW_EXPAND = 4;
  var zeroBuffer = {
    isEmpty: kTrue,
    put: noop,
    take: noop
  };
  
  function ringBuffer(limit, overflowAction) {
    if (limit === void 0) {
      limit = 10;
    }
  
    var arr = new Array(limit);
    var length = 0;
    var pushIndex = 0;
    var popIndex = 0;
  
    var push = function push(it) {
      arr[pushIndex] = it;
      pushIndex = (pushIndex + 1) % limit;
      length++;
    };
  
    var take = function take() {
      if (length != 0) {
        var it = arr[popIndex];
        arr[popIndex] = null;
        length--;
        popIndex = (popIndex + 1) % limit;
        return it;
      }
    };
  
    var flush = function flush() {
      var items = [];
  
      while (length) {
        items.push(take());
      }
  
      return items;
    };
  
    return {
      isEmpty: function isEmpty() {
        return length == 0;
      },
      put: function put(it) {
        if (length < limit) {
          push(it);
        } else {
          var doubledLimit;
  
          switch (overflowAction) {
            case ON_OVERFLOW_THROW:
              throw new Error(BUFFER_OVERFLOW);
  
            case ON_OVERFLOW_SLIDE:
              arr[pushIndex] = it;
              pushIndex = (pushIndex + 1) % limit;
              popIndex = pushIndex;
              break;
  
            case ON_OVERFLOW_EXPAND:
              doubledLimit = 2 * limit;
              arr = flush();
              length = arr.length;
              pushIndex = arr.length;
              popIndex = 0;
              arr.length = doubledLimit;
              limit = doubledLimit;
              push(it);
              break;
  
            default: // DROP
  
          }
        }
      },
      take: take,
      flush: flush
    };
  }
  
  var none = function none() {
    return zeroBuffer;
  };
  
  var fixed = function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  };
  
  var dropping = function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  };
  
  var sliding = function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  };
  
  var expanding = function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  };
  
  var buffers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    none: none,
    fixed: fixed,
    dropping: dropping,
    sliding: sliding,
    expanding: expanding
  });
  var TAKE = 'TAKE';
  var PUT = 'PUT';
  var ALL = 'ALL';
  var RACE = 'RACE';
  var CALL = 'CALL';
  var CPS = 'CPS';
  var FORK = 'FORK';
  var JOIN = 'JOIN';
  var CANCEL = 'CANCEL';
  var SELECT = 'SELECT';
  var ACTION_CHANNEL = 'ACTION_CHANNEL';
  var CANCELLED = 'CANCELLED';
  var FLUSH = 'FLUSH';
  var GET_CONTEXT = 'GET_CONTEXT';
  var SET_CONTEXT = 'SET_CONTEXT';
  var effectTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TAKE: TAKE,
    PUT: PUT,
    ALL: ALL,
    RACE: RACE,
    CALL: CALL,
    CPS: CPS,
    FORK: FORK,
    JOIN: JOIN,
    CANCEL: CANCEL,
    SELECT: SELECT,
    ACTION_CHANNEL: ACTION_CHANNEL,
    CANCELLED: CANCELLED,
    FLUSH: FLUSH,
    GET_CONTEXT: GET_CONTEXT,
    SET_CONTEXT: SET_CONTEXT
  });
  var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';
  
  var makeEffect = function makeEffect(type, payload) {
    var _ref;
  
    return _ref = {}, _ref[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["IO"]] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
  };
  
  var isForkEffect = function isForkEffect(eff) {
    return Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["effect"])(eff) && eff.type === FORK;
  };
  
  var detach = function detach(eff) {
    if (true) {
      check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
    }
  
    return makeEffect(FORK, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, eff.payload, {
      detached: true
    }));
  };
  
  function take(patternOrChannel, multicastPattern) {
    if (patternOrChannel === void 0) {
      patternOrChannel = '*';
    }
  
    if ( true && arguments.length) {
      check(arguments[0], _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'take(patternOrChannel): patternOrChannel is undefined');
    }
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["pattern"])(patternOrChannel)) {
      return makeEffect(TAKE, {
        pattern: patternOrChannel
      });
    }
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["multicast"])(patternOrChannel) && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"])(multicastPattern) && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["pattern"])(multicastPattern)) {
      return makeEffect(TAKE, {
        channel: patternOrChannel,
        pattern: multicastPattern
      });
    }
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["channel"])(patternOrChannel)) {
      return makeEffect(TAKE, {
        channel: patternOrChannel
      });
    }
  
    if (true) {
      throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
    }
  }
  
  var takeMaybe = function takeMaybe() {
    var eff = take.apply(void 0, arguments);
    eff.payload.maybe = true;
    return eff;
  };
  
  function put(channel$1, action) {
    if (true) {
      if (arguments.length > 1) {
        check(channel$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'put(channel, action): argument channel is undefined');
        check(channel$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["channel"], "put(channel, action): argument " + channel$1 + " is not a valid channel");
        check(action, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'put(channel, action): argument action is undefined');
      } else {
        check(channel$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'put(action): argument action is undefined');
      }
    }
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["undef"])(action)) {
      action = channel$1; // `undefined` instead of `null` to make default parameter work
  
      channel$1 = undefined;
    }
  
    return makeEffect(PUT, {
      channel: channel$1,
      action: action
    });
  }
  
  var putResolve = function putResolve() {
    var eff = put.apply(void 0, arguments);
    eff.payload.resolve = true;
    return eff;
  };
  
  function all(effects) {
    var eff = makeEffect(ALL, effects);
    eff.combinator = true;
    return eff;
  }
  
  function race(effects) {
    var eff = makeEffect(RACE, effects);
    eff.combinator = true;
    return eff;
  } // this match getFnCallDescriptor logic
  
  
  var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
    check(fnDescriptor, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], effectName + ": argument fn is undefined or null");
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"])(fnDescriptor)) {
      return;
    }
  
    var context = null;
    var fn;
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["array"])(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
      check(fn, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], effectName + ": argument of type [context, fn] has undefined or null `fn`");
    } else if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["object"])(fnDescriptor)) {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
      check(fn, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], effectName + ": argument of type {context, fn} has undefined or null `fn`");
    } else {
      check(fnDescriptor, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"], effectName + ": argument fn is not function");
      return;
    }
  
    if (context && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["string"])(fn)) {
      check(context[fn], _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"], effectName + ": context arguments has no such method - \"" + fn + "\"");
      return;
    }
  
    check(fn, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"], effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
  };
  
  function getFnCallDescriptor(fnDescriptor, args) {
    var context = null;
    var fn;
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"])(fnDescriptor)) {
      fn = fnDescriptor;
    } else {
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["array"])(fnDescriptor)) {
        context = fnDescriptor[0];
        fn = fnDescriptor[1];
      } else {
        context = fnDescriptor.context;
        fn = fnDescriptor.fn;
      }
  
      if (context && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["string"])(fn) && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"])(context[fn])) {
        fn = context[fn];
      }
    }
  
    return {
      context: context,
      fn: fn,
      args: args
    };
  }
  
  var isNotDelayEffect = function isNotDelayEffect(fn) {
    return fn !== delay;
  };
  
  function call(fnDescriptor) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    if (true) {
      var arg0 = typeof args[0] === 'number' ? args[0] : 'ms';
      check(fnDescriptor, isNotDelayEffect, "instead of writing `yield call(delay, " + arg0 + ")` where delay is an effect from `redux-saga/effects` you should write `yield delay(" + arg0 + ")`");
      validateFnDescriptor('call', fnDescriptor);
    }
  
    return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
  }
  
  function apply(context, fn, args) {
    if (args === void 0) {
      args = [];
    }
  
    var fnDescriptor = [context, fn];
  
    if (true) {
      validateFnDescriptor('apply', fnDescriptor);
    }
  
    return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
  }
  
  function cps(fnDescriptor) {
    if (true) {
      validateFnDescriptor('cps', fnDescriptor);
    }
  
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
  
    return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
  }
  
  function fork(fnDescriptor) {
    if (true) {
      validateFnDescriptor('fork', fnDescriptor);
      check(fnDescriptor, function (arg) {
        return !Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["effect"])(arg);
      }, 'fork: argument must not be an effect');
    }
  
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
  
    return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
  }
  
  function spawn(fnDescriptor) {
    if (true) {
      validateFnDescriptor('spawn', fnDescriptor);
    }
  
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
  
    return detach(fork.apply(void 0, [fnDescriptor].concat(args)));
  }
  
  function join(taskOrTasks) {
    if (true) {
      if (arguments.length > 1) {
        throw new Error('join(...tasks) is not supported any more. Please use join([...tasks]) to join multiple tasks.');
      }
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["array"])(taskOrTasks)) {
        taskOrTasks.forEach(function (t) {
          check(t, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["task"], "join([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
        });
      } else {
        check(taskOrTasks, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["task"], "join(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
      }
    }
  
    return makeEffect(JOIN, taskOrTasks);
  }
  
  function cancel(taskOrTasks) {
    if (taskOrTasks === void 0) {
      taskOrTasks = _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SELF_CANCELLATION"];
    }
  
    if (true) {
      if (arguments.length > 1) {
        throw new Error('cancel(...tasks) is not supported any more. Please use cancel([...tasks]) to cancel multiple tasks.');
      }
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["array"])(taskOrTasks)) {
        taskOrTasks.forEach(function (t) {
          check(t, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["task"], "cancel([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
        });
      } else if (taskOrTasks !== _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SELF_CANCELLATION"] && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"])(taskOrTasks)) {
        check(taskOrTasks, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["task"], "cancel(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
      }
    }
  
    return makeEffect(CANCEL, taskOrTasks);
  }
  
  function select(selector) {
    if (selector === void 0) {
      selector = identity;
    }
  
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }
  
    if ( true && arguments.length) {
      check(arguments[0], _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'select(selector, [...]): argument selector is undefined');
      check(selector, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["func"], "select(selector, [...]): argument " + selector + " is not a function");
    }
  
    return makeEffect(SELECT, {
      selector: selector,
      args: args
    });
  }
  /**
    channel(pattern, [buffer])    => creates a proxy channel for store actions
  **/
  
  
  function actionChannel(pattern$1, buffer$1) {
    if (true) {
      check(pattern$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["pattern"], 'actionChannel(pattern,...): argument pattern is not valid');
  
      if (arguments.length > 1) {
        check(buffer$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["notUndef"], 'actionChannel(pattern, buffer): argument buffer is undefined');
        check(buffer$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["buffer"], "actionChannel(pattern, buffer): argument " + buffer$1 + " is not a valid buffer");
      }
    }
  
    return makeEffect(ACTION_CHANNEL, {
      pattern: pattern$1,
      buffer: buffer$1
    });
  }
  
  function cancelled() {
    return makeEffect(CANCELLED, {});
  }
  
  function flush(channel$1) {
    if (true) {
      check(channel$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["channel"], "flush(channel): argument " + channel$1 + " is not valid channel");
    }
  
    return makeEffect(FLUSH, channel$1);
  }
  
  function getContext(prop) {
    if (true) {
      check(prop, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["string"], "getContext(prop): argument " + prop + " is not a string");
    }
  
    return makeEffect(GET_CONTEXT, prop);
  }
  
  function setContext(props) {
    if (true) {
      check(props, _redux_saga_is__WEBPACK_IMPORTED_MODULE_2__["object"], createSetContextWarning(null, props));
    }
  
    return makeEffect(SET_CONTEXT, props);
  }
  
  var delay = /*#__PURE__*/call.bind(null, _redux_saga_delay_p__WEBPACK_IMPORTED_MODULE_3__["default"]);
  
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/core/dist/redux-saga-core.esm.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@redux-saga/core/dist/redux-saga-core.esm.js ***!
    \*******************************************************************/
  /*! exports provided: CANCEL, SAGA_LOCATION, buffers, detach, default, END, channel, eventChannel, isEnd, multicastChannel, runSaga, stdChannel */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return END; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return channel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventChannel", function() { return eventChannel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnd", function() { return isEnd; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multicastChannel", function() { return multicastChannel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runSaga", function() { return runSaga; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stdChannel", function() { return stdChannel; });
  /* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @redux-saga/symbols */ "./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["CANCEL"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAGA_LOCATION", function() { return _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SAGA_LOCATION"]; });
  
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
  /* harmony import */ var _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @redux-saga/is */ "./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js");
  /* harmony import */ var _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./io-6de156f3.js */ "./node_modules/@redux-saga/core/dist/io-6de156f3.js");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["H"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["I"]; });
  
  /* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
  /* harmony import */ var _redux_saga_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @redux-saga/deferred */ "./node_modules/@redux-saga/deferred/dist/redux-saga-deferred.esm.js");
  /* harmony import */ var _redux_saga_delay_p__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @redux-saga/delay-p */ "./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js");
  
  
  
  
  
  
  
  
  
  
  var queue = [];
  /**
    Variable to hold a counting semaphore
    - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
      already suspended)
    - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
      triggers flushing the queued tasks.
  **/
  
  var semaphore = 0;
  /**
    Executes a task 'atomically'. Tasks scheduled during this execution will be queued
    and flushed after this task has finished (assuming the scheduler endup in a released
    state).
  **/
  
  function exec(task) {
    try {
      suspend();
      task();
    } finally {
      release();
    }
  }
  /**
    Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
  **/
  
  
  function asap(task) {
    queue.push(task);
  
    if (!semaphore) {
      suspend();
      flush();
    }
  }
  /**
   * Puts the scheduler in a `suspended` state and executes a task immediately.
   */
  
  
  function immediately(task) {
    try {
      suspend();
      return task();
    } finally {
      flush();
    }
  }
  /**
    Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
    scheduler is released.
  **/
  
  
  function suspend() {
    semaphore++;
  }
  /**
    Puts the scheduler in a `released` state.
  **/
  
  
  function release() {
    semaphore--;
  }
  /**
    Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
  **/
  
  
  function flush() {
    release();
    var task;
  
    while (!semaphore && (task = queue.shift()) !== undefined) {
      exec(task);
    }
  }
  
  var array = function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  };
  
  var predicate = function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  };
  
  var string = function string(pattern) {
    return function (input) {
      return input.type === String(pattern);
    };
  };
  
  var symbol = function symbol(pattern) {
    return function (input) {
      return input.type === pattern;
    };
  };
  
  var wildcard = function wildcard() {
    return _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["k"];
  };
  
  function matcher(pattern) {
    // prettier-ignore
    var matcherCreator = pattern === '*' ? wildcard : Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["string"])(pattern) ? string : Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"])(pattern) ? array : Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["stringableFunc"])(pattern) ? string : Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"])(pattern) ? predicate : Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["symbol"])(pattern) ? symbol : null;
  
    if (matcherCreator === null) {
      throw new Error("invalid pattern: " + pattern);
    }
  
    return matcherCreator(pattern);
  }
  
  var END = {
    type: _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_END_TYPE"]
  };
  
  var isEnd = function isEnd(a) {
    return a && a.type === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_END_TYPE"];
  };
  
  var CLOSED_CHANNEL_WITH_TAKERS = 'Cannot have a closed channel with pending takers';
  var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
  var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
  
  function channel(buffer$1) {
    if (buffer$1 === void 0) {
      buffer$1 = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["e"])();
    }
  
    var closed = false;
    var takers = [];
  
    if (true) {
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(buffer$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["buffer"], INVALID_BUFFER);
    }
  
    function checkForbiddenStates() {
      if (closed && takers.length) {
        throw Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["i"])(CLOSED_CHANNEL_WITH_TAKERS);
      }
  
      if (takers.length && !buffer$1.isEmpty()) {
        throw Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["i"])('Cannot have pending takers with non empty buffer');
      }
    }
  
    function put(input) {
      if (true) {
        checkForbiddenStates();
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(input, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"], UNDEFINED_INPUT_ERROR);
      }
  
      if (closed) {
        return;
      }
  
      if (takers.length === 0) {
        return buffer$1.put(input);
      }
  
      var cb = takers.shift();
      cb(input);
    }
  
    function take(cb) {
      if (true) {
        checkForbiddenStates();
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(cb, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], "channel.take's callback must be a function");
      }
  
      if (closed && buffer$1.isEmpty()) {
        cb(END);
      } else if (!buffer$1.isEmpty()) {
        cb(buffer$1.take());
      } else {
        takers.push(cb);
  
        cb.cancel = function () {
          Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["r"])(takers, cb);
        };
      }
    }
  
    function flush(cb) {
      if (true) {
        checkForbiddenStates();
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(cb, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], "channel.flush' callback must be a function");
      }
  
      if (closed && buffer$1.isEmpty()) {
        cb(END);
        return;
      }
  
      cb(buffer$1.flush());
    }
  
    function close() {
      if (true) {
        checkForbiddenStates();
      }
  
      if (closed) {
        return;
      }
  
      closed = true;
      var arr = takers;
      takers = [];
  
      for (var i = 0, len = arr.length; i < len; i++) {
        var taker = arr[i];
        taker(END);
      }
    }
  
    return {
      take: take,
      put: put,
      flush: flush,
      close: close
    };
  }
  
  function eventChannel(subscribe, buffer) {
    if (buffer === void 0) {
      buffer = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["n"])();
    }
  
    var closed = false;
    var unsubscribe;
    var chan = channel(buffer);
  
    var close = function close() {
      if (closed) {
        return;
      }
  
      closed = true;
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"])(unsubscribe)) {
        unsubscribe();
      }
  
      chan.close();
    };
  
    unsubscribe = subscribe(function (input) {
      if (isEnd(input)) {
        close();
        return;
      }
  
      chan.put(input);
    });
  
    if (true) {
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(unsubscribe, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], 'in eventChannel: subscribe should return a function to unsubscribe');
    }
  
    unsubscribe = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["o"])(unsubscribe);
  
    if (closed) {
      unsubscribe();
    }
  
    return {
      take: chan.take,
      flush: chan.flush,
      close: close
    };
  }
  
  function multicastChannel() {
    var _ref;
  
    var closed = false;
    var currentTakers = [];
    var nextTakers = currentTakers;
  
    function checkForbiddenStates() {
      if (closed && nextTakers.length) {
        throw Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["i"])(CLOSED_CHANNEL_WITH_TAKERS);
      }
    }
  
    var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
      if (nextTakers !== currentTakers) {
        return;
      }
  
      nextTakers = currentTakers.slice();
    };
  
    var close = function close() {
      if (true) {
        checkForbiddenStates();
      }
  
      closed = true;
      var takers = currentTakers = nextTakers;
      nextTakers = [];
      takers.forEach(function (taker) {
        taker(END);
      });
    };
  
    return _ref = {}, _ref[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["MULTICAST"]] = true, _ref.put = function put(input) {
      if (true) {
        checkForbiddenStates();
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(input, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"], UNDEFINED_INPUT_ERROR);
      }
  
      if (closed) {
        return;
      }
  
      if (isEnd(input)) {
        close();
        return;
      }
  
      var takers = currentTakers = nextTakers;
  
      for (var i = 0, len = takers.length; i < len; i++) {
        var taker = takers[i];
  
        if (taker[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["MATCH"]](input)) {
          taker.cancel();
          taker(input);
        }
      }
    }, _ref.take = function take(cb, matcher) {
      if (matcher === void 0) {
        matcher = wildcard;
      }
  
      if (true) {
        checkForbiddenStates();
      }
  
      if (closed) {
        cb(END);
        return;
      }
  
      cb[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["MATCH"]] = matcher;
      ensureCanMutateNextTakers();
      nextTakers.push(cb);
      cb.cancel = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["o"])(function () {
        ensureCanMutateNextTakers();
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["r"])(nextTakers, cb);
      });
    }, _ref.close = close, _ref;
  }
  
  function stdChannel() {
    var chan = multicastChannel();
    var put = chan.put;
  
    chan.put = function (input) {
      if (input[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SAGA_ACTION"]]) {
        put(input);
        return;
      }
  
      asap(function () {
        put(input);
      });
    };
  
    return chan;
  }
  
  var RUNNING = 0;
  var CANCELLED = 1;
  var ABORTED = 2;
  var DONE = 3;
  
  function resolvePromise(promise, cb) {
    var cancelPromise = promise[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["CANCEL"]];
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"])(cancelPromise)) {
      cb.cancel = cancelPromise;
    }
  
    promise.then(cb, function (error) {
      cb(error, true);
    });
  }
  
  var current = 0;
  
  var nextSagaId = function nextSagaId() {
    return ++current;
  };
  
  var _effectRunnerMap;
  
  function getIteratorMetaInfo(iterator, fn) {
    if (iterator.isSagaIterator) {
      return {
        name: iterator.meta.name
      };
    }
  
    return Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["j"])(fn);
  }
  
  function createTaskIterator(_ref) {
    var context = _ref.context,
        fn = _ref.fn,
        args = _ref.args; // catch synchronous failures; see #152 and #441
  
    try {
      var result = fn.apply(context, args); // i.e. a generator function returns an iterator
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["iterator"])(result)) {
        return result;
      }
  
      var resolved = false;
  
      var next = function next(arg) {
        if (!resolved) {
          resolved = true; // Only promises returned from fork will be interpreted. See #1573
  
          return {
            value: result,
            done: !Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["promise"])(result)
          };
        } else {
          return {
            value: arg,
            done: true
          };
        }
      };
  
      return Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["q"])(next);
    } catch (err) {
      // do not bubble up synchronous failures for detached forks
      // instead create a failed task. See #152 and #441
      return Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["q"])(function () {
        throw err;
      });
    }
  }
  
  function runPutEffect(env, _ref2, cb) {
    var channel = _ref2.channel,
        action = _ref2.action,
        resolve = _ref2.resolve;
    /**
     Schedule the put in case another saga is holding a lock.
     The put will be executed atomically. ie nested puts will execute after
     this put has terminated.
     **/
  
    asap(function () {
      var result;
  
      try {
        result = (channel ? channel.put : env.dispatch)(action);
      } catch (error) {
        cb(error, true);
        return;
      }
  
      if (resolve && Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["promise"])(result)) {
        resolvePromise(result, cb);
      } else {
        cb(result);
      }
    }); // Put effects are non cancellables
  }
  
  function runTakeEffect(env, _ref3, cb) {
    var _ref3$channel = _ref3.channel,
        channel = _ref3$channel === void 0 ? env.channel : _ref3$channel,
        pattern = _ref3.pattern,
        maybe = _ref3.maybe;
  
    var takeCb = function takeCb(input) {
      if (input instanceof Error) {
        cb(input, true);
        return;
      }
  
      if (isEnd(input) && !maybe) {
        cb(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TERMINATE"]);
        return;
      }
  
      cb(input);
    };
  
    try {
      channel.take(takeCb, Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"])(pattern) ? matcher(pattern) : null);
    } catch (err) {
      cb(err, true);
      return;
    }
  
    cb.cancel = takeCb.cancel;
  }
  
  function runCallEffect(env, _ref4, cb, _ref5) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;
    var task = _ref5.task; // catch synchronous failures; see #152
  
    try {
      var result = fn.apply(context, args);
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["promise"])(result)) {
        resolvePromise(result, cb);
        return;
      }
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["iterator"])(result)) {
        // resolve iterator
        proc(env, result, task.context, current, Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["j"])(fn),
        /* isRoot */
        false, cb);
        return;
      }
  
      cb(result);
    } catch (error) {
      cb(error, true);
    }
  }
  
  function runCPSEffect(env, _ref6, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args; // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb
    // catch synchronous failures; see #152
  
    try {
      var cpsCb = function cpsCb(err, res) {
        if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["undef"])(err)) {
          cb(res);
        } else {
          cb(err, true);
        }
      };
  
      fn.apply(context, args.concat(cpsCb));
  
      if (cpsCb.cancel) {
        cb.cancel = cpsCb.cancel;
      }
    } catch (error) {
      cb(error, true);
    }
  }
  
  function runForkEffect(env, _ref7, cb, _ref8) {
    var context = _ref7.context,
        fn = _ref7.fn,
        args = _ref7.args,
        detached = _ref7.detached;
    var parent = _ref8.task;
    var taskIterator = createTaskIterator({
      context: context,
      fn: fn,
      args: args
    });
    var meta = getIteratorMetaInfo(taskIterator, fn);
    immediately(function () {
      var child = proc(env, taskIterator, parent.context, current, meta, detached, undefined);
  
      if (detached) {
        cb(child);
      } else {
        if (child.isRunning()) {
          parent.queue.addTask(child);
          cb(child);
        } else if (child.isAborted()) {
          parent.queue.abort(child.error());
        } else {
          cb(child);
        }
      }
    }); // Fork effects are non cancellables
  }
  
  function runJoinEffect(env, taskOrTasks, cb, _ref9) {
    var task = _ref9.task;
  
    var joinSingleTask = function joinSingleTask(taskToJoin, cb) {
      if (taskToJoin.isRunning()) {
        var joiner = {
          task: task,
          cb: cb
        };
  
        cb.cancel = function () {
          if (taskToJoin.isRunning()) Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["r"])(taskToJoin.joiners, joiner);
        };
  
        taskToJoin.joiners.push(joiner);
      } else {
        if (taskToJoin.isAborted()) {
          cb(taskToJoin.error(), true);
        } else {
          cb(taskToJoin.result());
        }
      }
    };
  
    if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"])(taskOrTasks)) {
      if (taskOrTasks.length === 0) {
        cb([]);
        return;
      }
  
      var childCallbacks = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["l"])(taskOrTasks, cb);
      taskOrTasks.forEach(function (t, i) {
        joinSingleTask(t, childCallbacks[i]);
      });
    } else {
      joinSingleTask(taskOrTasks, cb);
    }
  }
  
  function cancelSingleTask(taskToCancel) {
    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }
  }
  
  function runCancelEffect(env, taskOrTasks, cb, _ref10) {
    var task = _ref10.task;
  
    if (taskOrTasks === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SELF_CANCELLATION"]) {
      cancelSingleTask(task);
    } else if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"])(taskOrTasks)) {
      taskOrTasks.forEach(cancelSingleTask);
    } else {
      cancelSingleTask(taskOrTasks);
    }
  
    cb(); // cancel effects are non cancellables
  }
  
  function runAllEffect(env, effects, cb, _ref11) {
    var digestEffect = _ref11.digestEffect;
    var effectId = current;
    var keys = Object.keys(effects);
  
    if (keys.length === 0) {
      cb(Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"])(effects) ? [] : {});
      return;
    }
  
    var childCallbacks = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["l"])(effects, cb);
    keys.forEach(function (key) {
      digestEffect(effects[key], effectId, childCallbacks[key], key);
    });
  }
  
  function runRaceEffect(env, effects, cb, _ref12) {
    var digestEffect = _ref12.digestEffect;
    var effectId = current;
    var keys = Object.keys(effects);
    var response = Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"])(effects) ? Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["m"])(keys.length) : {};
    var childCbs = {};
    var completed = false;
    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }
  
        if (isErr || Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["s"])(res)) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, isErr);
        } else {
          cb.cancel();
          completed = true;
          response[key] = res;
          cb(response);
        }
      };
  
      chCbAtKey.cancel = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      childCbs[key] = chCbAtKey;
    });
  
    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
  
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
  
      digestEffect(effects[key], effectId, childCbs[key], key);
    });
  }
  
  function runSelectEffect(env, _ref13, cb) {
    var selector = _ref13.selector,
        args = _ref13.args;
  
    try {
      var state = selector.apply(void 0, [env.getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }
  
  function runChannelEffect(env, _ref14, cb) {
    var pattern = _ref14.pattern,
        buffer = _ref14.buffer;
    var chan = channel(buffer);
    var match = matcher(pattern);
  
    var taker = function taker(action) {
      if (!isEnd(action)) {
        env.channel.take(taker, match);
      }
  
      chan.put(action);
    };
  
    var close = chan.close;
  
    chan.close = function () {
      taker.cancel();
      close();
    };
  
    env.channel.take(taker, match);
    cb(chan);
  }
  
  function runCancelledEffect(env, data, cb, _ref15) {
    var task = _ref15.task;
    cb(task.isCancelled());
  }
  
  function runFlushEffect(env, channel, cb) {
    channel.flush(cb);
  }
  
  function runGetContextEffect(env, prop, cb, _ref16) {
    var task = _ref16.task;
    cb(task.context[prop]);
  }
  
  function runSetContextEffect(env, props, cb, _ref17) {
    var task = _ref17.task;
    Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["p"])(task.context, props);
    cb();
  }
  
  var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["T"]] = runTakeEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["P"]] = runPutEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["A"]] = runAllEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["R"]] = runRaceEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["C"]] = runCallEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["a"]] = runCPSEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["F"]] = runForkEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["J"]] = runJoinEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["b"]] = runCancelEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["S"]] = runSelectEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["d"]] = runChannelEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["f"]] = runCancelledEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["g"]] = runFlushEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["G"]] = runGetContextEffect, _effectRunnerMap[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["h"]] = runSetContextEffect, _effectRunnerMap);
  /**
   Used to track a parent task and its forks
   In the fork model, forked tasks are attached by default to their parent
   We model this using the concept of Parent task && main Task
   main task is the main flow of the current Generator, the parent tasks is the
   aggregation of the main tasks + all its forked tasks.
   Thus the whole model represents an execution tree with multiple branches (vs the
   linear execution tree in sequential (non parallel) programming)
  
   A parent tasks has the following semantics
   - It completes if all its forks either complete or all cancelled
   - If it's cancelled, all forks are cancelled as well
   - It aborts if any uncaught error bubbles up from forks
   - If it completes, the return value is the one returned by the main task
   **/
  
  function forkQueue(mainTask, onAbort, cont) {
    var tasks = [];
    var result;
    var completed = false;
    addTask(mainTask);
  
    var getTasks = function getTasks() {
      return tasks;
    };
  
    function abort(err) {
      onAbort();
      cancelAll();
      cont(err, true);
    }
  
    function addTask(task) {
      tasks.push(task);
  
      task.cont = function (res, isErr) {
        if (completed) {
          return;
        }
  
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["r"])(tasks, task);
        task.cont = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
  
        if (isErr) {
          abort(res);
        } else {
          if (task === mainTask) {
            result = res;
          }
  
          if (!tasks.length) {
            completed = true;
            cont(result);
          }
        }
      };
    }
  
    function cancelAll() {
      if (completed) {
        return;
      }
  
      completed = true;
      tasks.forEach(function (t) {
        t.cont = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
        t.cancel();
      });
      tasks = [];
    }
  
    return {
      addTask: addTask,
      cancelAll: cancelAll,
      abort: abort,
      getTasks: getTasks
    };
  } // there can be only a single saga error created at any given moment
  
  
  function formatLocation(fileName, lineNumber) {
    return fileName + "?" + lineNumber;
  }
  
  function effectLocationAsString(effect) {
    var location = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["v"])(effect);
  
    if (location) {
      var code = location.code,
          fileName = location.fileName,
          lineNumber = location.lineNumber;
      var source = code + "  " + formatLocation(fileName, lineNumber);
      return source;
    }
  
    return '';
  }
  
  function sagaLocationAsString(sagaMeta) {
    var name = sagaMeta.name,
        location = sagaMeta.location;
  
    if (location) {
      return name + "  " + formatLocation(location.fileName, location.lineNumber);
    }
  
    return name;
  }
  
  function cancelledTasksAsString(sagaStack) {
    var cancelledTasks = Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["u"])(function (i) {
      return i.cancelledTasks;
    }, sagaStack);
  
    if (!cancelledTasks.length) {
      return '';
    }
  
    return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
  }
  
  var crashedEffect = null;
  var sagaStack = [];
  
  var addSagaFrame = function addSagaFrame(frame) {
    frame.crashedEffect = crashedEffect;
    sagaStack.push(frame);
  };
  
  var clear = function clear() {
    crashedEffect = null;
    sagaStack.length = 0;
  }; // this sets crashed effect for the soon-to-be-reported saga frame
  // this slightly streatches the singleton nature of this module into wrong direction
  // as it's even less obvious what's the data flow here, but it is what it is for now
  
  
  var setCrashedEffect = function setCrashedEffect(effect) {
    crashedEffect = effect;
  };
  /**
    @returns {string}
  
    @example
    The above error occurred in task errorInPutSaga {pathToFile}
    when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
        created by fetchSaga {pathToFile}
        created by rootSaga {pathToFile}
  */
  
  
  var toString = function toString() {
    var firstSaga = sagaStack[0],
        otherSagas = sagaStack.slice(1);
    var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
    var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
    return [errorMessage].concat(otherSagas.map(function (s) {
      return "    created by " + sagaLocationAsString(s.meta);
    }), [cancelledTasksAsString(sagaStack)]).join('\n');
  };
  
  function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
    var _task;
  
    if (cont === void 0) {
      cont = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
    }
  
    var status = RUNNING;
    var taskResult;
    var taskError;
    var deferredEnd = null;
    var cancelledDueToErrorTasks = [];
    var context = Object.create(parentContext);
    var queue = forkQueue(mainTask, function onAbort() {
      cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue.getTasks().map(function (t) {
        return t.meta.name;
      }));
    }, end);
    /**
     This may be called by a parent generator to trigger/propagate cancellation
     cancel all pending tasks (including the main task), then end the current task.
      Cancellation propagates down to the whole execution tree held by this Parent task
     It's also propagated to all joiners of this task and their execution tree/joiners
      Cancellation is noop for terminated/Cancelled tasks tasks
     **/
  
    function cancel() {
      if (status === RUNNING) {
        // Setting status to CANCELLED does not necessarily mean that the task/iterators are stopped
        // effects in the iterator's finally block will still be executed
        status = CANCELLED;
        queue.cancelAll(); // Ending with a TASK_CANCEL will propagate the Cancellation to all joiners
  
        end(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"], false);
      }
    }
  
    function end(result, isErr) {
      if (!isErr) {
        // The status here may be RUNNING or CANCELLED
        // If the status is CANCELLED, then we do not need to change it here
        if (result === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"]) {
          status = CANCELLED;
        } else if (status !== CANCELLED) {
          status = DONE;
        }
  
        taskResult = result;
        deferredEnd && deferredEnd.resolve(result);
      } else {
        status = ABORTED;
        addSagaFrame({
          meta: meta,
          cancelledTasks: cancelledDueToErrorTasks
        });
  
        if (task.isRoot) {
          var sagaStack = toString(); // we've dumped the saga stack to string and are passing it to user's code
          // we know that it won't be needed anymore and we need to clear it
  
          clear();
          env.onError(result, {
            sagaStack: sagaStack
          });
        }
  
        taskError = result;
        deferredEnd && deferredEnd.reject(result);
      }
  
      task.cont(result, isErr);
      task.joiners.forEach(function (joiner) {
        joiner.cb(result, isErr);
      });
      task.joiners = null;
    }
  
    function setContext(props) {
      if (true) {
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(props, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["object"], Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["w"])('task', props));
      }
  
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["p"])(context, props);
    }
  
    function toPromise() {
      if (deferredEnd) {
        return deferredEnd.promise;
      }
  
      deferredEnd = Object(_redux_saga_deferred__WEBPACK_IMPORTED_MODULE_6__["default"])();
  
      if (status === ABORTED) {
        deferredEnd.reject(taskError);
      } else if (status !== RUNNING) {
        deferredEnd.resolve(taskResult);
      }
  
      return deferredEnd.promise;
    }
  
    var task = (_task = {}, _task[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK"]] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
      return status === RUNNING;
    }, _task.isCancelled = function isCancelled() {
      return status === CANCELLED || status === RUNNING && mainTask.status === CANCELLED;
    }, _task.isAborted = function isAborted() {
      return status === ABORTED;
    }, _task.result = function result() {
      return taskResult;
    }, _task.error = function error() {
      return taskError;
    }, _task);
    return task;
  }
  
  function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
    if ( true && iterator$1[_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["x"]]) {
      throw new Error("redux-saga doesn't support async generators, please use only regular ones");
    }
  
    var finalRunEffect = env.finalizeRunEffect(runEffect);
    /**
      Tracks the current effect cancellation
      Each time the generator progresses. calling runEffect will set a new value
      on it. It allows propagating cancellation to child effects
    **/
  
    next.cancel = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
    /** Creates a main task to track the main flow */
  
    var mainTask = {
      meta: meta,
      cancel: cancelMain,
      status: RUNNING
    };
    /**
     Creates a new task descriptor for this generator.
     A task is the aggregation of it's mainTask and all it's forked tasks.
     **/
  
    var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
    var executingContext = {
      task: task,
      digestEffect: digestEffect
    };
    /**
      cancellation of the main task. We'll simply resume the Generator with a TASK_CANCEL
    **/
  
    function cancelMain() {
      if (mainTask.status === RUNNING) {
        mainTask.status = CANCELLED;
        next(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"]);
      }
    }
    /**
      attaches cancellation logic to this task's continuation
      this will permit cancellation to propagate down the call chain
    **/
  
  
    if (cont) {
      cont.cancel = task.cancel;
    } // kicks up the generator
  
  
    next(); // then return the task descriptor to the caller
  
    return task;
    /**
     * This is the generator driver
     * It's a recursive async/continuation function which calls itself
     * until the generator terminates or throws
     * @param {internal commands(TASK_CANCEL | TERMINATE) | any} arg - value, generator will be resumed with.
     * @param {boolean} isErr - the flag shows if effect finished with an error
     *
     * receives either (command | effect result, false) or (any thrown thing, true)
     */
  
    function next(arg, isErr) {
      try {
        var result;
  
        if (isErr) {
          result = iterator$1["throw"](arg); // user handled the error, we can clear bookkept values
  
          clear();
        } else if (Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["y"])(arg)) {
          /**
            getting TASK_CANCEL automatically cancels the main task
            We can get this value here
             - By cancelling the parent task manually
            - By joining a Cancelled task
          **/
          mainTask.status = CANCELLED;
          /**
            Cancels the current effect; this will propagate the cancellation down to any called tasks
          **/
  
          next.cancel();
          /**
            If this Generator has a `return` method then invokes it
            This will jump to the finally block
          **/
  
          result = Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"])(iterator$1["return"]) ? iterator$1["return"](_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"]) : {
            done: true,
            value: _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK_CANCEL"]
          };
        } else if (Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["z"])(arg)) {
          // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
          result = Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"])(iterator$1["return"]) ? iterator$1["return"]() : {
            done: true
          };
        } else {
          result = iterator$1.next(arg);
        }
  
        if (!result.done) {
          digestEffect(result.value, parentEffectId, next);
        } else {
          /**
            This Generator has ended, terminate the main task and notify the fork queue
          **/
          if (mainTask.status !== CANCELLED) {
            mainTask.status = DONE;
          }
  
          mainTask.cont(result.value);
        }
      } catch (error) {
        if (mainTask.status === CANCELLED) {
          throw error;
        }
  
        mainTask.status = ABORTED;
        mainTask.cont(error, true);
      }
    }
  
    function runEffect(effect, effectId, currCb) {
      /**
        each effect runner must attach its own logic of cancellation to the provided callback
        it allows this generator to propagate cancellation downward.
         ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
        And the setup must occur before calling the callback
         This is a sort of inversion of control: called async functions are responsible
        of completing the flow by calling the provided continuation; while caller functions
        are responsible for aborting the current flow by calling the attached cancel function
         Library users can attach their own cancellation logic to promises by defining a
        promise[CANCEL] method in their returned promises
        ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
      **/
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["promise"])(effect)) {
        resolvePromise(effect, currCb);
      } else if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["iterator"])(effect)) {
        // resolve iterator
        proc(env, effect, task.context, effectId, meta,
        /* isRoot */
        false, currCb);
      } else if (effect && effect[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["IO"]]) {
        var effectRunner = effectRunnerMap[effect.type];
        effectRunner(env, effect.payload, currCb, executingContext);
      } else {
        // anything else returned as is
        currCb(effect);
      }
    }
  
    function digestEffect(effect, parentEffectId, cb, label) {
      if (label === void 0) {
        label = '';
      }
  
      var effectId = nextSagaId();
      env.sagaMonitor && env.sagaMonitor.effectTriggered({
        effectId: effectId,
        parentEffectId: parentEffectId,
        label: label,
        effect: effect
      });
      /**
        completion callback and cancel callback are mutually exclusive
        We can't cancel an already completed effect
        And We can't complete an already cancelled effectId
      **/
  
      var effectSettled; // Completion callback passed to the appropriate effect runner
  
      function currCb(res, isErr) {
        if (effectSettled) {
          return;
        }
  
        effectSettled = true;
        cb.cancel = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"]; // defensive measure
  
        if (env.sagaMonitor) {
          if (isErr) {
            env.sagaMonitor.effectRejected(effectId, res);
          } else {
            env.sagaMonitor.effectResolved(effectId, res);
          }
        }
  
        if (isErr) {
          setCrashedEffect(effect);
        }
  
        cb(res, isErr);
      } // tracks down the current cancel
  
  
      currCb.cancel = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"]; // setup cancellation logic on the parent cb
  
      cb.cancel = function () {
        // prevents cancelling an already completed effect
        if (effectSettled) {
          return;
        }
  
        effectSettled = true;
        currCb.cancel(); // propagates cancel downward
  
        currCb.cancel = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"]; // defensive measure
  
        env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
      };
  
      finalRunEffect(effect, effectId, currCb);
    }
  }
  
  var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
  var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
  
  function runSaga(_ref, saga) {
    var _ref$channel = _ref.channel,
        channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
        dispatch = _ref.dispatch,
        getState = _ref.getState,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? {} : _ref$context,
        sagaMonitor = _ref.sagaMonitor,
        effectMiddlewares = _ref.effectMiddlewares,
        _ref$onError = _ref.onError,
        onError = _ref$onError === void 0 ? _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["B"] : _ref$onError;
  
    if (true) {
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(saga, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], NON_GENERATOR_ERR);
    }
  
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
  
    var iterator$1 = saga.apply(void 0, args);
  
    if (true) {
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(iterator$1, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["iterator"], NON_GENERATOR_ERR);
    }
  
    var effectId = nextSagaId();
  
    if (sagaMonitor) {
      // monitors are expected to have a certain interface, let's fill-in any missing ones
      sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.effectResolved = sagaMonitor.effectResolved || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.effectRejected = sagaMonitor.effectRejected || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["t"];
      sagaMonitor.rootSagaStarted({
        effectId: effectId,
        saga: saga,
        args: args
      });
    }
  
    if (true) {
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"])(dispatch)) {
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(dispatch, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], 'dispatch must be a function');
      }
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"])(getState)) {
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(getState, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], 'getState must be a function');
      }
  
      if (Object(_redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["notUndef"])(effectMiddlewares)) {
        var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(effectMiddlewares, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["array"], MIDDLEWARE_TYPE_ERROR);
        effectMiddlewares.forEach(function (effectMiddleware) {
          return Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(effectMiddleware, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], MIDDLEWARE_TYPE_ERROR);
        });
      }
  
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(onError, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["func"], 'onError passed to the redux-saga is not a function!');
    }
  
    var finalizeRunEffect;
  
    if (effectMiddlewares) {
      var middleware = redux__WEBPACK_IMPORTED_MODULE_5__["compose"].apply(void 0, effectMiddlewares);
  
      finalizeRunEffect = function finalizeRunEffect(runEffect) {
        return function (effect, effectId, currCb) {
          var plainRunEffect = function plainRunEffect(eff) {
            return runEffect(eff, effectId, currCb);
          };
  
          return middleware(plainRunEffect)(effect);
        };
      };
    } else {
      finalizeRunEffect = _io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["E"];
    }
  
    var env = {
      channel: channel,
      dispatch: Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["D"])(dispatch),
      getState: getState,
      sagaMonitor: sagaMonitor,
      onError: onError,
      finalizeRunEffect: finalizeRunEffect
    };
    return immediately(function () {
      var task = proc(env, iterator$1, context, effectId, Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["j"])(saga),
      /* isRoot */
      true, undefined);
  
      if (sagaMonitor) {
        sagaMonitor.effectResolved(effectId, task);
      }
  
      return task;
    });
  }
  
  function sagaMiddlewareFactory(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? {} : _ref$context,
        _ref$channel = _ref.channel,
        channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
        sagaMonitor = _ref.sagaMonitor,
        options = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["context", "channel", "sagaMonitor"]);
  
    var boundRunSaga;
  
    if (true) {
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(channel, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["channel"], 'options.channel passed to the Saga middleware is not a channel');
    }
  
    function sagaMiddleware(_ref2) {
      var getState = _ref2.getState,
          dispatch = _ref2.dispatch;
      boundRunSaga = runSaga.bind(null, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
        context: context,
        channel: channel,
        dispatch: dispatch,
        getState: getState,
        sagaMonitor: sagaMonitor
      }));
      return function (next) {
        return function (action) {
          if (sagaMonitor && sagaMonitor.actionDispatched) {
            sagaMonitor.actionDispatched(action);
          }
  
          var result = next(action); // hit reducers
  
          channel.put(action);
          return result;
        };
      };
    }
  
    sagaMiddleware.run = function () {
      if ( true && !boundRunSaga) {
        throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
      }
  
      return boundRunSaga.apply(void 0, arguments);
    };
  
    sagaMiddleware.setContext = function (props) {
      if (true) {
        Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["c"])(props, _redux_saga_is__WEBPACK_IMPORTED_MODULE_3__["object"], Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["w"])('sagaMiddleware', props));
      }
  
      Object(_io_6de156f3_js__WEBPACK_IMPORTED_MODULE_4__["p"])(context, props);
    };
  
    return sagaMiddleware;
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (sagaMiddlewareFactory);
  
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/deferred/dist/redux-saga-deferred.esm.js":
  /*!***************************************************************************!*\
    !*** ./node_modules/@redux-saga/deferred/dist/redux-saga-deferred.esm.js ***!
    \***************************************************************************/
  /*! exports provided: default, arrayOfDeferred */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOfDeferred", function() { return arrayOfDeferred; });
  function deferred() {
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    return def;
  }
  
  function arrayOfDeferred(length) {
    var arr = [];
  
    for (var i = 0; i < length; i++) {
      arr.push(deferred());
    }
  
    return arr;
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (deferred);
  
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js ***!
    \*************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @redux-saga/symbols */ "./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js");
  
  
  function delayP(ms, val) {
    if (val === void 0) {
      val = true;
    }
  
    var timeoutId;
    var promise = new Promise(function (resolve) {
      timeoutId = setTimeout(resolve, ms, val);
    });
  
    promise[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["CANCEL"]] = function () {
      clearTimeout(timeoutId);
    };
  
    return promise;
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (delayP);
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js":
  /*!***************************************************************!*\
    !*** ./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js ***!
    \***************************************************************/
  /*! exports provided: array, buffer, channel, effect, func, iterable, iterator, multicast, notUndef, number, object, observable, pattern, promise, sagaAction, string, stringableFunc, symbol, task, undef */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return buffer; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return channel; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "effect", function() { return effect; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterable", function() { return iterable; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterator", function() { return iterator; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return multicast; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notUndef", function() { return notUndef; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object", function() { return object; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pattern", function() { return pattern; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promise", function() { return promise; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sagaAction", function() { return sagaAction; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringableFunc", function() { return stringableFunc; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return symbol; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "task", function() { return task; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undef", function() { return undef; });
  /* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @redux-saga/symbols */ "./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js");
  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
  
  
  
  var undef = function undef(v) {
    return v === null || v === undefined;
  };
  
  var notUndef = function notUndef(v) {
    return v !== null && v !== undefined;
  };
  
  var func = function func(f) {
    return typeof f === 'function';
  };
  
  var number = function number(n) {
    return typeof n === 'number';
  };
  
  var string = function string(s) {
    return typeof s === 'string';
  };
  
  var array = Array.isArray;
  
  var object = function object(obj) {
    return obj && !array(obj) && _typeof(obj) === 'object';
  };
  
  var promise = function promise(p) {
    return p && func(p.then);
  };
  
  var iterator = function iterator(it) {
    return it && func(it.next) && func(it["throw"]);
  };
  
  var iterable = function iterable(it) {
    return it && func(Symbol) ? func(it[Symbol.iterator]) : array(it);
  };
  
  var task = function task(t) {
    return t && t[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["TASK"]];
  };
  
  var sagaAction = function sagaAction(a) {
    return Boolean(a && a[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["SAGA_ACTION"]]);
  };
  
  var observable = function observable(ob) {
    return ob && func(ob.subscribe);
  };
  
  var buffer = function buffer(buf) {
    return buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
  };
  
  var pattern = function pattern(pat) {
    return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
  };
  
  var channel = function channel(ch) {
    return ch && func(ch.take) && func(ch.close);
  };
  
  var stringableFunc = function stringableFunc(f) {
    return func(f) && f.hasOwnProperty('toString');
  };
  
  var symbol = function symbol(sym) {
    return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
  };
  
  var multicast = function multicast(ch) {
    return channel(ch) && ch[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["MULTICAST"]];
  };
  
  var effect = function effect(eff) {
    return eff && eff[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__["IO"]];
  };
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js ***!
    \*************************************************************************/
  /*! exports provided: CANCEL, CHANNEL_END_TYPE, IO, MATCH, MULTICAST, SAGA_ACTION, SAGA_LOCATION, SELF_CANCELLATION, TASK, TASK_CANCEL, TERMINATE */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return CANCEL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_END_TYPE", function() { return CHANNEL_END_TYPE; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IO", function() { return IO; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MATCH", function() { return MATCH; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTICAST", function() { return MULTICAST; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAGA_ACTION", function() { return SAGA_ACTION; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAGA_LOCATION", function() { return SAGA_LOCATION; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELF_CANCELLATION", function() { return SELF_CANCELLATION; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TASK", function() { return TASK; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TASK_CANCEL", function() { return TASK_CANCEL; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TERMINATE", function() { return TERMINATE; });
  var createSymbol = function createSymbol(name) {
    return "@@redux-saga/" + name;
  };
  
  var CANCEL = /*#__PURE__*/createSymbol('CANCEL_PROMISE');
  var CHANNEL_END_TYPE = /*#__PURE__*/createSymbol('CHANNEL_END');
  var IO = /*#__PURE__*/createSymbol('IO');
  var MATCH = /*#__PURE__*/createSymbol('MATCH');
  var MULTICAST = /*#__PURE__*/createSymbol('MULTICAST');
  var SAGA_ACTION = /*#__PURE__*/createSymbol('SAGA_ACTION');
  var SELF_CANCELLATION = /*#__PURE__*/createSymbol('SELF_CANCELLATION');
  var TASK = /*#__PURE__*/createSymbol('TASK');
  var TASK_CANCEL = /*#__PURE__*/createSymbol('TASK_CANCEL');
  var TERMINATE = /*#__PURE__*/createSymbol('TERMINATE');
  var SAGA_LOCATION = /*#__PURE__*/createSymbol('LOCATION');
  
  
  /***/ }),
  
  /***/ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js ***!
    \***********************************************************************/
  /*! exports provided: CANCEL, SAGA_LOCATION, buffers, detach, END, channel, eventChannel, isEnd, multicastChannel, runSaga, stdChannel, default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @redux-saga/core */ "./node_modules/@redux-saga/core/dist/redux-saga-core.esm.js");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["CANCEL"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAGA_LOCATION", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["SAGA_LOCATION"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["buffers"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["detach"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "END", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["END"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["channel"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventChannel", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["eventChannel"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnd", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["isEnd"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multicastChannel", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["multicastChannel"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "runSaga", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["runSaga"]; });
  
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stdChannel", function() { return _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["stdChannel"]; });
  
  
  
  /* harmony default export */ __webpack_exports__["default"] = (_redux_saga_core__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  /***/ }),
  
  /***/ "./node_modules/redux/es/redux.js":
  /*!****************************************!*\
    !*** ./node_modules/redux/es/redux.js ***!
    \****************************************/
  /*! exports provided: __DO_NOT_USE__ActionTypes, applyMiddleware, bindActionCreators, combineReducers, compose, createStore */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
  /* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");
  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
  
  
  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  
  var randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
  };
  
  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };
  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  
  function isPlainObject(obj) {
    if (_typeof(obj) !== 'object' || obj === null) return false;
    var proto = obj;
  
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
  
    return Object.getPrototypeOf(obj) === proto;
  }
  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
  
  
  function createStore(reducer, preloadedState, enhancer) {
    var _ref2;
  
    if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
      throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
    }
  
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
      enhancer = preloadedState;
      preloadedState = undefined;
    }
  
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error('Expected the enhancer to be a function.');
      }
  
      return enhancer(createStore)(reducer, preloadedState);
    }
  
    if (typeof reducer !== 'function') {
      throw new Error('Expected the reducer to be a function.');
    }
  
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    /**
     * This makes a shallow copy of currentListeners so we can use
     * nextListeners as a temporary list while dispatching.
     *
     * This prevents any bugs around consumers calling
     * subscribe/unsubscribe in the middle of a dispatch.
     */
  
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */
  
  
    function getState() {
      if (isDispatching) {
        throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
      }
  
      return currentState;
    }
    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all state changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */
  
  
    function subscribe(listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected the listener to be a function.');
      }
  
      if (isDispatching) {
        throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }
  
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
  
        if (isDispatching) {
          throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
        }
  
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */
  
  
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
      }
  
      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
      }
  
      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }
  
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
  
      var listeners = currentListeners = nextListeners;
  
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
      }
  
      return action;
    }
    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */
  
  
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error('Expected the nextReducer to be a function.');
      }
  
      currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
      // Any reducers that existed in both the new and old rootReducer
      // will receive the previous state. This effectively populates
      // the new state tree with any relevant data from the old one.
  
      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    /**
     * Interoperability point for observable/reactive libraries.
     * @returns {observable} A minimal observable of state changes.
     * For more information, see the observable proposal:
     * https://github.com/tc39/proposal-observable
     */
  
  
    function observable() {
      var _ref;
  
      var outerSubscribe = subscribe;
      return _ref = {
        /**
         * The minimal observable subscription method.
         * @param {Object} observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns {subscription} An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe: function subscribe(observer) {
          if (_typeof(observer) !== 'object' || observer === null) {
            throw new TypeError('Expected the observer to be an object.');
          }
  
          function observeState() {
            if (observer.next) {
              observer.next(getState());
            }
          }
  
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe: unsubscribe
          };
        }
      }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
        return this;
      }, _ref;
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
  
  
    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
  }
  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  
  
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */
  
  
    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
    } catch (e) {} // eslint-disable-line no-empty
  
  }
  
  function getUndefinedStateErrorMessage(key, action) {
    var actionType = action && action.type;
    var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
    return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
  }
  
  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  
    if (reducerKeys.length === 0) {
      return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
    }
  
    if (!isPlainObject(inputState)) {
      return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
    }
  
    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function (key) {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE) return;
  
    if (unexpectedKeys.length > 0) {
      return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
    }
  }
  
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function (key) {
      var reducer = reducers[key];
      var initialState = reducer(undefined, {
        type: ActionTypes.INIT
      });
  
      if (typeof initialState === 'undefined') {
        throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
      }
  
      if (typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === 'undefined') {
        throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
      }
    });
  }
  /**
   * Turns an object whose values are different reducer functions, into a single
   * reducer function. It will call every child reducer, and gather their results
   * into a single state object, whose keys correspond to the keys of the passed
   * reducer functions.
   *
   * @param {Object} reducers An object whose values correspond to different
   * reducer functions that need to be combined into one. One handy way to obtain
   * it is to use ES6 `import * as reducers` syntax. The reducers may never return
   * undefined for any action. Instead, they should return their initial state
   * if the state passed to them was undefined, and the current state for any
   * unrecognized action.
   *
   * @returns {Function} A reducer function that invokes every reducer inside the
   * passed object, and builds a state object with the same shape.
   */
  
  
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
  
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i];
  
      if (true) {
        if (typeof reducers[key] === 'undefined') {
          warning("No reducer provided for key \"" + key + "\"");
        }
      }
  
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }
  
    var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
    // keys multiple times.
  
    var unexpectedKeyCache;
  
    if (true) {
      unexpectedKeyCache = {};
    }
  
    var shapeAssertionError;
  
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
  
    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }
  
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
  
      if (true) {
        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
  
        if (warningMessage) {
          warning(warningMessage);
        }
      }
  
      var hasChanged = false;
      var nextState = {};
  
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer = finalReducers[_key];
        var previousStateForKey = state[_key];
        var nextStateForKey = reducer(previousStateForKey, action);
  
        if (typeof nextStateForKey === 'undefined') {
          var errorMessage = getUndefinedStateErrorMessage(_key, action);
          throw new Error(errorMessage);
        }
  
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
  
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  
  function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(this, arguments));
    };
  }
  /**
   * Turns an object whose values are action creators, into an object with the
   * same keys, but with every function wrapped into a `dispatch` call so they
   * may be invoked directly. This is just a convenience method, as you can call
   * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
   *
   * For convenience, you can also pass an action creator as the first argument,
   * and get a dispatch wrapped function in return.
   *
   * @param {Function|Object} actionCreators An object whose values are action
   * creator functions. One handy way to obtain it is to use ES6 `import * as`
   * syntax. You may also pass a single function.
   *
   * @param {Function} dispatch The `dispatch` function available on your Redux
   * store.
   *
   * @returns {Function|Object} The object mimicking the original object, but with
   * every action creator wrapped into the `dispatch` call. If you passed a
   * function as `actionCreators`, the return value will also be a single
   * function.
   */
  
  
  function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch);
    }
  
    if (_typeof(actionCreators) !== 'object' || actionCreators === null) {
      throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : _typeof(actionCreators)) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
    }
  
    var boundActionCreators = {};
  
    for (var key in actionCreators) {
      var actionCreator = actionCreators[key];
  
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
  
    return boundActionCreators;
  }
  
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
  
    return obj;
  }
  
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
  
    if (Object.getOwnPropertySymbols) {
      keys.push.apply(keys, Object.getOwnPropertySymbols(object));
    }
  
    if (enumerableOnly) keys = keys.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    return keys;
  }
  
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
  
      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
  
    return target;
  }
  /**
   * Composes single-argument functions from right to left. The rightmost
   * function can take multiple arguments as it provides the signature for
   * the resulting composite function.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing the argument functions
   * from right to left. For example, compose(f, g, h) is identical to doing
   * (...args) => f(g(h(...args))).
   */
  
  
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
  
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }
  
    if (funcs.length === 1) {
      return funcs[0];
    }
  
    return funcs.reduce(function (a, b) {
      return function () {
        return a(b.apply(void 0, arguments));
      };
    });
  }
  /**
   * Creates a store enhancer that applies middleware to the dispatch method
   * of the Redux store. This is handy for a variety of tasks, such as expressing
   * asynchronous actions in a concise manner, or logging every action payload.
   *
   * See `redux-thunk` package as an example of the Redux middleware.
   *
   * Because middleware is potentially asynchronous, this should be the first
   * store enhancer in the composition chain.
   *
   * Note that each middleware will be given the `dispatch` and `getState` functions
   * as named arguments.
   *
   * @param {...Function} middlewares The middleware chain to be applied.
   * @returns {Function} A store enhancer applying the middleware.
   */
  
  
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
  
    return function (createStore) {
      return function () {
        var store = createStore.apply(void 0, arguments);
  
        var _dispatch = function dispatch() {
          throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
        };
  
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          }
        };
        var chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store.dispatch);
        return _objectSpread2({}, store, {
          dispatch: _dispatch
        });
      };
    };
  }
  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */
  
  
  function isCrushed() {}
  
  if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
    warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
  }
  
  
  
  /***/ }),
  
  /***/ "./node_modules/symbol-observable/es/index.js":
  /*!****************************************************!*\
    !*** ./node_modules/symbol-observable/es/index.js ***!
    \****************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
  /* global window */
  
  var root;
  
  if (typeof self !== 'undefined') {
    root = self;
  } else if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else if (true) {
    root = module;
  } else {}
  
  var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
  /* harmony default export */ __webpack_exports__["default"] = (result);
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./node_modules/symbol-observable/es/ponyfill.js":
  /*!*******************************************************!*\
    !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
    \*******************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
  function symbolObservablePonyfill(root) {
    var result;
    var _Symbol = root.Symbol;
  
    if (typeof _Symbol === 'function') {
      if (_Symbol.observable) {
        result = _Symbol.observable;
      } else {
        result = _Symbol('observable');
        _Symbol.observable = result;
      }
    } else {
      result = '@@observable';
    }
  
    return result;
  }
  ;
  
  /***/ }),
  
  /***/ "./node_modules/webpack/buildin/global.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/global.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
  
  var g; // This works in non-strict mode
  
  g = function () {
    return this;
  }();
  
  try {
    // This works if eval is allowed (see CSP)
    g = g || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  } // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}
  
  
  module.exports = g;
  
  /***/ }),
  
  /***/ "./node_modules/webpack/buildin/harmony-module.js":
  /*!*******************************************!*\
    !*** (webpack)/buildin/harmony-module.js ***!
    \*******************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  module.exports = function (originalModule) {
    if (!originalModule.webpackPolyfill) {
      var module = Object.create(originalModule); // module.parent = undefined by default
  
      if (!module.children) module.children = [];
      Object.defineProperty(module, "loaded", {
        enumerable: true,
        get: function get() {
          return module.l;
        }
      });
      Object.defineProperty(module, "id", {
        enumerable: true,
        get: function get() {
          return module.i;
        }
      });
      Object.defineProperty(module, "exports", {
        enumerable: true
      });
      module.webpackPolyfill = 1;
    }
  
    return module;
  };
  
  /***/ }),
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
  
  var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_0__["default"])();
  /* harmony default export */ __webpack_exports__["default"] = (sagaMiddleware);
  
  /***/ })
  
  /******/ });
  //# sourceMappingURL=bundle.js.map