function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import Tooltip from '../tooltip';
import Button from '../button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer } from '../config-provider';
import { getRenderPropValue } from '../_util/getRenderPropValue';

var Popconfirm = /*#__PURE__*/function (_React$Component) {
  _inherits(Popconfirm, _React$Component);

  var _super = _createSuper(Popconfirm);

  function Popconfirm(props) {
    var _this;

    _classCallCheck(this, Popconfirm);

    _this = _super.call(this, props);

    _this.onConfirm = function (e) {
      _this.setVisible(false, e);

      var onConfirm = _this.props.onConfirm;

      if (onConfirm) {
        onConfirm.call(_assertThisInitialized(_this), e);
      }
    };

    _this.onCancel = function (e) {
      _this.setVisible(false, e);

      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel.call(_assertThisInitialized(_this), e);
      }
    };

    _this.onVisibleChange = function (visible) {
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      }

      _this.setVisible(visible);
    };

    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    };

    _this.renderOverlay = function (prefixCls, popconfirmLocale) {
      var _this$props = _this.props,
          okButtonProps = _this$props.okButtonProps,
          cancelButtonProps = _this$props.cancelButtonProps,
          title = _this$props.title,
          cancelText = _this$props.cancelText,
          okText = _this$props.okText,
          okType = _this$props.okType,
          icon = _this$props.icon;
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-inner-content")
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-message")
      }, icon, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-message-title")
      }, getRenderPropValue(title))), /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-buttons")
      }, /*#__PURE__*/React.createElement(Button, _extends({
        onClick: _this.onCancel,
        size: "small"
      }, cancelButtonProps), cancelText || popconfirmLocale.cancelText), /*#__PURE__*/React.createElement(Button, _extends({
        onClick: _this.onConfirm,
        type: okType,
        size: "small"
      }, okButtonProps), okText || popconfirmLocale.okText)));
    };

    _this.renderConfirm = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          placement = _a.placement,
          restProps = __rest(_a, ["prefixCls", "placement"]);

      var prefixCls = getPrefixCls('popover', customizePrefixCls);
      var overlay = /*#__PURE__*/React.createElement(LocaleReceiver, {
        componentName: "Popconfirm",
        defaultLocale: defaultLocale.Popconfirm
      }, function (popconfirmLocale) {
        return _this.renderOverlay(prefixCls, popconfirmLocale);
      });
      return /*#__PURE__*/React.createElement(Tooltip, _extends({}, restProps, {
        prefixCls: prefixCls,
        placement: placement,
        onVisibleChange: _this.onVisibleChange,
        visible: _this.state.visible,
        overlay: overlay,
        ref: _this.saveTooltip
      }));
    };

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  _createClass(Popconfirm, [{
    key: "getPopupDomNode",
    value: function getPopupDomNode() {
      return this.tooltip.getPopupDomNode();
    }
  }, {
    key: "setVisible",
    value: function setVisible(visible, e) {
      var props = this.props;

      if (!('visible' in props)) {
        this.setState({
          visible: visible
        });
      }

      var onVisibleChange = props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible, e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, this.renderConfirm);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('visible' in nextProps) {
        return {
          visible: nextProps.visible
        };
      }

      if ('defaultVisible' in nextProps) {
        return {
          visible: nextProps.defaultVisible
        };
      }

      return null;
    }
  }]);

  return Popconfirm;
}(React.Component);

Popconfirm.defaultProps = {
  transitionName: 'zoom-big',
  placement: 'top',
  trigger: 'click',
  okType: 'primary',
  icon: /*#__PURE__*/React.createElement(ExclamationCircleFilled, null),
  disabled: false
};
export default Popconfirm;