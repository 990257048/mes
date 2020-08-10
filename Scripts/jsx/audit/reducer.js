let headReducer = (state = {
    loginTit:"未验证身份，请先验证身份！",
    loginFlag: false,
    loginBoxAct: false,
    login:{
        emp_no:"F1335257",
        emp_name:"高超辉",
        msg:10
    },
    loginInput:{
        user:"",
        pwd:""
    }
}, action) => {
    switch(action.type){
        case CHANGE_LOGIN_BOX_ACT:
            return {
                ...state,
                loginBoxAct: !state.loginBoxAct
            };
        case LOGIN_SUCCESS:
            let {loginTit, emp_no, emp_name, msg} = action;
            return {
                loginTit, 
                loginFlag: true,
                loginBoxAct: false,
                login:{
                    emp_no, emp_name, msg
                },
                loginInput:{
                    user:"",
                    pwd:""
                }
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loginTit: action.loginTit,
                loginInput: {
                    user: "",
                    pwd: ""
                }
            }
        case CHANGE_USER:
            let {user} = action;
            return {
                ...state,
                loginInput:{
                    user,
                    pwd: state.loginInput.pwd
                }
            };
        case CHANGE_PWD:
            let {pwd} = action;
            return {
                ...state,
                loginInput:{
                    user: state.loginInput.user,
                    pwd
                }
            }
        case EXIT_LOGIN: // "退出登录"
            return {
                ...state,
                loginTit:"未验证身份，请先验证身份！",
                loginFlag: false,
                loginBoxAct: true
            }
        default:
            return state;
    }
}


