let {connect} = ReactRedux;

class Audit extends React.Component {
    render (){
        return <div className="audit-main">
            <Heade />
            <div className="table-wrap">
                <MES_Table />
            </div>
        </div>
    }
}


class Heade extends React.Component {
    componentDidMount (){
        var user = $.MES.getQueryString("user");
        var pwd = $.MES.getQueryString("pwd");
        setTimeout(() => {
            user != null && pwd != null && this.props.login(user, pwd);
        }, 100);
    }
    login (){
        let {props:{login}, refs:{user_name, user_pwd}} = this;
        login(user_name.value, user_pwd.value);
    }
    render (){
        let {loginTit, loginFlag, loginBoxAct, login: {emp_no, emp_name, msg}, loginInput:{user, pwd}} = this.props.loginState;
        let {change_login_box_act, change_user, change_pwd, exit_login} = this.props;
        return <div className="heade">
            <div className="tit-audit">MES - 主管审核</div>
            <div className="tit-login" 
                style={{background: loginBoxAct ? "#337ab7" : null}}
                onClick={change_login_box_act}
            >
                {loginFlag ? (emp_name + "主管，您好！") : loginTit} 
            </div>
            <div className="nologin-box" style={{display: loginBoxAct && !loginFlag ? "block" : "none" }}>
                <div className="ctr-wrap">
                    <div className="ctr-lab">工号：</div>
                    <div className="ctr">
                        <input type="text" ref="user_name" name="user-name" value={user} onChange={e => {change_user(e.target.value)}}/>
                    </div>
                </div>
                <div className="ctr-wrap">
                    <div className="ctr-lab">密码：</div>
                    <div className="ctr">
                        <input type="password" ref="user_pwd" name="user-pwd" value={pwd} onChange={e => {change_pwd(e.target.value)}} />
                    </div>
                </div>
                <div className="ctr-wrap">
                    <button name="login" onClick={this.login.bind(this)}>快速验证</button>
                    <button name="addUser"><a href="CreateUser.html" target="_blank">注册账号</a></button>
                </div>
            </div>
            <div className="login-box" style={{display: loginBoxAct && loginFlag ? "block" : "none" }}>
                <div className="ctr-wrap">
                    <div className="ctr-lab">{emp_no + " : " + emp_name}</div>
                    
                </div>
                <div className="ctr-wrap">
                    <div className="ctr-lab">{emp_name + "主管，您好！您有" + msg + "条信息需要审核。"} </div>
                    
                </div>
                <div className="ctr-wrap">
                    <button name="exit" onClick={exit_login}>退出账号</button>
                    <button name="main"><a href="index.html">返回主页</a></button>
                </div>
            </div>
        </div>
    }
}

Heade = connect(state => ({
    loginState: state.headReducer
}), dispatch => ({
    change_login_box_act: () => {
        dispatch(change_login_box_act());
    },
    login: (emp_no, pwd) => {
        dispatch(login(emp_no, pwd));
    },
    change_user: user => {
        dispatch(change_user(user));
    },
    change_pwd: pwd => {
        dispatch(change_pwd(pwd));
    },
    exit_login: () => {
        dispatch(exit_login());
    },
    login: (user, pwd) => {
        dispatch(login(user, pwd));
    }
}))(Heade);
