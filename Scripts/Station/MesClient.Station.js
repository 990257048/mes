var MesStation = function (o) {
    // GCH 2018/10/24 ADD (发送数据时加上BU这一项)
    this.CloseSelectLineFlag = o.CloseSelectLineFlag;    //是否需要关闭选择线体的功能
    this.TabContainer = o.TabContainer;                      //需要特殊处理的表格（AOI自动过站需要）
    this.BU = $.cookie($.MES.CK_BU_NAME);
    this.Name = o.Name;
    this.StationName = o.StationName;
    this.InitClassName = o.InitClassName ? o.InitClassName : "MESStation.Stations.CallStation";
    this.InitFunctionName = o.InitFunctionName ? o.InitFunctionName : "InitStation";
    this.InputClassName = o.InputClassName ? o.InputClassName : "MESStation.Stations.CallStation";
    this.InputFunctionName = o.InputFunctionName ? o.InputFunctionName : "StationInput";
    this.Client = o.Client;
    this.mesUI = o.mesUI;
    this.UserInfo = o.Client.UserInfo;
    this.Line = o.Line;
    this.IScale = o.IScale;
    this.TContainer = o.TContainer;
    this.IContainer = o.IContainer;
    this.OScale = o.OScale;
    this.OContainer = o.OContainer;
    this.MContainer = o.MContainer;
    this.MessageShowType = o.MessageShowType;
    this.Inputs = [];
    this.Outputs = [];
    this.Message = [];
    this.FailInputs = [];
    this.ScanType = o.ScanType ? o.ScanType : "Pass";
    this.CurrentInputJson = null;
    this.StationJson = null;
    this.ScanKeypart = [];
    this.BeforeInit = o.BeforeInit;
    this.OnInit = o.Init;
    this.resize = o.resize;
    this.MesHelper = null;
    MesStation.prototype.InputIsRepeat = false;/*InputIsRepeat當NextInput為重複輸入是則為True，不是則為false，作為是否重新渲染所有輸入框的條件*/
    MesStation.prototype.constructor = MesStation;
    MesStation.prototype.MyName = function () {
        //这里循环查找window对象中的dog属性
        for (var name in this.global) {
            //判断是否为Dog类
            if (this.global[name] === this) {
                return name;
            }
        }
    };
    MesStation.prototype.StationList = {};
    MesStation.prototype.Init = function () {
        var _this = this;
        if (this.Line == "Line1") {    //初次進入未選擇線體時（無線體緩存信息）時進入 / 初次選擇線體后重新執行Init也可進入【緩存有選擇的線體信息，而this.Line還是“Line1”，因此能進入】
            var line = localStorage.getItem($.MES.CK_LINE_NAME);
            self.parent.Loading(false);
            //console.log($.MES.CK_LINE_NAME, localStorage.getItem($.MES.CK_LINE_NAME), $.cookie($.MES.CK_LAN_NAME));
            //console.log(this.Client.UserInfo.IP);
            var tips = {
                CHINESE_TW: "請選擇線體",  //繁体中文
                CHINESE: "请选择线体",  //简体中文
                ENGLISH: "Select Station Line"  //英文
            }    //提示中英文
            if ((line == undefined || line == null || line == "") && !this.CloseSelectLineFlag) {      //未選擇線體
                var htmlstr = "<select onchange=\"localStorage.setItem($.MES.CK_LINE_NAME,$(this).val());\">";  // "<select onchange=\"localStorage.setItem($.MES.CK_LINE_NAME,$(this).val());\"><option>Line1</option>"
                var linelist = JSON.parse(localStorage.getItem($.MES.CK_LINE_LIST));
                var lineObj = {
                    class1: [],    //1类（ip及station都比对成功）线体集合 
                    class2: [],   //2类（只有station比对成功）线体集合
                    class3: []    //3类（其它）线体集合
                };
                $.each(linelist, function (index, lineO) {
                    if (_this.Name == lineO.LINE_CODE) {     //工站比对成功
                        if (_this.Client.UserInfo.IP == lineO.DESCRIPTION) {    //ip比对成功
                            lineObj.class1.push(lineO.LINE_NAME);
                        } else {   //ip比对失败
                            lineObj.class2.push(lineO.LINE_NAME);
                        }
                    } else {  //工站比对失败
                        lineObj.class3.push(lineO.LINE_NAME);
                    }
                });
                //console.log(lineObj);
                if (lineObj.class1 != 0) {
                    htmlstr += concatHtmlstr(lineObj.class1);
                } else if (lineObj.class2 != 0) {
                    htmlstr += concatHtmlstr(lineObj.class2);
                } else {
                    htmlstr += concatHtmlstr(lineObj.class3);
                }
                function concatHtmlstr(lineArr) {   //生成option结构
                    var htmlstr = "";
                    var lines = unique(lineArr);    //去重后的线体集合
                    //console.log(lines.length);
                    for (var i = 0; i < lines.length; i++) {
                        htmlstr += "<option>" + lines[i] + "</option>";
                    }
                    return htmlstr;
                    function unique(arr) {   //数组去重
                        var obj = {};
                        var newArr = [];
                        for (var i = 0; i < arr.length; i++) {
                            if (!obj[arr[i]]) {
                                obj[arr[i]] = 1;
                                newArr.push(arr[i]);
                            }
                        }
                        return newArr;
                    }
                }
                htmlstr += "</select>";
                swal.Data = this;
                swal({
                    title: tips[$.cookie($.MES.CK_LAN_NAME)],
                    text: htmlstr,
                    html: true,
                    confirmButtonColor: "#337ab7",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },
                function (isConfirm) {      //選擇線體時把腺體存入緩存，重新執行 Init 【見此函數結尾】，而
                    var opt1 = this.text.match(/option\w*>([\s\S]*?)<\/option>/)[1];   //匹配出第一个线体（默认线体）
                    if (isConfirm) {
                        line = localStorage.getItem($.MES.CK_LINE_NAME);
                        if (line == undefined || line == null || line == "") {
                            line = opt1;
                            localStorage.setItem($.MES.CK_LINE_NAME, line);
                        }
                        swal.Data.Line = line;
                    }
                    else {
                        localStorage.setItem($.MES.CK_LINE_NAME, "");
                    }
                    swal.close();
                    if (swal.Data.BeforeInit != undefined) {
                        swal.Data.BeforeInit();
                    }
                    swal.Data.Init();
                });
            }
            else {
                if (this.BeforeInit != undefined) {
                    this.BeforeInit();
                }
                this.Line = line;
                MesStation.prototype.StationList = {};
                var MessageID = "MSGID" + parseInt(Math.random() * 99).toString() + Date.now().toString();
                this.ListenStationData(MessageID);
                //console.log({ BU: this.BU, DisplayStationName: this.Name, Line: this.Line });
                self.parent.Loading(true);

                this.Client.CallFunction(this.InitClassName, this.InitFunctionName, { BU: this.BU, DisplayStationName: this.Name, Line: this.Line }, this.InitCallBack, MessageID);
            }
        }
        else {     //已經選擇線體進入
            //console.log(2)
            if (this.BeforeInit != undefined) {
                //console.log(3);
                this.BeforeInit();
            }
            MesStation.prototype.StationList = {};
            var MessageID = "MSGID" + parseInt(Math.random() * 99).toString() + Date.now().toString();
            this.ListenStationData(MessageID);
            self.parent.Loading(true);

            this.Client.CallFunction(this.InitClassName, this.InitFunctionName, { BU: this.BU, DisplayStationName: this.Name, Line: this.Line }, this.InitCallBack, MessageID);
        }
    };
    MesStation.prototype.FillLocalData = function () {
        for (var i = 0; i < this.Inputs.length; i++) {
            if (this.Inputs[i]) {
                var ck = this.Name + "_" + this.Inputs[i].Name;
                var v = $.cookie(ck);
                if (v) {
                    this.Inputs[i].value = v;
                }
            }
        }
    };
    MesStation.prototype.ListenStationData = function (k) {
        MesStation.prototype.StationList[k] = this;
    };
    MesStation.prototype.InitCallBack = function (d) {    // this : window
        //console.log(this,d);
        var station = MesStation.prototype.StationList[d.MessageID];
        delete MesStation.prototype.StationList[d.MessageID];
        if (d.Status == "Pass") {
            station.CurrentInputJson = null;
            station.StationJson = d.Data.Station;   /////////////*
            //console.log(station);
            station.Inputs.splice(0, station.Inputs.length);
            station.Outputs.splice(0, station.Outputs.length);
            station.Message.splice(0, station.Message.length);
            station.FailInputs.splice(0, station.FailInputs.length);
            station.Name = d.Data.Station.DisplayName;
            station.StationName = d.Data.Station.StationName;
            //console.log(station);
            //console.log(station.Inputs);
            if (d.Data.Station.FailStation) {
                for (var i = 0; i < d.Data.Station.FailStation.Inputs.length; i++) {
                    var fi = new StationInput(d.Data.Station.FailStation.Inputs[i]);
                    station.FailInputs.push(fi);
                }
                for (var i = 0; i < d.Data.Station.FailStation.StationMessages.length; i++) {
                    console.log(d.Data.Station.FailStation.StationMessages);
                    var m = new StationMessage(d.Data.Station.FailStation.StationMessages[i]);
                    station.Message.push(m);
                }
            }
            //////////////////////////////////////////处理接收的input控件信息///////////////////////////////////////////////////

            for (var i = 0; i < d.Data.Station.Inputs.length; i++) {
                if (i == 0) {
                    station.CurrentInputJson = d.Data.Station.Inputs[i];
                }
                var ip = new StationInput(d.Data.Station.Inputs[i]);
                station.Inputs.push(ip);
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            for (var i = 0; i < d.Data.Station.DisplayOutput.length; i++) {
                var op = new StationOutput(d.Data.Station.DisplayOutput[i]);
                station.Outputs.push(op);
            }
            for (var i = 0; i < d.Data.Station.StationMessages.length; i++) {
                var m = new StationMessage(d.Data.Station.StationMessages[i]);
                station.Message.push(m);
            }
            station.FillLocalData();/*加载本地保存的数据*/

            if (station.TContainer && d.Data.Station.FailStation) {
                station.TContainer.find("[name=ScanType]").unbind("change");
                station.TContainer.empty();
                var e = new InputElements(station.Client);
                var radio = e.Radio(station.TContainer, "ScanType", "ScanType", "", station.ScanType, ["Pass", "Fail"], "", "", "", station.IScale ? station.IScale : "3:9");
                console.log(radio,station.TContainer);
                station.TContainer.find("input[type=radio][name=ScanType]").on("change", { Station: station }, function (e) {
                    e.data.Station.SetScanType($(this).val());
                    //配置中英文
                    console.log(e.data.Station.mesUI);
                    
                    setTimeout(function () {

                        if (e.data.Station.mesUI) {
                            e.data.Station.mesUI.SetLanguage("Station");
                        }

                        e.data.Station.resize();

                    }, 0);
                });
            }
        }
        else {
            swal.Data = station;
            swal({
                title: "Station Init Fail",
                text: d.Message,
                type: "error"
            },
            function () {
                swal.Data.Init();
            });
        }
        if (station.IContainer) {
            station.ShowInputs(station.IContainer);   //控件绑定事件 IContainer : input框父容器
        }
        if (station.OContainer) {
            station.ShowOutputs(station.OContainer, station.TabContainer);    //gch 2019-05-30 add
        }
        if (station.OnInit != undefined) {   //执行init处（WZW）
            station.OnInit(d);
        }
        //配置语言：2019/06/19 add by gch
        //console.log(station.mesUI.SetLanguage);
        if (station.mesUI) {
            station.mesUI.SetLanguage("Station");
        }
        station.SetCurrentInput();
        try {
            self.parent.Loading(false);
        } catch (e) {
        }
        //console.log(d.Data);
        if (d.Data.Station.LinkMESHelper) {
            station.MesHelper = new Helper({ MContainer: station.MContainer, OnOpen: function (e) { } });      //station.MContainer : 显示信息区（节点）
        }

    };
    MesStation.prototype.SetLine = function (Line) {
        this.Line = Line;
        this.Init();
    };
    MesStation.prototype.SetInputValue = function (Name, value) {  //

        if (this.ScanType == "Pass") {

            for (var i = 0; i < this.Inputs.length; i++) {
                if (this.Inputs[i].DisplayName == Name) {
                    this.Inputs[i].Value = value;
                    this.Inputs[i].ClearValue();
                    this.Inputs[i].SetFocus();
                    this.StationJson.Inputs[i].Value = value;
                    this.CurrentInputJson = this.StationJson.Inputs[i];
                }
            }
        }
        else {
            for (var i = 0; i < this.FailInputs.length; i++) {
                if (this.FailInputs[i].DisplayName == Name) {
                    this.FailInputs[i].Value = value;
                    this.FailInputs[i].ClearValue();
                    this.FailInputs[i].SetFocus();
                    this.StationJson.FailStation.Inputs[i].Value = value;
                    this.CurrentInputJson = this.StationJson.FailStation.Inputs[i];
                }
            }
        }
    };
    MesStation.prototype.SetCurrentInput = function (DisplayName) {
        if (this.ScanType == "Pass") {
            for (var i = 0; i < this.Inputs.length; i++) {
                if (DisplayName) {
                    if (this.Inputs[i].DisplayName == DisplayName) {
                        this.Inputs[i].SetEnable();
                        this.Inputs[i].SetVisable();
                        this.Inputs[i].SetFocus();
                        break;
                    }
                }
                else {
                    if (this.Inputs[i].DisplayName == this.CurrentInputJson.DisplayName) {
                        this.Inputs[i].SetEnable();
                        this.Inputs[i].SetVisable();
                        this.Inputs[i].SetFocus();
                        break;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.FailInputs.length; i++) {
                if (DisplayName) {
                    if (this.FailInputs[i].DisplayName == DisplayName) {
                        this.FailInputs[i].SetEnable();
                        this.FailInputs[i].SetVisable();
                        this.FailInputs[i].SetFocus();
                        break;
                    }
                }
                else {
                    if (this.FailInputs[i].DisplayName == this.CurrentInputJson.DisplayName) {
                        this.FailInputs[i].SetEnable();
                        this.FailInputs[i].SetVisable();
                        this.FailInputs[i].SetFocus();
                        break;
                    }
                }
            }
        }
    };
    MesStation.prototype.SetScanType = function (Type) {
        this.ScanType = Type ? Type : "Pass";
        if (this.ScanType == "Pass") {
            this.CurrentInputJson = this.StationJson.Inputs[0];
        }
        else if (this.StationJson.FailStation) {
            this.StationJson.FailStation.Line = this.Line;
            this.CurrentInputJson = this.StationJson.FailStation.Inputs[0];
        }
        this.IContainer.empty();
        this.ShowInputs(this.IContainer);
        this.SetCurrentInput();
    };

    //////////////////////////////////////////////////没用的start/////////////////////////////////////////////////////////////////////////
    MesStation.prototype.ShowInput = function (obj) {   //维修工站专用
        if (this.ScanType == "Pass") {
            //console.log("pass!");
            for (var i = 0; i < this.Inputs.length; i++) {
                if (this.Inputs[i].DisplayName == obj.InputName) {
                    obj.Container.find("button").unbind("click");
                    obj.Container.find("input:radio").unbind("click");
                    obj.Container.find("input.form-control").unbind("keypress");
                    obj.Container.find("select.form-control").unbind("change");
                    //GCH 2018/10/27 ADD 
                    obj.Container.find("input:checkbox").unbind("change");
                    ///////////////////////////file框解除change事件//////////////////////////////////
                    //obj.Container.find("input:file").unbind("change");
                    ////////////////////////////////////////////////////////////////////////////
                    this.Inputs[i].Remove();
                    this.Inputs[i].Show({ Client: this.Client, Container: obj.Container, Scale: (obj.Scale == undefined ? (this.IScale == undefined ? "3:9" : this.IScale) : obj.Scale) });
                    this.Inputs[i].SetEnable();
                    this.Inputs[i].SetVisable();
                    obj.Container.find("button").bind("click", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, "");
                        event.data.Station.SendData();
                    });
                    obj.Container.find("input:radio").bind("click", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    //GCH 2018/10/27 ADD 
                    obj.Container.find("input:checkbox").bind("change", { Station: this }, function (event) {
                        if ($("#" + this.id).prop("checked") == true) {
                            this.value = "on";
                        }
                        else {
                            this.value = "";
                        }
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    //obj.Container.find("input.form-control").bind("keypress", { Station: this }, function (event) {
                    //    if (event.keyCode == 13) {
                    //        event.data.Station.SetInputValue(this.name, this.value);
                    //        event.data.Station.SendData();
                    //    }
                    //});
                    obj.Container.find("select.form-control").bind("change", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    ////////////////////////高超辉2018/10/9改（添加file框的事件）///////////////////////////
                    obj.Container.find("input:file").bind("change", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    ////////////////////////////////////////////////////////////////////////////////////////


                    //obj.Container.find("input.form-control").bind("keypress", { Station: this }, function (event) {
                    //    if (event.keyCode == 13) {
                    //        event.data.Station.SetInputValue(this.name, this.value);
                    //        event.data.Station.SendData();
                    //    }
                    //});

                    var _this = this;

                    if (this.Inputs[i].ScanFlag) {
                        //obj.Container

                        this.scannerInput(obj.Container, function (t, v) {
                            console.log("扫描枪输入！", t, v);
                            $(this).attr("placeholder", "请用扫描枪输入!");
                            _this.SetInputValue(this.name, v);
                            _this.SendData();
                        }, function (t, v) {
                            console.log("非扫描枪输入！");
                            layer.msg("非扫描枪输入！")
                        });
                    } else {
                        obj.Container.find("input.form-control").bind("keypress", { Station: this }, function (event) {
                            if (event.keyCode == 13) {
                                event.data.Station.SetInputValue(this.name, this.value);
                                event.data.Station.SendData();
                            }
                        });
                    }
                    break;
                }
            }
        }
        else {
            console.log("fail");
            for (var i = 0; i < this.FailInputs.length; i++) {
                if (this.FailInputs[i].DisplayName == obj.InputName) {
                    obj.Container.find("button").unbind("click");
                    obj.Container.find("input:radio").unbind("click");
                    obj.Container.find("input.form-control").unbind("keypress");
                    obj.Container.find("select.form-control").unbind("change");
                    obj.Container.find("input:checkbox").unbind("change");
                    this.FailInputs[i].Remove();
                    this.FailInputs[i].Show({ Client: this.Client, Container: obj.Container, Scale: (obj.Scale == undefined ? (this.IScale == undefined ? "3:9" : this.IScale) : obj.Scale) });
                    this.FailInputs[i].SetEnable();
                    this.FailInputs[i].SetVisable();
                    obj.Container.find("button").bind("click", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, "");
                        event.data.Station.SendData();
                    });
                    obj.Container.find("input:radio").bind("click", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    obj.Container.find("input.form-control").bind("keypress", { Station: this }, function (event) {
                        console.log("huiche!!!");
                        if (event.keyCode == 13) {
                            event.data.Station.SetInputValue(this.name, this.value);
                            event.data.Station.SendData();
                        }
                    });
                    obj.Container.find("input:checkbox").bind("change", { Station: this }, function (event) {
                        if ($("#" + this.id).prop("checked") == true) {
                            this.value = "on";
                        }
                        else {
                            this.value = "";
                        }
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    obj.Container.find("select.form-control").bind("change", { Station: this }, function (event) {
                        event.data.Station.SetInputValue(this.name, this.value);
                        event.data.Station.SendData();
                    });
                    break;
                }
            }
        }
    };
    //////////////////////////////////////////////////没用的end//////////////////////////////////////////////////////////////////////////
    //给input框添加事件逻辑
    MesStation.prototype.ShowInputs = function (Container) {    //Container:input框的父容器
        Container.find("button").unbind("click");
        Container.find("input:radio").unbind("click");
        Container.find("input.form-control").unbind("keypress");
        Container.find("select.form-control").unbind("change");
        Container.find("input:checkbox").unbind("click");
        Container.find("input:file").unbind("change");
        for (var i = 0; i < this.Inputs.length; i++) {
            this.Inputs[i].Remove();
        }
        for (var i = 0; i < this.FailInputs.length; i++) {
            this.FailInputs[i].Remove();
        }
        if (this.ScanType == "Pass") {
            for (var i = 0; i < this.Inputs.length; i++) {
                this.Inputs[i].Remove();
                this.Inputs[i].Show({ Client: this.Client, Container: Container, Scale: (this.IScale == undefined ? "3:9" : this.IScale) });    //生成pass控件
                this.Inputs[i].SetEnable();
                this.Inputs[i].SetVisable();
            }
        }
        else {
            for (var i = 0; i < this.FailInputs.length; i++) {
                this.FailInputs[i].Remove();
                this.FailInputs[i].Show({ Client: this.Client, Container: Container, Scale: (this.IScale == undefined ? "3:9" : this.IScale) });   //生成fail控件
                this.FailInputs[i].SetEnable();
                this.FailInputs[i].SetVisable();
            }
        }
        Container.find("button").bind("click", { Station: this }, function (event) {
            event.data.Station.SetInputValue(this.name, "");
            event.data.Station.SendData();
            try {
                $.publishMoreTime(this.name, this.value);
            } catch (e) {
            }
        });
        Container.find("input:checkbox").bind("click", { Station: this }, function (event) {
            if ($("#" + this.id).prop("checked") == true) {
                this.value = "on";
            }
            else {
                this.value = "";
            }
            event.data.Station.SetInputValue(this.name, this.value);
            event.data.Station.SendData();
            try {
                $.publishMoreTime(this.name, this.value);
            } catch (e) {
            }
        });
        Container.find("input:radio").bind("click", { Station: this }, function (event) {
            event.data.Station.SetInputValue(this.name, this.value);
            event.data.Station.SendData();
            try {
                $.publishMoreTime(this.name, this.value);
            } catch (e) {
            }
        });
        //Container.find("input.form-control").bind("keypress", { Station: this }, function (event) {
        //    if (event.keyCode == 13) {
        //        event.data.Station.SetInputValue(this.name, this.value);
        //        event.data.Station.SendData();
        //        try {
        //            $.publishMoreTime(this.name, this.value);
        //        } catch (e) {
        //        }
        //    }
        //});
        var _this = this;
        var eles = ret_input(_this.Inputs);  //pass两种输入框
        var eleFail = ret_input(_this.FailInputs);   //fail两种输入框
        if (isUndefined(eles)) {
            //console.log("eles 1");
            //pass需要扫描枪输入
            this.scannerInput(eles[0], function (t, v) {
                console.log("扫描枪输入！", t, v);
                $(this).attr("placeholder", "请用扫描枪输入!");
                _this.SetInputValue(this.name, v);
                _this.SendData();
                try {
                    $.publishMoreTime(this.name, this.value);
                } catch (e) {
                }
            }, function (t, v) {
                $(this).attr("placeholder", "检测到您手动输入，请用扫描枪输入！！！");
                console.log("非扫描枪输入！");
            });
            //pass不需要扫描枪输入
            eles[1].bind("keypress", { Station: this }, function (event) {     //在输入框敲回车（不需要扫描枪输入）
                if (event.keyCode == 13) {
                    //console.log(13);
                    event.data.Station.SetInputValue(this.name, this.value);
                    event.data.Station.SendData();
                    try {
                        $.publishMoreTime(this.name, this.value);
                    } catch (e) {
                    }
                }
            });
        } else {
            //console.log("eles 0");
        }
        if (isUndefined(eleFail)) {
            //console.log("eleFail 1");
            //fail需要扫描枪输入
            this.scannerInput(eleFail[0], function (t, v) {
                console.log("扫描枪输入！", t, v);
                $(this).attr("placeholder", "请用扫描枪输入!");
                _this.SetInputValue(this.name, v);
                _this.SendData();
                try {
                    $.publishMoreTime(this.name, this.value);
                } catch (e) {
                }
            }, function (t, v) {
                $(this).attr("placeholder", "检测到您手动输入，请用扫描枪输入！！！");
                console.log("非扫描枪输入！");
            });
            //fail不需要扫描枪输入
            eleFail[1].bind("keypress", { Station: this }, function (event) {     //在输入框敲回车（不需要扫描枪输入）
                if (event.keyCode == 13) {
                    //console.log(13);
                    event.data.Station.SetInputValue(this.name, this.value);
                    event.data.Station.SendData();
                    try {
                        $.publishMoreTime(this.name, this.value);
                    } catch (e) {
                    }
                }
            });
        } else {
            //console.log("fail 0");
        }
        function isUndefined(eleArr) {
            var flag = true;
            if (eleArr[0].length > 0 && !eleArr[0][0] || eleArr[1].length > 0 && !eleArr[1][0]) {
                flag = false;
                return flag;
            } else {
                return flag;
            }
        }
        function ret_input(inputArr) {   //筛选出需要扫描枪输入的输入框
            //console.log(inputArr);
            var ipts1 = $([]);  //需要扫描枪输入的输入框
            var ipts2 = $([]);  //不需要扫描枪输入的输入框
            $.each(inputArr, function (index, obj) {
                //console.log(index, obj);
                if (obj.DisplayType == "TXT" && obj.ScanFlag) {    //扫描枪
                    //ipts1.push(Container.find("input.form-control[id=" + obj.ID + "]")[0]);
                    ipts1.push(Container.find("#" + obj.Name + "_" + obj.ID)[0]);
                } else if ((obj.DisplayType == "TXT" || obj.DisplayType == "PwdTXT") && !obj.ScanFlag) {    //非扫描枪
                    //ipts2.push(Container.find("input.form-control[id=" + obj.ID + "]")[0]);
                    ipts2.push(Container.find("#" + obj.Name + "_" + obj.ID)[0]);

                }
            });
            return [ipts1, ipts2];
        }
        Container.find("select.form-control").bind("change", { Station: this }, function (event) {
            event.data.Station.SetInputValue(this.name, this.value);
            event.data.Station.SendData();
            try {
                $.publishMoreTime(this.name, this.value);
            } catch (e) {

            }
        });
        ////////////////////////高超辉2018/10/9改（添加file框的事件）///////////////////////////
        Container.find("input:file").bind("change", { Station: this }, function (event) {
            //event.data.Station.SetInputValue(this.name, this.value);
            //event.data.Station.SendData();
            //try {
            //    $.publishMoreTime(this.name, this.value);
            //} catch (e) {
            //}
            console.log(this.files);
            var keyValue = [];
            for (var i = 0; i < this.files.length; i++) {
                (function (f) {
                    var reader = new FileReader();
                    reader.readAsText(f);
                    reader.onload = function (e) {
                        keyValue.push(this.result)
                        //console.log(this.result);
                    }
                })(this.files[i]);
            }
            //console.log(keyValue);
            setTimeout(function () {
                console.log(keyValue);
            }, 0);
        });
        ////////////////////////////////////////////////////////////////////////////////////////
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    MesStation.prototype.ShowOutput = function (obj) {    //维修专用（非维修请忽略）
        obj.Container.empty();
        for (var i = 0; i < this.Outputs.length; i++) {
            if (this.Outputs[i].Name == obj.OutputName) {
                this.Outputs[i].Remove();
                this.Outputs[i].Show(obj.Container, undefined, (obj.Scale == undefined ? (this.OScale == undefined ? "3:9" : this.OScale) : obj.Scale));
                break;
            }
        }
    };
    MesStation.prototype.ShowOutputs = function (Container, TabContainer) {    //modefy by gch 2019-05-30 传入TabContainer（用来放特殊表格）
        Container.empty();
        if (TabContainer && TabContainer.length > 0) {
            TabContainer.empty();
        }
        for (var i = 0; i < this.Outputs.length; i++) {
            this.Outputs[i].Remove();
            this.Outputs[i].Show(Container, TabContainer, (this.OScale == undefined ? "3:9" : this.OScale));
        }
    };
    MesStation.prototype.ShowMessage = function (Container) {
        Container = Container ? Container : this.MContainer;
        for (var i = 0; i < this.Message.length; i++) {
            if (this.MessageShowType) {
                if (Container) {
                    this.Message[i].Show("", Container);
                }
                this.Message[i].Show(this.MessageShowType, Container);
            }
            else {
                this.Message[i].Show(this.MessageShowType, Container);
            }
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    MesStation.prototype.scannerInput = function ($ele, fn1, fn2) {   //限制输入框只能扫描枪输入
        var t1, t2;
        var t = [];
        var flag = false; //是否是扫描枪输入
        $ele.on("keydown", function (e1) {
            //console.log(t);
            if (t.length == 0) {
                this.value = "";
            }
            if (e1.keyCode != 13 && e1.keyCode != 16) {   //非回车，非shift键
                t1 = new Date();
            } else if (e1.keyCode == 13) {                //回车
                console.log($(this).val());
                flag = F(t);
                //if (this.value.length == t.length) {        //输入的字符串长度与数组长度相同（无删除，无复制，无拖拽）
                //    flag = F(t);
                //} else {       //（可能存在删除,复制，拖拽）
                //    console.log("length error! 可能存在删除,复制,拖拽");
                //}
            }
        });
        $ele.on("keyup", function (e2) {
            if (e2.keyCode != 13 && e2.keyCode != 16) {
                t2 = new Date();
                console.log("push:", t2 - t1);
                t.push(t2 - t1);
                console.log(this, this.value, t);
            } else if (e2.keyCode == 13) {
                if (flag) {
                    fn1.apply(this, [t, this.value]);    //fn1的this指定为原生的输入框元素，且为fn1传入 输入的字符串 及时间间隔数组（t）待使用
                    //console.log("扫描枪输入！");
                } else {
                    fn2.apply(this, [t, this.value]);
                    this.value = "";
                    //console.log("非扫描枪输入，请扫描输入！");
                }
                t = [];
            }
        });
        function F(arr) {
            var flag1 = false;  //最大值   60ms
            var flag2 = false;  //平均值   0-25ms
            var flag3 = false;  //极差      60ms
            var len = arr.length;
            var min = arr[0];
            var max = arr[0];
            var avg;
            var sum = 0;
            for (var i = 0; i < len - 1; i++) {
                if (min > arr[i + 1]) {
                    min = arr[i + 1];
                }
                if (max < arr[i + 1]) {
                    max = arr[i + 1];
                }
                sum = sum + arr[i];
            }
            avg = sum / (len - 1);
            console.log(min, max, avg);
            if (max <= 60) {
                flag1 = true;
            }
            if (max - min <= 60) {
                flag3 = true;
            }
            if (avg <= 25) {
                flag2 = true;
            }
            //console.log(flag1,flag2,flag3);
            if (flag1 && flag2 && flag3) {
                return true;
            } else {
                return false;
            }
        }
    }
    //在input框输入回车时调用
    MesStation.prototype.SendData = function () {
        $(self.parent.document.getElementsByClassName("mes-search")[0]).focus();
        var MessageID = "MSGID" + parseInt(Math.random() * 99).toString() + Date.now().toString();
        //for (var i = 0; i < this.Inputs.length; i++) {
        //    this.Inputs[i].SetEnable(false);
        //}
        this.ListenStationData(MessageID);
        this.StationJson.ScanLabel = [];    //ScanLabel：checkLabel弹出框标志 gch 2019/4/30
        var station_name = this.StationJson.DisplayName;

        if (station_name == "QRMLOADING_RECEIVE" || station_name == "PCBA-PACKING" || station_name == "PACKING") {
            self.parent.Loading(true);
        }
        
        console.groupCollapsed("工站數據交互-Input：" + this.CurrentInputJson.DisplayName);
        console.time("本次請求用時：");
        console.log("station_send:", { BU: this.BU, Station: this.StationJson, Input: this.CurrentInputJson, ScanType: this.ScanType });
        
        //aoi自動過站添加緩存
        if(station_name == "SFC_LH_AGBU_AOI" && this.CurrentInputJson.DisplayName == "ReadAOITxtFile"){
            var v = this.CurrentInputJson.Value;
            if(v && v != ""){
                var local_aoi_auto_d = JSON.parse(localStorage.getItem("SEND_AOI_AUTO_STATION"));
                var local_aoi_auto_data = local_aoi_auto_d != null ? local_aoi_auto_d : [];
                local_aoi_auto_data.push(v);
                local_aoi_auto_data.length > 300 && local_aoi_auto_data.shift();
                localStorage.setItem("SEND_AOI_AUTO_STATION", JSON.stringify(local_aoi_auto_data));                    
            }
        }


        this.Client.CallFunction(this.InputClassName, this.InputFunctionName, { BU: this.BU, Station: this.StationJson, Input: this.CurrentInputJson, ScanType: this.ScanType }, this.CallBack, MessageID);
    };
    MesStation.prototype.CallBack = function (d) {
        self.parent.Loading(false);
        var station = MesStation.prototype.StationList[d.MessageID];
        delete MesStation.prototype.StationList[d.MessageID];
        station.NewIF(d.Status == "Pass", function () {
            console.log("station_receive:",d);
            console.timeEnd("本次請求用時：");
            console.groupEnd();
            if (d.Data.NextInput) {
                if (station.CurrentInputJson.ID == d.Data.NextInput.ID) {
                    MesStation.prototype.InputIsRepeat = true;
                }
                else {
                    MesStation.prototype.InputIsRepeat = false;
                }
                station.CurrentInputJson = d.Data.NextInput;
            }
            else if (d.Data.NextInput == null) {
                MesStation.prototype.InputIsRepeat = true;
            }
            station.StationJson = d.Data.Station;
            station.Inputs.splice(0, station.Inputs.length);
            station.Outputs.splice(0, station.Outputs.length);
            station.Message.splice(0, station.Message.length);
            station.FailInputs.splice(0, station.FailInputs.length);
            station.Name = d.Data.Station.DisplayName;
            station.StationName = d.Data.Station.StationName;
            for (var i = 0; i < d.Data.Station.Inputs.length; i++) {
                var ip = new StationInput(d.Data.Station.Inputs[i]);
                station.Inputs.push(ip);
            }
            for (var i = 0; i < d.Data.Station.DisplayOutput.length; i++) {
                var op = new StationOutput(d.Data.Station.DisplayOutput[i]);
                station.Outputs.push(op);
            }
            if (d.Data.Station.StationName == "DOC") {   // gch 2108/11/17 add (称重加声音)
                var audioOK = new Audio("../../audio/OK.WAV");
                var audioOK1 = new Audio("../../audio/OK1.WAV");
                var audioERR = new Audio("../../audio/ERR.WAV");
                var audioERR1 = new Audio("../../audio/ERR1.WAV");
                var len = d.Data.Station.StationMessages.length;
                var flag = true;
                for (var i = 0; i < len; i++) {
                    if (d.Data.Station.StationMessages[i].State == 0) {
                        flag = false;
                        break;
                    }
                }
                if (d.Data.NextInput != null) {
                    if (d.Data.NextInput.DisplayName == "SN") {
                        if (flag) {
                            audioOK.play();
                        } else {
                            audioERR.play();
                            var timer = setInterval(function () {
                                if (audioERR.ended) {
                                    audioERR1.play();
                                    clearInterval(timer);
                                }
                            }, 100);
                        }
                    }
                } else {
                    if (flag) {
                        audioOK.play();
                    } else {
                        audioERR.play();
                        var timer = setInterval(function () {
                            if (audioERR.ended) {
                                audioERR1.play();
                                clearInterval(timer);
                            }
                        }, 100);
                    }
                    MesStation.prototype.InputIsRepeat = false;
                    station.CurrentInputJson = d.Data.Station.Inputs[0];
                }
            }
            if (d.Data.Station.FailStation) {
                for (var i = 0; i < d.Data.Station.FailStation.Inputs.length; i++) {
                    var fi = new StationInput(d.Data.Station.FailStation.Inputs[i]);
                    station.FailInputs.push(fi);
                }
            }
            //处理回传信息START ( 2019/6/17 modify by gch  ):
            //后台返回数据的结果：
            //①Pass工站的回传信息全部在Station.StationMessages内
            //②Fail工站的pass回传信息全部在Station.FailStation.StationMessages内，Fail工站的fail回传信息全部在Station.StationMessages内【用于统一处理报错，如错误声音，错误弹出框】
            //③当前操作Fail工站时，不会出现pass信息和fail信息共存的情况，Station.FailStation.StationMessages为空时说明一定报错，有信息一定全部是pass信息。
            //
            //代码逻辑
            //①当工站没有Pass/Fail单选框（代表Pass工站，无Fail工站）时，以 Station.StationMessages 为准，
            //②当工站有Pass/Fail单选框时，操作Pass工站时以Station.StationMessages 为准，操作Fail工站时除特殊工站（如oba工站：Station.FailStation为空，回传信息都在Station.StationMessages中）外以Station.StationMessages和Station.FailStation.StationMessages综合考虑         
            //③如果回传信息全部为pass信息，显示最后一条pass信息
            //④如果回传信息存在fail信息，且fail信息不带有“MSG”字符，则显示回传信息，否则不显示回传信息
            if ($("#toolsite input[name=ScanType]").length > 0) {
                $("#toolsite input[name=ScanType]").each(function (index, ele) {
                    if (ele.checked) {
                        console.log(ele.value);
                        if (ele.value == "Pass") {    //当前操作Pass工站，以Pass工站回传信息为准
                            var mFlag = true;              //标志回传信息是否全部pass
                            var msgs = d.Data.Station.StationMessages;
                            for (var i = 0; i < msgs.length; i++) {
                                if (msgs[i].State == 0) {    //只要是State为0的信息，全部归为fail信息
                                    mFlag = false;
                                    if (!/msg/ig.test(msgs[i].Message)) {    //不包含MSG的显示,否则不显示
                                        var m = new StationMessage(msgs[i]);
                                        station.Message.push(m);
                                        break;
                                    } else {
                                        break;
                                    }
                                }
                            }
                            if (mFlag) {   //全部pass
                                var m = new StationMessage(msgs[msgs.length - 1]);
                                station.Message.push(m);
                            }
                        } else {       //当前操作Fail工站，
                            //console.log(d.Data.Station,d.Data.Station.FailStation == null);
                            var passStationMessage = d.Data.Station.StationMessages;
                            if (d.Data.Station.FailStation != null) {    //正常情况
                                var failStationMessage = d.Data.Station.FailStation.StationMessages;
                                if (failStationMessage.length == 0) {   //一定报错，显示Station.StationMessages中的fail信息
                                    var failMsg = passStationMessage[passStationMessage.length - 1];
                                    for (var i = 0; i < passStationMessage.length; i++) {
                                        if (passStationMessage[i].State == 0) {
                                            if (!/msg/ig.test(passStationMessage[i].Message)) { //不包含msg的显示,否则不显示
                                                var m = new StationMessage(passStationMessage[i]);
                                                station.Message.push(m);
                                                break;
                                            }
                                        }
                                    }
                                } else {    //一定全部为pass信息，显示Station.FailStation.StationMessages的最后一条信息
                                    var m = new StationMessage(failStationMessage[failStationMessage.length - 1]);
                                    station.Message.push(m);
                                }
                            } else {      //特殊情况（oba工站）：有pass/Fail工站选择，但Station.FailStation为空，没有Station.FailStation.StationMessages，回传信息在Station.StationMessages内。
                                //console.log(passStationMessage);
                                //**现在没有特殊情况，已经严格区分了一个工站是否有pass和fail两种扫描情况
                                //var mFlag = true;   //标志回传信息是否全部pass
                                //var msgs = passStationMessage;
                                //for (var i = 0; i < msgs.length; i++) {
                                //    if (msgs[i].State == 0) {
                                //        mFlag = false;
                                //        if (!/msg/ig.test(msgs[i].Message)) {    //不包含msg的显示
                                //            var m = new StationMessage(msgs[i]);
                                //            station.Message.push(m);
                                //            break;
                                //        } else {
                                //            break;
                                //        }
                                //    }
                                //}
                                //if (mFlag) {   //全部pass
                                //    var m = new StationMessage(msgs[msgs.length - 1]);
                                //    station.Message.push(m);
                                //}
                            }
                        }
                    }
                });
            }
            if ($("#toolsite input[name=ScanType]").length == 0) {   //无Fail工站，以Pass工站回传信息为准
                var mFlag = true;   //标志回传信息是否全部pass
                var msgs = d.Data.Station.StationMessages;
                for (var i = 0; i < msgs.length; i++) {
                    if (msgs[i].State == 0) {
                        mFlag = false;
                        if (!/msg/ig.test(msgs[i].Message)) {    //不包含msg的显示
                            var m = new StationMessage(msgs[i]);
                            station.Message.push(m);
                            break;
                        } else {
                            break;
                        }
                    }
                }
                if (mFlag) {   //全部pass
                    var m = new StationMessage(msgs[msgs.length - 1]);
                    station.Message.push(m);
                }
            }
            //显示全部回传信息
            //if ($("input[name=ScanType]").length > 0) {
            //    $("input[name=ScanType]").each(function (index, ele) {
            //        if (ele.checked) {
            //            if (ele.value == "Pass") {    //当前操作Pass工站，以Pass工站回传信息为准
            //                var msgs = d.Data.Station.StationMessages;
            //                for (var i = 0; i < msgs.length; i++) {
            //                    var m = new StationMessage(msgs[i]);
            //                    station.Message.push(m);
            //                }
            //                // modify end
            //            } else {       //当前操作Fail工站，以Fail工站回传信息为准
            //                for (var i = 0; i < d.Data.Station.FailStation.StationMessages.length; i++) {
            //                    var msgs = d.Data.Station.FailStation.StationMessages;
            //                    for (var i = 0; i < msgs.length; i++) {
            //                        var m = new StationMessage(msgs[i]);
            //                        station.Message.push(m);
            //                    }
            //                }
            //            }
            //        }
            //    });
            //}
            //if ($("input[name=ScanType]").length == 0) {   //无Fail工站，以Pass工站回传信息为准
            //    var msgs = d.Data.Station.StationMessages;
            //    for (var i = 0; i < msgs.length; i++) {
            //        var m = new StationMessage(msgs[i]);
            //        station.Message.push(m);
            //    }
            //}
            station.ShowMessage(station.MContainer);
        })(station.TContainer && d.Data.Station.FailStation, function () {
            station.TContainer.find("[name=ScanType]").unbind("change");
            station.TContainer.empty();
            var e = new InputElements(station.Client);
            e.Radio(station.TContainer, "ScanType", "ScanType", "", station.ScanType, ["Pass", "Fail"], "", "", "", station.IScale ? station.IScale : "3:9");
            station.TContainer.find("[name=ScanType]").bind("change", { Station: station }, function (e) {
                e.data.Station.SetScanType($(this).val());
                console.log(e.data.Station.mesUI);
                if (e.data.Station.mesUI) {     //20190820 add by gch
                    e.data.Station.mesUI.SetLanguage("Station");
                }
            });
        })(station.IContainer && !MesStation.prototype.InputIsRepeat, function () {
            station.ShowInputs(station.IContainer);
        })(station.OContainer, function () {
            station.ShowOutputs(station.OContainer, station.TabContainer);
        })(station.mesUI, function () {

            station.mesUI.SetLanguage("Station");
        })(d.Data.Station.LabelPrint.length > 0, d.Data.Station.LabelPrint, function (prop) {
            for (var i = 0; i < prop.length; i++) {
                station.MesHelper.Print(prop[i], function (e) {
                    console.log(e);
                });  //Helper ReadData
            }
        })(d.Data.Station.ScanKP.length > 0, d.Data.Station.ScanKP, function (prop) {
            var ObjectKey = "SKEY" + parseInt(Math.random() * 99).toString() + Date.now().toString();
            MesStation.prototype.StationList[ObjectKey] = station;
            var KPScaner = new StationKeyParts({
                Client: station.Client,                            //station : this
                ObjectKey: ObjectKey,
                SN: station.CurrentInputJson.Value,                //CurrentInputJson : 第一个输入控件（原json信息）的值
                KeyName: station.CurrentInputJson.DisplayName,
                StationName: station.Name,
                WO: prop[0].WO,
                Data: prop[0].SN
            });
            KPScaner.Show();
        })(d.Data.Station.ScanLabel.length > 0, d.Data.Station.ScanLabel, function (prop) {
            var ObjectKey = "SKEY" + parseInt(Math.random() * 99).toString() + Date.now().toString();
            MesStation.prototype.StationList[ObjectKey] = station;
            var KPScaner = new StationCheckLabel({
                Client: station.Client,
                ObjectKey: ObjectKey,
                //SN: station.CurrentInputJson.Value,
                KeyName: station.CurrentInputJson.DisplayName,
                StationName: station.Name,
                WO: prop[0].WO,
                SN: prop[0].SN,
                SKU: prop[0].SKU,
                ListLabel: prop[0].ListLabel
            }, station);
            KPScaner.Show();
            prop = null;
        })(d.Data.Station.ConfirmMessage[0], d.Data.Station.ConfirmMessage[0], function (prop) {
            var ObjectKey = "SKEY" + parseInt(Math.random() * 99).toString() + Date.now().toString();
            MesStation.prototype.StationList[ObjectKey] = station;
            layer.open({                          //确定是否删除?
                title: prop.MessageTitle,
                //btn: ['Confirm', 'Cancel'],
                btn: ['Confirm'],
                content: prop.MessageInfo,
                yes: function (index) {      //确定删除
                    console.log("delete!");
                    CallReScan();
                    layer.closeAll();
                },
                cancel: function () {
                    CallReScan();
                }
                //btn2: function () {
                //    console.log("layer框消失");
                //}

            });
            function CallReScan() {
                var station = MesStation.prototype.StationList[ObjectKey];
                delete MesStation.prototype.StationList[ObjectKey];
                station.SendData();
            }
        })(d.Data.Station.ReadWeight, function () {
            station.MesHelper.ReadData({}, function (e) {
                station.SetInputValue("Weight", e.Data);
                station.SendData();
            });
        })(d.Data.Station.ReadQuackTxt, function () {
            station.MesHelper.ReadTxtListData({}, function (e) {
                station.SetInputValue("ReadTxtFile", e.Data);
                station.SendData();
            });
        })(d.Data.Station.ReadAOITxt, function () {
            //d.Data.Station.ReadAOITxt 标志没用了
            
        })(d.Data.Station.QuackPicture, d.Data.Station.QuackPicture, function (prop) {
            changeImg(prop);
            function changeImg(imgName) {
                var url = "url(../../img/QUACK_PICTURE/" + imgName + ".bmp)";
                //console.log(url);
                $("#Picture .col-xs-12").css({
                    "background": url,
                    "background-size": "100% 100%"
                });
            }
        })(d.Data.Station.Packing_FullCarton_Voice, function () {
            var FullCarton = new Audio("../../audio/FullCarton.WAV");
            FullCarton.play();
        })(d.Data.Station.StationName == "SFC_LH_AGBU_AOI", d.Data.Station.StationMessages, function (prop) {
            // AOI自动过站回传信息全部pass时的逻辑：
            var flag = true;
            $.each(prop, function (index,msg) {
                if(msg.State == 0){
                    flag = false;
                }
            });
            if(flag){    //回传信息全部pass
                //20200415 update by gch (AOI自動過站)
                setTimeout(function (){
                    console.groupCollapsed("請求helper數據");
                    console.time("本次請求用時：");
                    console.log("helper_send: null");
                    station.MesHelper.ReadAOITxtListData({}, function (e) {    //helper抓到的数据e.Data是个数组，且里面只有一个字符串，要么没抓到数据，为空数组！
                        console.log("helper_receive:", e);
                        if(e.Data[0] != undefined){
                            //操作本地緩存
                            var local_aoi_auto_d = JSON.parse(localStorage.getItem("RECEIVE_HELPER_AOI_AUTO"));
                            var local_aoi_auto_data = local_aoi_auto_d != null ? local_aoi_auto_d : [];
                            local_aoi_auto_data.push(e.Data[0]);
                            local_aoi_auto_data.length > 300 && local_aoi_auto_data.shift();
                            localStorage.setItem("RECEIVE_HELPER_AOI_AUTO", JSON.stringify(local_aoi_auto_data));
                            console.timeEnd("本次請求用時：");
                            console.groupEnd();
                            //發送到後臺
                            station.SetInputValue("ReadAOITxtFile", e.Data[0]);
                            station.SendData();     //传测试数据到后台
                        }else{
                            console.timeEnd("本次請求用時：");
                            console.groupEnd();

                            setTimeout(function () {
                                $("#inputsite button")[0].click();
                            }, 3000);
                        }
                    });
                }, 2000);
                // station.MesHelper.ReadAOITxtListData({}, function (e) {    //helper抓到的数据e.Data是个数组，且里面只有一个字符串，要么没抓到数据，为空数组！
                //     console.log("helper_get>>>-----------------------------", e.Data);
                //     if (e.Data.length > 0) {
                //         station.SetInputValue("ReadAOITxtFile", e.Data[0]);
                //         setTimeout(function () {
                //             station.SendData();     //无时间间隔的传测试数据到后台
                //         }, 2000);
                //     } else {   //Helper 未抓到数据，点击【自动过站按钮】继续自动过站
                //         setTimeout(function () {
                //             $("#inputsite button")[0].click();
                //         }, 5000);
                //     }
                // });
            }
            
        })(d.Data.Station.StationMessages.length > 0, d.Data.Station.StationMessages, function (prop) {      //FAIL提示框和声音处理

            // 正常情况：
            // ①：只对 d.Data.Station.StationMessages 有FAIL提示框和声音处理.
            // ②：当回传信息包含有State == 0（fail）的信息，需要弹出该条报错信息，有报错声音提醒，点击确认或扫描‘FAIL’后光标回到报错前状态，等待继续操作.
            // ③：当回传信息全部pass后，有OK声音提醒.
            // 特殊情况：
            // ①：当回传信息有fail信息且该信息包含‘MSG’字符的，无需弹出错误提示框，也无需报错声音。
            // ②：当回传信息是aoi自动过站（工站）传回时，回传信息全部pass时无需OK声音提醒，存在报错信息时暂停过站，弹出错误提示框，需要报错声音提醒，确认报错后继续过站。
            // 20190815 add by gch

            var msgFlag = true;    //是否全部pass
            var audioOK = new Audio("../../audio/OK.WAV");
            var audioOK1 = new Audio("../../audio/OK1.WAV");
            var audioERR = new Audio("../../audio/ERR.WAV");
            var audioERR1 = new Audio("../../audio/ERR1.WAV");
            for (var i = 0; i < prop.length; i++) {
                if (prop[i].State == 0) {     //  && d.Data.Station.StationName != "SFC_LH_AGBU_AOI"  回传信息带有MSG的，不用弹出错误提示框，和报错声音提示
                    msgFlag = false;
                    if (!/MSG/g.test(prop[i].Message)) {        // 回传信息带有MSG的，不用弹出错误提示框，和报错声音提示
                        //加声音
                        audioERR.play();
                        audioERR1.play();
                        var activeE = document.activeElement;
                        swal({
                            title: "Fail",
                            text: prop[i].Message,
                            type: "input",
                            showCancelButton: true,
                            //showConfirmButton:false,
                            closeOnConfirm: false,
                            cancelButtonText: "Close",
                            confirmButtonText: "AutoClose",
                            confirmButtonColor: "#DDD",
                            inputPlaceholder: "请扫描FAIL或点击Close按钮关闭此窗口"
                        }, function (val) {  //输入框回车或点击确认执行，如何判断是回车触发还是点击按钮触发的
                            var _this = this;
                            //console.log(this, val, 1);
                            if (val == "fail" || val == "FAIL") {
                                activeE.focus();
                                this.closeOnConfirm = true;
                            } else {
                                $(".sweet-alert input").val("").focus();
                                //this.doneFunction();
                            }
                            if (d.Data.Station.StationName == "SFC_LH_AGBU_AOI") {    //aoi自动过站fail时暂停自动过站，弹出提示框，确认后继续自动过站
                                //点击继续按钮,继续自动过站
                                setTimeout(function () {
                                    $("#inputsite button")[0].click();
                                }, 500);
                            }
                        });
                        $(".cancel").css({
                            background: "#337ab7",
                        });
                        $(".sweet-alert").css({
                            border: "1px solid red",
                            // boxShadow:"-3px -3px 6px red"
                            //background: "-webkit-linear-gradient(left, red ,#fff,#fff,#fff,#fff,#fff,#fff,red)"
                        });
                        $(".sweet-alert h2").css({
                            color: "#f00"
                        });
                        $(".sweet-alert p").css({
                            fontWeight: "600"
                        });
                        break;
                    }
                }
            }
            if (msgFlag && d.Data.Station.StationName != "SFC_LH_AGBU_AOI") {//加pass声音（aoi自动过站不加pass声音）
                audioOK1.play();
                audioOK.play();
            }
        })(station.OnInit != undefined, function () {
            station.OnInit(d);
        });
        station.SetCurrentInput();

    };

    MesStation.prototype.NewIF = function (F, prop1, prop2, prop3) {    //簡寫 if...else...   20190808 add by gch 
        if (Object.prototype.toString.call(prop1) == '[object Function]') {
            if (F) {
                prop1.call(this);
            } else {
                if (prop2) {
                    if (Object.prototype.toString.call(prop2) == '[object Function]') {
                        prop2.call(this);
                    } else {
                        console.log("第三个参数类型错误，应为函数类型！");
                    }
                }
            }
        } else {
            if (Object.prototype.toString.call(prop2) == '[object Function]') {
                if (F) {
                    prop2.call(this, prop1);
                } else {
                    if (prop3) {
                        if (Object.prototype.toString.call(prop3) == '[object Function]') {
                            prop3.call(this, prop1);
                        } else {
                            console.log("第四个参数类型错误，应为函数类型，也可以不传第四个参数！");
                        }
                    }
                }
            } else {
                console.log("第三个参数类型错误，应为函数类型！");
            }
        }
        return arguments.callee.bind(this);
    }
    this.Init();
};
//处理传来的Inputs内的对象
var StationInput = function (obj) {     //obj:e.Data.Station.Inputs[i] ---> {}
    this.ID = obj.ID;
    this.Name = obj.Name;
    this.Value = obj.Value;
    this.DataForUse = obj.DataForUse;
    this.DisplayName = obj.DisplayName;
    this.DisplayType = obj.DisplayType;
    this.DataSourceAPI = obj.DataSourceAPI == undefined ? "" : obj.DataSourceAPI;
    this.DataSourceAPIPara = obj.DataSourceAPIPara == undefined ? "" : obj.DataSourceAPIPara;
    this.RefershType = obj.RefershType == undefined ? "Default" : obj.RefershType;
    this.ScanFlag = obj.ScanFlag == 1 ? true : false;
    this.Enable = obj.Enable == undefined ? true : obj.Enable;
    this.Visable = obj.Visable == undefined ? true : obj.Visable;
    this.RememberLastInput = obj.RememberLastInput == undefined ? false : obj.RememberLastInput;
    this.MessageID = obj.MessageID;
    StationInput.prototype.constructor = StationInput;
    StationInput.prototype.Show = function (obj) {
        var E = new InputElements(obj.Client);
        var container = obj.Container;
        switch (this.DisplayType) {
            ///////////////////////////////////高超辉2018/10/5改（添加密码框类型控件） ///////////////////////////////////////////////////////////////////

            case "PwdTXT":
                E.PasswordText(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.RefershType, obj.Scale, this.ScanFlag);
                break;

                /////////////////////////////////////////////////////2018/10/9改(添加file框)////////////////////////////////////////////////////////////////////////////////

            case "FileUpload":
                E.File(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.RefershType, obj.Scale)
                break;

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            case "TXT":
                E.Text(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.RefershType, obj.Scale, this.ScanFlag);
                break;
            case "Button":
                E.Button(container, this.Name + "_" + this.ID, this.DisplayName, this.Value, obj.Scale);
                break;
            case "Select":
                E.Select(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.DataForUse, this.DataSourceAPI, this.DataSourceAPIPara, this.RefershType, obj.Scale);
                break;
            case "Checkbox":
                E.Checkbox(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.RefershType, obj.Scale);
                break;
            case "Radio":
                E.Radio(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.DataForUse, this.DataSourceAPI, this.DataSourceAPIPara, this.RefershType, obj.Scale);
                break;
            case "Autocomplete":
                E.Autocomplete(container, this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.DataForUse, this.DataSourceAPI, this.DataSourceAPIPara, this.RefershType, obj.Scale);
                break;
            case "LocalChecker":
                E.LocalChecker(this.Name + "_" + this.ID, this.DisplayName, this.Name, this.Value, this.RefershType, this.MessageID);
                break;
            default:
                container.append("<span>DisplayType " + this.DisplayType + " undefined,input name " + this.Name + "</span>");
                break;
        }
    };
    StationInput.prototype.ClearValue = function () {
        var selector = "#" + this.Name + "_" + this.ID;
        var e = $(selector);
        e.val("");
    };
    StationInput.prototype.SetFocus = function () {
        var selector = "#" + this.Name + "_" + this.ID;
        var e = $(selector);
        if (!MesStation.prototype.InputIsRepeat) {
            e.select();
        }
        e.focus();
    };
    StationInput.prototype.SetEnable = function (flag) {
        var selector = "#" + this.Name + "_" + this.ID;
        var f = (flag == undefined ? this.Enable : flag);
        if (f) {
            $(selector).attr("disabled", false);
        }
        else {
            $(selector).attr("disabled", true);
        }
    };
    StationInput.prototype.SetVisable = function (flag) {
        var selector = "[view-group=" + this.Name + "_" + this.ID + "]";
        var f = (flag == undefined ? this.Visable : flag);
        if (f) {
            $(selector).show();
        }
        else {
            $(selector).hide();
        }
    };
    StationInput.prototype.Remove = function () {
        var selector = "[view-group=" + this.Name + "_" + this.ID + "]";
        $(selector).find("input.form-control,select.form-control").unbind("keypress");
        $(selector).remove();
    };
};

var StationOutput = function (obj) {
    this.Name = obj.Name;
    this.DisplayType = obj.DisplayType;
    this.Value = obj.Value;
    StationOutput.prototype.constructor = StationOutput;
    StationOutput.prototype.Show = function (c, c1, s) {
        var E = new OutputElements();
        switch (this.DisplayType) {
            case "TXT":
                E.Text(c, this.Name, this.Value, s);
                break;
            case "Table":
                if (c1 && c1.length > 0) {
                    E.Table(c1, this.Name, this.Value);
                } else {
                    E.Table(c, this.Name, this.Value);
                }
                break;
            default:
                c.append("<span>DisplayType " + this.DisplayType + " undefined,input name " + this.Name + "</span>");
                break;

        }
    };
    StationOutput.prototype.Remove = function () {
        var selector = "[view-group=" + this.Name + "]";
        if (this.DisplayType == "Table") {
            $("#" + this.Name).bootstrapTable("destroy");
        }
        $(selector).remove();
    };
};

var StationMessage = function (obj) { //
    //console.log(obj);
    this.State = obj.State;
    this.Message = obj.Message;
    StationMessage.prototype.Show = function (Type, o) {   //o : 信息展示区节点（dom）
        //console.log(Type,o);
        var E = new MessageElements();
        if (this.State == 4 && !self.parent.$.MES.DEBUG) {
            return;
        }
        //console.log(o.attr("name"));
        if (o.attr("name") == "btmMsg") {     //特殊：aoi自动过站回传信息展示
            o.html(this.Message);
            switch (this.State) {
                case 0:
                    o.css({
                        color: "red"
                    });
                    break;
                default:
                    o.css({
                        color: "green"
                    });
                    break;
            }

        } else {
            switch (Type) {
                case "Swal":
                    E.Swal(this.Message, this.State, o);
                    break;
                case "Toastr":
                    E.Toastr(this.Message, this.State, o);
                    break;
                default:
                    if (o) {
                        E.Default(this.Message, this.State, o);
                    }
                    break;
            }
        }
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//生成input控件处， 
var InputElements = function (client) {
    this.client = client;
    InputElements.prototype.constructor = InputElements;
    InputElements.prototype.GetData = function (API, APIPara, ID, CallBack) {
        var ClassName = API.substr(0, API.lastIndexOf("."));
        var FunctionName = API.substr(API.lastIndexOf(".") + 1);
        var Params = {};
        var ParamsKey = [];
        var ParamsValeu = [];
        if (APIPara != "") {
            var PTemp1 = APIPara.split(',');
            for (var i = 0; i < PTemp1.length; i++) {
                var PTemp2 = PTemp1[i].split(':');
                ParamsKey.push(PTemp2[0]);
                ParamsValeu.push(PTemp2[1]);
            }
            for (var i = 0; i < ParamsKey.length; i++) {
                if (ParamsValeu[i].indexOf('[') >= 0) {
                    var selector = "[name=" + ParamsValeu[i].substr(1, ParamsValeu[i].length - 2) + "]";
                    Params[ParamsKey[i]] = $(selector).val();
                }
                else {
                    Params[ParamsKey[i]] = ParamsValeu[i];
                }
            }
        }
        this.client.CallFunction(ClassName, FunctionName, Params, CallBack, ID);
    };
    InputElements.prototype.Text = function (c, ID, Label, placeholder, value, RefershType, Scale, ScanFlag) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        //var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\">" + Label + ":" + "</label>");
        var label = $("<label for=\"" + ID + "\"  class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\"    >" + Label + ":" + "</label>");    //添加语言配置功能：2019/6/9 modify by gch 
        //console.log("<label for=\"" + ID + "\"  class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\"    >" + Label + ":" + "</label>");

        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>");
        var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"text\" class=\"form-control\" placeholder=\"" + "" + "\" value=\"" + value + "\" " + (ScanFlag ? "data-scan=\"true\"" : "") + ">");
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
    };

    ///////////////////////////////高超辉2018/10/5改（添加密码框）生成节点处///////////////////////////////////////////////////////////////

    InputElements.prototype.PasswordText = function (c, ID, Label, placeholder, value, RefershType, Scale, ScanFlag) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + ":" + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>");  //$("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"password\" class=\"form-control\" placeholder=\"" + "" + "\" value=\"" + value + "\" " + (ScanFlag ? "data-scan=\"true\"" : "") + ">");
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
    };

    ///////////////////////////////////////2018/10/9改/////////////////////////////////////////////////////////////////////////////////////

    InputElements.prototype.File = function (c, ID, Label, placeholder, value, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + ":" + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>");  // $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        //var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"file\" class=\"form-control\" placeholder=\"" + placeholder + "\" value=\"" + value + "\" " + (ScanFlag ? "data-scan=\"true\"" : "") + ">");

        var input1 = $("<input id = " + ID + " name = " + Label + " type = " + "file" + " class = " + "form-control" + " placeholder = " + "" + " accept=" + ".txt" + "  multiple />");
        //<input id = "ID" name = "Lable" type = "file" class = "form-control" placeholder = "placeholder"  />
        inputD.append(input1);
        div.append(label, inputD);
        c.append(div);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    InputElements.prototype.Button = function (c, ID, Label, value, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + "  control-label text-right\"></label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>"); // $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var btn = $("<button  style='float:right;' class=\" \" id=\"" + ID + "\" name=\"" + Label + "\" value=\"" + value + "\" set-lan=\"html:" + Label + "\">" + Label + "</button>");   //btn btn-primary small
        inputD.append(btn);
        div.append(label, inputD);
        c.append(div);
    };
    InputElements.prototype.Select = function (c, ID, Label, placeholder, value, DataForUse, API, APIPara, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + ":" + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>");  // $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<select id=\"" + ID + "\" name=\"" + Label + "\" class=\"form-control\" placeholder=\"" + "" + "\" aria-describedby=\"basic-addon1\"></select>");
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
        if (RefershType == "Default") {
            input.attr("PreValue", value);
            console.log(API, APIPara, ID);
            this.GetData(API, APIPara, ID, function (e) {
                if (e.Status == "Pass") {
                    var select = $("#" + e.MessageID);
                    select.empty();
                    var value = select.attr("PreValue");
                    for (var i = 0; i < e.Data.length; i++) {
                        var op = $(" <option value=\"" + e.Data[i] + "\" " + (value == e.Data[i] ? "selected" : "") + ">" + e.Data[i] + "</option>");
                        select.append(op);
                    }
                }
            });
        }
        else if (RefershType == "EveryTime") {
            var select = $("#" + ID);
            select.empty();
            for (var x = 0; x < DataForUse.length; x++) {
                var op = $(" <option value=\"" + DataForUse[x] + "\"" + (value == DataForUse[x] ? "selected" : "") + ">" + DataForUse[x] + "</option>");
                select.append(op);
            }
        }
    };
    InputElements.prototype.Checkbox = function (c, ID, Label, placeholder, value, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>"); // $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"checkbox\" class=\"form-control\"" + (value ? "checked" : "") + ">");
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
    };
    InputElements.prototype.Radio = function (c, ID, Label, placeholder, value, DataForUse, API, APIPara, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + ":</label>");
        //var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>"); // $("<div class=" + "col-xs-" + scales[1] + " style="+"margin-top:5px;margin-bottom:6px"+"></div>")
        for (var i = 0; i < DataForUse.length; i++) {
            var labelx = $("<label class=\"radio-inline\"></label>");
            var radio = $("<input type=\"radio\" name=\"" + Label + "\" id=\"" + ID + "_" + i + "\" value=\"" + DataForUse[i] + "\"" + (value == DataForUse[i] ? "checked" : "") + ">");
            labelx.append(radio, DataForUse[i]);
            inputD.append(labelx);
        }
        div.append(label, inputD);
        c.append(div);
        return radio;
    };
    InputElements.prototype.Autocomplete = function (c, ID, Label, placeholder, value, DataForUse, API, APIPara, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " lab control-label text-right\"  set-lan=\"html:" + Label + "\" >" + Label + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + " ctr-wrap" + "\"></div>"); // $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<input class=\"form-control\" name=\"" + Label + "\" id=\"" + ID + "\" value=\"" + value + "\">");
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
        try {
            input.autocomplete("destroy");
        } catch (e) {

        }
        if (RefershType == "Default") {
            input.attr("PreValue", value);
            this.GetData(API, APIPara, ID, function (e) {
                if (e.Status == "Pass") {
                    $("#" + e.MessageID).autocomplete({
                        minLength: 0,
                        source: d.Data,
                        select: function (event, ui) {
                            var e = $.Event("keypress");
                            e.keyCode = 13;
                            $(this).val(ui.item.value);
                            $(this).trigger(e);
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
        }
        else if (RefershType == "EveryTime") {
            $("#" + ID).autocomplete({
                minLength: 0,
                source: DataForUse,
                select: function (event, ui) {
                    var e = $.Event("keypress");
                    e.keyCode = 13;
                    $(this).val(ui.item.value);
                    $(this).trigger(e);
                },
                create: function (event, ui) {
                    $(this).bind("click", function () {
                        var active = $(this).attr("autocomplete"); //没有这一行，鼠标选择选项时，会触发输入的click事件，导致提示框不能关闭    
                        if (active == "off") {
                            $(this).autocomplete("search");
                        }
                    });
                },
                scroll: true,
                scrollHeight: 180,
                position: { my: "right top", at: "right bottom" }
            });
        }
    };
    InputElements.prototype.LocalChecker = function (ID, Label, placeholder, value, RefershType, MessageID) {
        swal({
            title: Label,
            text: placeholder,
            type: "input",
            confirmButtonColor: "#337ab7",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: placeholder
        },
        function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError(placeholder);
                return false;
            }
            if (inputValue !== value) {
                swal.showInputError("The value not match " + value + ",please input again!");
                return false;
            }
            if (inputValue == value) {
                this.client.CallFunction("", "", {}, function (e) { });
            }
        });
    };
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var OutputElements = function () {
    OutputElements.prototype.constructor = OutputElements;
    OutputElements.prototype.Text = function (c, ID, value, Scale) {
        var scales = Scale.split(':');
        var d = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var l = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\" set-lan=\"html:" + ID + "\">" + ID + ":" + "</label>");
        var v = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var p = $("<span id=\"" + ID + "\" class=\"form-control-static\">" + value + "</span>");
        v.append(p);
        d.append(l, v);
        c.append(d);
    };
    OutputElements.prototype.Table = function (c, ID, value) {        // c 输出框父容器 ID：表名 value：表数据
        var tableWarp;
        if (c.attr("id") == "tabContainer") {
            tableWarp = $("<div class='tabWarp col-xs-6' style='margin-bottom:15px; padding:0px; font-size:1.8rem;'><p  set-lan=" + "html:" + ID + ">" + ID + ":" + "</p></div>");
        } else {
            tableWarp = $("<div class='tabWarp col-xs-12' style='margin-bottom:15px; padding:0px; font-size:1.8rem;'><p  set-lan=" + "html:" + ID + ">" + ID + ":" + "</p></div>");
        }
        //var tb = $("<table id=\"" + ID + "\" view-group=\"" + ID + "\"></table>");
        var tb = $("<table id=" + ID + " view-group=" + ID + "></table>");
        if (/fail/ig.test(ID) && /aoi/ig.test(ID)) {    //表名包含(aoi 及 fail )的变红
            tb = $("<table id=" + ID + " view-group=" + ID + " style=" + "color:red" + "></table>");
        }
        tableWarp.append(tb);
        c.append(tableWarp);
        //c.append(tb);
        var col = [];
        if (value.length > 0) {
            for (var item in value[0]) {
                var cell = {
                    field: item,
                    title: item,
                    align: 'center',
                    valign: 'middle',
                    sortable: false
                };
                col.push(cell);
            }
        }

        tb.bootstrapTable({
            pagination: false,
            striped: true,
            height: 340,
            cache: false,
            columns: col,
            data: value
        });
        //console.log(c, tb);
        //if (value.length == 0) {
        //    tb.find("td").text(ID);
        //}
    };
};

var MessageElements = function () {
    MessageElements.prototype.Toastr = function (Message, State, opt) {
        var type = State == 0 ? "error" : (State == 1 ? "success" : (State == 2 ? "info" : (State == 3 ? "warning" : "info")));
        toastr.options = {
            closeButton: opt.closeButton == undefined ? true : opt.closeButton,
            debug: opt.debug == undefined ? false : opt.debug,
            progressBar: opt.progressBar == undefined ? true : opt.progressBar,
            positionClass: opt.positionClass == undefined ? "toast-bottom-right" : opt.positionClass,
            onclick: opt.onclick ? opt.onclick : function () { },
            showDuration: opt.showDuration ? opt.showDuration : 400,
            hideDuration: opt.hideDuration ? opt.hideDuration : 1000,
            timeOut: opt.timeOut ? opt.timeOut : 5000,
            extendedTimeOut: opt.extendedTimeOut ? opt.extendedTimeOut : 6000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }
        toastr[type](Message);
    };
    MessageElements.prototype.Swal = function (Message, State, opt) {
        var type = State == 0 ? "error" : (State == 1 ? "success" : (State == 2 ? "info" : (State == 3 ? "warning" : "info")));
        swal({
            title: type,
            text: Message,
            type: type,
            timer: opt.timer
        });
    };
    MessageElements.prototype.Default = function (Message, State, Container) {
        var DTime = new Date();
        var time = DTime.format("yyyy-MM-dd hh:mm:ss");
        var type = State == 0 ? "error" : (State == 1 ? "success" : (State == 2 ? "info" : (State == 3 ? "warning" : "info")));
        if (Container.find) {
            if (Container.find("tbody").length > 0) {
                Container.find("tbody>tr:gt(200)").remove();
                var n = Container.find("tbody>tr:first>td:first").text();

                var tr = $("<tr class=\"" + type + "\"><td>" + (Number(n) + 1).toString() + "</td><td>" + type + "</td><td>" + Message + "</td><td>" + time + "</td></tr>");
                Container.find("tbody").prepend(tr);
            }
            else {
                var table = $("<table class=\"table table-striped\"></table>");
                var th = $("<thead><tr><th>#</th><th>Type</th><th>Message</th><th>DateTime</th></tr></thead>");
                var tb = $("<tbody></tbody>");
                var tr = $("<tr class=\"" + type + "\"><td>1</td><td>" + type + "</td><td>" + Message + "</td><td>" + time + "</td></tr>");
                tb.append(tr);
                table.append(th);
                table.append(tb);
                Container.empty();
                Container.prepend(table);
            }
        }
    };
};
var StationKeyParts = function (obj) {
    this.ObjectKey = obj.ObjectKey;
    this.KeyName = obj.KeyName;
    this.SN = obj.SN;
    this.WO = obj.WO;
    this.Data = obj.Data;
    this.StationName = obj.StationName;
    StationKeyParts.prototype.constructor = StationKeyParts;
    StationKeyParts.prototype.List = {};
    StationKeyParts.prototype.MyName = function () {
        for (var name in this.global) {
            if (this.global[name] === this) {
                return name;
            }
        }
    };
    StationKeyParts.prototype.CallReScan = function () {
        var station = MesStation.prototype.StationList[this.ObjectKey];
        delete MesStation.prototype.StationList[this.ObjectKey];
        station.SetInputValue(this.KeyName, this.SN);
        station.SendData();
    };
    StationKeyParts.prototype.Show = function () {
        var ObjectKey = "OBJ" + parseInt(Math.random() * 99).toString() + Date.now().toString();
        var URL = 'KeyPart.html?KeyName=' + this.KeyName + '&Data=' + this.Data + '&WO=' + this.WO + '&StationName=' + this.StationName + '&ObjectKey=' + ObjectKey;
        console.log(URL);   //KeyPart.html//CheckLabel.html
        StationKeyParts.prototype.List = {};
        StationKeyParts.prototype.List[ObjectKey] = this;
        layer.open({
            id: this.Serialno,
            type: 2,
            title: "Key Part Scan",
            skin: "demo-class",
            closeBtn: 1,
            shadeClose: false,
            shade: 0.5,
            maxmin: false, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: [URL, 'no'], //iframe的url，no代表不显示滚动条
            success: function (layero, index) {
                console.log(layero, index);
                var lay = layero;    // layNode.parents().eq(1);
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

            },
            cancel: function (index) {
                var Key = layer.getChildFrame("#ObjectKey", index).val();
                var isCancel = layer.getChildFrame("#Flag_IsCancel", index).val();
                if (isCancel == "1") {
                    if (confirm('确定要关闭么')) {
                        layer.close(index);
                    }
                    else {
                        return false;
                    }
                }
                else {
                    var obj = StationKeyParts.prototype.List[Key];
                    delete StationKeyParts.prototype.List[Key];
                    obj.CallReScan();
                }
            }
        });
    };

};

/////////////////////////////////高超辉2018/10/20新增////////////////////////////////////////////////////////////////////////////////////
var StationCheckLabel = function (obj, StationJson) {
    this.ObjectKey = obj.ObjectKey;
    this.KeyName = obj.KeyName;
    this.SN = obj.SN;
    this.WO = obj.WO;
    this.SKU = obj.SKU;
    this.ListLabel = obj.ListLabel;
    //this.Data = obj.Data;
    this.StationName = obj.StationName;
    this.StationJson = StationJson;
    StationCheckLabel.prototype.List = {};
    StationCheckLabel.prototype.MyName = function () {
        for (var name in this.global) {
            if (this.global[name] === this) {
                return name;
            }
        }
    };
    StationCheckLabel.prototype.CallReScan = function () {
        var station = MesStation.prototype.StationList[this.ObjectKey];
        delete MesStation.prototype.StationList[this.ObjectKey];
        station.SetInputValue(this.KeyName, this.SN);
        station.SendData();
    };
    StationCheckLabel.prototype.Show = function () {
        var _this = this;
        //解析ListLabel数组
        var ListLabelLen = this.ListLabel.length;
        var ListLabelKeys = [];
        var ListLabelVals = [];
        for (var i = 0; i < ListLabelLen; i++) {
            for (var prop in this.ListLabel[i]) {
                ListLabelKeys.push(prop);
                ListLabelVals.push(this.ListLabel[i][prop]);
            }
        }
        console.log(ListLabelKeys, ListLabelVals);
        var ObjectKey = "OBJ" + parseInt(Math.random() * 99).toString() + Date.now().toString();
        var ListLabelKeysStr = encodeURI(ListLabelKeys); //add by LLF 2018-12-09 encodeURI 對中文進行編碼
        var URL = 'CheckLabel.html?KeyName=' + this.KeyName + '&SN=' + this.SN + '&WO=' + this.WO + '&StationName=' + this.StationName + '&SKU=' + this.SKU + '&ListLabelKeys=' + ListLabelKeysStr + '&ListLabelVals=' + ListLabelVals + '&ObjectKey=' + ObjectKey;
        console.log(URL);   //KeyPart.html//CheckLabel.html
        StationCheckLabel.prototype.List = {};
        StationCheckLabel.prototype.List[ObjectKey] = this;
        layer.open({
            id: this.Serialno,
            type: 2,
            title: "Check Label",
            skin: "demo-class",
            closeBtn: 1,
            shadeClose: false,
            shade: 0.5,
            maxmin: false, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: [URL, 'no'], //iframe的url，no代表不显示滚动条
            success: function (layero, index) {
                console.log(layero, index);
                var lay = layero;    // layNode.parents().eq(1);
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

            },
            cancel: function (index) {
                var Key = layer.getChildFrame("#ObjectKey", index).val();
                var isCancel = layer.getChildFrame("#Flag_IsCancel", index).val();
                if (isCancel == "1") {
                    layer.close(index);
                    location.reload();
                }
                else {
                    var obj = StationCheckLabel.prototype.List[Key];
                    delete StationCheckLabel.prototype.List[Key];
                    obj.CallReScan();
                }
            }
        });


    };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
