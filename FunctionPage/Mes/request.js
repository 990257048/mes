

let createRequest = (className, functionName, f) => {    //创建一个请求.
    return data => {
        var fn = typeof f == "function" ? f : d => d;
        var data = fn(data);
        return new Promise((resolve, reject) => {
            client.CallFunction(className, functionName, data, e => {
                if(e.Status == "Pass"){
                    resolve(e);
                }
                else{
                    reject(e);
                }
            });
        })
    }
}

//获取模块,系统头部 (不含父级, 模糊搜索) 
let getMenuLike = createRequest("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuLike");  //sendData: {menuStr} 
