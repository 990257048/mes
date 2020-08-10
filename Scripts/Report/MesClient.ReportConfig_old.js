var ConfigReport = function (o) {
        var _this = this;
        this.pageMsg = o.pageMsg;
        this.apiList = o.apiList;
        this.layerMsg = o.layerMsg;
        this.tableMsg = o.tableMsg;
        this.layerData = o.loadLayerData;
        this.btnClick = o.btnClick;
        ConfigReport.prototype.Init = function () {
            //生成报表网页基本结构(包括按钮,弹出层结构)
            this.ReportHTML(this.pageMsg);
            //接收首页数据，show首页数据，回调
            self.parent.client.CallFunction(this.apiList["homePage"]["className"], this.apiList["homePage"]["functionName"], this.sendData(this.apiList["homePage"]["colList"], this.apiList["homePage"]["sendList"]), function (e) {
                if (e.Status == "Pass") {
                    _this.InitCallback(e.Data);
                }
            });
            //加载弹出层，生成控件，控制样式，
            this.loadLayer(this.layerMsg);
            //加载特殊控件内数据（下拉数据等），
            this.loadLayerData(this.layerData);
            //事件触发逻辑
            this.clickEvent();
        }
        ConfigReport.prototype.ReportHTML = function (obj) {
            $(".title span").html(obj.pageName);                                //页面名
            $(".title span").attr("set-lan", "html:" + obj.setLan);          //多语言
            $(".query input").attr("placeholder", obj.queryTip);              //显示提示信息
            this.generateBtn(obj.btnMsg);                                               //生成按钮
            this.generateLayerHTML(obj.btnMsg);                                     //生成弹出框结构
        }
        ConfigReport.prototype.generateBtn = function (arr) {  //生成按钮
            var btnContainer = $(".list .btnList");
            for (var i = 0; i < arr.length; i++) {
                var div = $("<div id=" + arr[i]["id"] + " ></div>");
                var oi = $("<i></i>");
                var span = $("<span set-lan=" + "html:" + arr[i]["btnName"] + "> " + arr[i]["btnName"] + " </span>");
                oi.attr("class", arr[i]["icon"]);
                if (arr[i]["style"] == 0) {   //设置按钮初始样式（选择数据后的按钮样式见表格生成处）
                    div.css({
                        "height": "100%",
                        "padding": "6px 17px",
                        "lineHeight": "22px",
                        "color": "rgb(103,106,108)",
                        "float": "left",
                        "fontSize": "14px",
                        "borderRight": "1px solid #337ab7",
                        "cursor": "pointer"
                    });
                    div.hover(function () {   //移入
                        $(this).css({
                            "color": "#fff",
                            "background": "#286090"
                        });
                    }, function () {           //移出
                        $(this).css({
                            "color": "rgb(103,106,108)",
                            "background": "#fff"
                        });
                    });
                } else {
                    div.css({
                        "height": "100%",
                        "padding": "6px 17px",
                        "lineHeight": "22px",
                        "color": "rgba(103,106,108,0.6)",
                        "float": "left",
                        "fontSize": "14px",
                        "borderRight": "1px solid #337ab7",
                        "cursor": "no-drop"
                    });
                    div.hover(function () {   //移入
                        $(this).css({
                            "color": "#fff",
                            "background": "#337ab7",
                            "opacity": "0.6"
                        });
                    }, function () {           //移出
                        $(this).css({
                            "color": "rgba(103,106,108,0.6)",
                            "background": "#fff",
                            "opacity": "1"
                        });
                    });
                }
                div.append(oi);
                div.append(span);
                btnContainer.append(div);
            }
        }
        ConfigReport.prototype.generateLayerHTML = function (arr) {    //生成弹出框结构
            $.each(arr, function (index, btn) {    //遍历按钮
                if (btn.layerFlag) {
                    var id = btn.btnName + "Layer";
                    var lay = $("<div id = "+ id +" class = "+ "hidden" +"></div>");
                    var panel = $("<div class = "+ "panel-body" +"></div>");
                    var row = $("<div class = "+ "row" +"></div>");
                    var br = $("<br>");
                    row.append(br);
                    panel.append(row);
                    lay.append(panel);
                    //弹出框样式    
                    lay.css({
                        "position": "absolute",
                        "width": "100%"
                    });
                    $(document.body).append(lay);
                }
            });
        }
        ConfigReport.prototype.sendData = function (colList, sendList) {       //生成发送数据
            var sendData = {};
            $.each(colList, function (i, val) {
                sendData[val] = sendList[i];
            });
            return sendData;
        }
        ConfigReport.prototype.InitCallback = function (e) {
            //show首页数据
            $(".tab table").bootstrapTable({
                data: e,   //e
                pagination: true,    //分页显示
                pageSize: 10,         //初始化每一页的数据条数
                pageList: [10, 25, 50, 100],
                search: false,        //显示查找框
                striped: true,        //背景色相间
                showRefresh: false,   //显示重置按钮
                clickToSelect: true,   //单击一行内任意单元格选中该行
                singleSelect: true,  //单选
                onCheck: function (row) {   //选中
                    var btn1 = []; //1类按钮
                    var btn2 = []; //2类按钮
                    $.each(o.pageMsg["btnMsg"], function (index, val) {
                        if (val["style"] == 1) {
                            btn1.push($("#" + val["id"]));
                        }
                        if (val["style"] == 2) {
                            btn2.push($("#" + val["id"]));
                        }
                    })
                    var rows = $('.tab table').bootstrapTable('getAllSelections');  ///getAllSelections
                    if (rows.length == 1) {   //控制1类btn
                        $.each(btn1, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgb(103, 106, 108)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "pointer"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#286090",
                                    "opacity": "1"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgb(103, 106, 108)",
                                    "background": "#fff"
                                });
                            });
                        });
                    } else {
                        $.each(btn1, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgba(103,106,108,0.6)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "no-drop"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#337ab7",
                                    "opacity": "0.6"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgba(103,106,108,0.6)",
                                    "background": "#fff",
                                    "opacity": "1"
                                });
                            });
                        });
                    }
                    if (rows.length > 0) {    //控制2类btn
                        $.each(btn2, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgb(103, 106, 108)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "pointer"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#286090",
                                    "opacity": "1"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgb(103, 106, 108)",
                                    "background": "#fff"
                                });
                            });
                        });
                    } else {
                        $.each(btn2, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgba(103,106,108,0.6)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "no-drop"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#337ab7",
                                    "opacity": "0.6"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgba(103,106,108,0.6)",
                                    "background": "#fff",
                                    "opacity": "1"
                                });
                            });
                        });
                    }
                    checkedData = rows;
                },
                onUncheck: function (row) {  //取消选中
                    var btn1 = []; //1类按钮
                    var btn2 = []; //2类按钮
                    $.each(o.pageMsg["btnMsg"], function (index, val) {
                        if (val["style"] == 1) {
                            btn1.push($("#" + val["id"]));
                        }
                        if (val["style"] == 2) {
                            btn2.push($("#" + val["id"]));
                        }
                    })
                    var rows = $('.tab table').bootstrapTable('getAllSelections');  ///getAllSelections
                    if (rows.length == 1) {   //控制1类btn
                        $.each(btn1, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgb(103, 106, 108)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "pointer"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#286090",
                                    "opacity": "1"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgb(103, 106, 108)",
                                    "background": "#fff"
                                });
                            });
                        });
                    } else {
                        $.each(btn1, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgba(103,106,108,0.6)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "no-drop"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#337ab7",
                                    "opacity": "0.6"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgba(103,106,108,0.6)",
                                    "background": "#fff",
                                    "opacity": "1"
                                });
                            });
                        });
                    }
                    if (rows.length > 0) {    //控制2类btn
                        $.each(btn2, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgb(103, 106, 108)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "pointer"
                            });
                            ele.hover(function () {    //移入

                                $(this).css({
                                    "color": "#fff",
                                    "background": "#286090",
                                    "opacity": "1"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgb(103, 106, 108)",
                                    "background": "#fff"
                                });
                            });
                        });
                    } else {
                        $.each(btn2, function (index, ele) {
                            ele.css({                 //初始
                                "height": "100%",
                                "padding": "6px 17px",
                                "lineHeight": "22px",
                                "color": "rgba(103,106,108,0.6)",
                                "float": "left",
                                "fontSize": "14px",
                                "borderRight": "1px solid #337ab7",
                                "cursor": "no-drop"
                            });
                            ele.hover(function () {    //移入
                                $(this).css({
                                    "color": "#fff",
                                    "background": "#337ab7",
                                    "opacity": "0.6"
                                });
                            }, function () {            //移出
                                $(this).css({
                                    "color": "rgba(103,106,108,0.6)",
                                    "background": "#fff",
                                    "opacity": "1"
                                });
                            });
                        });
                    }
                    checkedData = rows;
                },
                columns: this.columns(this.tableMsg["column"])
            });
            $(".tab table").find(".bs-checkbox").css({
                "text-align": "center",
                "vertical-align": "middle",
            });
            //配置语言
            this.setLanguage(_this.pageMsg.setLan);
        }
        ConfigReport.prototype.setLanguage = function (page) {
            var client = self.parent.client;
            var MesUI = new MesClientUI(client);
            MesUI.SetLanguage(page);
        }
        ConfigReport.prototype.columns = function (colList) {   //生成表格关键数据
            var columns = [];
            columns.push({
                align: 'center',
                valign: 'middle',
                checkbox: true
            });
            $.each(colList, function (i, val) {
                var title = "<label set-lan=" + "html:" + val + ">" + val + "</label>";
                var obj = {
                    field: val,
                    title: title,
                    align: 'center',
                    valign: 'middle'
                };
                columns.push(obj);
            });
            return columns;
        }
        ConfigReport.prototype.loadLayer = function (layerMsg) {
            var self = this;
            $.each(this.pageMsg.btnMsg, function (index, obj) {  //遍历按钮
                if (obj.layerFlag) {
                    var layerNode = $("#" + obj.btnName + "Layer" + " .panel-body .row");
                    $.each(layerMsg[obj.btnName].showList, function (index, control) {
                        var ele = self.loadControl(control.field, control.type, control.disabled, control.labelList, control.valList);
                        layerNode.append(ele);
                    });
                    layerBtn(layerNode, obj.layerBtnName);
                    //弹出框内部功能按钮样式，内部特殊控件样式
                    layerNode.find("label").css({
                        "marginTop": "6px",
                        "paddingRight": "6px",
                        "whiteSpace": "nowrap",
                        "overflow": "hidden",
                        "textOverflow": "ellipsis"
                    });
                    layerNode.find("textarea").css("height","82px");
                    layerNode.find("input[type = checkbox]").css("marginTop", "8px");
                    layerNode.find("." + obj.layerBtnName + " button").css({
                        "background": "#337ab7",
                        "fontWeight": "bold",
                        "color": "#fff",
                        "borderRadius": "15px",
                        "boxShadow": "5px 5px 10px #aaa"
                    });
                    layerNode.find("." + obj.layerBtnName + " button").hover(function () {    //移入
                        $(this).css("background", "#286090");
                    }, function () {     //移出
                        $(this).css("background", "#337ab7");
                    });
                }
                function layerBtn($fatherNode,name) {    //生成弹出层内功能按钮（如ADD EDIT）
                    var odiv = $("<div></div>");
                    var label = $("<div></div>");
                    var div = $("<div class=" + "col-xs-4" + "></div>");
                    var btn = $("<button>"+ name +"</button>");
                    btn.attr("class", "form-control "+ name);
                    label.attr("class", "col-xs-4 control-label text-right");
                    odiv.attr("class", name +" form-group col-sm-6 col-md-6 hui");
                    div.append(btn);
                    odiv.append(label);
                    odiv.append(div);
                    $fatherNode.append(odiv);
                }
            });
        }
        ConfigReport.prototype.loadControl = function (name, type, disabled, labelList, valList) {   //加载弹出层控件（单个控件）labelList,valList针对单选框，复选框有用
            var ele;
            switch (type) {
                case "text":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    var oInput;
                    if (disabled) {
                        oInput = $("<input type=" + "text" + " class=" + "form-control" + " id=" + name + " name=" + name + " disabled />");
                    } else {
                        oInput = $("<input type=" + "text" + " class=" + "form-control" + " id=" + name + " name=" + name + " />");
                    }
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    div.append(oInput);
                    ele.append(label);
                    ele.append(div);
                    break;
                case "select":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    var oSelect = $("<select name=" + name + " id=" + name + " class=" + "form-control" + " ></select>");
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    div.append(oSelect);
                    ele.append(label);
                    ele.append(div);
                    break;
                case "textarea":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    var oTextarea = $("<textarea name=" + name + " id=" + name + " class=" + "form-control" + " ></textarea>");
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    div.append(oTextarea);
                    ele.append(label);
                    ele.append(div);
                    break;
                case "file":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    //<input style="outline: none;" class="form-control" id="uploadFiles" type="file" accept=".xlsx,.xls" />
                    var oInput = $("<input type="+ "file" +" class=" + "form-control" + " name="+ name +" id="+ name +" />");
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    div.append(oInput);
                    ele.append(label);
                    ele.append(div);
                    break;
                case "checkbox":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    var odiv;
                    $.each(labelList, function (index, val) {
                        odiv = $("<div class=" + "col-xs-4" + "></div>");
                        var span = $("<span>" + val + " : " + "</span>");
                        var oinput = $("<input type=" + "checkbox" + " value=" + valList[index] + " name=" + name + " />");
                        odiv.append(span);
                        odiv.append(oinput);
                        div.append(odiv);
                    });
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    ele.append(label);
                    ele.append(div);
                    break;
                case "radio":
                    ele = $("<div></div>");
                    var label = $("<label set-lan=" + "html:" + name + ">" + name + "</label>");
                    var div = $("<div class=" + "col-xs-8" + "></div>");
                    var odiv;
                    $.each(labelList, function (index, val) {
                        odiv = $("<div class=" + "col-xs-4" + "></div>");
                        var span = $("<span>" + val + " : " + "</span>");
                        var oinput = $("<input type=" + "radio" + " value=" + valList[index] + " name=" + name + " />");
                        odiv.append(span);
                        odiv.append(oinput);
                        div.append(odiv);
                    });
                    label.attr("class", "col-xs-4 control-label text-right");
                    ele.attr("class", "form-group col-sm-6 col-md-6 hui");
                    ele.append(label);
                    ele.append(div);
                    break;
            }
            return ele;
        }
        ConfigReport.prototype.loadLayerData = function (layerData) {    //加载弹出层内特殊控件数据
            $.each(layerData, function (key,fun) {
                var layNode = $("#" + key + "Layer");
                var args = [loadSelectData];    
                fun.apply(layNode,args);    //生成下拉框的方法,后续再补充功能，this为当前弹出层
            });
            function field_api(field) {    //根据字段（field）找api信息，dataList:配置数据 该函数为非纯函数
                var obj = {};
                $.each(layerData, function (index, dataObj) {
                    if (dataObj["pri"] == 2 && dataObj["field"] == field) {
                        obj = dataObj;
                    }
                });
                return obj;
            }
            function loadSelectData(container, dataList) {
                container.html(" ");
                $.each(dataList, function (index, val) {
                    var op = $("<option value=" + val + ">" + val + "</option>");
                    container.append(op);
                });
            }
        }
        ConfigReport.prototype.clickEvent = function () {
            var _this = this;     
            $.each(this.pageMsg.btnMsg, function (index, btn) {//分成兩批，一批彈出大層，一批彈出小層或不彈出層
                var layNode = $("#" + btn.btnName + "Layer");
                if (btn.layerFlag) {    //需要弹出大层
                    $("#" + btn.id).on("click", function () {
                        if ($(this).css("cursor") != "no-drop") {   //按钮是可交互状态
                            layer.open({
                                type: 1,
                                skin: "layui-layer-lan",
                                title: btn.btnName + " Data",
                                area: ["80%", "90%"],
                                scrollbar: false,
                                content: layNode,    //该弹出层节点
                                maxmin: true,
                                success: function (layero, index) {
                                    layNode.removeClass("hidden");//显示弹出框
                                    fillData(_this.layerMsg[btn.btnName].showList, $(".tab table").bootstrapTable("getAllSelections")[0], layNode);    //填充数据


                                    //表格生成的方法，大弹框节点
                                    var tempSendData = _this.btnClick[btn.btnName].apply(layNode, [generatLayerTable]);     //打开弹出框后处理返回的数据(this:大弹框节点 传入的参数：表格生成的方法,后续再添加参数 )  非常重要！！！
                                    //tempSendData用于点击功能按钮时与后台交互的数据


                                    var b = $("." + btn.layerBtnName).find("button");   //功能按钮
                                    b.on("click", function () {       
                                        var sendData = get_sendData(_this.layerMsg[btn.btnName].sendList, layNode);
                                        self.parent.client.CallFunction(_this.apiList[btn.btnName]["className"], _this.apiList[btn.btnName]["functionName"], sendData, function (e) {
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
                                                }, function () {
                                                });
                                            }
                                        });
                                    });
                                },
                                end: function () {
                                    layNode.addClass("hidden");                                       //隐藏弹出框
                                    layNode.find("input").each(function (index, node) {     //关闭弹出框各项数据置空
                                        node.value = "";
                                    });
                                }
                            });
                        }
                    });
                } else {
                    $("#" + btn.id).on("click", function () {     //不需要弹出大层
                        if ($(this).css("cursor") != "no-drop") {   //按钮是可交互状态
                            var chData = $(".tab table").bootstrapTable("getAllSelections")[0];
                            var sendData = {};
                            $.each(_this.apiList[btn.btnName]["colList"], function (index,field) {
                                sendData[field] = chData[field];
                            });
                            var CallFunction = function (){   
                                self.parent.client.CallFunction(_this.apiList[btn.btnName]["className"], _this.apiList[btn.btnName]["functionName"], sendData, function (e) {
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
                                        }, function () {
                                        });
                                    }
                                });
                            } 
                            var smallLayer = function () {
                                layer.open({                          //确定是否删除?
                                    title: btn.btnName,
                                    btn: [btn.btnName, 'Cancel'],
                                    content: "确认此操作?",
                                    yes: function (index) {      //确定删除
                                        layer.close(index);        //关闭该选择layer框
                                        CallFunction();
                                    }
                                });
                            }
                            //选中的数据，发送数据（封装）,小弹窗
                            _this.btnClick[btn.btnName].apply($(this), [chData, CallFunction, smallLayer]);     //CallFunction:不需要提示    smallLayer：需要提示
                        }
                    })
                }
            });
            //節流查询
            $(".query input").on("input", throttle(function () {
                var val = $(this).val();
                console.log(val);
                var sendData = {};
                var key = _this.apiList.select["colList"][0];
                sendData[key] = val;
                self.parent.client.CallFunction(_this.apiList.select["className"], _this.apiList.select["functionName"], sendData, function (e) {
                    if (e.Status == "Pass") {
                        $(".tab table").bootstrapTable("load", e.Data);
                        $(".tab table").find(".bs-checkbox").css({
                            "text-align": "center",
                            "vertical-align": "middle",
                        });
                        layer.msg(e.Message, {
                            icon: 1,
                            time: 2000
                        }, function () {
                        });
                    } else {
                        layer.msg(e.Message, {
                            icon: 0,
                            time: 2000
                        }, function () {
                        });
                    }
                });
            }, 1000));
            //函数（处理数据）
            function generatLayerTable(tableName, fields, tableData,eventObj) {     //生成弹出框内的表格(tableName: name,id field:字段集合 tableData:表数据)
                var lastNode = this.find(".row").children().last();
                //lastNode.before($("<p>dasdwqdqw</p>"));
                var tabDiv = $("<div class = "+ tableName +"></div>");
                var table = $("<table></table>");
                tabDiv.css({
                    margin:"15px"
                });
                tabDiv.append(table);
                lastNode.before(tabDiv);
                table.bootstrapTable({
                    data: tableData,   //e
                    pagination: true,    //分页显示
                    pageSize: 10,         //初始化每一页的数据条数
                    pageList: [10, 25, 50, 100],
                    search: false,        //显示查找框
                    striped: false,        //背景色相间
                    showRefresh: false,   //显示重置按钮
                    clickToSelect: true,   //单击一行内任意单元格选中该行
                    singleSelect: true,  //单选
                    onCheck: function (row) {   //选中
                        var rows = $('.tab table').bootstrapTable('getAllSelections');  ///getAllSelections
                        //传入选中的数据，该表格的功能按钮，this为该表（jquery对象）
                        eventObj.onCheck.apply(table, [row]);
                    },
                    onUncheck: function (row) {  //取消选中
                        //
                        eventObj.onUncheck.apply(table);

                    },
                    columns: columns(fields)
                });
                table.find(".bs-checkbox").css({
                    "text-align": "center",
                    "vertical-align": "middle",
                });
                function columns (colList) {   //生成表格关键数据
                    var columns = [];
                    columns.push({
                        align: 'center',
                        valign: 'middle',
                        checkbox: true
                    });
                    $.each(colList, function (i, val) {
                        var title = "<i set-lan=" + "html:" + val + ">" + val + "</i>";
                        var obj = {
                            field: val,
                            title: title,
                            align: 'center',
                            valign: 'middle'
                        };
                        columns.push(obj);
                    });
                    return columns;
                }

            }
            function fillData(fields, dataList, container) {   //填充数据
                console.log(fields, dataList, container);
                $.each(fields, function (index, o) {
                    if(o.fillFlag){
                        var node = container.find("[name=" + o.field + "]");
                        if (dataList) {
                            node[0].value = dataList[o.field];
                        }
                        if (o.field == "EDIT_EMP") {
                            node[0].value = self.parent.client.UserInfo["EMP_NO"];
                        }
                    }
                });
            }
            function get_sendData(fields, container) {     //用于生成发送数据
                var sendData = {};
                $.each(fields, function (index, val) {
                    if (container.find("[name=" + val + "]").length > 0) {
                        sendData[val] = container.find("[name=" + val + "]")[0].value;
                        //if (container.find("[name=" + val + "]")[0].tagName == "TEXTAREA") {
                        //    var valList = container.find("[name=" + val + "]")[0].value.split(/ +|,+|\n+/m);
                        //    var newVal = [];
                        //    $.each(valList, function (index, value) {
                        //        if (value != "") {
                        //            newVal.push(value);
                        //        }
                        //    });
                        //    sendData[val] = newVal;
                        //}
                    } else {
                        sendData[val] = self.parent.client.UserInfo[val];
                    }
                });
                return sendData;
            }
            function throttle(fn,wait) {    //节流
                var timer;
                return function () {
                    clearTimeout(timer);
                    var _this = this;
                    var args = arguments;
                    timer = setTimeout(function () {
                        fn.apply(_this,args);
                    }, wait);
                }
            }
        };
        this.Init();
    }