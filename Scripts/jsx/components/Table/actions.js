
const LOAD_TABLE = "加载全部表格数据";
let load_table = (table_all) => ({
    type: LOAD_TABLE,
    table_all
});

const SET_API = "设置api";
let set_api = (get_table, search, other) => ({
    type: SET_API,
    get_table, search, other
});

const CONFIG_OPERATE = "配置操作";
let config_operate = (topOperate, button) => ({
    type: CONFIG_OPERATE,
    topOperate, button
})

const SET_ROWS = "设置一行显示的页数";
let set_rows = rows => ({
    type: SET_ROWS,
    rows
})

const SET_FIELD = "设置表字段";
let set_field = (fieldList, components) => ({
    type: SET_FIELD,
    fieldList, components
})

const SET_TIP = "设置表格提示信息";
let set_tip = tip => ({
    type: SET_TIP,
    tip
});

const CHANGE_PAGE = "换页";
let change_page = (page_act, table) => ({
    type: CHANGE_PAGE,
    page_act, table
}) 

const CHANGE_INPUT_SEARCH = "改变搜索框内值";
let change_input_search = input_search => ({
    type: CHANGE_INPUT_SEARCH,
    input_search
});
const CHANGE_INPUT_PAGE = "改变跳转页输入值";
let change_input_page = input_page => ({
    type:CHANGE_INPUT_PAGE,
    input_page
});

const SET_LAYER_SHOW = "設置彈出層是否顯示";
let set_layer_show = show => ({
    type: SET_LAYER_SHOW,
    show
});

const SET_LAYER_COMPONENT = "設置彈出層內組件";
let set_layer_component = Component => ({
    type: SET_LAYER_COMPONENT,
    Component
});

const SET_LAYER_WH = "設置彈出層寬高";
let set_layer_wh = (width, height) => ({
    type: SET_LAYER_WH,
    width, height
});

const SET_LAYER_TIT = "設置彈出層標題";
let set_layer_tit = title => ({
    type: SET_LAYER_TIT,
    title
});

const SET_CURRENT_OPERATE = "設置當前操作名稱";
let set_current_operate = current_operate => ({
    type: SET_CURRENT_OPERATE,
    current_operate
});

const ADD_OPERATE_DATA = "添加待操作數據";
let add_operate_data = tableRow => ({
    type: ADD_OPERATE_DATA,
    tableRow
});

const DELETE_OPERATE_DATA = "清空待操作數據";
let delete_operate_data = () => ({
    type: DELETE_OPERATE_DATA
});

const SET_TOP_OPERATE_ACT = "設置按鈕活動狀態";
let set_top_operate_act = name => ({
    type: SET_TOP_OPERATE_ACT,
    name
});

const SET_CONTENT = "設置提示框內容";
let set_content = content => ({
    type: SET_CONTENT,
    content
});

const SET_BUTTON = "設置操作按鈕";
let set_button = button => ({
    type: SET_BUTTON,
    button
});


let init = () => (dispatch) => {   //初始化表格
    var {apis:{get_table, search, other}, table, operate:{topOperate, button}} = mes_table_config;
    var {className, functionName, ret_sendData} = get_table;
    //配置基本数据
    dispatch(set_api(get_table, search, other));   //api
    dispatch(config_operate(topOperate, button));  //操作按钮
    dispatch(set_rows(table.page_rows));   //设置一页显示的行数
    dispatch(set_field(table.fieldList, table.components));         //设置表字段

    var t = [];
    for(var i = 1; i <= 1; i++){
        var s = "xxxxxxxxx" + i;
        t.push({
            field1: s,
            field2: s,
            field3: s,
            field4: s,
            field5: s,
            field6: s,
            field7: s,
            field8: s,
            field9: s,
            field10: s,
            field11: s,
            field12: s,
            field13: s,
            field14: s,
            field15: s,
            field16: s,
            field17: s,
            field18: s,
            field19: s,
        })
    }

    dispatch(load_table([]));   //加载表格
    dispatch(set_tip("该表共计"+ 0 +"条数据"));
    // var p = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         self.parent.client.CallFunction(className, functionName, ret_sendData(), e => {
    //             if(e.Status === "Pass"){
    //                 resolve(e.Data);  //e.Data
    //             }else{
    //                 reject(e);
    //             }
    //         });
    //     }, 3000);
    // });
    // p.then(d => {
    //     console.log(d);
    //     //dispatch(load_table(get_tableData(t_d.slice(0, 51))));   //加载表格
    // }, e => {
    //     throw new Error("获取数据失败，请检查api：" + className + "." + functionName);
    // });
}


let skip = content => (dispatch, getState) => {    //跳转页面
    console.log(content);
    //change_page
    var tableReducer = getState().TableReducer;
    var {page_act, page_total, input_page, rows} = tableReducer.baseConfig.paginate;
    var {table_all} = tableReducer.main;
    switch(content){
        case "<":   //上一页
            var act = page_act - 1 >= 1 ? page_act - 1 : page_total;
            var table = act !== page_total ? table_all.slice(rows * (act - 1), rows * act) : table_all.slice(rows * (act - 1)); 
            dispatch(change_page(act, table));
            break;
        case ">":   //下一页
            var act = page_act !== page_total ? page_act + 1 : 1;
            var table = act !== page_total ? table_all.slice(rows * (act - 1), rows * act) : table_all.slice(rows * (act - 1));
            dispatch(change_page(act, table));
            break;
        case "GO":   //跳转页
            var act = Number(input_page);
            if(act !== 0){
                var table = act !== page_total ? table_all.slice(rows * (act - 1), rows * act) : table_all.slice(rows * (act - 1));
                dispatch(change_page(act, table));
            }
            dispatch(change_input_page(""));
            break;
        default:
            break;
    }
}  

let search = () => (dispatch, getState) => {   //快速搜索
    let {
        apiConfig:{
            search: {className, functionName, ret_sendData}
        }, baseConfig: {input_search}
    } = getState().TableReducer;

    let p = new Promise((resolve, reject) => {
        self.parent.client.CallFunction(className, functionName, ret_sendData({v: input_search}), e => {
            if(e.Status === "Fail"){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    }); 
    p.then(d => {
        dispatch(change_input_search(""));
    }).catch(e => {
        throw new Error("获取数据失败，请检查api：" + className + "." + functionName);
    });
}

//固定表头, 同步滚动条
let setFixTit = () => {
    let tableMain = $(".table-main");
    tableMain.find(".fix-tit").remove();  //删除已有的（旧的）表头 
    let leftT = tableMain.find(".table-left");
    let centerT = tableMain.find(".table-center");
    let rightT = tableMain.find(".table-right");
    let w_data = {
        left: {
            w_totle: leftT.css("width"),
            w_arr: Array.from(leftT.find("th")).map(th => {
                return {text: $(th).text(), w: $(th).css("width")}
            })
        },
        center: {
            w_totle: centerT.css("width"),
            w_act: centerT.find("table").css("width"),
            w_arr: Array.from(centerT.find("th")).map(th => {
                return {text: $(th).text(), w: $(th).css("width")}
            })
        },
        right: {
            w_totle: rightT.css("width"),
            w_arr:Array.from(rightT.find("th")).map(th => {
                return {text: $(th).text(), w: $(th).css("width")}
            })
        }
    };
    let createEle = (className, c) => {
        return $("<div class=\""+ className +"\">"+ c +"</div>");
    };
    let fixTit = createEle("fix-tit", "");
    let fixTitLeft = createEle("fix-tit-left", "");
    let fixTitCenter = createEle("fix-tit-center", "");
    let fixTitCenterAct = createEle("fix-tit-center-act", "");
    let fixTitRight = createEle("fix-tit-right", "");

    w_data.left.w_arr.forEach(wO => {
        var temp = createEle("fix-tit-son", wO.text);
        temp.css("width", wO.w);
        fixTitLeft.append(temp);
    });
    w_data.center.w_arr.forEach(wO => {
        var temp = createEle("fix-tit-son", wO.text);
        temp.css("width", wO.w);
        fixTitCenterAct.append(temp);
    });
    w_data.right.w_arr.forEach(wO => {
        var temp = createEle("fix-tit-son", wO.text);
        temp.css("width", wO.w);
        fixTitRight.append(temp);
    });

    fixTitCenter.append(fixTitCenterAct);
    fixTit.append(fixTitLeft, fixTitCenter, fixTitRight);

    fixTitLeft.css("width", w_data.left.w_totle);
    fixTitCenterAct.css("width", w_data.center.w_act);
    fixTitRight.css("width", w_data.right.w_totle);

    tableMain.append(fixTit);
    //------------------------------------------------
    let tableLeft = leftT; // $(tableWrap).find(".table-left");  //.table-left, .table-center, .table-right
    let tableCenter = centerT; // $(tableWrap).find(".table-center");
    let tableRight = rightT; // $(tableWrap).find(".table-right");
    let tableCenterFix = tableMain.find(".fix-tit-center");
    //unbind()
    tableCenterFix[0].onmouseover = null;  //取消旧的绑定事件
    tableLeft[0].onmouseover = null;
    tableCenter[0].onmouseover = null;
    tableRight[0].onmouseover = null;
    //同步滚动
    //获取滚动条位置dom.scrollTop
    //设置滚动条位置dom.scrollTo(x, y)
    let eventConfig = {
        tableCenterFix_bind: () => {
            eventConfig.tableCenter_unbind();
            tableCenterFix[0].onscroll = e => {
                tableCenter[0].scrollTo(e.target.scrollLeft, tableCenter[0].scrollTop);
            }
        },
        tableLeft_bind: () => {
            eventConfig.tableCenter_unbind();
            eventConfig.tableRight_unbind();
            tableLeft[0].onscroll = e => {
                tableCenter[0].scrollTo(tableCenter[0].scrollLeft, e.target.scrollTop);
                tableRight[0].scrollTo(0, e.target.scrollTop);
            }
        },
        tableCenter_bind: () => {
            eventConfig.tableCenterFix_unbind();
            eventConfig.tableLeft_unbind();
            eventConfig.tableRight_unbind();
            tableCenter[0].onscroll = e => {
                tableLeft[0].scrollTo(0, e.target.scrollTop);
                tableRight[0].scrollTo(0, e.target.scrollTop);
                tableCenterFix[0].scrollTo(e.target.scrollLeft, 0);
            }
        },
        tableRight_bind: () => {
            eventConfig.tableLeft_unbind();
            eventConfig.tableCenter_unbind();
            tableRight[0].onscroll = e => {
                tableLeft[0].scrollTo(0, e.target.scrollTop);
                tableCenter[0].scrollTo(tableCenter[0].scrollLeft, e.target.scrollTop);
            }
        },
        tableCenterFix_unbind: () => {
            tableCenterFix[0].onscroll = null;
        },
        tableLeft_unbind: () => {
            tableLeft[0].onscroll = null;
        },
        tableCenter_unbind: () => {
            tableCenter[0].onscroll = null;
        },
        tableRight_unbind: () => {
            tableRight[0].onscroll = null;
        }
    };

    tableCenterFix[0].onmouseover = () => {
        eventConfig.tableCenterFix_bind();
    };
    tableLeft[0].onmouseover = () => {
        eventConfig.tableLeft_bind();
    };
    tableCenter[0].onmouseover = () => {
        eventConfig.tableCenter_bind();
    };
    tableRight[0].onmouseover = () => {
        eventConfig.tableRight_bind();
    };
}

