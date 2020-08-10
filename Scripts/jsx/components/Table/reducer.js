
let TableReducer = (state = {
    main:{
        table_all:[], 
        table: [],
        field: {   //字段 列
            fieldList: {},
            components:{
                left:[],  //"no", "select"
                right: [],
                fixedColNum: 0  //固定列数
            }
        }
    },
    operate:{   //操作配置
        current_operate: "",
        data: [],   //待操作数据
        topOperate: [],
        button: []
    },
    baseConfig: {   //基本配置
        input_search: "",       //快速搜索框
        paginate:{              //分页配置
            rows: 0,          //一页显示的数据条数
            page_total: 0,     //总页数

            page_act: 1,        //当前显示第几页
            input_page: ""      //跳转页框内值
        },
        tip:"。。。加载表格中"   //提示（左下角）
    },
    apiConfig: {  //接口配置
        get_table: {},
        search: {},
        other: {}
    },
    layer: {
        display: "none",
        width: 0,  //300 120
        height: 0,
        title: "",
        Component: function (){return <div></div>},
    }
}, action) => {
    switch(action.type){

        case SET_LAYER_SHOW:  //設置彈出層是否顯示
            var {show} = action; 
            return {
                ...state,
                layer: {
                    ...state.layer,
                    display: show ? "block" : "none"
                }
            };
        case SET_LAYER_COMPONENT:  //設置彈出層組件
            var {Component} = action;
            return {
                ...state,
                layer: {
                    ...state.layer,
                    Component
                }
            };
        case SET_LAYER_WH:  //設置彈出層寬高
            var {width, height} = action;
            return {
                ...state,
                layer: {
                    ...state.layer,
                    width, height
                }
            };
        case SET_LAYER_TIT: //設置彈出層標題
            var {title} = action;
            return {
                ...state,
                layer: {
                    ...state.layer,
                    title
                }
            };

        case SET_CURRENT_OPERATE:  //設置當前操作名稱
            var {current_operate} = action;
            return {
                ...state,
                operate: {
                    ...state.operate,
                    current_operate
                }
            };

        case ADD_OPERATE_DATA:  //添加待操作數據
            var {tableRow} = action;
            return {
                ...state,
                operate: {
                    ...state.operate,
                    data: [...state.operate.data, tableRow]
                }
            };
        case DELETE_OPERATE_DATA:  //清空待操作數據
            return {
                ...state,
                operate: {
                    ...state.operate,
                    data: []
                }
            };

        case SET_TOP_OPERATE_ACT:   //設置按鈕活動狀態
            var {name} = action;
            var topOperate = state.operate.topOperate.map(btnO => {
                return {
                    ...btnO,
                    act: btnO.name === name ? true : false
                }
            });
            return {
                ...state,
                operate: {
                    ...state.operate,
                    topOperate
                }
            };
            
        case LOAD_TABLE:        //加载全部表格数据，配置字段, 分页
            //var {table_all, table, field, rows, page_total} = action;
            var {table_all} = action;
            var {rows} = state.baseConfig.paginate;

            var len = table_all.length;
            var page_total = len % rows === 0 ? len / rows : Math.ceil(len / rows);
            var table = table_all.slice(0, rows);

            return {
                ...state,
                main: {
                    ...state.main,
                    table_all, 
                    table
                },
                baseConfig: {
                    ...state.baseConfig,
                    paginate: {
                        ...state.baseConfig.paginate,
                        page_act: 1,
                        page_total
                    }
                }
            };

        case SET_API: 
            var {get_table, search, other} = action;
            return {
                ...state,
                apiConfig: {
                    get_table, search, other
                }
            };

        case CONFIG_OPERATE:    //配置操作
            var {topOperate, button} = action;
            return {
                ...state,
                operate: {
                    data: [],
                    topOperate, button
                }
            };
        
        case SET_ROWS:  //设置一行显示的页数
            var {rows} = action;
            return {
                ...state,
                baseConfig: {
                    ...state.baseConfig,
                    paginate: {
                        ...state.baseConfig.paginate,
                        rows
                    }
                }
            };

        case SET_FIELD:   //设置表字段
            var {fieldList, components} = action;
            return {
                ...state,
                main: {
                    ...state.main,
                    field: {
                        fieldList, components
                    }
                }
            };

        case SET_TIP:
            var {tip} = action;
            return {
                ...state,
                baseConfig: {
                    ...state.baseConfig,
                    tip
                }
            };

        case CHANGE_PAGE:    //换页操作
            var {page_act, table} = action;  //page:换的页数， table：该页的表数据
            return {
                ...state,
                main: {
                    ...state.main,
                    table
                },
                baseConfig: {
                    ...state.baseConfig,
                    paginate: {
                        ...state.baseConfig.paginate,
                        page_act
                    }
                }
            };
        case CHANGE_INPUT_SEARCH:    //改变搜索框内值
            var {input_search} = action;
            return {
                ...state,
                baseConfig: {
                    ...state.baseConfig,
                    input_search
                }
            };
        case CHANGE_INPUT_PAGE:  //改变跳转页输入值
            var {input_page} = action;
            if (/^\d*$/g.test(input_page) && Number(input_page) <= state.baseConfig.paginate.page_total){
                return {
                    ...state,
                    baseConfig:{
                        ...state.baseConfig,
                        paginate: {
                            ...state.baseConfig.paginate,
                            input_page
                        }
                    }
                };
            }
            return state;
        default:
            return state;
    }
}



let LayerTipReducer = (state = {
    content: "高超輝(F1335257): 申請角色（系统所有工站）.你确定要通过这項申請吗？",
    operate: {
        button:[
            {
                name: "确定",
                c: "class1",
                icon: "fa fa-check"
            },
            {
                name: "取消",
                c: "class1",
                icon: "fa fa-share"
            }
        ]
    }
}, action) => {
    switch(action.type){
        case SET_CONTENT:   //設置提示框內容
            var {content} = action; 
            return {
                ...state,
                content
            };
        case SET_BUTTON:   //設置操作按鈕
            var {button} = action;
            return {
                ...state,
                operate: {
                    ...state.operate,
                    button
                }
            };
        default:
            return state;
    }
}
