
//所有的请求


//查询类请求

let getSkuList = () => {  //獲取主表數據
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "GetAllSku", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getAllBu = () => { //获取bu
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "GetAllBu", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSeries = () => {  //獲取SeriesId
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuSeries", "FetchCurrentSeries", { Field: "", Value: "" }, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSNRULE = () => { //获取SNRULE
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "GetSNRULE", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getPackType = () => { //获取PackType
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "GetPackType", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getTransportType = () => { //获取TransportType
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "GetTransportType", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSNRulers = () => { //获取SNRulers
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.SNMaker.SNRulerConfig", "GetSNRulers", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getLabelList = () => { //获取LabelList
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.FileUpdate.Fileuplaod", "GetLabelList", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getLabelTypes = () => { //获取LabelTypes
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Label.LabelConfig", "GetLabelTypes", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}


let getAqlName = () => { //获取AqlName
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "GetAllAqlName", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getAllStation = () => { //获取AllStation
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let get2dxStation = () => { //获取2dxStation
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CLotRate", "Get2dxStation", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getLabelStation = () => { //获取label打印工站
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getAllAqlName = () => { //查询OBA抽检类型
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "GetAllAqlName", {}, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}











//"Class":"MESStation.Config.SkuConfig","Function":"GetSkuByName","Data":{"Sku_Name":"77777"}}

//带参数查询

let getSkuByName = (data) => { //按料号查询数据
    //data: {Sku_Name}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "GetSkuByName", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRoute = (data) => { //查询路由(sfc test wip)
    //data: {TYPE, StationName}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutes", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}


let getAllRoutesBySkuID = (data) => { //查询机种已绑定的所有路由(sfc test wip)
    //data: {SkuId}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutesBySkuId", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getRouteStations = (data) => { //查询路由工站
    //data: {ID}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutesStation", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

//"Class":"MESStation.Config.SkuRouteMappingConfig",
//"Function":"GetRoutesStation",
//"Data":{"ID":"MFGII000000000000000000000000000CTY"}}

let getSapStation = (data) => { //查询抛帐点工站
    //data: {SKU_ID}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SAPStationMapConfig", "GetSKUROUTESAPStation", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSapMap = (data) => { //查询已配置的抛帐点
    //data: {SkuNo}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SAPStationMapConfig", "GetAllSapStationMapBySku", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getPackConfig = (data) => { //查询包装配置数据
    //data: {SkuNo}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "GetPackConfigBySKUNO", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let get2dxConfig = (data) => { //查询2dx配置数据
    //data: {SKUNO}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CLotRate", "Get2dxSetting", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let get73800Config = (data) => { //查询73&800配置数据
    //data: {SKUNO}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.Ckmapping", "GetBySkuno800", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getLabelConfig = (data) => { //查询label配置数据
    //data: {Skuno}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Label.LabelConfig", "GetLabelConfigBySkuno", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getAqlLevel = (data) => { //获取抽检等级
    //data: {AQLTYPE}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "GetAqlLevel", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSkuAql = (data) => { //获取aql第一张表内容
    //data: {SkuId}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "GetSkuAql", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let getSkuAqlData = (data) => { //获取aql第二张表内容
    //data: {SkuId}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "GetSkuAqlData", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}















//操作类的请求

let saveSku = ( data ) => {  //con1 保存新增机种数据
    //data: {BU, SKU_NAME, SKUNO, SKU_TYPE, VERSION, C_SERIES_ID, CUST_PARTNO, CUST_SKU_CODE, SN_RULE, PANEL_RULE, LENGTH, DESCRIPTION}
    let sendData = {
        SkuObject: {
            ...data,
            ID: "", LABEL_VER: "", MODELCLEI: "", DESCRIPTION2: "", ECI_NO: "", LAST_EDIT_TIME: ""
        }
    };
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "AddSku", sendData, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}


let addRoute = (data) => { //添加SFC, WIP路由
    //data: {SKU_ID, TYPE, ROUTE_ID, DEFAULT_FLAG}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuSFCRouteMapping", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let addTestRoute = (data) => { //添加测试路由
    //data: {TEST_ROUTE_ID, SKU_ID, DEFAULT_FLAG, NOCHECKTEST_FLAG, AutoStation}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuTESTRouteMapping", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let addTestPcbaRoute = (data) => { //添加测试PCBA路由  
    //data: {TEST_ROUTE_ID, SKU_ID, AutoStation}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddPCBAPackingTESTRoute", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let deleteRoute = (idArr) => { //删除已绑定路由
    //idArr: [string]
    let data = {MappingID: [...idArr]};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "DeleteSkuRouteMapping", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let addSapStationMap = (o) => { //添加抛帐点
    //o: {SKUNO, STATION_NAME, SAP_STATION_CODE, WORKORDER_TYPE}
    let data = {Operation: "ADD", MapObject: {ID: "", ...o}};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SAPStationMapConfig", "UpdateSapStationMap", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let deleteSapStationMap = (idArr) => { //删除抛帐点
    //idArr: [string,...]
    let data = {IDList: [...idArr]};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SAPStationMapConfig", "DeleteSapStationMap", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let addPackConfig = (o) => { //添加包装配置
    //o: {PACK_TYPE, MAX_QTY, TRANSPORT_TYPE, INSIDE_PACK_TYPE, SN_RULE, DESCRIPTION, SKUNO, ID}
    let data = {PackObj: {...o}};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "AlertPackConfig", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let deletePackConfig = (idArr) => { //删除包装配置
    //idArr: [string, ...]
    let data = {ID_LIST: [...idArr]};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "RemovePackConfig", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let uploadQuackImg = (data) => { //上传QUACK图片
    //data: {SKUNO, File, Bas64File}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.QuackPicUpload", "Upload", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let save2dxConfig = (data) => { //保存2DX配置
    //data: {BU, SKUNO, CODE_NAME, STATION_NAME, QTY, VALID_FLAG}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CLotRate", "UpdateById", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let save73800Config = (data) => { //保存73&800配置
    //data: {SKUNO800, SKUNO73, SKUVER73}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.Ckmapping", "AddCkMapping", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let saveLabelConfig = (data) => { //添加label配置
    //data: {SKUNO, STATION, LABELNAME, LABELTYPE, QTY, SEQ, }
    let send = {LabelObject: {...data, ID: ""}};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Label.LabelConfig", "AlertLabelConfig", send, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let deleteLabelConfig = (idList) => { //删除label配置
    //idList: [string, ...]
    let send = {ID_LIST: [...idList]};
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Label.LabelConfig", "RemoveLabelConfig", send, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let addAqlConfig = (data) => { //新增Aql配置
    //data: {SkuId, AqlType, aqlLevel}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.CAqltypeConfig", "AddSkuAql", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let copySkunoConfig = (data) => { //复制机种配置
    //data: {NewSku, OldSku}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkunoCopy", "SkuConpy", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}

let deleteSkunoConfig = (data) => { //删除机种配置
    //data: {SkuID}
    return new Promise((resolve, reject) => {
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "DeleteSkuById", data, e => {
            if(e.Status == "Pass"){
                resolve(e);
            }else{
                reject(e);
            }
        });
    });
}


//"Class":"MESStation.Config.SkuConfig","Function":"DeleteSkuById","Data":{"SkuID":"MFGII000000000000000000000000002PWY"}}

//"Class":"MESStation.Config.SkunoCopy","Function":"SkuConpy","Data":{"NewSku":"88888","OldSku":"22222"}}