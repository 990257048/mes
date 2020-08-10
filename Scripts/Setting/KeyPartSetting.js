var KeyPartData = [];

var Skuno = "";
var ListName = "";
var DataList = [];
//var apiList = {       //三级表增删改
//    "add": {
//        "className": "MESStation.KeyPart.KPScan",
//        "functionName": "InsertKPList",
//        "colList": ["ID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KPPartNo", "Station", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
//        //接收的["上级ID          ID","C_KP_LIST_ITEM_ID","Grade","EDIT_EMP","SKUNO","LISTNAME","AUTOSTATION","AUTOSTATION2","TESTSTATION","KPPartNo  ","Station  ","QTY","SEQ","SILOADING_FLAG","PACKING_FLAG","SN_FLAG","CHECKPCBAVER_FALG","CHECKPCBMODELVER_FLAG","CHECKBOXSKUNO_FLAG"]
//    },    //ID C_KP_LIST_ITEM_ID EDIT_EMP  KPPartNo  Station
//    "edit": {
//        "className": "MESStation.KeyPart.KPScan",
//        "functionName": "UpadteKPList",
//        "colList": ["ID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KPPartNo", "Station", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
//        //"colList": ["ULKPListNameID", "KPListNameID", "Grade", "EDIT_EMP", "SKUNO", "LISTNAME", "AUTOSTATION", "AUTOSTATION2", "TESTSTATION", "KP_PARTNO", "STATION", "QTY", "SEQ", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "CHECKBOXSKUNO_FLAG"]
//        //当前ID
//    },
//    "delete": {
//        "className": "MESStation.KeyPart.KPScan",
//        "functionName": "DeleteKPList",
//        "colList": ["ID", "Grade"]
//    }
//};
//var table_AllCols = {
//    "table1": ["SKUNO", "EDIT_EMP"],
//    "table1send": ["LISTNAME", "SKUNO", "EDIT_EMP"],
//    "table2send": ["ID", "KPPartNo", "LISTNAME", "QTY", "SEQ", "Station"],  //修改用于生成发送数据，正常（修改功能正常），填充数据存在问题及新增的所有操作
//    "table2": ["ID", "KP_PARTNO", "KP_NAME", "QTY", "SEQ", "STATION"],  //用于填充数据，正常（填充功能正常），生成发送数据存在问题
//    "table3": ["ID", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG", "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION", "EDIT_EMP"]
//    //table3 ：C_KP_LIST_ITEM_ID
//}//每个表的字段


//---- 20190625 modify by gch ----//
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

var checkedData = {
    "tableGrade": 0,             //当前操作的表的等级（1,2,3）   
    "currentNode": null,       //当前选中的复选框（jquery Node）
    "currentData": {},            //当前选中的数据
    "parentData": null          //当前父级表数据
};

var ApiList = {    //后台定义的api，后台接收的值（前台发送的值）
    Add: {
        className: "MESStation.KeyPart.KPScan",
        functionName: "InsertKPList",
        sendList1: ["Grade", "SKUNO", "EDIT_EMP"],
        sendList2: ["Grade", "ID", "KP_PARTNO", "KP_NAME", "QTY", "SEQ", "STATION", "SKUNO", "SCANTYPE", "MPN"],
        sendList3: ["Grade", "ID", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG",
                          "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION", "EDIT_EMP"
        ]
    },
    Edit: {
        className: "MESStation.KeyPart.KPScan",
        functionName: "UpadteKPList",
        sendList1: ["Grade", "ID", "SKUNO", "LISTNAME", "EDIT_EMP"],     //ID:本级ID  不用LISTNAME，后台生成
        sendList2: ["Grade", "ID", "KP_PARTNO", "KP_NAME", "QTY", "SEQ", "STATION", "SKUNO", "SCANTYPE", "MPN"],   //ID:本级ID   SKUNO:上级(一级)SKUNO  
        sendList3: ["Grade", "ID", "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG",     // ID:本级ID 
                          "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION", "EDIT_EMP"
        ]
    },
    Delete: {
        className: "MESStation.KeyPart.KPScan",
        functionName: "DeleteKPList",
        sendList1: ["Grade", "ID"],
        sendList2: ["Grade", "ID", "SKUNO", "KP_PARTNO", "MPN"],
        sendList3: ["Grade", "ID"]
    }
};

var ControlConfig = {     //弹出层显示的控件(包括操作按钮)
    Add: {
        controlList1: [
            {
                field: "SKUNO",       //与后台传回的字段需要一致
                type: "text",            //类型（“text”，“radio”，“checkbox”，“select”， “button”...）
                setLan: "SKUNO",    //多语言标签
                disabled: false,       //是否不可编辑
                fill: false                  //是否需要填充
            },
            {
                field: "Add",
                type: "button",
                setLan: "Add"
            }
        ],
        controlList2: [
            {
                field: "KP_PARTNO",
                type: "text",
                setLan: "KP_PARTNO",
                disabled: false,
                fill: false
            },
            {
                field: "KP_NAME",
                type: "text",
                setLan: "KP_NAME",
                disabled: false,
                fill: false
            },
            {
                field: "QTY",
                type: "text",
                setLan: "QTY",
                disabled: false,
                fill: false
            },
            {
                field: "SEQ",
                type: "text",
                setLan: "SEQ",
                disabled: false,
                fill: false
            },
            {
                field: "STATION",
                type: "select",
                setLan: "STATION",
                disabled: false,
                fill: false
            },
            {
                field: "SCANTYPE",
                type: "select",
                setLan: "SCANTYPE",
                disabled: false,
                fill: false
            },
            {
                field: "MPN",
                type: "text",
                setLan: "MPN",
                disabled: true,
                fill: false
            },
            {
                field: "Add",
                type: "button",
                setLan: "Add"
            }
        ],
        controlList3: [    // "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG",
                                  // "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION",
            {
                field: "SILOADING_FLAG",
                type: "select",
                setLan: "SILOADING_FLAG",
                disabled: false,
                fill: false
            },
            {
                field: "PACKING_FLAG",
                type: "select",
                setLan: "PACKING_FLAG",
                disabled: false,
                fill: false
            },
            {
                field: "SN_FLAG",
                type: "select",
                setLan: "SN_FLAG",
                disabled: false,
                fill: false
            },
            {
                field: "CHECKPCBAVER_FALG",
                type: "select",
                setLan: "CHECKPCBAVER_FALG",
                disabled: false,
                fill: false
            },
            {
                field: "CHECKPCBMODELVER_FLAG",
                type: "select",
                setLan: "CHECKPCBMODELVER_FLAG",
                disabled: false,
                fill: false
            },
            {
                field: "AUTOSTATION",
                type: "text",
                setLan: "AUTOSTATION",
                disabled: false,
                fill: false
            },
            {
                field: "AUTOSTATION2",
                type: "text",
                setLan: "AUTOSTATION2",
                disabled: false,
                fill: false
            },
            {
                field: "CHECKBOXSKUNO_FLAG",
                type: "select",
                setLan: "CHECKBOXSKUNO_FLAG",
                disabled: false,
                fill: false
            },
            {
                field: "TESTSTATION",
                type: "text",
                setLan: "TESTSTATION",
                disabled: false,
                fill: false
            },
            {
                field: "Add",
                type: "button",
                setLan: "Add"
            }
        ]
    },
    Edit: {
        controlList1: [
            {
                field: "LISTNAME",
                type: "text",
                setLan: "LISTNAME",
                disabled: true,
                fill: true
            },
            {
                field: "SKUNO",       //与后台传回的字段需要一致
                type: "text",            //类型（“text”，“radio”，“checkbox”，“select”， “button”...）
                setLan: "SKUNO",    //多语言标签
                disabled: false,       //是否不可编辑
                fill: true                  //是否需要填充
            },
            {
                field: "Update",
                type: "button",
                setLan: "Update"
            }
        ],
        controlList2: [
            {
                field: "KP_PARTNO",
                type: "text",
                setLan: "KP_PARTNO",
                disabled: false,
                fill: true
            },
            {
                field: "KP_NAME",
                type: "text",
                setLan: "KP_NAME",
                disabled: false,
                fill: true
            },
            {
                field: "QTY",
                type: "text",
                setLan: "QTY",
                disabled: false,
                fill: true
            },
            {
                field: "SEQ",
                type: "text",
                setLan: "SEQ",
                disabled: false,
                fill: true
            },
            {
                field: "STATION",
                type: "select",
                setLan: "STATION",
                disabled: false,
                fill: true
            },
            {
                field: "SCANTYPE",
                type: "select",
                setLan: "SCANTYPE",
                disabled: false,
                fill: false
            },
            {
                field: "MPN",
                type: "text",
                setLan: "MPN",
                disabled: true,
                fill: false
            },
            {
                field: "Update",
                type: "button",
                setLan: "Update"
            }
        ],
        controlList3: [    // "SILOADING_FLAG", "PACKING_FLAG", "SN_FLAG", "CHECKPCBAVER_FALG",
                                  // "CHECKPCBMODELVER_FLAG", "AUTOSTATION", "AUTOSTATION2", "CHECKBOXSKUNO_FLAG", "TESTSTATION",
            {
                field: "SILOADING_FLAG",
                type: "select",
                setLan: "SILOADING_FLAG",
                disabled: false,
                fill: true
            },
            {
                field: "PACKING_FLAG",
                type: "select",
                setLan: "PACKING_FLAG",
                disabled: false,
                fill: true
            },
            {
                field: "SN_FLAG",
                type: "select",
                setLan: "SN_FLAG",
                disabled: false,
                fill: true
            },
            {
                field: "CHECKPCBAVER_FALG",
                type: "select",
                setLan: "CHECKPCBAVER_FALG",
                disabled: false,
                fill: true
            },
            {
                field: "CHECKPCBMODELVER_FLAG",
                type: "select",
                setLan: "CHECKPCBMODELVER_FLAG",
                disabled: false,
                fill: true
            },
            {
                field: "AUTOSTATION",
                type: "text",
                setLan: "AUTOSTATION",
                disabled: false,
                fill: true
            },
            {
                field: "AUTOSTATION2",
                type: "text",
                setLan: "AUTOSTATION2",
                disabled: false,
                fill: true
            },
            {
                field: "CHECKBOXSKUNO_FLAG",
                type: "select",
                setLan: "CHECKBOXSKUNO_FLAG",
                disabled: false,
                fill: true
            },
            {
                field: "TESTSTATION",
                type: "text",
                setLan: "TESTSTATION",
                disabled: false,
                fill: true
            },
            {
                field: "Update",
                type: "button",
                setLan: "Update"
            }
        ]
    },
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

SubTable = {};
$(document).ready(function () {

    var reset = function () {
        $(".table_box").html('');
        $("#table_box1").html('');
    }

    var Get_data = function () {     //获取一级表数据
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

    var InitKPItem = function (index, row, $detail) {     // 打开一级表执行 row ：当前一级表数据
        //console.log(index, row, $detail);
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
            data: [],
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
            }, {
                field: 'SCANTYPE',
                title: "<label set-lan=" + "html:SCANTYPE" + ">SCANTYPE</label>" //'Station'
            }, {
                field: 'MPN',
                title: "<label set-lan=" + "html:MPN" + ">MPN</label>" //'Station'
            }]
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
        detailView: true,    //是否可打开子表
        singleSelect: true,  //单选
        uniqueId: "id",
        selectItemName: "id",
        toolbar: "#KP_List_Table_Toolbar",
        onCheck: function (row, node) {     //选中
            //console.log(row,node);
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
        onExpandRow: function (index, row, $detail) {   //打开子表（2级）
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

    $("#AddKPList").on("click", function () {
        var grade = checkedData["tableGrade"];
        switch (grade) {
            case 0:
                loadControlList($("#AddList .row"), ControlConfig.Add.controlList1, function (fillData, ctrConfig, loadSelect) {    //填充数据，更改控件状态，控件二次操作（控件绑定事件，与后台交互），弹出层二次操作（加说明），
                    console.log(this);
                    fillData(checkedData, ctrConfig);
                });
                break;
            case 1:
                loadControlList($("#AddList .row"), ControlConfig.Add.controlList2, function (fillData, ctrConfig, loadSelect) {
                    //console.log(this);
                    var station = this.find("select[name=STATION]");
                    var scanType = this.find("select[name=SCANTYPE]");
                    var partNo = this.find("input[name=KP_PARTNO]");
                    var mpn = this.find("input[name=MPN]");
                    self.parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetStationSelect", {SKUNO:checkedData.currentData["SKUNO"]}, function (e) {
                        if (e.Status == "Pass") {
                            //loadSelect(station, ["xxxx", "yyyy", "zzzz", "SI LOADING"]);
                            loadSelect(station, e.Data);
                            //fillData(checkedData, ctrConfig);
                        } else {
                            layer.msg(e.Message, {
                                icon: 0,
                                time: 2000
                            });
                        }
                    });
                    self.parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetSCANTYPESelect", {}, function (e) {
                        if (e.Status == "Pass") {
                            //loadSelect(scanType, ["xxxx", "yyyy", "zzzz", "SI LOADING"]);
                            loadSelect(scanType, e.Data);
                            //fillData(checkedData, ctrConfig);
                        } else {
                            layer.msg(e.Message, {
                                icon: 0,
                                time:2000
                            });
                        }
                    });
                    fillData(checkedData, ctrConfig);
                    partNo.on("input", function () {
                        mpn.val(this.value);
                    });
                    var tipWrap = $("<div class=\"col-xs-12 tip-wrap\"></div>");
                    var tip = $(
                        "<p>操作說明：</p>" +
                        "<p>1.在KP_PARTNO 輸入要卡關內容.</p>" +
                        "<p>2. KP_NAME輸入Key Part的類型,諸如“Faceplate”“Bracket”</p>" +
                        "<p>3.Qty輸入需要的數量</p>" +
                        "<p>4.SEQ輸入“1”，“2”….同一工站多種Key part物料需要掃描時,SEQ 數值大的先掃描.</p>" +
                        "<p>5.STATION 為綁定Keypart物料掃描的SFC工站.</p>" +
                        "<p>6.此頁面同時用於配置SI Loading的信息,配置說明見KP list Setting的底部說明</p>"
                    );
                    tipWrap.append(tip);
                    this.append(tipWrap);
                });
                break;
            case 2:
                loadControlList($("#AddList .row"), ControlConfig.Add.controlList3, function (fillData, ctrConfig, loadSelect) {
                    console.log(this);
                    var SILOADING_FLAG = this.find("select[name=SILOADING_FLAG]");
                    var PACKING_FLAG = this.find("select[name=PACKING_FLAG]");
                    var SN_FLAG = this.find("select[name=SN_FLAG]");
                    var CHECKPCBAVER_FALG = this.find("select[name=CHECKPCBAVER_FALG]");
                    var CHECKPCBMODELVER_FLAG = this.find("select[name=CHECKPCBMODELVER_FLAG]");
                    var CHECKBOXSKUNO_FLAG = this.find("select[name=CHECKBOXSKUNO_FLAG]");
                    loadSelect(SILOADING_FLAG, ["1", "0"]);
                    loadSelect(PACKING_FLAG, ["1", "0"]);
                    loadSelect(SN_FLAG, ["1", "0"]);
                    loadSelect(CHECKPCBAVER_FALG, ["1", "0"]);
                    loadSelect(CHECKPCBMODELVER_FLAG, ["1", "0"]);
                    loadSelect(CHECKBOXSKUNO_FLAG, ["1", "0"]);
                    fillData(checkedData, ctrConfig);
                });
                break;
            case 3:
                layer.msg("不可以新增数据！", {
                    icon: 0,
                    time: 2000,
                });
                break;
        }

        if (grade != 3) {
            layer.open({
                type: 1,
                skin: "layui-layer-lan",
                title: 'New Data',
                area: ["90%", "90%"],
                scrollbar: false,
                content: $("#AddList"),
                maxmin: false,
                success: function (layero, index) {
                    setLayPosition(layero);
                    window.onresize = function () {
                        setLayPosition(layero);
                    }
                    $("#AddList").removeClass("hidden");                            //显示弹出框
                    var b = layero.find(".Add");
                    console.log(b);
                    b.on("click", function () {
                        var ctrs = layero.find(".ctr .ipt");
                        var showData = {};       //当前显示的数据
                        $.each(ctrs, function (index, ctr) {
                            showData[$(ctr).attr("name")] = $(ctr).val();
                        });
                        var send = {};
                        switch (grade) {
                            case 0:
                                send = retSendData(ApiList.Add.sendList1, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {    //二次处理待发送数据
                                    sendData["Grade"] = chData.tableGrade + 1;
                                    console.log(sendData);
                                    return sendData;
                                });
                                break;
                            case 1:
                                send = retSendData(ApiList.Add.sendList2, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {
                                    sendData["Grade"] = chData.tableGrade + 1;
                                    sendData["SKUNO"] = chData.currentData["SKUNO"];
                                    console.log(sendData, chData);
                                    return sendData;
                                });
                                break;
                            case 2:
                                send = retSendData(ApiList.Add.sendList3, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {
                                    sendData["Grade"] = chData.tableGrade + 1;
                                    console.log(sendData);
                                    return sendData;
                                });
                                break;
                        }
                        self.parent.client.CallFunction(ApiList.Add.className, ApiList.Add.functionName, send, function (e) {
                            if (e.Status == "Pass") {
                                layer.msg(e.Message, {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    //console.log("addSuccess!");
                                    //location.reload();
                                });
                            } else {
                                layer.msg(e.Message, {
                                    icon: 0,
                                    time: 1000
                                }, function () {
                                    //console.log("addfail!");
                                    //location.reload();
                                });
                            }
                        });
                    });
                },
                end: function () {
                    $("#AddList").addClass("hidden");                                       //隐藏弹出框
                    //$("#AddList .panel-body").find(".addList").each(function (index, node) {     //关闭弹出框各项数据置空
                    //    node.value = "";
                    //});
                }
            });
        }
    });

    $("#EditKPList").on("click", function () {
        var grade = checkedData["tableGrade"];
        switch (grade) {
            case 0:
                layer.msg("至少选择一条数据", {
                    icon: 0,
                    time: 2000,
                });
                break;
            case 1:
                loadControlList($("#ModifyList .row"), ControlConfig.Edit.controlList1, function (fillData, ctrConfig, loadSelect) {  //加载控件数据，填充数据    this:弹出框
                    console.log(this);
                    fillData(checkedData, ctrConfig);
                });
                break;
            case 2:
                loadControlList($("#ModifyList .row"), ControlConfig.Edit.controlList2, function (fillData, ctrConfig, loadSelect) {   //加载完下拉数据后才能填充
                    var station = this.find("select[name=STATION]");
                    var scanType = this.find("select[name=SCANTYPE]");
                    var partNo = this.find("input[name=KP_PARTNO]");
                    var mpn = this.find("input[name=MPN]");
                    self.parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetStationSelect", { SKUNO: checkedData.parentData["SKUNO"] }, function (e) {
                        if (e.Status == "Pass") {
                            //loadSelect(station, ["xxxx", "yyyy", "zzzz", "SI LOADING"]);
                            loadSelect(station, e.Data);
                            //fillData(checkedData, ctrConfig);
                        } else {
                            layer.msg(e.Message, {
                                icon: 0,
                                time: 2000
                            });
                        }
                    });
                    self.parent.client.CallFunction("MESStation.KeyPart.KPScan", "GetSCANTYPESelect", {}, function (e) {
                        if (e.Status == "Pass") {
                            loadSelect(scanType, e.Data);
                            fillData(checkedData, ctrConfig);
                            mpn.val(partNo[0].value);
                        } else {
                            layer.msg(e.Message, {
                                icon: 0,
                                time: 2000
                            });
                            fillData(checkedData, ctrConfig);
                            mpn.val(partNo[0].value);
                        }
                    });
                    partNo.on("input", function () {
                        mpn.val(this.value);
                    });
                    console.log(this);
                    var tipWrap = $("<div class=\"col-xs-12 tip-wrap\"></div>");
                    var tip = $(
                        "<p>操作說明：</p>"+
                        "<p>1.在KP_PARTNO 輸入要卡關內容.</p>"+
                        "<p>2. KP_NAME輸入Key Part的類型,諸如“Faceplate”“Bracket”</p>"+
                        "<p>3.Qty輸入需要的數量</p>"+
                        "<p>4.SEQ輸入“1”，“2”….同一工站多種Key part物料需要掃描時,SEQ 數值大的先掃描.</p>"+
                        "<p>5.STATION 為綁定Keypart物料掃描的SFC工站.</p>"+
                        "<p>6.此頁面同時用於配置SI Loading的信息,配置說明見KP list Setting的底部說明</p>"
                    );
                    tipWrap.append(tip);
                    this.append(tipWrap);
                });
                break;
            case 3:
                loadControlList($("#ModifyList .row"), ControlConfig.Edit.controlList3, function (fillData, ctrConfig, loadSelect) {
                    console.log(this);
                    var SILOADING_FLAG = this.find("select[name=SILOADING_FLAG]");
                    var PACKING_FLAG = this.find("select[name=PACKING_FLAG]");
                    var SN_FLAG = this.find("select[name=SN_FLAG]");
                    var CHECKPCBAVER_FALG = this.find("select[name=CHECKPCBAVER_FALG]");
                    var CHECKPCBMODELVER_FLAG = this.find("select[name=CHECKPCBMODELVER_FLAG]");
                    var CHECKBOXSKUNO_FLAG = this.find("select[name=CHECKBOXSKUNO_FLAG]");
                    loadSelect(SILOADING_FLAG, ["1", "0"]);
                    loadSelect(PACKING_FLAG, ["1", "0"]);
                    loadSelect(SN_FLAG, ["1", "0"]);
                    loadSelect(CHECKPCBAVER_FALG, ["1", "0"]);
                    loadSelect(CHECKPCBMODELVER_FLAG, ["1", "0"]);
                    loadSelect(CHECKBOXSKUNO_FLAG, ["1", "0"]);
                    fillData(checkedData, ctrConfig);
                });
                break;
        }
        if (grade != 0) {
            layer.open({
                type: 1,
                skin: "layui-layer-lan",
                title: 'Edit Data',
                area: ["90%", "90%"],
                scrollbar: false,
                content: $("#ModifyList"),
                maxmin: true,
                success: function (layero, index) {
                    setLayPosition(layero);
                    window.onresize = function () {
                        setLayPosition(layero);
                    }
                    $("#ModifyList").removeClass("hidden");                         //显示弹出框
                    //-----------------------------------------------------------------------------------------------------------------------------//
                    var b = layero.find(".Update");
                    b.on("click", function () {
                        var ctrs = layero.find(".ctr .ipt");
                        var showData = {};          //当前显示的数据
                        $.each(ctrs, function (index, ctr) {
                            showData[$(ctr).attr("name")] = $(ctr).val();
                        });
                        var send = {};
                        switch (grade) {
                            case 1:
                                send = retSendData(ApiList.Edit.sendList1, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {    //二次处理待发送数据
                                    console.log(sendData);
                                    return sendData;
                                });
                                break;
                            case 2:
                                send = retSendData(ApiList.Edit.sendList2, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {
                                    sendData["SKUNO"] = chData.parentData["SKUNO"];
                                    console.log(sendData, chData);
                                    return sendData;
                                });
                                break;
                            case 3:
                                send = retSendData(ApiList.Edit.sendList3, showData, checkedData, self.parent.client.UserInfo, function (sendData, chData) {
                                    console.log(sendData);
                                    return sendData;
                                });
                                break;
                        }
                        self.parent.client.CallFunction(ApiList.Edit.className, ApiList.Edit.functionName, send, function (e) {
                            if (e.Status == "Pass") {
                                layer.msg(e.Message, {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    //console.log("editSuccess!");
                                    location.reload();
                                });
                            } else {
                                layer.msg(e.Message, {
                                    icon: 0,
                                    time: 1000
                                }, function () {
                                    //console.log("editfail!");
                                    //location.reload();
                                });
                            }
                        });
                    });

                    //-----------------------------------------------------------------------------------------------------------------------------//

                },
                end: function () {
                    $("#AddList").addClass("hidden");                                       //隐藏弹出框
                    //$("#AddList .panel-body").find(".addList").each(function (index, node) {     //关闭弹出框各项数据置空
                    //    node.value = "";
                    //});
                }
            });
        }

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

                if (Grade == 2) {   //"SKUNO", "KP_PARTNO", "MPN"
                    sendData["SKUNO"] = checkedData.parentData["SKUNO"];
                    sendData["KP_PARTNO"] = checkedData.currentData["KP_PARTNO"];
                    sendData["MPN"] = checkedData.currentData["KP_PARTNO"];
                }

                console.log(sendData);
                self.parent.client.CallFunction(ApiList.Delete.className,ApiList.Delete.functionName, sendData, function (e) {
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

    Get_data();

    // 20190626 add by gch
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    function loadControlList($lay, ctrData, fn) {  // 生成弹出框内容  $lay:弹出框 ctrData：控件配置数据   chData:选中的数据   fn：生成控件基本结构后执行
        $lay.html("");
        $.each(ctrData, function (index, ctrO) {     //循环生成控件结构
            $lay.append(createCtr(ctrO));
        });
        ctrOperation($lay, ctrData);
        fn.call($lay, fillData.bind($lay), ctrData, loadSelect);
    }

    function createCtr(ctrConfig) {    //ctrConfig：一个控件的配置数据  chData：全局信息，选中的数据的基本信息
        //       <div class="col-xs-6 ctr-wrap">
        //            <div class="col-xs-4 lab set-lan="html:labelName">labelName</div>
        //            <div class="col-xs-8  ctr ">
        //                <input type="text" name="labelName" value=" " class="col-xs-12 form-control ipt" />
        //            </div>
        //        </div>
        //        <div class="col-xs-6 ctr-wrap">
        //            <div class="col-xs-5 null"></div>
        //            <div class="col-xs-2  ctr Add ">
        //                <botton name="Add" set-lan="html:Add" class="">Add</botton>
        //            </div>
        //        </div>
        //        <div class="col-xs-6 ctr-wrap">
        //            <div class="col-xs-4 lab">labelName</div>
        //            <div class="col-xs-8  ctr ">
        //                <select class="col-xs-12 form-control ipt">
        //                    <option value="value1">text1</option>
        //                    <option value="value2">text2</option>
        //                    <option value="value3">text3</option>
        //                </select>
        //            </div>
        //        </div>

        var type = ctrConfig.type;
        var ctrWrap = $("<div class=\"col-xs-6 ctr-wrap\"></div>");
        switch (type) {
            case "text":
                var label = $("<div class=\"col-xs-4 lab\" set-lan=\"html:" + ctrConfig.setLan + "\">" + ctrConfig.field + "</div>");
                var ctr = $("<div class=\"col-xs-8 ctr\"></div>");
                var ipt = $("<input type=\"text\" name=\"" + ctrConfig.field + "\" class=\"col-xs-12 form-control ipt\" />");
                ctr.append(ipt);
                ctrWrap.append(label, ctr);
                break;
            case "select":
                var label = $("<div class=\"col-xs-4 lab\" set-lan=\"html:" + ctrConfig.setLan + "\">" + ctrConfig.field + "</div>");
                var ctr = $("<div class=\"col-xs-8 ctr\"></div>");
                var select = $("<select name=\"" + ctrConfig.field + "\" class=\"col-xs-12 form-control ipt\"></select>");
                ctr.append(select);
                ctrWrap.append(label, ctr);
                break;
            case "button":
                var nu = $("<div class=\"col-xs-5 null\"></div>");
                var ctr = $("<div class=\"col-xs-2 ctr " + ctrConfig.field + "\"></div>");
                var btn = $("<div name=\"" + ctrConfig.field + "\" set-lan=\"html:" + ctrConfig.setLan + "\" >" + ctrConfig.field + "</div>");
                ctr.append(btn);
                ctrWrap.append(nu, ctr);
                break;
        }
        return ctrWrap;
    }

    function ctrOperation($lay, ctrConfig) {    //对控件的基础操作（填充数据，改变控件状态） $lay:弹出框    ctrConfig：控件配置数据 chData：选中的数据 
        //console.log($lay, ctrConfig);
        $.each(ctrConfig, function (index, ctrO) {
            var ctr = $lay.find("[name=" + ctrO.field + "]");
            if (ctrO.disabled) {      //不可编辑
                ctr.attr("disabled", "disabled");
            }
        });
    }

    function fillData(data, ctrConfig) {    //二次处理控件后再填充数据 ,this:弹出框， data：填充数据源 ctrConfig：配置数据
        //console.log(this, data, ctrConfig);
        var _this = this;
        $.each(ctrConfig, function (index, ctrO) {
            if (ctrO.fill) {    //需要填充数据
                var ctr = _this.find("[name=" + ctrO.field + "]");
                switch (ctrO.type) {
                    case "text":
                        ctr.val(data.currentData[ctrO.field]);
                        break;
                    case "select":
                        ctr.val(data.currentData[ctrO.field]);
                        break;
                }
            }
        });
    }

    function loadSelect($select, data) {     //加载下拉框 $select:待加载的下拉框 data:下拉数据 
        $.each(data, function (index, v) {
            var opt = $("<option value=\"" + v + "\">" + v + "</option>");
            $select.append(opt);
        });
    }

    function retSendData(sendArr, showData, chData, globalData, fn) {    //生成待发送数据 sendArr:待发送的数据字段数组(已配置)  showData:当前显示的数据 chData:勾选的数据 globalData:系统全局数据(如:用户信息)  fn:二次处理发送数据
        var sendData = {};
        $.each(sendArr, function (index, field) {
            switch (field) {
                case "Grade":
                    sendData[field] = chData.tableGrade;
                    break;
                case "EDIT_EMP":
                    sendData[field] = globalData.EMP_NO;
                    break;
                case "ID":
                    sendData[field] = chData.currentData[field];
                    break;
                default:
                    sendData[field] = showData[field];
                    break;
            }
        });
        console.log(sendArr);
        return fn(sendData, chData);
    }

    function setLayPosition(lay) {     //控制弹出框位置
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
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    var timer = setInterval(function () {
        if ($("#KP_List_Table thead")[0]) {
            clearInterval(timer);
            setLanguage("KeyPartSetting", $(".bootstrap-table"));
        }
    }, 100);
    //setLanguage("KeyPartSetting");


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