var NewFlag = false;
var SkuListData = [];
var TPointList = [];
var RouteList = [];
var SkuAqlData = [];
var AqlData = [];
var tableLocale = "";
var SKU_EditRow = null;
var sfcRouteData = [];
var testRouteData = [];

var mesUI;
var lan;
var client = null;
$(document).ready(function () {

    var flag1 = true;
    var flag2 = true;

    client = self.parent.client;
    mesUI = new MesClientUI(client);
    lan = $.cookie($.MES.CK_LAN_NAME);
    if (lan == "CHINESE") {
        tableLocale = "zh-CN"
    }
    else if (lan == "CHINESE_TW") {
        tableLocale = "zh-TW"
    }
    else {
        tableLocale = "en"
    };

    var FindValueByKey = function (key, data) {
        for (var d in data) {
            if (key.name == d) {
                key.value = data[d];
                break;
            }
            else if (Object.prototype.toString.call(data[d]) === '[object Object]') {
                FindValueByKey(key, data[d]);
            }
        }
    };

    var FindValueByselect = function ($selectNodes, data) {
        $.each($selectNodes, function (index, node) {
            node.value = data[node.name];
            if (node.name == "C_SERIES_ID") {
                node.value = data["SERIES_NAME"];
            }
        });
    }

    //var Get_Route = function (SkuId) {      // 绑定路由 > sfc路由
    //    var dataArr = [];
    //    client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutes", { StationName: SkuId }, function (e) {
    //        try {
    //            $("#SKUAddRouteName").autocomplete("destroy");
    //        } catch (e) {
    //        }
    //        if (e.Status == "Pass") {
    //            var data = [];
    //            for (var i = 0 ; i < e.Data.length; i++) {
    //                data.push(e.Data[i].ROUTE_NAME);
    //            }
    //            $("#SKUAddRouteName").autocomplete({
    //                minLength: 3,
    //                source: data,
    //                select: function (event, ui) {
    //                    $(this).val(ui.item.value);
    //                },
    //                create: function (event, ui) {
    //                    $(this).bind("click", function () {
    //                        var active = $(this).attr("autocomplete");
    //                        if (active == "off") {
    //                            $(this).autocomplete("search", "");
    //                        }
    //                    });
    //                },
    //                scroll: true,
    //                scrollHeight: 180,
    //                position: { my: "left top", at: "left bottom" }
    //            });
    //        }
    //    });
    //};

    var Get_Serial = function () {
        client.CallFunction("MESStation.Config.SkuSeries", "FetchCurrentSeries", { Field: "", Value: "" }, function (e) {
            var sel = $("#C_SERIES_ID");
            sel.empty();
            if (e.Status == "Pass") {
                console.log(e);
                for (var a = 0; a < e.Data.length; a++) {
                    sel.append($("<option value='" + e.Data[a].SERIES_NAME + "'>" + e.Data[a].SERIES_NAME + "</option>"));
                }
            }
        });
    };     //2  1栏CSERIESID的下拉框数据

    var Get_PackType = function () {
        client.CallFunction("MESStation.Packing.PackConfigAPI", "GetPackType", {}, function (e) {
            var sel = $("#PackConfigForm select[name=PACK_TYPE]");
            var isel = $("#PackConfigForm select[name=INSIDE_PACK_TYPE]");
            sel.empty();
            if (e.Status == "Pass") {
                //console.log(e);
                isel.append($("<option value='SN'>SN</option>"));
                for (var a = 0; a < e.Data.length; a++) {
                    sel.append($("<option value='" + e.Data[a].PACK_TYPE + "'>" + e.Data[a].PACK_TYPE + "</option>"));
                    isel.append($("<option value='" + e.Data[a].PACK_TYPE + "'>" + e.Data[a].PACK_TYPE + "</option>"));
                }
            }
        });
    };  //3  4栏包装模式的下拉框数据

    var Get_TransportType = function () {
        client.CallFunction("MESStation.Packing.PackConfigAPI", "GetTransportType", {}, function (e) {
            var sel = $("#PackConfigForm select[name=TRANSPORT_TYPE]");
            sel.empty();
            if (e.Status == "Pass") {
                //console.log(e);
                for (var a = 0; a < e.Data.length; a++) {
                    sel.append($("<option value='" + e.Data[a].TRANSPORT_TYPE + "'>" + e.Data[a].TRANSPORT_TYPE + "</option>"));
                }
            }
        });
    };  //4  

    var Get_SNRule = function () {
        client.CallFunction("MESStation.SNMaker.SNRulerConfig", "GetSNRulers", {}, function (e) {
            var sel = $("#PackConfigForm select[name=SN_RULE]");
            sel.empty();
            if (e.Status == "Pass") {
                for (var a = 0; a < e.Data.length; a++) {
                    sel.append($("<option value='" + e.Data[a].NAME + "'>" + e.Data[a].NAME + "</option>"));
                }
            }
        });
    };

    var Get_LabelList = function () {
        client.CallFunction("MESStation.FileUpdate.Fileuplaod", "GetLabelList", {}, function (e) {
            try {
                $("#LabelList input[name=LABELNAME]").autocomplete("destroy");
            } catch (e) {

            }
            if (e.Status == "Pass") {
                var data = [];
                for (var i = 0 ; i < e.Data.length; i++) {
                    data.push(e.Data[i].LABELNAME);
                }
                $("#LabelList input[name=LABELNAME]").autocomplete({
                    minLength: 0,
                    source: data,
                    select: function (event, ui) {
                        $(this).val(ui.item.value);
                    },
                    create: function (event, ui) {
                        $(this).bind("click", function () {
                            var active = $(this).attr("autocomplete");
                            if (active == "off") {
                                $(this).autocomplete("search", "");
                            }
                        });
                    },
                    scroll: true,
                    scrollHeight: 180,
                    position: { my: "right top", at: "right bottom" }
                });
            }
        });
    };

    var Get_LabelType = function () {
        client.CallFunction("MESStation.Label.LabelConfig", "GetLabelTypes", {}, function (e) {
            var sel = $("#LabelList select[name=LABELTYPE]");
            sel.empty();
            if (e.Status == "Pass") {
                for (var a = 0; a < e.Data.length; a++) {
                    sel.append($("<option value='" + e.Data[a].NAME + "'>" + e.Data[a].NAME + "</option>"));
                }
            }
        });
    };

    var Get_SkuList = function () {
        $("#EditSku").attr("disabled", "disabled");
        $("#DeleteSku").attr("disabled", "disabled");
        layer.load(3, { shade: 0.5 });
        client.CallFunction("MESStation.Config.SkuConfig", "GetAllSku", {}, function (e) {
            //console.log("SkuList:");
            //console.log(e.Data);
            layer.closeAll('loading');
            if (e.Status == "Pass") {
                var ListData = e.Data;
                //var tableData = [];
                //for (var i = 0; i < 100; i++){
                //    tableData.push(e.Data[i]);
                //}


                //$('#Sku_List_Table').bootstrapTable('load', tableData);    // e.Data
                $('#Sku_List_Table').bootstrapTable('load', ListData);
                $("#Sku_List_Table").find("td").css({
                    whiteSpace: "nowrap",
                    textAlign: "left"
                });
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    };    //1  表数据

    var Get_RoutList = function (SkuID) {  
        $("#DeleteRoute").attr("disabled", "disabled");
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutesBySkuId", { SkuId: SkuID }, function (e) {
            console.log(e);
            if (e.Status == "Pass") {
                $('#RouteListTable').bootstrapTable("load", e.Data);
                //route tip (显示路由全部) gch add
                
                if ($("#routeInput").length == 0) {
                    var routeInput = $("<span id='routeInput' class='form-control bs-bars pull-right' style='white-space:nowrap; width:90%; margin-top:13px; border-color:#ddd; font-size:12px; line-height:20px; background:yellow; ' >" + "当前路由：" + "</span>");
                    var tbar = $("#RouteList").find(".fixed-table-toolbar");
                    tbar.append(routeInput);
                } else {
                    $("#routeInput").html("当前路由：");
                }
                
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        })
    };

    var Get_BFPoint = function (Sku) {
        $("#EditPoint").attr("disabled", "disabled");
        $("#DeletePoint").attr("disabled", "disabled");
        client.CallFunction("MESStation.Config.SAPStationMapConfig", "GetAllSapStationMapBySku", { SkuNo: Sku }, function (e) {
            if (e.Status == "Pass") {
                $('#BFPoint_List_Table').bootstrapTable("load", e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    };

    var Get_PackConfig = function (Skuno) {
        $("#DeletePack").attr("disabled", "disabled");
        client.CallFunction("MESStation.Packing.PackConfigAPI", "GetPackConfigBySKUNO", { SkuNo: Skuno }, function (e) {
            layer.closeAll('loading');
            if (e.Status == "Pass") {
                $('#PackListTable').bootstrapTable('load', e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    };

    var Get_LabelConfig = function (Skuno) {
        $("#DeleteLabel").attr("disabled", "disabled");
        client.CallFunction("MESStation.Label.LabelConfig", "GetLabelConfigBySkuno", { Skuno: Skuno }, function (e) {
            if (e.Status == "Pass") {
                $('#LabelListTable').bootstrapTable('load', e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    };

    var Get_AqlLevel = function (AqlType) {
        client.CallFunction("MESStation.Config.CAqltypeConfig", "GetAqlLevel", { AQLTYPE: AqlType }, function (e) {
            var selLevel = $("#AqlList select[name=DefaultLevel]");
            selLevel.empty();
            if (e.Status == "Pass") {
                for (var a = 0; a < e.Data.length; a++) {
                    selLevel.append($("<option value='" + e.Data[a] + "'>" + e.Data[a] + "</option>"));
                }
            }
        });
    }

    var Get_AqlType = function (Skuno) {
        client.CallFunction("MESStation.Config.CAqltypeConfig", "GetAllAqlName", {}, function (e) {
            var selAql = $("#AqlList select[name=AqlType]");
            selAql.empty();
            if (e.Status == "Pass") {
                for (var a = 0; a < e.Data.length; a++) {
                    selAql.append($("<option value='" + e.Data[a] + "'>" + e.Data[a] + "</option>"));
                }
                if (e.Data.length > 0) {
                    Get_AqlLevel(selAql.val());
                    selAql.unbind("change");
                    selAql.bind("change", function () {
                        Get_AqlLevel(selAql.val());
                    });
                }
            }
        });
    }

    var Get_SkuAqlTypeData = function (skuId) {
        client.CallFunction("MESStation.Config.CAqltypeConfig", "GetSkuAqlData", { SkuId: skuId }, function (e) {
            if (e.Status == "Pass") {
                $('#AqlListTable').bootstrapTable('load', e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
        client.CallFunction("MESStation.Config.CAqltypeConfig", "GetSkuAql", { SkuId: skuId }, function (e) {
            if (e.Status == "Pass") {
                $('#SkuAqlListTable').bootstrapTable('load', e.Data);
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    }

    var Get_StationName = function () {
        var stationName = $("#station_name2");
        var stationCount;  //工站總數量
        client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, function (e) {
            console.log(e);
            if (e.Status == "Pass") {
                stationCount = e.Data.length;
                for (var i = 0; i < stationCount; i++) {
                    var option = $("<option value = " + e.Data[i].STATION_NAME + ">" + e.Data[i].STATION_NAME + "</option>");
                    if (i == 0) {
                        option.attr("selected", "selected");
                    }
                    stationName.append(option);
                }
            }
        });
    }

    ////ADD BY ZC 2019/4/21 FOR 2DX Config 加載機種
    //var Get_Skuno = function () {
    //    var Skuno = $("#2dx_skuno");
    //    var SkunoCount;
    //    $("#codename").attr("disabled","disabled")
    //    client.CallFunction("MESStation.Config.SkuConfig", "GetAllSku", {}, function (e) {
    //        console.log(e);
    //        if (e.Status = "Pass") {
    //            SkunoCount = e.Data.length;
    //            for (var i = 0; i < SkunoCount; i++) {
    //                var option = $("<option value=" + e.Data[i].SKUNO + ">" + e.Data[i].SKUNO + "</option>")
    //                if (i == 0) {
    //                    option.attr("selected", "selected");
    //                }
    //                Skuno.append(option);
    //            }
    //        } 
    //    });//end client
    //}

    //ADD BY ZC 2019/4/21 FOR 2DX Config 加載工站
    var Get_2dxStation = function () {
        var station_2dx = $("#2dx_station");
        var station_2dxCount;
        client.CallFunction("MESStation.Config.CLotRate", "Get2dxStation", {}, function (e) {
            console.log(e);
            if (e.Status == "Pass") {
                station_2dxCount = e.Data.length;
                for (var i = 0; i < station_2dxCount; i++) {
                    var option = $("<option value=" + e.Data[i]["STATION"] + ">" + e.Data[i]["STATION"] + "</option>");
                    if (i == 0) {
                        option.attr("selected", "selected");
                    }
                    station_2dx.append(option);
                }
            }

        })
    }

    var GetSNCode = function () {    //加载sn编码规则
        //console.log("sncode");
        client.CallFunction("MESStation.Config.SkuConfig", "GetSNRULE", {}, function (e) {
            console.log(e);
            if (e.Status == "Pass") {
                loadOption($("#ModifySkuno").find("[name=SN_RULE]"), o_a(e.Data, "CURVALUE"), e.Data[0]["CURVALUE"]);


                console.log($("#ModifySkuno").find("[name=SN_RULE]"));
                $("#ModifySkuno").find("[name=SN_RULE]").on("change", function () {
                    $("#ModifySkuno").find("[name=LENGTH]").val(this.value.length);
                });
            }
            function o_a(o, f) {
                var arr = [];
                $.each(o, function (index, obj) {
                    arr.push(obj[f])
                });
                return arr;
            }
        });
    }

    var GetSfcRouteStation = function (skuId) {
        client.CallFunction("MESStation.Config.SAPStationMapConfig", "GetSKUROUTESAPStation", { "SKU_ID": skuId }, function (e) {
            console.log(e);
            if (e.Status == "Pass") {
                loadOption($("#station_name"), o_a(e.Data, "STATION_NAME"), e.Data[0]["STATION_NAME"]);
                function o_a(o, f) {
                    var arr = [];
                    $.each(o, function (index, obj) {
                        arr.push(obj[f])
                    });
                    return arr;
                }
            }
        });
    }

    var fileEvent = function ($file) {    // 選擇文件綁定事件 add by zc 2019/4/17
        $file.off("change");
        $file.on("change", function () {
            console.log("change");
            var $file = $(this);
            var fileObj = $file[0];

            console.log($file, fileObj);
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            dataURL = windowURL.createObjectURL(fileObj.files[0]);

            $("#imgs").attr("src", dataURL);
            var w = new Worker("../../Scripts/Setting/BigFileReader.js");
            w.onmessage = function (e) {
                if (e.data.Status == "Pass") {
                    Bas64File = e.data.Bas64File;
                    //  console.log(Bas64File);
                    $("#UpLoadQuack").off("click");
                    $("#UpLoadQuack").on("click", function () {
                        if (Bas64File != null) {
                            var sendData = {};
                            sendData["SKUNO"] = $("#SKUNO").val();
                            sendData["File"] = $("#inimgs").val();
                            sendData["Bas64File"] = Bas64File;

                            //console.log(sendData);
                            self.parent.client.CallFunction("MESStation.Config.QuackPicUpload", "Upload", sendData, function (e) {
                                //console.log(e);
                                if (e.Status == "Pass") {
                                    layer.msg(e.Message, {
                                        icon: 1,
                                        time: 2000
                                    }, function () {
                                        //location.reload();
                                    });
                                } else {
                                    layer.msg(e.Message, {
                                        icon: 0,
                                        time: 2000
                                    });
                                }
                            });
                        } else {
                            layer.msg("请稍等，解析文件中！", {
                                icon: 0,
                                time: 2000
                            }, function () {
                            });
                        }

                    });
                } else {
                    layer.msg(e.data.Message, {
                        icon: 2,
                        time: 3000
                    }, function () {
                    });
                }
            };
            w.onerror = function () {
                layer.msg("请选择文件！", {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
            filename = $(this).val();
            filename = filename.substring(filename.lastIndexOf("\\") + 1);
            UseType = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();
            console.log($(this).val(), $(this)[0].files[0], filename, UseType);
            w.postMessage({ file: $file[0].files[0], filename: filename, UseType: UseType, ExtName: ".jpg,.jpeg,.bmp,.png" });

        });//end UpLoadQuack onclick
    }

    var EditImgShow = function (imgName) { //Edit時通過機種獲取Img
        var src = "../../img/QUACK_PICTURE/" + imgName + ".bmp";
        $("#imgs").attr("src", src);
    }

    var layposition = function (layNode){
        var lay = layNode.parents().eq(1);
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

    ////生成表格处
    $('#Sku_List_Table').bootstrapTable({
        data: SkuListData,
        pagination: true,
        pageSize: 50,         //初始化每一页的数据条数
        pageList: [50, 100, 200, 500],
        search: false,
        striped: true,
        showRefresh: false, //
        showSelectTitle: false,  //
        //maintainSelected: false,
        clickToSelect: true,   //单击一行内任意单元格选中该行
        detailView: false,
        singleSelect: true,
        uniqueId: "ID",
        selectItemName: "ID",
        toolbar: "#Table_Toolbar",
        onCheck: function (row) {
            var rows = $('#Sku_List_Table').bootstrapTable('getAllSelections');
            // GCH 2018/10/23 UPDATE （CopySku按钮的状态变化）
            if (rows.length > 1 || rows.length <= 0) {
                $("#EditSku").attr("disabled", "disabled");
                //$("#CopySku").attr("disabled", "disabled");
            } else {
                $("#EditSku").removeAttr("disabled");
                //$("#CopySku").removeAttr("disabled");
            }
            if (rows.length > 1 || rows.length <= 0) {
                $("#DeleteSku").attr("disabled", "disabled");
            } else {
                $("#DeleteSku").removeAttr("disabled")
            }
        },
        onUncheck: function (row) {
            var rows = $('#Sku_List_Table').bootstrapTable('getAllSelections');
            if (rows.length > 1 || rows.length <= 0) {
                $("#EditSku").attr("disabled", "disabled");
                //$("#CopySku").attr("disabled", "disabled");
            } else {
                $("#EditSku").removeAttr("disabled");
                //$("#CopySku").removeAttr("disabled");
            }
            if (rows.length > 1 || rows.length <= 0) {
                $("#DeleteSku").attr("disabled", "disabled");
            } else {
                $("#DeleteSku").removeAttr("disabled")
            }
        },
        onPageChange: function () {
            $("#Sku_List_Table").find("td").css({
                whiteSpace: "nowrap",
                textAlign: "left"
            });
        },
        columns: [{
            title: '<label set-lan="html:SELECT">SELECT</label>',
            checkbox: true
        }, {
            field: 'SKUNO',
            title: '<label set-lan="html:SkuNo">SkuNo</label>'
        }, {
            field: 'BU',
            title: '<label set-lan="html:Bu">BU</label>'
        }, {
            field: 'VERSION',
            title: '<label set-lan="html:Version">Version</label>'
        }, {
            field: 'SKU_NAME',
            title: '<label set-lan="html:CodeName">SkuName</label>'
        },
        {
            field: 'SKU_TYPE',
            title: '<label set-lan="html:SkuType">SkuType</label>'
        },
        {
            field: "SERIES_NAME",
            title: '<label set-lan="html:CSeriesId">SERIES_NAME</label>'
        },
        {
            field: 'CUST_PARTNO',
            title: '<label set-lan="html:CustPartNo">CustPartNo</label>'
        }, {
            field: 'CUST_SKU_CODE',
            title: '<label set-lan="html:CustSkuCode">CustSkuCode</label>'
        }, {
            field: 'SN_RULE',
            title: '<label set-lan="html:SnRule">SnRule</label>'
        }, {
            field: 'PANEL_RULE',
            title: '<label set-lan="html:PanelRule">PanelRule</label>'
        }, {
            field: 'DESCRIPTION',
            title: '<label set-lan="html:Description">Description</label>'
        }, {
            field: 'AutoStation',
            title: '<label set-lan="html:AutoStation">AUTO_STATION</label>'
        }, {
            field: 'EDIT_TIME',
            title: '<label set-lan="html:tableEditTime">LastEditTime</label>'
        }

        //, {
        //    field: 'AutoStation',
        //    title: '<label set-lan="html:AutoStation">AutoStation</label>'
        //}

        ],
        locale: tableLocale//中文支持,
    });
    

    $("#NewSku").on("click", function () {
        NewFlag = true;
        SKU_EditRow = {};
        $("#routeInput").html("当前路由：");//add by LLF 2019-06-02
        $("#EditModelDetail .form-control").each(function () {
            this.value = "";
        });
        $("#EditModelDetail select[name=BU]").html('');
        // $("#EditModelDetail .form-control[name=BU]").val(client.UserInfo.BU);
        //$("#EditModelDetail .form-control[name=BU]")
        client.CallFunction("MESStation.Config.SkuConfig", "GetAllBu", {}, function (e) {
            console.log($("#EditModelDetail select[name=BU]"));
            var $bu = $("#EditModelDetail select[name=BU]")
            if (e.Status == "Pass" && e.Data.length != 0) {
                var bu = e.Data;
                for (var i = 0; i < bu.length; i++) {
                    var option = $("<option value=" + bu[i] + ">" + bu[i] + "</option>");
                    if (i == '0') {
                        option.attr("selected", "selected");
                    }
                    $bu.append(option);
                }
                //$.each(bu, function (index,str) {
                //    var opt = $("<option value=" + str + ">" + str + "</option>");
                //    $bu.append(opt);
                //});
            }
        });
        
        $('#Sku_List_Table').bootstrapTable("uncheckAll");
        $('#BFPoint_List_Table').bootstrapTable("load", []);
        $('#RouteListTable').bootstrapTable("load", []);
        $('#PackListTable').bootstrapTable("load", []);
        $('#LabelListTable').bootstrapTable("load", []);
        $("#Edit2dConfig").css("display", "none");//add by zc
        $("#Save2dConfig").css("display", "block");// add by zc
        $("#EditLinkConfig").css("display", "none");//add by zc
        $("#SaveLinkConfig").css("display", "block");// add by zc

        layer.open({
            type: 1,
            title: 'New SKU',
            area: ["80%", "90%"],
            scrollbar: false,
            content: $("#ModifyList"),
            success: function (layero, index) {
                layposition($("#ModifyList"));
                window.onresize = function () {
                    layposition($("#ModifyList"));
                }
                $("#imgs").attr("src", "");//清空img控件
                $("#inimgs")[0].value = null;//清空file輸入框
                $("#2dx_skuno")[0].value = $("#SKUNO").val(); //add by zc 2019/04/21
                $("#codename")[0].value = $("input[name=SKU_NAME]").val(); //add by zc 2019/04/21 for 2dx upload codename
                $("#skuno_68")[0].value = $("#SKUNO").val();//add by zc 2019/04/24 for LinkConfig
                fileEvent($("#inimgs"));
                $("[name=VERSION]").val("NA");
                $("#ModifyList").removeClass("hidden");
                //$("#myTab").find(".active").removeClass("active");
                //$("#myTab li").eq(0).attr("class","active")   //显示第一栏

                $("#SKUAddRouteName").val("");        //绑定路由置空
                $("#setDefault").prop("checked", false);
                $("#TestRouteName").val("");
                $("#AUTO_SATATION").html("");
                $("#setTestDefault").prop("checked", false);

            },
            end: function () {

                $("#ModifyList").addClass("hidden");
                SKU_EditRow = null;
            }
        });

        //////////////////////////////////////////////////////////


        //$($("#myTab li")[1]).on("click", function () {    //拋長點
        //    var stationName = $("#station_name");
        //    var stationCount;  //工站總數量
        //    if (flag1) {
        //        flag1 = false;
        //        client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, function (e) {
        //            if (e.Status == "Pass") {
        //                stationCount = e.Data.length;
        //                for (var i = 0; i < stationCount; i++) {
        //                    var option = $("<option value = " + e.Data[i].STATION_NAME + ">" + e.Data[i].STATION_NAME + "</option>");
        //                    if (i == 0) {
        //                        option.attr("selected", "selected");
        //                    }
        //                    stationName.append(option);
        //                }

        //            }
        //        });
        //    }

        //});

        //$($("#myTab li")[4]).on("click", function () {   //label配置
        //    var stationName = $("#station_name2");
        //    var stationCount;  //工站總數量
        //    if(flag2){
        //        flag2 = false;
        //        client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, function (e) {
        //            if (e.Status == "Pass") {
        //                stationCount = e.Data.length;
        //                for (var i = 0; i < stationCount; i++) {
        //                    var option = $("<option value = " + e.Data[i].STATION_NAME + ">" + e.Data[i].STATION_NAME + "</option>");
        //                    if (i == 0) {
        //                        option.attr("selected", "selected");
        //                    }
        //                    stationName.append(option);
        //                }

        //            }
        //        });
        //    }

        //});


        //////////////////////////////////////////////////////////
    });

    $("#EditSku").on("click", function () {
        var selRows = $('#Sku_List_Table').bootstrapTable('getAllSelections');
        console.log(selRows[0].BU);
        $("#Save2dConfig").css("display", "none");////add by zc
        $("#Edit2dConfig").css("display", "block");//add by zc
        $("#SaveLinkConfig").css("display", "none");//add by zc
        $("#EditLinkConfig").css("display", "block");// add by zc
        if (selRows.length <= 0) {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
            return;
        }
        else if (selRows.length > 1) {
            layer.msg("Too many records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
            return;
        }
        $("#EditModelDetail select[name=BU]").html('');
        client.CallFunction("MESStation.Config.SkuConfig", "GetAllBu", {}, function (e) {
            console.log($("#EditModelDetail select[name=BU]"));
            var $bu = $("#EditModelDetail select[name=BU]")
            if (e.Status == "Pass" && e.Data.length != 0) {
                var bu = e.Data;
                for (var i = 0; i < bu.length; i++) {
                    var option = $("<option value=" + bu[i] + ">" + bu[i] + "</option>");
                    if (i == '0') {
                        option.attr("selected", "selected");
                    }
                    $bu.append(option);
                }
                $bu.val(selRows[0].BU);
            }
        });
        //console.log(selRows[0].ID);
        client.CallFunction("MESStation.Config.SkuConfig", "GetNoCheckTestFlag", { SKU_ID: selRows[0].ID}, function (e) {    //是否不卡PCBA测试:2019/6/21 add by gch 
            if(e.Status == "Pass"){
                $("#NoCheckTest").prop("checked", e.Data);
            }
        });
        SKU_EditRow = selRows[0];
        layer.open({
            type: 1,
            title: 'Edit SKU',
            area: ["80%", "90%"],
            scrollbar: false,
            content: $("#ModifyList"),
            success: function (layero, index) {
                layposition($("#ModifyList"));
                window.onresize = function () {
                    layposition($("#ModifyList"));
                }
                $("#imgs").attr("src", "");//清空img控件
                $("#inimgs")[0].value = null;//清空file輸入框
                fileEvent($("#inimgs"));//顯示圖片并解析發給後台
                $("#2dx_station").val("AOI4");
                $("#quantity").val("");
                $("select[name=BU]").val(SKU_EditRow.BU);
                console.log($("select[name=BU] option"), SKU_EditRow.BU);
                $("#ModifyList").removeClass("hidden");
                Get_RoutList(SKU_EditRow.ID);
                Get_BFPoint(SKU_EditRow.SKUNO);
                //Get_Route(SKU_EditRow.ID);
                Get_PackConfig(SKU_EditRow.SKUNO);
                Get_LabelConfig(SKU_EditRow.SKUNO);

                Get_SkuAqlTypeData(SKU_EditRow.ID);
                GetSfcRouteStation(SKU_EditRow.ID);  //抛账点>工站名
                $("#SKUAddRouteName").val("");        //绑定路由置空
                $("#setDefault").prop("checked", false);
                $("#TestRouteName").val("");
                $("#AUTO_SATATION").html("");
                $("#setTestDefault").prop("checked", false);
                console.log($("#ModifySkuno input[type=text]"), SKU_EditRow);
                for (var i = 0; i < $("#ModifySkuno input[type=text]").length; i++) {
                    FindValueByKey($("#ModifySkuno input[type=text]")[i], SKU_EditRow);
                }
                //2019/2/26 gch add
                $("#2dx_skuno")[0].value = $("#SKUNO").val(); //add by zc 2019/04/21 for 2dx upload skuno
                $("#skuno_68")[0].value = $("#SKUNO").val();//add by zc 2019/04/24 for LinkConfig
                $("#codename")[0].value = $("input[name=SKU_NAME]").val(); //add by zc 2019/04/21 for 2dx upload codename
                var sendData = {};
                sendData.SKUNO = SKU_EditRow.SKUNO;
                client.CallFunction("MESStation.Config.CLotRate", "Get2dxSetting", sendData, function (e) {
                    if (e.Status == "Pass" && e.Data.length != 0) {
                        var station = e.Data[0]["STATION_NAME"];
                        var qty = e.Data[0]["QTY"];
                        $("#2dx_station").val(station);
                        $("#quantity").val(qty);
                    }
                });
                client.CallFunction("MESStation.Config.Ckmapping", "GetBySkuno800", sendData, function (e) {
                    if (e.Status == "Pass" && e.Data.length != 0) {
                        var skuno73 = e.Data[0]["SKUNO73"];
                        var version73 = e.Data[0]["SKUVER73"];
                        $("#skuno_73").val(skuno73);
                        $("#version_73").val(version73);
                    } else {
                        $("#skuno_73").val("");
                        $("#version_73").val("");
                    }
                });

                var selectNode = $("#ModifySkuno select");
                FindValueByselect(selectNode, SKU_EditRow);
                EditImgShow($("#SKUNO").val()); //ADD BY ZC加載Quack圖片
            },
            end: function () {

                $("#ModifyList").addClass("hidden");
                SKU_EditRow = null;
            }
        });
        ////////////////////////////////

        //$($("#myTab li")[1]).on("click", function () {    //拋長點
        //    var stationName = $("#station_name");
        //    var stationCount;  //工站總數量
        //    if (flag1) {
        //        flag1 = false;
        //        client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, function (e) {
        //            if (e.Status == "Pass") {
        //                stationCount = e.Data.length;
        //                for (var i = 0; i < stationCount; i++) {
        //                    var option = $("<option value = " + e.Data[i].STATION_NAME + ">" + e.Data[i].STATION_NAME + "</option>");
        //                    if (i == 0) {
        //                        option.attr("selected", "selected");
        //                    }
        //                    stationName.append(option);
        //                }

        //            }
        //        });
        //    }

        //});

        //$($("#myTab li")[4]).on("click", function () {   //label配置
        //    var stationName = $("#station_name2");
        //    var stationCount;  //工站總數量
        //    if (flag2) {
        //        flag2 = false;
        //        client.CallFunction("MESStation.Config.CStationConfig", "ShowAllData", {}, function (e) {
        //            if (e.Status == "Pass") {
        //                stationCount = e.Data.length;
        //                for (var i = 0; i < stationCount; i++) {
        //                    var option = $("<option value = " + e.Data[i].STATION_NAME + ">" + e.Data[i].STATION_NAME + "</option>");
        //                    if (i == 0) {
        //                        option.attr("selected", "selected");
        //                    }
        //                    stationName.append(option);
        //                }

        //            }
        //        });
        //    }

        //});

        ////////////////////////////////
    });

    $("#DeleteSku").on("click", function () {
        var selRows = $('#Sku_List_Table').bootstrapTable('getAllSelections');
        if (selRows.length <= 0) {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
            return;
        }
        else if (selRows.length > 1) {
            layer.msg("Too many records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
            return;
        }
        else {
            layer.open({
                title: 'Warning',
                btn: ['Delete', 'Cancel'],
                content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
                yes: function (index) {
                    layer.close(index);
                    var SkuID = selRows[0].ID;
                    //var SkuID = [];
                    //for (var i = 0; i < selRows.length; i++) {
                    //    SkuID.push(selRows[i].ID);
                    //}
                    //console.log(SkuID);
                    parent.client.CallFunction("MESStation.Config.SkuConfig", "DeleteSkuById", { SkuID: SkuID }, function (e) {
                        if (e.Status == "Pass") {
                            layer.msg("Success", {
                                icon: 1,
                                time: 1000
                            }, function () {
                                //Get_data();
                                Get_SkuList();
                            });
                        }
                        else {
                            layer.msg(e.Message, {
                                icon: 2,
                                time: 3000
                            }, function () {
                            });
                        }
                    });
                }
            });
        }
    });

    //// GCH 2018/10/23 ADD 点击CopySku按钮
    $("#CopySku").on("click", function () {
        
        layer.open({
            type: 1,
            title: 'Copy SKU',
            area: ["600px", "300px"],
            scrollbar: false,
            content: $("#copy-sku-lay"),
            success: function (layero, index) {
                $("#copy-sku-lay").removeClass("hidden");
                $("#copy-btn").on("click", function () {
                    var oldsku = $("#old-sku").val();
                    var newsku = $("#new-sku").val();
                    self.parent.client.CallFunction("MESStation.Config.SkunoCopy", "SkuConpy", {NewSku: newsku, OldSku: oldsku}, function (e) {
                        if (e.Status == "Pass") {
                            layer.msg(e.Message, {
                                icon: 1,
                                time: 2000
                            }, function () {
                                location.reload();
                            });
                        } else {
                            layer.msg(e.Message, {
                                icon: 0,
                                time: 2000
                            });
                        }
                    });
                })
            },
            end: function () {
                console.log("end");
                $("#old-sku").val("");
                $("#new-sku").val("");
            }
        });
    });

    $("#Save2dConfig").on("click", function () {
        var reg = /\d/g;
        var qty = $("#quantity").val();
        if (!(reg.test(qty))) {
            layer.msg("Qty必須輸入數字", {
                icon: 2,
                time: 3000
            });
        } else {
            var sendData = {};
            sendData.BU = client.UserInfo.BU;
            sendData.SKUNO = $("#2dx_skuno").val();
            sendData.CODE_NAME = $("#codename").val();
            sendData.STATION_NAME = $("#2dx_station").val();
            sendData.QTY = $("#quantity").val();
            $("input[name=VALID]").each(function () {
                if (this.checked) {
                    // this.checked = false;
                    sendData.VALID_FLAG = this.value;
                }
            });
            self.parent.client.CallFunction("MESStation.Config.CLotRate", "AddCodeName", sendData, function (e) {
                if (e.Status == "Pass") {
                    layer.msg("Success", {
                        icon: 1,
                        time: 1000
                    }, function () {
                        //Get_data();
                        Get_SkuList();
                    });
                }
                else {
                    layer.msg(e.Message, {
                        icon: 2,
                        time: 3000
                    }, function () {
                    });
                }
            });//end callfunction
        }
    });//end click

    $("#Edit2dConfig").on("click", function () {
        var reg = /\d/g;
        var qty = $("#quantity").val();
        if (!(reg.test(qty))) {
            layer.msg("Qty必須輸入數字", {
                icon: 2,
                time: 3000
            });
        } else {
            var sendData = {};
            sendData.BU = client.UserInfo.BU;
            sendData.SKUNO = $("#2dx_skuno").val();
            sendData.CODE_NAME = $("#codename").val();
            sendData.STATION_NAME = $("#2dx_station").val();
            sendData.QTY = $("#quantity").val();
            $("input[name=VALID]").each(function () {
                if (this.checked) {
                    // this.checked = false;
                    sendData.VALID_FLAG = this.value;
                }
            });
            self.parent.client.CallFunction("MESStation.Config.CLotRate", "UpdateById", sendData, function (e) {
                if (e.Status == "Pass") {
                    layer.msg("Success", {
                        icon: 1,
                        time: 1000
                    }, function () {
                        //Get_data();
                        Get_SkuList();
                    });
                }
                else {
                    layer.msg(e.Message, {
                        icon: 2,
                        time: 3000
                    }, function () {
                    });
                }
            });//end callfunction
        }

    });//end click

    $("#SaveLinkConfig").on("click", function () {
        if ($("#skuno_68").val() == "" || $("#skuno_73").val() == "") {
            layer.mes("SKUNO80或SKUNO73不能為空", {
                icon: 2,
                time: 3000
            });
            return
        }
        var sendData = {};
        sendData.SKUNO800 = $("#skuno_68").val();
        sendData.SKUNO73 = $("#skuno_73").val();
        sendData.SKUVER73 = $("#version_73").val(); +
        self.client.CallFunction("MESStation.Config.Ckmapping", "AddCkMapping", sendData, function (e) {
            if (e.Status == "Pass") {
                layer.msg(e.Message, {
                    icon: 1,
                    time: 1000
                });
            }
            else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 1000
                });
            }
        });//end callfunction
    });//end click
    $("#EditLinkConfig").on("click", function () {
        if ($("#skuno_68").val() == "" || $("#skuno_73").val() == "") {
            layer.msg("SKUNO80或SKUNO73不能為空", {
                icon: 2,
                time: 3000
            });
            return
        }
        var sendData = {};
        sendData.SKUNO800 = $("#skuno_68").val();
        sendData.SKUNO73 = $("#skuno_73").val();
        sendData.SKUVER73 = $("#version_73").val();
        client.CallFunction("MESStation.Config.Ckmapping", "Update", sendData, function (e) {
            if (e.Status == "Pass") {
                layer.msg(e.Message, {
                    icon: 1,
                    time: 1000
                });
            }
            else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 1000
                });
            }
        });//end callfunction
    });//end click

    $("#s").on("input", tte(function (e) {
        var sendData = { "Sku_Name": this.value };
        self.parent.client.CallFunction("MESStation.Config.SkuConfig", "GetSkuByName", sendData, function (e) {
            var data;
            //var key2 = ["ID", "BU", "SKUNO", "VERSION", "SKU_NAME", "SERIES_NAME", "CUST_PARTNO", "CUST_SKU_CODE", "SN_RULE", "PANEL_RULE", "DESCRIPTION", "EDIT_EMP", "EDIT_TIME", "SKU_TYPE", "AQLTYPE", "LENGTH", "LABEL_VER", "MODELCLEI", "DESCRIPTION2", "ECI_NO", "FO6", "AutoStation"];  //改变后的键
            //var key1 = ["SkuId", "Bu", "SkuNo", "Version", "SkuName", "SeriesName", "CustPartNo", "CustSkuCode", "SnRule", "PanelRule", "Description", "LastEditUser", "LastEditTime", "SkuType", "AqlType", "Length", "LabelVer", "ModelClei", "Description2", "EciNo", "FO6", "AutoStation"]; //原键
            //var str = sendData["Sku_Name"];

            //if ($.trim(str) == "") {
            //    data = e.Data;
            //} else {
            //    data = arr_change(e.Data, key1, key2);
            //}
            //console.log(data);
            $('#Sku_List_Table').bootstrapTable("load", e.Data);

            //      "ID": "MFGII0000000000000000000000000020Y0",
            //"BU": "IOTBU",
            //"SKUNO": "800-106126-01",
            //"VERSION": "",
            //"SKU_NAME": "800-106126-01",
            //"SERIES_NAME": "NSDI_DEFAUL",
            //"CUST_PARTNO": "800-106126-01",
            //"CUST_SKU_CODE": "800-106126-01",
            //"SN_RULE": "FCW********",
            //"PANEL_RULE": "",
            //"DESCRIPTION": "ASY-ELMECH, 24 PORT, ADVANCED, NON-POE,",
            //"EDIT_EMP": "F1329452",
            //"EDIT_TIME": "2018/12/17 上午 09:51:37",
            //"SKU_TYPE": "MODEL",
            //"AQLTYPE": "",
            //"LENGTH": "11",
            //"LABEL_VER": "",
            //"MODELCLEI": "",
            //"DESCRIPTION2": "ASY-ELMECH, 24 PORT, ADVANCED, NON-POE,",
            //"ECI_NO": "",
            //"FO6": "0",
            //"AutoStation": "PCBFA"
            //["ID","BU","SKUNO","VERSION","SKU_NAME","SERIES_NAME","CUST_PARTNO","CUST_SKU_CODE","SN_RULE","PANEL_RULE","DESCRIPTION","EDIT_EMP","EDIT_TIME","","","","","","","","","","","","","","","","","","",""]
            //["SKU_TYPE","AQLTYPE","LENGTH","LABEL_VER","MODELCLEI","DESCRIPTION2","ECI_NO","FO6","","","","","","","","","","","","","","","","","","","","","","","",""]


            //["SkuId","Bu","SkuNo","Version","SkuName","SeriesName","CustPartNo","CustSkuCode","SnRule","PanelRule","Description","LastEditUser","LastEditTime","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
            //["SkuType","AqlType","Length","LabelVer","ModelClei","Description2","EciNo","FO6","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

            //      "SkuId": "MFGII0000000000000000000000000020Y0",
            //"Bu": "IOTBU",
            //"SkuNo": "800-106126-01",
            //"Version": "",
            //"SkuName": "800-106126-01",
            //"SkuType": "MODEL",
            //"CSeriesId": "MFGII00000000000000000000000000001",
            //"CustPartNo": "800-106126-01",
            //"CustSkuCode": "800-106126-01",
            //"SnRule": "FCW********",
            //"PanelRule": "",
            //"Description": "ASY-ELMECH, 24 PORT, ADVANCED, NON-POE,",
            //"LastEditUser": "F1329452",
            //"LastEditTime": "2018-12-17 09:51:37",
            //"SeriesId": "MFGII00000000000000000000000000001",
            //"SeriesCustomerId": "MFGII00000000000000000000000000001",
            //"SeriesName": "NSDI_DEFAUL",
            //"SeriesDescription": "NSDI_DEFAULT",
            //"SeriesEditEmp": "TEST",
            //"SeriesEditTime": "2018-06-23 00:00:00",
            //"AqlType": "",
            //"Length": 11.0,
            //"LabelVer": "",
            //"ModelClei": "",
            //"Description2": "ASY-ELMECH, 24 PORT, ADVANCED, NON-POE,",
            //"EciNo": "",
            //"FO6": "0"



        });
    },
1000));



    function tte(fun, time) {
        var timer;
        return function () {
            var args = arguments;
            var _this = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fun.apply(_this, args);
            }, time);
        }
    }

    function arr_change(arr, arr1key, arr2key) {   //表数据换键
        var retArr = [];
        if (arr1key.length == arr2key.length) {
            $.each(arr, function (index, obj) {
                var o = {};
                $.each(obj, function (key, value) {
                    var i = contain(arr1key, key);   //如果包含，返回下标，否则返回false
                    if (i !== false) {  //包含
                        o[arr2key[i]] = value;
                    }
                });
                retArr.push(o);
            });
            return retArr;
        } else {
            return [];
        }
        function contain(arr, val) {
            var flag = false;
            $.each(arr, function (index, value) {
                if (value == val) {
                    flag = index;
                    return flag;
                }
            });
            return flag;
        }
    }

    $("#EditModelDetail .form-control").on("change", function () {
        SKU_EditRow[this.name] = this.value;
    });

    $("#SaveSku").on("click", function () {
        var ClassName, FunctionName;
        var id = $("#EditModelDetail input[name=ID]").val();
        if (id == "" || id == undefined) {//新增
            ClassName = "MESStation.Config.SkuConfig";
            FunctionName = "AddSku";
        } else {//修改
            ClassName = "MESStation.Config.SkuConfig";
            FunctionName = "UpdateSku";
        }
        $("#EditModelDetail .form-control").each(function () {
            SKU_EditRow[this.name] = this.value;
        });
        console.log({ SkuObject: SKU_EditRow });
        //保存數據並清空所有input
        client.CallFunction(ClassName, FunctionName, { SkuObject: SKU_EditRow }, function (e) {
            if (e.Status == "Pass") {
                $("#2dx_skuno")[0].value = $("#SKUNO").val(); //add by zc 2019/04/21 for 2dx upload skuno
                $("#codename")[0].value = $("input[name=SKU_NAME]").val(); //add by zc 2019/04/21 for 2dx upload codename
                $("#skuno_68")[0].value = $("#SKUNO").val();//add by zc 2019/04/24 for LinkConfig
                layer.msg("OK," + e.Message, {
                    icon: 1,
                    time: 3000
                }, function () {
                });
                SKU_EditRow["ID"] = e.Data;
                $("#EditModelDetail input[name=SkuId]").val(e.Data);
            }
            else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
        $('#myTab li:eq(1) a').tab('show');
    });



    $('#BFPoint_List_Table').bootstrapTable({
        data: TPointList,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: true,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        uniqueId: "ID",
        selectItemName: "ID",
        toolbar: "#BFPoint_Toolbar",
        onCheck: function (row) {
            var rows = $('#BFPoint_List_Table').bootstrapTable('getAllSelections');
            if (rows.length > 1 || rows.length <= 0) {
                $("#EditPoint").attr("disabled", "disabled");
            } else {
                $("#EditPoint").removeAttr("disabled")
            }
            if (rows.length > 1 || rows.length <= 0) {
                $("#DeletePoint").attr("disabled", "disabled");
            } else {
                $("#DeletePoint").removeAttr("disabled")
            }
        },
        onUncheck: function (row) {
            var rows = $('#Sku_List_Table').bootstrapTable('getAllSelections');
            if (rows.length > 1 || rows.length <= 0) {
                $("#EditPoint").attr("disabled", "disabled");
            } else {
                $("#EditPoint").removeAttr("disabled")
            }
            if (rows.length <= 0) {
                $("#DeletePoint").attr("disabled", "disabled");
            } else {
                $("#DeletePoint").removeAttr("disabled")
            }
        },
        columns: [{
            checkbox: true
        }, {
            field: 'SKUNO',
            title: '<label set-lan="html:SkuNo">SkuNo</label>'
        }, {
            field: 'STATION_NAME',
            title: '<label set-lan="html:STATION_NAME">STATION_NAME</label>'
        }, {
            field: 'SAP_STATION_CODE',
            title: '<label set-lan="html:SAP_STATION_CODE">SAP_STATION_CODE</label>'
        }, {
            field: 'WORKORDER_TYPE',
            title: '<label set-lan="html:WORKORDER_TYPE">WORKORDER_TYPE</label>'
        }, {
            field: 'EDIT_EMP',
            title: '<label set-lan="html:tableEditEmp">EDIT_EMP</label>'
        }, {
            field: 'EDIT_TIME',
            title: '<label set-lan="html:tableEditTime">EDIT_TIME</label>'
        }],
        locale: tableLocale//中文支持,
    });

    $('#NewPoint').on("click", function () {
        var MapObject = {};
        $("#ThrowPointForm .form-control").each(function () {
            MapObject[$(this)[0].name] = $(this).val();
        });

        MapObject.SKUNO = SKU_EditRow.SKUNO;
        client.CallFunction("MESStation.Config.SAPStationMapConfig", "UpdateSapStationMap", { Operation: "ADD", MapObject: MapObject }, function (e) {
            if (e.Status == "Pass") {
                layer.msg("OK," + e.Message, {
                    icon: 1,
                    time: 3000
                }, function () {
                    Get_BFPoint(SKU_EditRow.SKUNO);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    });

    $('#DeletePoint').on("click", function () {
        var selRows = $('#BFPoint_List_Table').bootstrapTable('getAllSelections');
        if (selRows.length > 0) {
            layer.open({
                title: 'Warning',
                btn: ['Delete', 'Cancel'],
                content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
                yes: function (index) {
                    layer.close(index);
                    var IDList = [];
                    for (var i = 0; i < selRows.length; i++) {
                        IDList.push(selRows[i].ID);
                    }
                    parent.client.CallFunction("MESStation.Config.SAPStationMapConfig", "DeleteSapStationMap", { IDList: IDList }, function (e) {
                        if (e.Status == "Pass") {
                            layer.msg("OK," + e.Message, {
                                icon: 1,
                                time: 3000
                            }, function () {
                                Get_BFPoint(SKU_EditRow.SKUNO);
                            });
                        }
                        else {
                            layer.msg(e.Message, {
                                icon: 2,
                                time: 3000
                            }, function () {
                            });
                        }
                    });
                }
            });
        } else {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
        }
    });

    $('#RouteListTable').bootstrapTable({
        data: RouteList,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: false,
        striped: true,
        showRefresh: false,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        uniqueId: "ID",
        selectItemName: "ID",
        singleSelect: true,
        toolbar: "#RouteList_Toolbar",
        onCheck: function (row) {
            var rows = $('#RouteListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeleteRoute").attr("disabled", "disabled");
            } else {
                $("#DeleteRoute").removeAttr("disabled")
            }
            //$("#routeInput").html("当前路由：SMTLOADING==AOI2==AOI4==VI==PF==ICT==QUACK==ASSY==ASSY2==ADF==PCBA-PACKING==MCEBU-CBS");
            console.log(row);
            self.parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutesStation", { ID: row.ROUTE_ID }, function (e) {
                if(e.Status == "Pass"){
                    $("#routeInput").html("当前路由：" + e.Data);
                }
            });


        },
        onUncheck: function (row) {
            var rows = $('#RouteListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeleteRoute").attr("disabled", "disabled");
            } else {
                $("#DeleteRoute").removeAttr("disabled")
            }

            $("#routeInput").html("当前路由：")
        },
        columns: [{
            checkbox: true
        }, {

            field: 'DEFAULT_FLAG',
            title: '<label set-lan="html:DEFAULT_FLAG">DEFAULT_FLAG</label>'
        }, {
            field: 'ROUTE_NAME',
            title: '<label set-lan="html:ROUTE_NAME">ROUTE_NAME</label>'
        }, {
            field: 'DEFAULT_SKUNO',
            title: '<label set-lan="html:DEFAULT_SKUNO">DEFAULT_SKUNO</label>'
        }, {
            field: 'ROUTE_TYPE',
            title: '<label set-lan="html:ROUTE_TYPE">ROUTE_TYPE</label>'
        }, {
            field: 'EDIT_EMP',
            title: '<label set-lan="html:EDIT_EMP">EDIT_EMP</label>'
        }],
        locale: tableLocale//中文支持,
    });

    // gch 2018/11/10 add (测试路由项绑定事件,节流)
    $("#TestRouteName").on("input", throttle($("#TestRouteName"), $("#testRouteList"), function (ev, createNode) {
        //$("#testRouteList").css("width", $("#TestRouteName").css("width"));             //设置列表宽度
        var testRoute = this.value;
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutes", { StationName: testRoute, TYPE: "TEST" }, function (e) {
            //console.log(e);
            if (e.Status == "Pass") {   //"Pass"
                //清空ul
                testRouteData = e.Data;
                $("#testRouteList").css("display", "block");                                                     //显示列表
                $("#testRouteList ul")[0].innerHTML = "";
                var arr = oArr_sArr(e.Data, "StationNameSplicing");
                if (arr.length != 0) {
                    createNode(arr);
                }
                $("#testRouteList").find("li").each(function (i, node) {
                    node.onclick = function () {
                        console.log(this.innerHTML, $("#testRouteList"));
                        $("#TestRouteName").val(this.innerHTML);
                        $("#testRouteList").css("display", "none");
                        var selectArr = this.innerHTML.split("==");
                        //console.log($("#AUTO_SATATION"), selectArr);     //autostation变化
                        loadOption($("#AUTO_SATATION"), selectArr, selectArr[selectArr.length - 1]);
                    }
                    $(document).on("click", function () {
                        $("#testRouteList").css("display", "none");
                    });
                });
            }
        });
    }, 500));
    // gch 2019/3/18 add (sfc路由绑定事件)
    $("#SKUAddRouteName").on("input", throttle($("#SKUAddRouteName"), $("#sfcRouteList"), function (ev, createNode) {
        //$("#sfcRouteList").css("width", $("#SKUAddRouteName").css("width"));             //设置列表宽度
        var sfcRoute = this.value;
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutes", { StationName: sfcRoute, TYPE: "SFC" }, function (e) {
            if (e.Status == "Pass") {   //"Pass"
                sfcRouteData = e.Data;
                //清空ul
                $("#sfcRouteList").css("display", "block");                                                     //显示列表
                $("#sfcRouteList ul")[0].innerHTML = "";
                var arr = oArr_sArr(e.Data, "StationNameSplicing");
                if (arr.length != 0) {
                    createNode(arr);
                }
                $("#sfcRouteList").find("li").each(function (i, node) {
                    node.onclick = function () {
                        console.log("xxxx", this.innerHTML, $("#sfcRouteList"));
                        $("#SKUAddRouteName").val($(this).text());
                        $("#sfcRouteList").css("display", "none");
                    }
                    $(document).on("click", function () {
                        $("#sfcRouteList").css("display", "none");
                    });
                });
            }
        });
    }, 500));
    // gch 2019/7/9 add (wip路由绑定事件)
    $("#wipRouteName").on("input", throttle($("#wipRouteName"), $("#wipRouteList"), function (ev, createNode) {
        //console.log(this,ev,createNode);
        var wipRoute = this.value;
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "GetRoutes", { StationName: wipRoute, TYPE: "WIP" }, function (e) {
            if (e.Status == "Pass") {
                sfcRouteData = e.Data;
                var wipRouteList = e.Data;
                $("#wipRouteList").css("display", "block");                                                     //显示列表
                $("#wipRouteList ul")[0].innerHTML = "";
                var arr = oArr_sArr(wipRouteList, "StationNameSplicing");
                if (arr.length != 0) {
                    createNode(arr);
                }
                $("#wipRouteList").find("li").each(function (i, node) {
                    node.onclick = function () {
                        $("#wipRouteName").val($(this).text());
                        $("#wipRouteList").css("display", "none");
                    }
                    $(document).on("click", function () {
                        $("#wipRouteList").css("display", "none");
                    });
                });
            } else {
                //$("#wipRouteList").css("display", "block");                                                     //显示列表
                //$("#wipRouteList ul")[0].innerHTML = "";
                //createNode(["yfrw8uefyw8fwfwfwfewfew","fwefwefffffffffffeeeeeeeeeeeeeeeeeeeeee","eeew","ewfwe"]);
                //$("#wipRouteList").find("li").each(function (i, node) {
                //    node.onclick = function () {
                //        $("#wipRouteName").val($(this).text());
                //        $("#wipRouteList").css("display", "none");
                //    }
                //    $(document).on("click", function () {
                //        $("#wipRouteList").css("display", "none");
                //    });
                //});
            }
        });

    }, 500));

    function oArr_sArr(oArr, field) {
        var arr = [];
        $.each(oArr, function (index, obj) {
            arr.push(obj[field]);
        });
        return arr;
    }
    // 节流
    function throttle($input, $selectNode, method, delay) {          //内部包含创建 li 节点的方法 及设置列表的宽度（自适应）
        console.log(this);
        window.onresize = function () {  //设置宽度
            //console.log("resize");
            //$selectNode.css("width", $input.css("width"));
            //console.log($selectNode.css("width"), $input.css("width"));
        }
        var ul = $selectNode.find("ul");
        var createLi = function (arr) {   //创建li节点
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var li = $("<li>" + arr[i] + "</li>");
                li.css({
                    "fontSize": "10px !important",
                    "overflow": "hidden",
                    "whiteSpace": "nowrap",
                    "textOverflow": "ellipsis"
                });
                ul.append(li);
            }
            if (len >= 15) {                // 设置高度
                $selectNode.css("height", "300px");
            } else if (len > 0 && len < 15) {
                $selectNode.css("height", len * 20 + "px");
            }
            if (len == 0) {                 //隐藏下拉框
                $selectNode.css("display", "none");
            }
        }
        var timer = null;
        return function () {       //见 $("#TestRouteName").on("input"，fun），本函数有个默认的参数（e：oninput事件的处理对象）已经传好，还要再传入一个函数 createLi 用于创建列表（见 method.apply(context,args1)），
            context = this;
            var args = arguments;
            var args1 = [];
            for (var i = 0; i < args.length; i++) {
                args1.push(args[i]);
            }
            args1.push(createLi);
            clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(context, args1);   //***
            }, delay);
        }
    }

    // 生成下拉框
    function loadOption($select, selectArr, selectVal) {   //selectVal:默认选中的数据
        $select.html("");
        $.each(selectArr, function (index, val) {
            var option = $("<option>" + val + "</option>");
            option.attr("value", val);
            $select.append(option);
        });
        $select[0].value = selectVal;  //选中数据
    }

    //绑定路由两个ADD
    $("#sfcRouteAdd").on("click", function () {     //上面的add按钮  AddSKuSFCRouteMapping

        //console.log(routName_id(sfcRouteData, $("#SKUAddRouteName").val()), $("#setDefault")[0].checked, SKU_EditRow.ID);
        var sendData = {
            "ROUTE_ID": routName_id(sfcRouteData, $("#SKUAddRouteName").val()),
            "SKU_ID": SKU_EditRow.ID,
            "DEFAULT_FLAG": $("#setDefault")[0].checked == true ? "Y" : "N",
            "TYPE":"SFC"
        };
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuSFCRouteMapping", sendData, function (e) {
            if (e.Status == "Pass") {
                layer.msg(e.Message, {
                    icon: 1,
                    time: 2000
                }, function () {
                    Get_RoutList(SKU_EditRow.ID);
                    GetSfcRouteStation(SKU_EditRow.ID);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 0,
                    time: 2000
                }, function () {
                });
            }

        });
        console.log(sendData);
    });
    $("#testRouteAdd").on("click", function () {    //下面的add按钮   AddSKuTESTRouteMapping
        var sendData = {
            "TEST_ROUTE_ID": routName_id(testRouteData, $("#TestRouteName").val()),
            "SKU_ID": SKU_EditRow.ID,
            "DEFAULT_FLAG": $("#setTestDefault")[0].checked == true ? "Y" : "N",
            "NOCHECKTEST_FLAG": $("#NoCheckTest")[0].checked == true ? "Y" : "N",
            "AutoStation": $("#AUTO_SATATION").val()
        };
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuTESTRouteMapping", sendData, function (e) {
            if (e.Status == "Pass") {
                layer.msg(e.Message, {
                    icon: 1,
                    time: 2000
                }, function () {
                    Get_RoutList(SKU_EditRow.ID);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 0,
                    time: 2000
                }, function () {
                });
            }
        })
        console.log(sendData);
    });
    $("#wipRouteAdd").on("click", function () {
        console.log(sfcRouteData);
        var sendData = {
            "ROUTE_ID": routName_id(sfcRouteData, $("#wipRouteName").val()),
            "SKU_ID": SKU_EditRow.ID,
            "DEFAULT_FLAG": "N",
            "TYPE":"WIP"
        };
        client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuSFCRouteMapping", sendData, function (e) {
            console.log(e,sendData);
            if (e.Status == "Pass") {
                layer.msg(e.Message, {
                    icon: 1,
                    time: 2000
                }, function () {
                    Get_RoutList(SKU_EditRow.ID);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 0,
                    time: 2000
                }, function () {
                });
            }


        });

    });
    //$('#SKU_Route').on("click", function () {   //GCH 2018/11/10 UPDATE (添加测试路由项)
    //    var DEFAULT_FLAG = "";
    //    var sendData = null;
    //    if ($("#RouteList").find("input[type=checkbox]").eq(0).is(':checked')) {    //$('#checkbox-id')
    //        DEFAULT_FLAG = "Y";
    //    } else {
    //        DEFAULT_FLAG = "N";
    //    }
    //    sendData = {
    //        MappingObject: {
    //            DEFAULT_FLAG: DEFAULT_FLAG,
    //            SKU_ID: SKU_EditRow.ID,
    //            ROUTE_ID: $("#SKUAddRouteName").val(),
    //            TEST_ROUTE: $("#TestRouteName").val()
    //        }
    //    };
    //    //console.log($("#RouteList").find("input[type=checkbox]").eq(0));
    //    console.log(sendData);
    //    client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "AddSKuRouteMapping", sendData, function (e) {
    //        console.log(e);
    //        if (e.Status == "Pass") {
    //            Get_RoutList(SKU_EditRow.ID);
    //        } else {
    //            layer.msg(e.Message, {
    //                icon: 2,
    //                time: 3000
    //            }, function () {
    //            });
    //        }
    //    });
    //});



    //根据路由找id
    function routName_id(objArr, name) {
        var len = objArr.length;
        for (var i = 0; i < len; i++) {
            if (objArr[i]["StationNameSplicing"] == name) {
                return objArr[i]["ROUTE_ID"];
            } 
        }
    }


    $('#DeleteRoute').on("click", function () {
        var selRows = $('#RouteListTable').bootstrapTable('getAllSelections');
        if (selRows.length > 0) {
            layer.open({
                title: 'Warning',
                btn: ['Delete', 'Cancel'],
                content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
                yes: function (index) {
                    layer.close(index);
                    var RowsID = [];
                    for (var i = 0; i < selRows.length; i++) {
                        RowsID.push(selRows[i].ID);
                    }
                    parent.client.CallFunction("MESStation.Config.SkuRouteMappingConfig", "DeleteSkuRouteMapping", { MappingID: RowsID },
                        function (e) {
                            if (e.Status == "Pass") {
                                layer.msg("OK，" + e.Message, {
                                    icon: 1,
                                    time: 3000
                                }, function () {
                                    Get_RoutList(SKU_EditRow.ID);
                                });
                            }
                            else {
                                layer.msg(e.Message, {
                                    icon: 2,
                                    time: 3000
                                }, function () {
                                });
                            }
                        });
                }
            });
        } else {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
        }
    });

    $('#PackListTable').bootstrapTable({
        data: RouteList,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: true,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        uniqueId: "ID",
        selectItemName: "ID",
        toolbar: "#PackList_Toolbar",
        onCheck: function (row) {
            var rows = $('#PackListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeletePack").attr("disabled", "disabled");
            } else {
                $("#DeletePack").removeAttr("disabled")
            }
        },
        onUncheck: function (row) {
            var rows = $('#PackListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeletePack").attr("disabled", "disabled");
            } else {
                $("#DeletePack").removeAttr("disabled")
            }
        },
        columns: [{
            checkbox: true
        }, {
            field: 'PACK_TYPE',
            title: '<label set-lan="html:PACK_TYPE">TYPE</label>'
        }, {
            field: 'TRANSPORT_TYPE',
            title: '<label set-lan="html:TRANSPORT_TYPE">TRANSPORT</label>'
        }, {
            field: 'INSIDE_PACK_TYPE',
            title: '<label set-lan="html:INSIDE_PACK_TYPE">INSIDE</label>'
        }, {
            field: 'MAX_QTY',
            title: '<label set-lan="html:MAX_QTY">QTY</label>'
        }, {
            field: 'SN_RULE',
            title: '<label set-lan="html:SN_RULE">RULE</label>'
        }, {
            field: 'DESCRIPTION',
            title: '<label set-lan="html:DESCRIPTION">DESC</label>'
        }],
        locale: tableLocale//中文支持,
    });

    $('#AddPack').on("click", function () {
        var PackObj = {};
        $("#PackConfigForm .form-control").each(function () {
            PackObj[$(this)[0].name] = $(this).val();
        });
        PackObj.SKUNO = SKU_EditRow.SKUNO;
        PackObj.ID = "";
        client.CallFunction("MESStation.Packing.PackConfigAPI", "AlertPackConfig", { PackObj: PackObj }, function (e) {
            if (e.Status == "Pass") {
                layer.msg("OK," + e.Message, {
                    icon: 1,
                    time: 3000
                }, function () {
                    Get_PackConfig(SKU_EditRow.SKUNO);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    });

    $('#DeletePack').on("click", function () {
        var selRows = $('#PackListTable').bootstrapTable('getAllSelections');
        if (selRows.length > 0) {
            layer.open({
                title: 'Warning',
                btn: ['Delete', 'Cancel'],
                content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
                yes: function (index) {
                    layer.close(index);
                    var RowsID = [];
                    for (var i = 0; i < selRows.length; i++) {
                        RowsID.push(selRows[i].ID);
                    }
                    parent.client.CallFunction("MESStation.Packing.PackConfigAPI", "RemovePackConfig", { ID_LIST: RowsID },
                        function (e) {
                            if (e.Status == "Pass") {
                                layer.msg("OK，" + e.Message, {
                                    icon: 1,
                                    time: 3000
                                }, function () {
                                    Get_PackConfig(SKU_EditRow.SKUNO);
                                });
                            }
                            else {
                                layer.msg(e.Message, {
                                    icon: 2,
                                    time: 3000
                                }, function () {
                                });
                            }
                        });
                }
            });
        } else {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
        }
    });

    $('#LabelListTable').bootstrapTable({
        data: RouteList,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: true,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        uniqueId: "ID",
        selectItemName: "ID",
        toolbar: "#LabelList_Toolbar",
        onCheck: function (row) {
            var rows = $('#LabelListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeleteLabel").attr("disabled", "disabled");
            } else {
                $("#DeleteLabel").removeAttr("disabled")
            }
        },
        onUncheck: function (row) {
            var rows = $('#LabelListTable').bootstrapTable('getAllSelections');
            if (rows.length <= 0) {
                $("#DeleteLabel").attr("disabled", "disabled");
            } else {
                $("#DeleteLabel").removeAttr("disabled")
            }
        },
        columns: [{
            checkbox: true
        }, {
            field: 'STATION',
            title: '<label set-lan="html:STATION">STATION</label>'
        }, {
            field: 'SEQ',
            title: '<label set-lan="html:SEQ">SEQ</label>'
        }, {
            field: 'QTY',
            title: '<label set-lan="html:QTY">QTY</label>'
        }, {
            field: 'LABELNAME',
            title: '<label set-lan="html:LABELNAME">LABELNAME</label>'
        }, {
            field: 'LABELTYPE',
            title: '<label set-lan="html:LABELTYPE">LABELTYPE</label>'
        }, {
            field: 'EDIT_EMP',
            title: '<label set-lan="html:EDIT_EMP">EDIT_EMP</label>'
        }],
        locale: tableLocale//中文支持,
    });

    $('#AddLabel').on("click", function () {
        var LabelObject = {};
        $("#LabelList .form-control").each(function () {
            LabelObject[$(this)[0].name] = $(this).val();
        });
        LabelObject.SKUNO = SKU_EditRow.SKUNO;
        LabelObject.ID = "";
        if (LabelObject.STATION == "") {
            layer.msg("Station Can not be null", {
                icon: 2,
                time: 3000
            }, function () {
                $("#LabelList .form-control[name=STATION]").focus();
            });
            return;
        }
        if (LabelObject.QTY == "") {
            layer.msg("Print QTY Can not be null", {
                icon: 2,
                time: 3000
            }, function () {
                $("#LabelList .form-control[name=QTY]").focus();
            });
            return;
        }
        else {
            var r = RegExp("^[0-9]*[1-9][0-9]*$");
            if (!r.test(LabelObject.QTY)) {
                layer.msg("Print QTY is not a valid number", {
                    icon: 2,
                    time: 3000
                }, function () {
                    $("#LabelList .form-control[name=QTY]").focus();
                });
                return;
            }
        }
        if (LabelObject.SEQ == "") {
            layer.msg("Print SEQ Can not be null", {
                icon: 2,
                time: 3000
            }, function () {
                $("#LabelList .form-control[name=SEQ]").focus();
            });
            return;
        }
        else {
            var r = RegExp("^[0-9]*[1-9][0-9]*$");
            if (!r.test(LabelObject.SEQ)) {
                layer.msg("Print SEQ is not a valid number", {
                    icon: 2,
                    time: 3000
                }, function () {
                    $("#LabelList .form-control[name=SEQ]").focus();
                });
                return;
            }
        }
        client.CallFunction("MESStation.Label.LabelConfig", "AlertLabelConfig", { LabelObject: LabelObject }, function (e) {
            if (e.Status == "Pass") {
                layer.msg("OK," + e.Message, {
                    icon: 1,
                    time: 3000
                }, function () {
                    Get_LabelConfig(SKU_EditRow.SKUNO);
                });
            } else {
                layer.msg(e.Message, {
                    icon: 2,
                    time: 3000
                }, function () {
                });
            }
        });
    });

    $('#DeleteLabel').on("click", function () {
        var selRows = $('#LabelListTable').bootstrapTable('getAllSelections');
        if (selRows.length > 0) {
            layer.open({
                title: 'Warning',
                btn: ['Delete', 'Cancel'],
                content: "Delete operation cannot be rolled back! </br> Are you sure you want to delete these records?",
                yes: function (index) {
                    layer.close(index);
                    var RowsID = [];
                    for (var i = 0; i < selRows.length; i++) {
                        RowsID.push(selRows[i].ID);
                    }
                    parent.client.CallFunction("MESStation.Label.LabelConfig", "RemoveLabelConfig", { ID_LIST: RowsID },
                        function (e) {
                            if (e.Status == "Pass") {
                                layer.msg("OK，" + e.Message, {
                                    icon: 1,
                                    time: 3000
                                }, function () {
                                    Get_LabelConfig(SKU_EditRow.SKUNO);
                                });
                            }
                            else {
                                layer.msg("Error," + e.Message, {
                                    icon: 2,
                                    time: 3000
                                }, function () {
                                });
                            }
                        });
                }
            });
        } else {
            layer.msg("no records selected", {
                icon: 2,
                time: 3000
            }, function () {
            });
        }
    });

    $("#ConfirmAql").on("click", function () {
        var id = SKU_EditRow.ID;
        var aqlType = $("#AqlList select[name=AqlType]").val();
        var aqlLevel = $("#AqlList select[name=DefaultLevel]").val();
        if (id == undefined)
            layer.msg("Sku Don't Save!", {
                icon: 2,
                time: 3000
            }, function () {
            });
        else
            client.CallFunction("MESStation.Config.CAqltypeConfig", "AddSkuAql", { SkuId: id, AqlType: aqlType, aqlLevel: aqlLevel }, function (e) {
                if (e.Status == "Pass") {
                    layer.msg("OK," + e.Message, {
                        icon: 1,
                        time: 3000
                    }, function () {
                    });
                    Get_SkuAqlTypeData(id);
                }
                else {
                    layer.msg(e.Message, {
                        icon: 2,
                        time: 3000
                    }, function () {
                    });
                }
            });
    });

    $('#AqlListTable').bootstrapTable({
        data: AqlData,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: false,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        columns: [{
            checkbox: true
        }, {
            field: 'AQL_TYPE',
            title: '<label set-lan="html:AQL_TYPE">AQL_TYPE</label>'
        }, {
            field: 'LOT_QTY',
            title: '<label set-lan="html:LOT_QTY">LOT_QTY</label>'
        }, {
            field: 'GL_LEVEL',
            title: '<label set-lan="html:GL_LEVEL">GL_LEVEL</label>'
        }, {
            field: 'SAMPLE_QTY',
            title: '<label set-lan="html:SAMPLE_QTY">SAMPLE_QTY</label>'
        }, {
            field: 'REJECT_QTY',
            title: '<label set-lan="html:REJECT_QTY">REJECT_QTY</label>'
        }, {
            field: 'EDIT_EMP',
            title: '<label set-lan="html:EDIT_EMP">EDIT_EMP</label>'
        }, {
            field: 'EDIT_TIME',
            title: '<label set-lan="html:EDIT_TIME">EDIT_TIME</label>'
        }],
        locale: tableLocale//中文支持,
    });

    $('#SkuAqlListTable').bootstrapTable({
        data: SkuAqlData,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        search: false,
        striped: true,
        showRefresh: true,
        showSelectTitle: true,
        maintainSelected: true,
        clickToSelect: true,
        detailView: false,
        columns: [{
            checkbox: true
        }, {
            field: 'AQLTYPE',
            title: '<label set-lan="html:AQL_TYPE">AQLTYPE</label>'
        }, {
            field: 'SKUNO',
            title: '<label set-lan="html:SKUNO">SKUNO</label>'
        }, {
            field: 'DEFAULLEVEL',
            title: '<label set-lan="html:DEFAULLEVEL">DEFAULLEVEL</label>'
        }, {
            field: 'EDIT_EMP',
            title: '<label set-lan="html:EDIT_EMP">EDIT_EMP</label>'
        }, {
            field: 'EDIT_TIME',
            title: '<label set-lan="html:EDIT_TIME">EDIT_TIME</label>'
        }],
        locale: tableLocale//中文支持,
    });

    console.log(client.UserInfo.BU == "MFGII" || client.UserInfo.BU == "SR");
    if (client.UserInfo.BU == "MFGII" || client.UserInfo.BU == "SR") {
        var LABEL_VER = $("input[name=LABEL_VER]").parents(".form-group");
        var MODELCLEI = $("input[name=MODELCLEI]").parents(".form-group");
        var DESCRIPTION2 = $("input[name=DESCRIPTION2]").parents(".form-group");
        var ECI_NO = $("input[name=ECI_NO]").parents(".form-group");
        $([LABEL_VER[0]].concat([MODELCLEI[0], DESCRIPTION2[0], ECI_NO[0]])).css("display", "none");
        console.log([LABEL_VER[0]].concat([MODELCLEI[0], DESCRIPTION2[0], ECI_NO[0]]));
    }
    if (client.UserInfo.EMP_LEVEL < 9) { //ZC start--> ADD 20190411 非9級權限不能使用Lable配置和Aql配置功能
        //$("#myTab").find("li").eq(7).css('display', 'none');
        //[].pop.call($("#myTab").find("li"))// Array.prototype.pop.call(trList)
        $("#myTab").find("li").eq(8).css('display', 'none');
        //[].pop.call($("#myTab").find("li"))// Array.prototype.pop.call(trList)

    }//end if --> end
    Get_SkuList();
    Get_Serial();
    Get_PackType();
    Get_TransportType();
    Get_SNRule();
    Get_LabelList();
    Get_LabelType();
    Get_AqlType();
    Get_StationName(); // 10/23 add
    // Get_Skuno();//ZC 2019/4/21 add
    Get_2dxStation();//zc 2019/04/21 ass
    GetSNCode();
    mesUI.SetLanguage("SKUSetting");
});



