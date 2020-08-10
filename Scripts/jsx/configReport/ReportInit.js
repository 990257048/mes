//配置报表入口
$(document).ready(function (){   //配置报表相关组件加载完成时执行
    $.subscribe("renderConfigReport",function (ev,d){  //生成配置报表
        console.log(d);
        ReactDOM.render(
            <ConfigReport p={d.data}></ConfigReport>,
            d.ele
        );
    });
    $.publish("babelFailLoad");
});

var o = $([]);
$.subscribe = function () {
    $.fn.on.apply(o, arguments);
};
$.unsubscribe = function () {
    $.fn.off.apply(o, arguments);
};
$.publish = function () {
    $.fn.trigger.apply(o, arguments);
    $.fn.off.apply(o, arguments);
};
$.publishMoreTime = function () {
    $.fn.trigger.apply(o, arguments);
};