var KeyPartData = [];

var Skuno = "";
var ListName = "";
var DataList = [];
var apiList = {       //三级表增删改
    "add": {
        "className": "MESStation.KeyPart.KPScan",
        "functionName": "InsertKPList",

        "colList": ["ID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KPPartNo", "Station", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
        //接收的["上级ID          ID","C_KP_LIST_ITEM_ID","Grade","EDIT_EMP","SKUNO","LISTNAME","AUTOSTATION","AUTOSTATION2","TESTSTATION","KPPartNo  ","Station  ","QTY","SEQ","SILOADING_FLAG","PACKING_FLAG","SN_FLAG","CHECKPCBAVER_FALG","CHECKPCBMODELVER_FLAG","CHECKBOXSKUNO_FLAG"]
    },    //ID C_KP_LIST_ITEM_ID EDIT_EMP  KPPartNo  Station
    "edit": {
        "className": "MESStation.KeyPart.KPScan",
        "functionName": "UpadteKPList",
        "colList": ["ID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KPPartNo", "Station", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
        //"colList": ["ULKPListNameID", "KPListNameID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KP_PARTNO", "STATION", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
        //当前ID
    },
    "delete": {
        "className": "MESStation.KeyPart.KPScan",
        "functionName": "DeleteKPList",
        "colList": ["ID", "Grade"]
    }
};
var checkedData = {
    "tableGrade": 0,
    "currentNode": null,          //jquery Node
    "currentData": {},
    "parentData": null
};
var table_AllCols = {
    "table1": ["SKUNO", "EDIT_EMP"],
    "table1send": ["LISTNAME", "SKUNO", "EDIT_EMP"],
    "table2send": ["ID", "KPPartNo", "LISTNAME", "QTY", "SEQ", "Station"],  //修改用于生成发送数据，正常（修改功能正常），填充数据存在问题及新增的所有操作
    "table2": ["ID", "KP_PARTNO", "KP_NAME", "QTY", "SEQ", "STATION"],  //用于填充数据，正常（填充功能正常），生成发送数据存在问题
    "table3": ["ID", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION", "EDIT_EMP"]
    //table3 ：C_KP_LIST_ITEM_ID
}//每个表的字段
//前端接收的
//"ID": "MFGII0000000000000000000000000007VD",
//"LISTNAME": null,
//"SKUNO": "#74-111526-01",
//"EDIT_TIME": "2018-06-17 04:49:29",
//"EDIT_EMP": "F1333170"

//  "ID": "008",
//"LIST_ID": "005",
//"KP_NAME": "weffwe",
//"KP_PARTNO": "gffegfdg",
//"STATION": "fwefwe",
//"QTY": 2.0,
//"SEQ": 1.0,
//"EDIT_TIME": "2019-02-11 09:53:46",
//"EDIT_EMP": "TEST"

//----//"KPPartNo":"xx",
//"LISTNAME":"xx",   ---  KP_NAME
//"QTY":"2",
//"SEQ":"1",
//"Station":"xx",

///---add2---{
//"ID":"005",
//"KPPartNo":"KPPartNo1",
//"LISTNAME":"KPPartNo",
//"QTY":"1",
//"SEQ":"1",
//"Station":"Station",
//"Grade":2,
//"EDIT_EMP":"",
//"SKUNO":"",
//"AUTOSTATION":"",
//"AUTOSTATION2":"",
//"TESTSTATION":"",
//"SILOADING_FLAG":"",
//"PACKING_FLAG":"",
//"SN_FLAG":"",
//"CHECKPCBAVER_FALG":"",
//"CHECKPCBMODELVER_FLAG":"",
//"CHECKBOXSKUNO_FLAG":""


//"ID": "MFGII000000000000000000000000000D6V",
//      "C_KP_LIST_ITEM_ID": "MFGII000000000000000000000000000Q98",
//      "SILOADING_FLAG": "2",
//      "PACKING_FLAG": "1",
//      "SN_FLAG": "1",
//      "CHECKPCBAVER_FALG": "1",
//      "CHECKPCBMODELVER_FLAG": "1",
//      "AUTOSTATION": "XX",
//      "AUTOSTATION2": "XX",
//      "CHECKBOXSKUNO_FLAG": "1",
//      "TESTSTATION": "XXX",
//      "EDIT_EMP": "TEST",
//      "EDIT_TIME": "2018-12-25 16:21:12"

//SELESE 
//1.  ListName     “”
//2.  ListNameID  一级ID
//3.  ListNameID  二级ID

//update
//1.  
//"LISTNAME":"TEST0000",
//"SKUNO":"10-1808-13",
//"EDIT_EMP":"TEST",
//"ID":"004",
//"Grade":1,
//"AUTOSTATION":"",
//"AUTOSTATION2":"",
//"TESTSTATION":"",
//"KPPartNo":"",
//"Station":"",
//"QTY":0,
//"SEQ":0,
//"SILOADING_FLAG":"",
//"PACKING_FLAG":"",
//"SN_FLAG":"",
//"CHECKPCBAVER_FALG":"",
//"CHECKPCBMODELVER_FLAG":"",
//"CHECKBOXSKUNO_FLAG":""


//2
//"ID":"008",
//"KPPartNo":"xx",
//"LISTNAME":"xx",
//"QTY":"2",
//"SEQ":"1",
//"Station":"xx",
//"Grade":2,
//"EDIT_EMP":"TEST",
//"SKUNO":"",
//"AUTOSTATION":"",
//"AUTOSTATION2":"",
//"TESTSTATION":"",
//"SILOADING_FLAG":"",
//"PACKING_FLAG":"",
//"SN_FLAG":"",
//"CHECKPCBAVER_FALG":"",
//"CHECKPCBMODELVER_FLAG":"",
//"CHECKBOXSKUNO_FLAG":""

////------{
//"ID":"MFGII000000000000000000000000000Q9W",
//"KP_PARTNO":"KPPartNo2",
//"KP_NAME":"KPPartNo",
//"QTY":"1","SEQ":"1",
//"STATION":"Station",
//"Grade":2,
//"EDIT_EMP":"TEST",
//"SKUNO":"","AUTOSTATION":"","AUTOSTATION2":"","TESTSTATION":"","SILOADING_FLAG":"","PACKING_FLAG":"","SN_FLAG":"","CHECKPCBAVER_FALG":"","CHECKPCBMODELVER_FLAG":"","CHECKBOXSKUNO_FLAG":""}



//3.
//"ID":"MFGII000000000000000000000000000D6V",
//"SILOADING_FLAG":"1",
//"PACKING_FLAG":"1",
//"SN_FLAG":"1",
//"CHECKPCBAVER_FALG":"1",
//"CHECKPCBMODELVER_FLAG":"1",
//"AUTOSTATION":"XX",
//"AUTOSTATION2":"XX",
//"CHECKBOXSKUNO_FLAG":"1",
//"TESTSTATION":"XXXx",
//"EDIT_EMP":"TEST",
//"Grade":3,
//"SKUNO":"",
//"LISTNAME":"",
//"KPPartNo":"",
//"Station":"",
//"QTY":0,
//"SEQ":0





/*
* 操作： 
*
*
*
*
**/



SubTable = {};
$(document).ready(function () {

    var reset = function () {
        $(".table_box").html('');
        $("#table_box1").html('');
    }

    var Get_data = function () {
        parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetAllKPList", { ListName: ListName }, function (e) {
            if (e.Status == "Pass") {
                KeyPartData = e.Data;
                $('#KP_List_Table').bootstrapTable('load', e.Data);
                console.log("ele load success");

            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                    $("#KPFileUpload").val("");
                });
            }
        });
    }

    var InitKPCheck = function (index, row, $detail) {      //打开二级表执行 row：当前二级表数据
        var cur_table = $detail.html('<table></table>').find('table');
        var parentData = row;
        $(cur_table).bootstrapTable({
            pagination: false,
            singleSelect: true,  //单选
            onCheck: function (row, node) {     //选中
                //var index = node.closest("table").closest("tr").prev().closest("table").closest("tr").prev().attr("data-index");     //父表的父表的下标
                var currentData = row;
                //console.log(parentData,currentData);

                if (checkedData["currentNode"]) {
                    checkedData["currentNode"].prop("checked", false)
                }
                checkedData["tableGrade"] = 3;
                checkedData["currentNode"] = node;
                checkedData["currentData"] = currentData;
                checkedData["parentData"] = parentData;

            },
            onUncheck: function (row) {     //取消选中
                checkedData["tableGrade"] = 0;
                checkedData["currentNode"] = null;
                checkedData["currentData"] = null;
                checkedData["parentData"] = null;
            },
            //GCH 2018/12/05 ADD (新增三级表)
            //["SKUNO","KP_NAME","SILOADING_FLAG","PACKING_FLAG","SN_FLAG","CHECKPCBAVER_FALG","CHECKPCBMODELVER_FLAG","AUTOSTATION","AUTOSTATION2","CHECKBOXSKUNO_FLAG","TESTSTATION","EDIT_EMP"];    //列
            //detailView: true,
            //onExpandRow: function (index, row, $detail) {
            //    InitKPCheck(index, row, $detail);
            //    //InitKPItem(index, row, $detail);   
            //},
            //onRefresh: function (param) {
            //    console.log("xxx!");
            //    //Get_data();
            //},
            data: [],
            columns: [{
                field: 'select',
                title: 'select',
                checkbox: true
            }, {
                field: 'SILOADING_FLAG',
                title: "<label set-lan=" + "html:SILOADING_FLAG" + ">SILOADING_FLAG</label>" //'SILOADING_FLAG'
            }, {
                field: 'PACKING_FLAG',
                title: "<label set-lan=" + "html:PACKING_FLAG" + ">PACKING_FLAG</label>" //''PACKING_FLAG'
            }, {
                field: 'SN_FLAG',
                title: "<label set-lan=" + "html:SN_FLAG" + ">SN_FLAG</label>" //'SN_FLAG'
            }, {
                field: 'CHECKPCBAVER_FALG',
                title: "<label set-lan=" + "html:CHECKPCBAVER_FALG" + ">CHECKPCBAVER_FALG</label>" //'CHECKPCBAVER_FALG'
            }, {
                field: 'CHECKPCBMODELVER_FLAG',
                title: "<label set-lan=" + "html:CHECKPCBMODELVER_FLAG" + ">CHECKPCBMODELVER_FLAG</label>" //'CHECKPCBMODELVER_FLAG'
            }, {
                field: 'AUTOSTATION',
                title: "<label set-lan=" + "html:AUTOSTATION" + ">AUTOSTATION</label>" //'AUTOSTATION'
            }, {
                field: 'AUTOSTATION2',
                title: "<label set-lan=" + "html:AUTOSTATION2" + ">AUTOSTATION2</label>" //'AUTOSTATION2'
            }, {
                field: 'CHECKBOXSKUNO_FLAG',
                title: "<label set-lan=" + "html:CHECKBOXSKUNO_FLAG" + ">CHECKBOXSKUNO_FLAG</label>" //'CHECKBOXSKUNO_FLAG'
            }, {
                field: 'TESTSTATION',
                title: "<label set-lan=" + "html:TESTSTATION" + ">TESTSTATION</label>" //'TESTSTATION'
            }, {
                field: 'EDIT_EMP',
                title: "<label set-lan=" + "html:EDIT_EMP" + ">EDIT_EMP</label>" //'EDIT_EMP'
            }, {
                field: 'EDIT_TIME',
                title: "<label set-lan=" + "html:EDIT_TIME" + ">EDIT_TIME</label>" //'EDIT_TIME'
            }]
        });
        //console.log(row);
        var MessageID = "TABLE" + parseInt(Math.random() * 99).toString() + Date.now().toString()
        SubTable[MessageID] = cur_table;
        console.log({ "ListNameID": row });
        parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetKPListByListItemName", { "ListNameID": row.ID }, function (e) {
            console.log("xx");
            if (e.Status == "Pass") {
                //console.log(e.Data);
                var stb = SubTable[MessageID];
                delete SubTable[MessageID];
                $(stb).bootstrapTable('load', e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {

                });
            }
        });
    }

    var InitKPItem = function (index, row, $detail) {     // 打开一级表执行 row ：当前一级表数据
        console.log(row);
        var cur_table = $detail.html('<table></table>').find('table');
        var parentData = row;
        $(cur_table).bootstrapTable({
            pagination: false,
            detailView: true,
            singleSelect: true,  //单选
            onCheck: function (row, node) {     //选中

                //var parentIndex = node.closest("table").closest("tr").prev().attr("data-index");  //父表下标
                //var parentNode = node.closest("table").closest("tr").prev().closest("table");      //父表父节点
                //var parentCurrentNode = node.closest("table").closest("tr").prev();      //父表当前节点
                //var parentInputNode = node.closest("table").closest("tr").prev().find("input");    //父表的选择框

                var currentData = row;
                //console.log(parentData, currentData);

                if (checkedData["currentNode"]) {
                    checkedData["currentNode"].prop("checked", false)
                }
                checkedData["tableGrade"] = 2;
                checkedData["currentNode"] = node;
                checkedData["currentData"] = currentData;
                checkedData["parentData"] = parentData;

            },
            onUncheck: function (row, node) {     //取消选中
                checkedData["tableGrade"] = 0;
                checkedData["currentNode"] = null;
                checkedData["currentData"] = null;
                checkedData["parentData"] = null;
            },
            onExpandRow: function (index, row, $detail) {     //打开二级表执行
                InitKPCheck(index, row, $detail);
                setLanguage("KeyPartSetting", $detail);
            },
            //onRefresh: function (param) {
            //    console.log("xxx!");
            //    //Get_data();
            //},
            data: [],
            //"ID": "003",
            //"LIST_ID": "002",
            //"KP_NAME": "TEST-KP1",
            //"KP_PARTNO": "10-1808-14",
            //"STATION": "SILOADING",
            //"QTY": 1.0,
            //"SEQ": 111.0,
            //"EDIT_TIME": "2018-12-19 15:54:51",
            //"EDIT_EMP": "TEST"

            columns: [{
                field: 'select',
                title: 'select',
                checkbox: true
            }, {
                field: 'KP_PARTNO',
                title: "<label set-lan=" + "html:KP_PARTNO" + ">KP_PARTNO</label>" // 'KPPartNo'
            }, {
                field: 'KP_NAME',
                title: "<label set-lan=" + "html:KP_NAME" + ">KP_NAME</label>" // 'KP_NAME'
            }, {
                field: 'QTY',
                title: "<label set-lan=" + "html:QTY" + ">QTY</label>" //'QTY'
            }, {
                field: 'SEQ',
                title: "<label set-lan=" + "html:SEQ" + ">SEQ</label>" //'SEQ'
            }, {
                field: 'STATION',
                title: "<label set-lan=" + "html:STATION" + ">STATION</label>" //'Station'

            },
            //{
            //    field: 'Detail',
            //    title: 'Scan Detail',
            //    formatter: function (value, row, index) {
            //        if (value.length > 0) {
            //            var e = "<ol>";
            //            for (var i = 0; i < value.length; i++) {
            //                e += "<li>" + value[i].SCANTYPE + "</li>";
            //            }
            //            e += "</ol>";
            //            return e;
            //        }
            //        return "";
            //    }
            //}
            ]
        });
        var MessageID = "TABLE" + parseInt(Math.random() * 99).toString() + Date.now().toString()
        SubTable[MessageID] = cur_table;
        parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetKPListByListItem", { ListNameID: row.ID }, function (e) {
            if (e.Status == "Pass") {
                //console.log(e.Data);
                var stb = SubTable[MessageID];
                delete SubTable[MessageID];
                $(stb).bootstrapTable('load', e.Data);   //e.Data.Item
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {

                });
            }
        });
    };

    var HTMLOUT = document.getElementById("table_box1");

    var ShowData = {
        id: "ShowData",
        type: 1,
        shade: 0.8,
        shadeClose: false,
        title: "Excel Data",
        area: ['80%', '80%'],
        content: $(".table_box"),
        btn: ["Upload", "cancel"],
        success: function (layero, index) {
            $(".table_box").removeClass("hidden");
        },
        end: function () {
            $(".table_box").addClass("hidden");
        },
        yes: function (index) {
            parent.client.CallFunction("MESStation.KeyPart.KPScan", "UpLoadKPList", { SkuNo: Skuno, ListName: ListName, ListData: DataList }, function (e) {
                if (e.Status == "Pass") {
                    layer.close(index);
                    layer.msg("Success", {
                        icon: 1,
                        time: 3000
                    }, function () {
                        $("#KPFileUpload").val("");
                        Get_data();
                    });
                } else {
                    layer.msg(e.Message, {
                        icon: 2,
                        time: 3000
                    }, function () {
                    });
                }
            });
        },
        cancel: function (index) {
            $("#KPFileUpload").val("");
            layer.close(index);
        }
    };

    $("#AddKPList").on("click", function () {
        console.log(checkedData);
        //loadLayerData(table_AllCols["table1"], "add");
        //清空弹出框form-control
        $("#AddList .panel-body").find(".row").empty();//form-group col-sm-6 col-md-6 closest
        $("#AddList .panel-body").find(".row").append($("<br>"));
        var grade = checkedData["tableGrade"];

        switch (grade) {
            case 0:
                loadLayer(loadLayerData(table_AllCols["table1"], "add"));
                break;
            case 1:
                loadLayer(loadLayerData(table_AllCols["table2send"], "add"));
                break;
            case 2:
                loadLayer(loadLayerData(table_AllCols["table3"], "add"));
                for (var i = 1; i < 6; i++) {//add by zc  2019/4/17帶*號提示必填
                    var ii = $("<span style='color:red'>*</span>");
                    $("#AddList").find("label").eq(i).before(ii);
                }
                break;
        }

        layer.open({
            type: 1,
            skin: "layui-layer-lan",
            title: 'New Data',
            area: ["80%", "80%"],
            scrollbar: false,
            content: $("#AddList"),
            maxmin: false,
            success: function (layero, index) {

                var lay = layero;
                var w = lay.css("width");
                var h = lay.css("height");
                lay.css({
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    marginTop: -Number(h.match(/\d+/g)) / 2 + "px",
                    marginLeft: -Number(w.match(/\d+/g)) / 2 + "px",
                });
                var nav = lay.children().eq(0);
                nav.off("mousedown");
                nav.off("mousemove");
                nav.off("mouseup");
                nav.off("click");

                $("#AddList").removeClass("hidden");                            //显示弹出框
                var inputList = $("#AddList .panel-body").find(".addList");
                EDIT_EMP = self.parent.client.UserInfo.EMP_NO;                  //修改人
                //填充数据更改样式
                inputList.each(function (index, ele) {
                    if ($(ele).attr("id") == "EDIT_EMP") {    //如果存在修改人
                        ele.value = EDIT_EMP;
                        $(ele).attr("disabled", "disabled");
                    }
                    if ($(ele).attr("id") == "ID") {    //如果存在ID
                        ele.value = checkedData["currentData"]["ID"];
                        $(ele).attr("disabled", "disabled");
                    }
                });

                $(".addBtn").on("click", function () {                              //点击 新增数据
                    var valList = [];
                    var flag = true;
                    inputList.each(function (index, ele) {
                        valList.push(ele.value);
                        if (ele.value == "") {
                            flag = true;
                        }
                    });
                    if (flag) {
                        var sendData;
                        var inputArr;
                        switch (grade) {    //根据操作的表的级别生成待发送的数据
                            case 0:
                                sendData = sendData_colList(table_AllCols["table1"], valList);
                                inputArr = table_AllCols["table1"];//
                                break;
                            case 1:
                                sendData = sendData_colList(table_AllCols["table2send"], valList);
                                inputArr = table_AllCols["table2send"];
                                break;
                            case 2:
                                sendData = sendData_colList(table_AllCols["table3"], valList);
                                inputArr = table_AllCols["table3"];
                                break;
                        }
                        $.each(apiList["add"]["colList"], function (index, val) {
                            if (!arr_Contain(inputArr, val)) {      //判断inputArr是否包含val
                                sendData[val] = "";                    //其他项先填充为空
                            }
                            if (val == "Grade") {                       //把表级别加一
                                sendData[val] = grade + 1;
                            }
                            if (val == "QTY" && !arr_Contain(inputArr, val)) {  //QTY
                                sendData[val] = 0;                      //QTY和SEQ要求为数字
                            }
                            if (val == "SEQ" && !arr_Contain(inputArr, val)) {  //SEQ
                                sendData[val] = 0;
                            }
                        });
                        console.log(sendData);
                        self.parent.client.CallFunction(apiList["add"]["className"], apiList["add"]["functionName"], sendData, function (e) {
                            console.log(e);
                            if (e.Status == "Pass") {
                                layer.msg(e.Message, {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    //console.log("addSuccess!");
                                    location.reload();
                                });
                            } else {
                                layer.msg(e.Message, {
                                    icon: 0,
                                    time: 1000
                                }, function () {
                                    //console.log("addSuccess!");
                                    location.reload();
                                });
                            }
                        });
                    }


                });
            },
            end: function () {
                $("#AddList").addClass("hidden");                                       //隐藏弹出框
                $("#AddList .panel-body").find(".addList").each(function (index, node) {     //关闭弹出框各项数据置空
                    node.value = "";
                });
            }
        });
    });

    $("#EditKPList").on("click", function () {
        console.log(checkedData);
        //loadLayerData(table_AllCols["table1"], "add");
        //清空弹出框form-control
        $("#ModifyList .panel-body").find(".row").empty();//form-group col-sm-6 col-md-6 closest
        $("#ModifyList .panel-body").find(".row").append($("<br>"));
        var grade = checkedData["tableGrade"];

        switch (grade) {
            case 1:
                loadLayer(loadLayerData(table_AllCols["table1send"], "edit"));
                break;
            case 2:
                loadLayer(loadLayerData(table_AllCols["table2"], "edit"));
                break;
            case 3:
                loadLayer(loadLayerData(table_AllCols["table3"], "edit"));
                break;
        }

        layer.open({
            type: 1,
            skin: "layui-layer-lan",
            title: 'Edit Data',
            area: ["80%", "80%"],
            scrollbar: false,
            content: $("#ModifyList"),
            maxmin: true,
            success: function (layero, index) {

                var lay = layero;
                var w = lay.css("width");
                var h = lay.css("height");
                lay.css({
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    marginTop: -Number(h.match(/\d+/g)) / 2 + "px",
                    marginLeft: -Number(w.match(/\d+/g)) / 2 + "px",
                });
                var nav = lay.children().eq(0);
                nav.off("mousedown");
                nav.off("mousemove");
                nav.off("mouseup");
                nav.off("click");

                $("#ModifyList").removeClass("hidden");                         //显示弹出框
                var inputList = $("#ModifyList .panel-body").find(".editList");
                EDIT_EMP = self.parent.client.UserInfo.EMP_NO;                  //修改人
                //填充数据更改样式
                inputList.each(function (index, ele) {
                    console.log(checkedData["currentData"][$(ele).attr("id")], $(ele).attr("id"));
                    ele.value = checkedData["currentData"][$(ele).attr("id")];          //先赋值，再处理特殊情况
                    if ($(ele).attr("id") == "EDIT_EMP") {    //如果存在修改人
                        ele.value = EDIT_EMP;
                        $(ele).attr("disabled", "disabled");
                    }
                    if ($(ele).attr("id") == "ID") {    //如果存在ID
                        ele.value = checkedData["currentData"]["ID"];
                        $(ele).attr("disabled", "disabled");
                    }
                    if ($(ele).attr("id") == "LISTNAME") {
                        $(ele).attr("disabled", "disabled");
                        ele.value = checkedData["currentData"]["LISTNAME"] || checkedData["currentData"]["KPName"];
                    }
                });


                $(".editBtn").on("click", function () {                              //点击 修改数据
                    var valList = [];
                    var flag = false;
                    inputList.each(function (index, ele) {
                        valList.push(ele.value);
                        //判断逻辑：如果不是 LISTNAME 项时，判断框内的值是否与之前不相等（不相等则进入逻辑）；如果是 LISTNAME 项时，先判断框内的值是否与之前的（LISTNAME 或 KPName ：1级表的是LISTNAME，二级表的是KPName ）不相同（不相同则进入逻辑），
                        if (($(ele).attr("id") != "LISTNAME" && ele.value != checkedData["currentData"][$(ele).attr("id")]) || ($(ele).attr("id") == "LISTNAME" && ele.value != (checkedData["currentData"]["LISTNAME"] || checkedData["currentData"]["KPName"]))) {
                            console.log(ele.value, checkedData["currentData"][$(ele).attr("id")] || checkedData["currentData"]["KPName"], ele.value == checkedData["currentData"][$(ele).attr("id")] || checkedData["currentData"]["KPName"]);
                            flag = true;
                            //if ($(ele).attr("id") != "ID") {  //ID是上级ID,不能当做判断数据是否被修改的标准

                            //}
                        }
                    });
                    if (flag) {
                        var sendData;
                        var inputArr;
                        switch (grade) {    //根据操作的表的级别生成待发送的数据
                            case 1:
                                sendData = sendData_colList(table_AllCols["table1send"], valList);
                                inputArr = table_AllCols["table1send"];
                                break;
                            case 2:
                                sendData = sendData_colList(table_AllCols["table2send"], valList);
                                inputArr = table_AllCols["table2send"];
                                break;
                            case 3:
                                sendData = sendData_colList(table_AllCols["table3"], valList);
                                inputArr = table_AllCols["table3"];
                                break;
                        }
                        $.each(apiList["edit"]["colList"], function (index, val) {
                            if (!arr_Contain(inputArr, val)) {      //判断inputArr是否包含val
                                sendData[val] = "";                    //其他项先填充为空
                            }
                            if (val == "Grade") {                       //把表级别加一
                                sendData[val] = grade;
                            }
                            if (val == "QTY" && !arr_Contain(inputArr, val)) {  //QTY
                                sendData[val] = 0;                      //QTY和SEQ要求为数字
                            }
                            if (val == "SEQ" && !arr_Contain(inputArr, val)) {  //SEQ
                                sendData[val] = 0;
                            }
                        });
                        if (grade == 1) {
                            sendData["ID"] = checkedData["currentData"]["ID"];
                        }
                        if (grade == 2) {
                            sendData["EDIT_EMP"] = EDIT_EMP;
                        }
                        console.log(sendData);
                        self.parent.client.CallFunction(apiList["edit"]["className"], apiList["edit"]["functionName"], sendData, function (e) {
                            console.log(e);
                            if (e.Status == "Pass") {
                                layer.msg(e.Message, {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    //console.log("addSuccess!");
                                    location.reload();
                                });
                            } else {
                                layer.msg(e.Message, {
                                    icon: 0,
                                    time: 1000
                                }, function () {
                                    //console.log("addSuccess!");
                                    location.reload();
                                });
                            }
                        });
                    } else {
                        layer.msg("请修改数据!", {
                            icon: 0,
                            time: 1000
                        }, function () {
                            //console.log("addSuccess!");
                            //location.reload();
                        });
                    }


                });
            },
            end: function () {
                $("#AddList").addClass("hidden");                                       //隐藏弹出框
                $("#AddList .panel-body").find(".addList").each(function (index, node) {     //关闭弹出框各项数据置空
                    node.value = "";
                });
            }
        });
    });

    $('#DeleteKPList').on('click', function () {     //Delete

        console.log(checkedData);
        layer.open({
            title: 'Warning',
            btn: ['Delete', 'Cancel'],
            content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
            yes: function (index) {
                layer.close(index);
                var ID = checkedData["currentData"]["ID"];
                var Grade = checkedData["tableGrade"];
                var sendData = {
                    "ID": ID,
                    "Grade": Grade
                };
                console.log(sendData);
                self.parent.client.CallFunction(apiList["delete"]["className"], apiList["delete"]["functionName"], sendData, function (e) {
                    if (e.Status == "Pass") {
                        layer.msg(e.Message, {
                            icon: 1,
                            time: 1000
                        }, function () {
                            //console.log("addSuccess!");
                            location.reload();
                        });
                    } else {
                        layer.msg(e.Message, {
                            icon: 0,
                            time: 1000
                        }, function () {
                            //console.log("addSuccess!");
                            location.reload();
                        });
                    }

                });

                //layer.close(index);
                //var Names = [];
                //for (var i = 0; i < selRows.length; i++) {
                //    Names.push(selRows[i].LISTNAME);
                //}
                //parent.client.CallFunction("MESStation.KeyPart.KPScan", "RemoveKPList", { ListNames: Names }, function (e) {     
                //    if (e.Status == "Pass") {
                //        layer.msg("Success", {
                //            icon: 1,
                //            time: 3000
                //        }, function () {
                //            Get_data();
                //        });
                //    }
                //    else {
                //        layer.msg(e.Message, {
                //            icon: 2,
                //            time: 3000
                //        }, function () {
                //        });
                //    }
                //});
            }
        });

        //var selRows = $('#KP_List_Table').bootstrapTable('getAllSelections');
        //if (selRows.length > 0) {
        //layer.open({
        //    title: 'Warning',
        //    btn: ['Delete', 'Cancel'],
        //    content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
        //    yes: function (index) {
        //        layer.close(index);
        //        var Names = [];
        //        for (var i = 0; i < selRows.length; i++) {
        //            Names.push(selRows[i].LISTNAME);
        //        }
        //        parent.client.CallFunction("MESStation.KeyPart.KPScan", "RemoveKPList", { ListNames: Names }, function (e) {
        //            if (e.Status == "Pass") {
        //                layer.msg("Success", {
        //                    icon: 1,
        //                    time: 3000
        //                }, function () {
        //                    Get_data();
        //                });
        //            }
        //            else {
        //                layer.msg(e.Message, {
        //                    icon: 2,
        //                    time: 3000
        //                }, function () {
        //                });
        //            }
        //        });
        //    }
        //});
        //} else {
        //    layer.msg("no records selected", {
        //        icon: 2,
        //        time: 3000
        //    }, function () {
        //    });
        //}
    });

    $('#DownloadTemplateFile').on('click', function () {
        window.open("../../File/KP_TEMP.xlsx");
    });

    $('#KPFileUpload').change(function (e) {
        reset();
        var filename = $(this).val();
        if ((filename.indexOf(".xlsx") >= 0) || (filename.indexOf(".xlsm") >= 0) || (filename.indexOf(".xlsb") >= 0) || (filename.indexOf(".xls") >= 0) || (filename.indexOf(".xltx") >= 0) || (filename.indexOf(".xltm") >= 0) || (filename.indexOf(".xlt") >= 0) || (filename.indexOf(".xlam") >= 0) || (filename.indexOf(".xla") >= 0)) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = function (e) {
                var data = new Uint8Array(reader.result);
                var wb = XLSX.read(data, { type: 'array' });
                var shitname = wb.SheetNames;

                HTMLOUT.innerHTML = "";
                wb.SheetNames.forEach(function (sheetName) {
                    var htmlstr = XLSX.write(wb, { sheet: shitname[0], type: 'binary', bookType: 'html' });
                    HTMLOUT.innerHTML += htmlstr;
                });

                $("#table_box1").find("td").each(function () { $(this).text($(this).text().trim()); });

                var first_sheet = $("#table_box1").children("table").eq(0).html();
                var colum_qty = $(first_sheet).children('tr').eq(0).children('td').length;
                var arrray1 = [];
                var arrDataAll = [];
                var arrData = [];
                var row_modal = "";
                var other_rows = "";
                var first_row = "";
                var cell = "";
                $(first_sheet).children('tr').eq(0).children('td').each(function () {
                    var zz = $(this).text().trim();
                    var zz1 = "";
                    for (var i = 0; i < zz.length; i++) {
                        if (zz[i].trim() != "") { zz1 += zz[i]; }
                    }
                    cell += '<td>' + zz1 + '</td>';
                });
                Skuno = $(cell).eq(1).text();
                if (Skuno == "") {
                    layer.msg("Skuno is Invalid! </br> Please check your file!", {
                        icon: 2,
                        time: 3000
                    }, function () {
                        $("#KPFileUpload").val("");
                    });
                    return false;
                }
                ListName = $(cell).eq(4).text();
                if (ListName == "") {
                    layer.msg("ListName is Invalid! </br> Please check your file!", {
                        icon: 2,
                        time: 3000
                    }, function () {
                        $("#KPFileUpload").val("");
                    });
                    return false;
                }
                first_row = '<tr>' + cell + '</tr>';
                for (var i = 0; i < colum_qty; i++)
                    row_modal += '<td></td>';

                $(first_sheet).children('tr').each(function () {
                    arrray1.push($(this).html());

                });

                for (var i = 1; i < arrray1.length; i++) {
                    if (arrray1[i] != row_modal) { arrDataAll.push(arrray1[i]); }
                }

                for (var i = 1; i < arrDataAll.length; i++) {
                    arrDataAll[i] = '<tr>' + arrDataAll[i] + '</tr>';

                }

                for (var i = 0; i < colum_qty; i++) {
                    arrData.push($(arrDataAll[0]).eq(i).text());
                }

                var substr1 = '[';
                for (var i = 1; i < arrDataAll.length; i++) {
                    var count3 = -1;
                    var substr = '{';
                    $(arrDataAll[i]).children('td').each(function () {
                        count3++;
                        if (count3 == colum_qty - 1) {
                            var xx = $(this).text().trim();
                            substr += '\"' + arrData[count3] + '\":\"' + xx + '\"}';
                        }
                        else {
                            var xx1 = $(this).text().trim();
                            substr += '\"' + arrData[count3] + '\":\"' + xx1 + '\",';
                        }


                    });
                    if (i == arrDataAll.length - 1) { substr1 += substr + ']'; break; }
                    else substr1 += substr + ',';

                }
                DataList = JSON.parse(substr1);

                for (var i = 0; i < arrDataAll.length; i++) {
                    first_row += arrDataAll[i];
                }
                $(".table_box").html('<table border="1" class="table table-responsive" style="text-align:center;">' + first_row + '</table>');
                parent.client.CallFunction("MESStation.KeyPart.KPScan", "CheckKPListName", { ListName: ListName }, function (e) {
                    if (e.Status == "Pass") {
                        if (e.Data) {
                            layer.open({
                                title: 'Warning',
                                btn: ['Replace', 'Cancel'],
                                content: "KP List Name Exists! </br> Continue to cover [" + ListName + "] Keypart List!",
                                yes: function (index) {
                                    layer.close(index);
                                    layer.open(ShowData);
                                }
                            });
                        } else {
                            layer.open(ShowData);
                        }
                    } else {
                        layer.msg(e.Message, {
                            icon: 2,
                            time: 3000
                        }, function () {
                        });
                    }
                });
            }
        }
        else {
            reset();
            alert('Please select excel file with xlsx/xlsm/xlsb/xls/xltx/xltm/xlt/xlam/xla formats');
        }
    });

    $('#KP_List_Table').bootstrapTable({    //绘制一级表 
        pagination: true,
        pageSize: 50,         //初始化每一页的数据条数
        pageList: [50, 100, 200, 500],
        search: true,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: true,
        singleSelect: true,  //单选
        uniqueId: "id",
        selectItemName: "id",
        toolbar: "#KP_List_Table_Toolbar",
        onCheck: function (row, node) {     //选中
            //var index = node.attr("data-index"); //下标
            if (checkedData["currentNode"]) {
                checkedData["currentNode"].prop("checked", false)
            }
            checkedData["tableGrade"] = 1;
            checkedData["currentNode"] = node;
            checkedData["currentData"] = row;
            checkedData["parentData"] = null;

        },
        onUncheck: function (row, node) {     //取消选中
            //var index = node.attr("data-index");
            checkedData["tableGrade"] = 0;
            checkedData["currentNode"] = null;
            checkedData["currentData"] = null;
            checkedData["parentData"] = null;
        },
        onExpandRow: function (index, row, $detail) {

            InitKPItem(index, row, $detail);
            setLanguage("KeyPartSetting", $detail);
        },
        //onRefresh: function (param) {
        //    console.log("run this1!");
        //    Get_data();
        //},
        columns: [{
            field: 'select',
            title: 'select',   //<label set-lan="+ "html:select"">"+"select"+"</label>
            checkbox: true
        }, {
            field: 'LISTNAME',
            title: "<label set-lan=" + "html:LISTNAME" + ">LISTNAME</label>" //'List Name'  
        }, {
            field: 'SKUNO',
            title: "<label set-lan=" + "html:SKUNO" + ">SKUNO</label>" //'SkuNo'
        }, {
            field: 'EDIT_TIME',
            title: "<label set-lan=" + "html:EDIT_TIME" + ">EDIT_TIME</label>" //'Upload Time'
        }, {
            field: 'EDIT_EMP',
            title: "<label set-lan=" + "html:EDIT_EMP" + ">EDIT_EMP</label>" //'Upload By'
        }],
        data: KeyPartData
    });

    Get_data();
    var timer = setInterval(function () {
        if ($("#KP_List_Table thead")[0]) {
            clearInterval(timer);
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            setLanguage("KeyPartSetting", $(".bootstrap-table"));
        }
    });
    //setLanguage("KeyPartSetting");

    function loadLayer(layerContent) {  //layerContent：layer弹出框内容信息： obj
        var addLen = layerContent["add"].length;
        var editLen = layerContent["edit"].length;
        var addList = $("#AddList").find(".row");
        var editList = $("#ModifyList").find(".row");
        if (layerContent["add"]) {
            for (var i = 0; i < addLen; i++) {
                addLayer(layerContent["add"][i]);
            }
            addList[0].appendChild(createBtn("ADD", "AddMsg", "ADD", "addBtn"));  //添加ADD按钮
        }
        if (layerContent["edit"]) {
            for (var j = 0; j < editLen; j++) {
                editLayer(layerContent["edit"][j]);
            }
            editList[0].appendChild(createBtn("EDIT", "EditMsg", "EDIT", "editBtn"));  //添加EDIT按钮
        }

        function addLayer(addContent) {  //obj
            addList[0].appendChild(createControl(addContent["type"], addContent["name"], addContent["setLan"], addContent["idName"], addContent["className"], addContent["enable"]));
        }

        function editLayer(editContent) {
            editList[0].appendChild(createControl(editContent["type"], editContent["name"], editContent["setLan"], editContent["idName"], editContent["className"], editContent["enable"]));
        }

        function createBtn(name, setLan, divClass, btnClass) {
            var oDiv = document.createElement("div");
            var label = document.createElement("label");
            var div = document.createElement("div");
            var btn = document.createElement("button");

            oDiv.setAttribute("class", divClass + " col-sm-6 col-md-6");
            label.setAttribute("class", "col-xs-3 control-label text-right");
            div.setAttribute("class", "col-xs-8");
            btn.setAttribute("class", btnClass + " form-control");
            btn.setAttribute("set-lan", "html:" + setLan);
            btn.innerHTML = name;

            div.appendChild(btn);
            oDiv.appendChild(label);
            oDiv.appendChild(div);
            return oDiv;
        }

        function createControl(type, name, setLan, idName, className, enable) {  //生成控件
            var oDiv = document.createElement("div");
            oDiv.setAttribute("class", "form-group col-sm-6 col-md-6");
            oDiv.appendChild(createLabel(setLan, name));
            oDiv.appendChild(createDiv(type, idName, className, enable));
            return oDiv;

            function createLabel(setLan, name) {
                var label = document.createElement("label");
                label.setAttribute("class", "col-xs-3 control-label text-right");
                label.setAttribute("set-lan", setLan);
                label.innerHTML = name;
                return label;
            }
            function createDiv(type, idName, className, enable) {
                var div = document.createElement("div");
                div.setAttribute("class", "col-xs-8");

                switch (type) {
                    case "input":
                        div.appendChild(createInput(idName, className, enable));
                        break;
                }
                return div;

                function createInput(idName, className, enable) {
                    var oInput = document.createElement("input");
                    oInput.setAttribute("id", idName);
                    oInput.setAttribute("class", className);
                    if (!enable) {
                        oInput.setAttribute("disabled", "disabled");
                    }
                    return oInput;
                }
            }
        }


    }

    function loadLayerData(colArr, type) {   //生成 loadLayerData
        var layerContent = {
            "add": [],
            "edit": []
        };
        if (type == "add") {
            //layerContent["add"] = [];
            $.each(colArr, function (index, val) {
                //console.log(index, val);
                var obj = {
                    "type": "input",
                    "name": val,
                    "setLan": val,
                    "idName": val,
                    "className": "form-control addList",
                    "enable": true
                };
                layerContent["add"].push(obj);
            });
        }
        if (type == "edit") {
            //layerContent["edit"] = [];
            $.each(colArr, function (index, val) {
                //console.log(index, val);
                var obj = {
                    "type": "input",
                    "name": val,
                    "setLan": val,
                    "idName": val,
                    "className": "form-control editList",
                    "enable": true
                };
                layerContent["edit"].push(obj);
            });
        }
        return layerContent;
    }

    function arr_Contain(arr, val) {    //判断arr中是否存在val
        var flag = false;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == val) {
                flag = true;
                continue;
            }
        }
        return flag;
    }

    function sendData_colList(colList, dataList) {
        var sendData = {};
        $.each(colList, function (index, val) {
            sendData[val] = dataList[index];
        });
        return sendData;
    }

    function setLanguage(pageName, $ele) {
        var client = self.parent.client;
        var MesUI = new self.parent.MesClientUI(client);
        if ($ele) {   //配置指定区域
            var lan = self.parent.$.cookie(self.parent.$.MES.CK_LAN_NAME);
            var PCKN = lan + "_" + pageName;
            client.GetLanguage(lan, pageName, function (event) {
                if (event.Status == "Pass") {
                    var data = event.Data;
                    $ele.find('[set-lan]').each(function () {
                        var me = $(this);
                        var a = me.attr('set-lan').split(':');
                        var p = a[0];   //文字放置位置
                        var m = a[1];   //文字的标识
                        var attr = "";
                        if (m.indexOf('=') >= 0) {
                            var s = m.split('=');
                            attr = s[0];
                            m = s[1];
                        }
                        var t = data[m];
                        //文字放置位置有（html,val等，可以自己添加）
                        switch (p) {
                            case 'html':
                                me.html(t);
                                break;
                            case 'attr':
                                me.attr(attr, t);
                                break;
                            case 'val':
                            case 'value':
                                me.val(t);
                                break;
                            default:
                                me.html(t);
                        }
                    });
                }
                else {
                    swal("Get language fail", event.Message, "error");
                }
            });
        } else {   //配置整个语言
            MesUI.SetLanguage(pageName);   //存在问题，未能解决
        }

    }

});