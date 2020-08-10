const CHANGE_LOGIN_BOX_ACT = "切换登录块的显示与隐藏";
let change_login_box_act = () => ({
    type: CHANGE_LOGIN_BOX_ACT
});

const LOGIN_SUCCESS = "验证成功";
let login_success = (loginTit, emp_no, emp_name, msg) => ({
    type: LOGIN_SUCCESS,
    loginTit, emp_no, emp_name, msg
});

const LOGIN_FAIL = "验证失败";
let login_fail = () => ({
    type: LOGIN_FAIL,
    loginTit:"验证失败!请重新验证"
});

const CHANGE_USER = "输入用户工号";
const CHANGE_PWD = "输入密码";
let change_user = user => ({
    type: CHANGE_USER,
    user
});
let change_pwd = pwd => ({
    type: CHANGE_PWD,
    pwd
});

const EXIT_LOGIN = "退出登录";
let exit_login = () => ({
    type: EXIT_LOGIN
});

//-------------------------------------------------------------------------------------------------------------------------

let mes_table_config = {
    apis:{
        get_table: {    //获取表数据
            className: "MESStation.GlobalConfig.GetCommonConfig",
            functionName: "GetUserDate",
            ret_sendData: () => ({
                tableName: "table1"
            }),
            get_tableData: d => {
                return d;
            }
        },
        search: {    //快速搜索
            className:"xxxxxxxxxxxxxxx",
            functionName:"xxxxxxxx",
            ret_sendData: val => ({
                value: val
            }),
            get_tableData: d => {
                return d;
            }
        },
        other: {}
    },
    table: {   //字段 列
        fieldList: {
            field1:"字段1",
            field2:"字段2",
            field3:"字段3",
            field4:"字段4"
        },
        components:{
            left:["no"],  //"no", "select"
            right: ["operate"],
            fixedColNum: 0   //固定列数
        },
        page_rows: 100   //一页显示的数据条数
    },
    operate:{   //操作配置
        topOperate: [
            {
                name: "用戶賬號申請",
                c: "class1",
                icon: "fa fa-navicon",
                act: true   //是否處於活動狀態
            },
            {
                name: "用戶角色申請",
                c: "class1",
                icon: "fa fa-navicon",
                act: false
            },
            {
                name: "賬號季度REVIEW",
                c: "class1",
                icon: "fa fa-navicon",
                act: false
            }
        ],
        button: [   //按钮的操作
            {
                name: "通过",
                c: "class1",
                icon: "fa fa-check",
                api: {
                    className: "MESStation.GlobalConfig.GetCommonConfig",
                    functionName: "UserConfirmPass",
                    ret_sendData: (operateData, tableName) => {  //處理待操作數據，返回最後待發送數據
                        return {
                            action: tableName,
                            d: operateData.map(row => {
                                return {
                                    EMP_NO: row.EMP_NO,
                                    ROLE_NAME: row.ROLE_NAME
                                };
                            })
                        };
                    }
                }
            },
            {
                name: "驳回",
                c: "class2",
                icon: "fa fa-remove",
                api: {
                    className: "MESStation.GlobalConfig.GetCommonConfig",
                    functionName: "UserConfirmRejected",
                    ret_sendData: (operateData, tableName) => {  //處理待操作數據，返回最後待發送數據
                        return {
                            action: tableName,
                            d: operateData.map(row => {
                                return {
                                    EMP_NO: row.EMP_NO,
                                    ROLE_NAME: row.ROLE_NAME
                                };
                            })
                        };
                    }
                }
            }
        ]
    },
};

let operateButtonClick = (name, i) => (dispatch, getState) => {  //點擊操作按鈕

    let {main: {table}, operate: {current_operate, data, topOperate} } = getState().TableReducer;

    if(i != undefined){    //點擊操作按鈕
        dispatch(set_layer_tit("系統提示"));
        dispatch(set_layer_wh(320, 130));
        dispatch(set_layer_component(LayerTip));

        dispatch(set_content("你確認此操作吗？"));
        dispatch(set_button([{
            name: "确定",
            c: "class1",
            icon: "fa fa-check"
        },
        {
            name: "取消",
            c: "class1",
            icon: "fa fa-share"
        }]));
        dispatch(set_layer_show(true));
        var tableRow = table[i - 1];  //操作的數據
        dispatch(add_operate_data(tableRow));
        dispatch(set_current_operate(name));
    }else{
        if(name == "确定"){
            let {className, functionName, ret_sendData} = mes_table_config.operate.button.filter(btnO => {
                return btnO.name === current_operate; 
            })[0].api;

            let tableName = "";   //當前操作的表名
            let btnName = topOperate.filter(btnO => {
                return btnO.act 
            })[0].name;
            switch(btnName){
                case "用戶賬號申請":  //UserReview, RoleReview, QuarterReview
                    tableName = "UserReview";
                    break;
                case "用戶角色申請":
                    tableName = "RoleReview";
                    break;
                case "賬號季度REVIEW":
                    tableName = "QuarterReview";
                    break;
                default:
                    break;
            }

            let p = new Promise((resolve, reject) => {
                self.parent.client.CallFunction(className, functionName, ret_sendData(data, tableName), e => {
                    if(e.Status === "Pass"){
                        resolve(e);
                    }else{
                        reject(e);
                    }
                });
            });
            p.then(e => {
                dispatch(set_content("操作成功！。" + e.Message));
                dispatch(set_button([]));

                dispatch(set_layer_show(true));
                setTimeout(() => {
                    dispatch(set_layer_show(false));
                    dispatch(topOperateButtonClick(btnName));   //刷新當前表
                }, 2000);

            }, e => {
                dispatch(set_content("操作失敗！。" + e.Message));
                dispatch(set_button([]));
                dispatch(set_layer_show(true));
                setTimeout(() => {
                    dispatch(set_layer_show(false));
                    dispatch(topOperateButtonClick(btnName));   //刷新當前表
                }, 3000);
                throw new Error("請求數據失敗！請檢查api：" + className + functionName);
            })
            dispatch(delete_operate_data());
            dispatch(set_layer_show(false));
        }
        if(name == "取消"){
            dispatch(delete_operate_data());
            dispatch(set_layer_show(false));
        }
    }
}


let topOperateButtonClick = name => (dispatch, getState) => {  //點擊表格上部的操作按鈕執行
    let global_state = getState();
    let {className, functionName} = global_state.TableReducer.apiConfig.get_table;
    let {loginFlag, login: {emp_no}} = global_state.headReducer;
    //請求數據：
    let p = new Promise((resolve, reject) => {
        loginFlag && self.parent.client.CallFunction(className, functionName, {emp_no}, e => {
            if(e.Status == "Pass"){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });
    p.then(d => {
        let {UserReview, RoleReview, QuarterReview} = d;
        var _d;
        switch(name){
            case "用戶賬號申請":
                _d = UserReview;
                dispatch(set_field({
                    EMP_NAME: "申請人",
                    BU_NAME: "BU",
                    EMP_NO: "工號",
                    DPT_NAME: "部門"
                    //ROLE_NAME: "申請的角色"
                    //DIRECTOR_EMAIL: "郵箱"
                }, {
                    left:["no"],  //"no", "select"
                    right: ["operate"],
                    fixedColNum: 0   //固定列数
                }));         //设置表字段
                break;
            case "用戶角色申請":
                _d = RoleReview;
                dispatch(set_field({
                    EMP_NAME: "申請人",
                    BU_NAME: "BU",
                    EMP_NO: "工號",
                    DPT_NAME: "部門",
                    ROLE_NAME: "申請的角色"
                    //DIRECTOR_EMAIL: "郵箱"
                }, {
                    left:["no"],  //"no", "select"
                    right: ["operate"],
                    fixedColNum: 0   //固定列数
                }));         //设置表字段
                break;
            case "賬號季度REVIEW":
                _d = QuarterReview;
                dispatch(set_field({
                    EMP_NAME: "用戶",
                    EMP_NO: "工號",
                    DEPT: "部門",
                    REVIEW_DATE:"REVIEW時間"
                }, {
                    left:["no"],  //"no", "select"
                    right: ["operate"],
                    fixedColNum: 0   //固定列数
                }));         //设置表字段
                break;
            default: 
                break;
        }
        dispatch(set_top_operate_act(name));
        
        
        
        dispatch(load_table(_d));   //加载表格
        dispatch(set_tip("该表共计"+ _d.length +"条数据"));
    }, e => {
        throw new Error("獲取數據失敗！請檢查api："+ className + "." + functionName);
    });
}



//-----------------------------------------------------------------------------------------------------------------

let login = (emp_no, pwd) => (dispatch, getState) => {
    let p = new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.GlobalConfig.GetCommonConfig", "Verification", {emp_no, pwd}, e => {
            if(e.Status === "Pass"){
                resolve(e.Data);
            }else{
                reject(e);
            }
        });
    });

    p.then(d => {
        let {DIRECTOR, COUNT, DIRECTOR_ID} = d;
        dispatch(login_success(DIRECTOR + "主管，您好！", DIRECTOR_ID, DIRECTOR, COUNT));  

        //獲取數據
        let {className, functionName, ret_sendData} = getState().TableReducer.apiConfig.get_table;

        self.parent.client.CallFunction(className, functionName, {emp_no: DIRECTOR_ID}, e => {
            if(e.Status == "Pass"){
                let {UserReview, RoleReview, QuarterReview} = e.Data;
                dispatch(set_field({
                    EMP_NAME: "申請人",
                    BU_NAME: "BU",
                    EMP_NO: "工號",
                    DPT_NAME: "部門"
                    //ROLE_NAME: "申請的角色"
                    //DIRECTOR_EMAIL: "郵箱"
                }, {
                    left:["no"],  //"no", "select"
                    right: ["operate"],
                    fixedColNum: 0   //固定列数
                }));         //设置表字段
                dispatch(load_table(UserReview));   //加载表格
                dispatch(set_tip("该表共计"+ UserReview.length +"条数据"));
            }
        });

    }).catch( e => {
        dispatch(login_fail());
    });
}

