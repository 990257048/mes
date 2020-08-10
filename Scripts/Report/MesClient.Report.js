var MesReport = function (o) {
    this.BU = $.cookie($.MES.CK_BU_NAME); //GCH 2018/10/27 ADD
    this.ReportClassName = o.ReportClassName ? o.ReportClassName : "MESReport.Test.TEST1";
    this.InitClassName = o.InitClassName ? o.InitClassName : "MESStation.Report.CallReport";
    this.InitFunctionName = o.InitFunctionName ? o.InitFunctionName : "GetReport";
    this.RunClassName = o.InitClassName ? o.InitClassName : "MESStation.Report.CallReport";
    this.RunFunctionName = o.InitFunctionName ? o.InitFunctionName : "RunReport";
    this.InputClassName = o.InitClassName ? o.InitClassName : "MESStation.Report.CallReport";
    this.InputFunctionName = o.InitFunctionName ? o.InitFunctionName : "RunReport";
    this.Client = o.Client;
    this.UI = o.UI;   //2019/05/10 GCH ADD
    this.ReportJson = null;
    this.Report = null;
    this.OnInit = o.Init;
    this.IScale = o.IScale;
    this.IContainer = o.IContainer;
    this.OContainer = o.OContainer;
    MesReport.prototype.constructor = MesReport;
    MesReport.prototype.ObjList = {};
    MesReport.prototype.Init = function () {
        MesReport.prototype.StationList = {};
        var MessageID = "MSGID" + parseInt(Math.random() * 99).toString() + Date.now().toString();
        this.ListenStationData(MessageID);
        //console.log({ BU: this.BU, ClassName: this.ReportClassName });
        this.Client.CallFunction(this.InitClassName, this.InitFunctionName, { BU: this.BU, ClassName: this.ReportClassName }, this.InitCallBack, MessageID);
    };
    MesReport.prototype.ListenStationData = function (k) {
        MesReport.prototype.ObjList[k] = this;
    };
    MesReport.prototype.InitCallBack = function (d) {
        //console.log(d);
        var _Mes = MesReport.prototype.ObjList[d.MessageID];      //MesReport.prototype.ObjList[d.MessageID]的值为this， this的所有属性及方法全复制到 _Mes对象 中
        delete MesReport.prototype.ObjList[d.MessageID];             //MesReport.prototype.ObjList[d.MessageID]置空，与 _Mes对象 断绝关系 
        //console.log(_Mes);
        if (d.Status == "Pass") {
            //console.log(d);
            _Mes.ReportJson = d.Data;
            _Mes.Report = new Report(d.Data);                           //至此，_Mes对象中包含 this 的所有属性， MesReport.prototype 的所有属性（放在 __proto__ 属性中），接受的数据 d，以及 Report 的实例
            //console.log(_Mes);
            if (_Mes.IContainer) {
                _Mes.ShowInputs(_Mes.IContainer);                      // show 出所有input控件

            }
            if (_Mes.OContainer) {
                _Mes.ShowOutputs(_Mes.OContainer);
            }
            if (_Mes.OnInit != undefined) {
                _Mes.OnInit(d);
            }
            _Mes.UI.SetLanguage("ReportTest");
        }
        else {
            swal("error", d.Message, "error");
        }
    };
    MesReport.prototype.SetInputValue = function (Name, value) {
        for (var i = 0; i < this.Report.Inputs.length; i++) {
            if (this.Report.Inputs[i].Name == Name) {
                this.Report.Inputs[i].Value = value;
                this.ReportJson.Inputs[i].Value = value;
            }
        }
    };
    MesReport.prototype.ShowInput = function (obj) {
        for (var i = 0; i < this.Inputs.length; i++) {
            if (this.Report.Inputs[i].DisplayName == obj.InputName) {
                obj.Container.find("input.form-control").unbind("keyup");
                obj.Container.find("select.form-control").unbind("change");
                this.Report.Inputs[i].Remove();
                this.Report.Inputs[i].Show({ Client: this.Client, Container: obj.Container, Scale: (obj.Scale == undefined ? (this.IScale == undefined ? "3:9" : this.IScale) : obj.Scale) });
                this.Report.Inputs[i].SetEnable();
                obj.Container.find("input.form-control:not(.datepicker)").bind("keyup", { Report: this }, function (event) {
                    event.data.Report.SetInputValue(this.name, this.value);
                    event.data.Report.InputPostBack();
                });
                obj.Container.find("input.form-control.datepicker").bind("change", { Report: this }, function (event) {
                    event.data.Report.SetInputValue(this.name, this.value);
                    event.data.Report.InputPostBack();
                });
                obj.Container.find("select.form-control").bind("change", { Report: this }, function (event) {
                    event.data.Report.SetInputValue(this.name, this.value);
                    event.data.Report.InputPostBack();
                });
                break;
            }
        }
    };
    MesReport.prototype.ShowInputs = function (Container) {   //Container : input框父容器
        //this 包含了第一次传来的数据 及 Report的实例 ***
        Container.find("input.form-control").unbind("keyup");
        Container.find("select.form-control").unbind("change");
        for (var i = 0; i < this.Report.Inputs.length; i++) {     //遍历input控件对象（ReportInput的实例）集合
            this.Report.Inputs[i].Remove();
            this.Report.Inputs[i].Show({ Client: this.Client, Container: Container, Scale: (this.IScale == undefined ? "3:9" : this.IScale) });
            this.Report.Inputs[i].SetEnable();
        }
        Container.find("input.form-control").bind("keyup", { Report: this }, function (event) {                       //普通input框
            event.data.Report.SetInputValue(this.name, this.value);
            event.data.Report.InputPostBack();
        });
        Container.find("input.form-control.datepicker").bind("change", { Report: this }, function (event) {       //特殊input框
            event.data.Report.SetInputValue(this.name, this.value);
            event.data.Report.InputPostBack();
        });
        Container.find("select.form-control").bind("change", { Report: this }, function (event) {                      //下拉框
            event.data.Report.SetInputValue(this.name, this.value);
            event.data.Report.InputPostBack();
        });
    };
    MesReport.prototype.ShowOutput = function (obj) {
        obj.Container.find(".J_menuItem").off("click");
        for (var i = 0; i < this.Report.Outputs.length; i++) {
            if (this.Report.Outputs[i].Name == obj.OutputName) {
                this.Report.Outputs[i].Remove();
                this.Report.Outputs[i].Show(obj.Container);
                break;
            }
        }
        obj.Container.find(".J_menuItem").on("click", OnLinkClick);
    };
    MesReport.prototype.ShowOutputs = function (Container) {
        Container.find(".J_menuItem").off("click");
        Container.empty();
        for (var i = 0; i < this.Report.Outputs.length; i++) {
            if (this.Report.Outputs[i].OutputType != "ReportAlart")
                this.Report.Outputs[i].Remove();
            this.Report.Outputs[i].Show(Container, (this.OScale == undefined ? "3:9" : this.OScale));
        }
        //全部图表加载完毕
        Container.find(".J_menuItem").on("click", OnLinkClick);


    };
    MesReport.prototype.InputPostBack = function () {
    };
    MesReport.prototype.InputCallBack = function (d) {
    };
    MesReport.prototype.Run = function () {      //点击提交按钮执行
        self.parent.Loading(true);
        var MessageID = "MSGID" + parseInt(Math.random() * 99).toString() + Date.now().toString();
        this.ListenStationData(MessageID);
        this.Client.CallFunction(this.RunClassName, this.RunFunctionName, { BU: this.BU, ClassName: this.ReportClassName, Report: this.ReportJson }, this.CallBack.bind(this), MessageID);  //this.ReportJson : 在MesReport.prototype.InitCallBack 中被赋值为当时传来的数据 d.Data 

    };
    MesReport.prototype.CallBack = function (d) {
        //剔除无用属性  20190803 modify by gch  
        $.each(d.Data.Outputs, function (index, reportO) {
            if (reportO.OutputType == "ReportTable") {
                $.each(reportO.Rows, function (index, rowO) {
                    for (var field in rowO) {
                        delete rowO[field]["CellStyle"];
                        delete rowO[field]["ColSpan"];
                        delete rowO[field]["FontStyle"];
                        delete rowO[field]["OutputType"];
                        delete rowO[field]["RowSpan"];
                    }
                });
            }
        });
        console.log(d);



        var _Mes = MesReport.prototype.ObjList[d.MessageID];
        delete MesReport.prototype.ObjList[d.MessageID];
        if (d.Status == "Pass") {
            _Mes.ReportJson = d.Data;
            _Mes.Report = new Report(d.Data);
        }
        if (_Mes.IContainer) {
            _Mes.ShowInputs(_Mes.IContainer);
        }
        if (_Mes.OContainer) {
            _Mes.ShowOutputs(_Mes.OContainer);
        }
        //多语言配置 2019/05/10 gch add
        //console.log(this.UI.SetLanguage);
        this.UI.SetLanguage("ReportTest", function (e) {
            //console.log(e);
            //20190801 modify by gch (加载新表头内容【在旧表头配置中英文完成后执行】,滚动条事件绑定【与表头同步】,页面比例变化同步)

            runFixedTitle();

            //window.onresize = throttle(function (e) {  //改变页面比例自动对齐表头（未生效，原因不明）
            //    console.log(1);
            //    $(".fixed-table-body").each(function (index) {
            //        (function (tb, tit) {
            //            console.log(tb,tit);
            //            changeTitleWidth(tb.find("tr").eq(0), tit);
            //        })($(this), $(this).parent().find(".tit"));
            //    });
            //}, 100);

            function throttle(fn, delay) {
                var timer;
                return function () {
                    var _this = this;
                    var args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn.apply(_this, args);
                    }, delay);
                }
            }

        });
        self.parent.Loading(false);
    };
    MesReport.prototype.initStyleSelect = function () {
        var styleValues = getCookie("messtylename");
        if (styleValues != null)
            StyleChange(styleValues);
        var c = $("#StyleSelect");
        var s1 = $("<button type=\"button\" class=\"btn btn-default\" id=\"Stylelabel\">Style</button>");
        var s2 = $(" <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <span class=\"sr-only\">Toggle Dropdown</span></button>");
        c.append(s1, s2);
        var o = $(" <ul id=\"ss\" class=\"dropdown-menu badge-primary selected-row\">  </ul>");
        c.append(o);
        var sbtn = $("#ss");
        for (x in themes) {
            var l = $(" <li><a href=\"#\" data-theme=\"" + x + "\" class=\"theme-link\">" + x + "</a> </li>");
            sbtn.append(l);
        }
        themesheet.appendTo('head');
        $('.theme-link').click(function () {
            StyleChange($(this).attr('data-theme'));
        });
    };
    this.Init();
};

var Report = function (obj) {     //在InitCallBack中实例化  obj：传来的数据 e.Data
    this.Inputs = [];                 //实例化ReportInput集合
    this.Outputs = [];
    this.Sqls = {};
    this.RunSqls = [];
    this.LayoutRows = obj.LayoutRows;
    this.LayoutCols = obj.LayoutCols;
    this.Inputs.splice(0, this.Inputs.length);
    this.Outputs.splice(0, this.Outputs.length);
    for (var i = 0; i < obj.Inputs.length; i++) {
        var ip = new ReportInput(obj.Inputs[i]);
        this.Inputs.push(ip);
    }
    for (var i = 0; i < obj.Outputs.length; i++) {
        var op = new ReportOutput(obj.Outputs[i]);

        this.Outputs.push(op);
    }
    Report.prototype.constructor = Report;
};
var ReportInput = function (obj) {    //在Report中实例化 obj：一个input控件对象
    this.InputType = obj.InputType;
    this.Label = obj.Label; //用于复选框(2018/11/28 add)
    this.CheckedFlag = obj.CheckedFlag; //用于复选框(2018/11/28 add)
    this.Name = obj.Name;
    this.Value = obj.Value;
    this.ValueForUse = obj.ValueForUse;
    this.Enable = obj.Enable == undefined ? true : obj.Enable;
    this.SendChangeEvent = obj.SendChangeEvent == undefined ? true : obj.SendChangeEvent;
    this.RememberLastInput = obj.RememberLastInput == undefined ? false : obj.RememberLastInput;
    this.MessageID = obj.MessageID;
    ReportInput.prototype.constructor = ReportInput;
    ReportInput.prototype.Show = function (obj) {    //在 MesReport.prototype.ShowInputs 中执行
        var E = new InputElements(obj.Client);
        var container = obj.Container;
        switch (this.InputType) {
            case "TXT":
                E.Text(container, this.Name, this.Name, this.Name, this.Value, this.RefershType, obj.Scale);
                break;
            case "Select":
                E.Select(container, this.Name, this.Name, this.Name, this.Value, this.ValueForUse, obj.Scale);
                break;
            case "DateTime":
                //E.Text(container, this.Name, this.Name, this.Name, this.Value, this.RefershType, obj.Scale);
                E.DataTimeText(container, this.Name, this.Name, this.Name, this.Value, this.RefershType, obj.Scale);
                break;
            case "CheckBox":  //GCH 2108/11/27 ADD (添加复选框控件)
                E.Checkbox(container, this.Value, this.Name, this.Label, this.Name, this.Value, this.CheckedFlag, this.RefershType, obj.Scale);
                break;
            default:

        }
    };
    ReportInput.prototype.SetFocus = function () {
        var selector = "#" + this.Name + "_" + this.ID;
        $(selector).select();
        $(selector).focus();
    };
    ReportInput.prototype.SetEnable = function (flag) {    // GCH 2018/11/9 update (控件交互与不交互异常)
        //var selector = "#" + this.Name + "_" + this.ID;
        var selector = "#" + this.Name;
        var f = (flag == undefined ? this.Enable : flag);
        //console.log($(selector),f);
        if (f) {
            $(selector).removeAttr("disabled");
        }
        else {
            $(selector).attr("disabled", "disabled");
        }
    };
    ReportInput.prototype.Remove = function () {
        var selector = "[view-group=" + this.Name + "]";
        $(selector).find("input.form-control,select.form-control").unbind("keypress");
        $(selector).remove();
    };
};

var ReportOutput = function (obj) {    //obj : e.Data.Outputs[i] 代表一个图表对象（如：表对象，包括title：表名 Rows：表数据）
    console.log(obj);
    this.OutputType = obj.OutputType;
    this.Tittle = obj.Tittle;
    this.TableRow = obj.Rows;    //如：表数据
    this.TableColNames = obj.ColNames;
    this.ChartData = obj;
    this.ColCount = obj.ColCount;
    this.ColNum = obj.ColNum;
    this.RowNun = obj.RowNun;
    this.FixHight = obj.FixHight;
    this.FixColNum = obj.FixColNum;
    ReportOutput.prototype.constructor = ReportOutput;
    ReportOutput.prototype.Show = function (c, s) {

        var E = new OutputElements();
        switch (this.OutputType) {
            case "ReportChart":
                E.Chart(c, this.Tittle, this.ChartData, s);
                break;
            case "ReportTable":

                E.Table(c, this.Tittle.replace(" ", ""), this.TableRow, this.TableColNames, this.FixHight, this.FixColNum);
                break;
            case "ReportAlart":
                E.Alart(c, obj.Msg, obj.AlartType);
                break;
            default:
                c.append("<span>DisplayType " + this.DisplayType + " undefined,input name " + this.Name + "</span>");
                break;

        }
    };
    ReportOutput.prototype.Remove = function () {
        this.Tittle == "" ? this.Tittle = "未定義Tittle" : this.Tittle;
        var selector = "[view-group=" + this.Tittle.replace(/\s/g, "") + "]";
        if (this.OutputType == "ReportTable") {
            $("#" + this.Tittle.replace(/\s/g, "")).bootstrapTable("destroy");
        }
        $(selector).remove();
    };
};
var InputElements = function (client) {
    this.client = client;
    InputElements.prototype.constructor = InputElements;
    InputElements.prototype.GetData = function (API, APIPara, ID, CallBack) {
        var ClassName = API.substr(0, API.lastIndexOf("."));
        var FunctionName = API.substr(API.lastIndexOf(".") + 1);
        var Params = {};
        var ParamsKey = [];
        var ParamsValeu = [];
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
        this.client.CallFunction(ClassName, FunctionName, Params, CallBack, ID);
    };
    InputElements.prototype.Text = function (c, ID, Label, placeholder, value, RefershType, Scale, ScanFlag) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\" " + (ScanFlag ? "data-scan=\"true\"" : "") + ">" + Label + ":" + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"text\" class=\"form-control\" placeholder=\"" + placeholder + "\" value=\"" + value + "\">");
        label.attr("set-lan", "html:" + ID);
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
    };
    InputElements.prototype.DataTimeText = function (c, ID, Label, placeholder, value, RefershType, Scale, ScanFlag) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\" " + (ScanFlag ? "data-scan=\"true\"" : "") + ">" + Label + ":" + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        //var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"text\" class=\"form-control\" placeholder=\"" + placeholder + "\" value=\"" + value + "\">");
        var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"text\" class=\"form-control datepicker\" value=\"" + value + "\" data-date-format=\"yyyy-mm-dd hh:ii:ss\">");
        //var input = $("<input type=\"text\" value=\"2012-05-15 21:05\" id=\"datetimepicker\" data-date-format=\"yyyy-mm-dd hh:ii\">");
        label.attr("set-lan", "html:" + ID);
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
        var datatimetext = $("#" + ID);
        datatimetext.datetimepicker().on('changeDate', function (ev) {
            //$("#"+ID). ev.date.format("yyyy-MM-dd hh:mm:ss");
        });
    };
    InputElements.prototype.Select = function (c, ID, Label, placeholder, value, DataForUse, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\">" + Label + ":</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<select id=\"" + ID + "\" name=\"" + Label + "\" class=\"form-control\" placeholder=\"" + placeholder + "\" aria-describedby=\"basic-addon1\"></select>");
        label.attr("set-lan", "html:" + ID);
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);
        var select = $("#" + ID);
        select.empty();
        for (var x = 0; x < DataForUse.length; x++) {
            var op = $(" <option value=\"" + DataForUse[x] + "\"" + (value == DataForUse[x] ? "selected" : "") + ">" + DataForUse[x] + "</option>");
            select.append(op);
        }
    };

    InputElements.prototype.Checkbox = function (c, ID, Name, Label, placeholder, value, checkedFlag, RefershType, Scale) {  //GCH 2108/11/27 UPDATE (生成复选框节点处)
        var scales = Scale.split(':');

        //var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        //var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\">" + Label + "</label>");
        //var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        //var input = $("<input id=\"" + ID + "\" name=\"" + Label + "\"  type=\"checkbox\" class=\"form-control\"" + (value ? "checked" : "") + ">");
        //inputD.append(input);
        //div.append(label, inputD);
        //c.append(div);
        var checkedFlag;
        if (checkedFlag) {
            checkedFlag = "checked";
        } else {
            checkedFlag = "unchecked";
        }


        var div = $("<div class=" + "form-group" + " view-group=" + ID + "></div>");
        var label = $("<label for=" + ID + " class=" + "col-xs-" + scales[0] + " control-label text-right" + ">" + Label + "</label>");
        var inputD = $("<div class=" + "col-xs-" + scales[1] + "></div>");
        var input = $("<input id=" + ID + " name=" + Name + " type=" + "checkbox" + " class=" + "form-control" + " value=" + value + " " + checkedFlag + " />");
        label.attr("set-lan", "html:" + ID);
        inputD.append(input);
        div.append(label, inputD);
        c.append(div);

    };
    InputElements.prototype.Radio = function (c, ID, Label, placeholder, value, DataForUse, API, APIPara, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\">" + Label + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var DataForUse = [];//get data 
        for (var i = 0; i < DataForUse.length; i++) {
            var label = $("<label class=\"radio-inline\"></label>");
            var radio = $("<input type=\"radio\" name=\"" + Label + "\" id=\"" + ID + "_" + i + "\"" + (value == DataForUse[i] ? "checked" : "") + ">");
            label.append(radio, DataForUse[i]);
            inputD.append(label);
        }
        label.attr("set-lan", "html:" + ID);
        div.append(label, inputD);
        c.append(div);
    };
    InputElements.prototype.Autocomplete = function (c, ID, Label, placeholder, value, DataForUse, API, APIPara, RefershType, Scale) {
        var scales = Scale.split(':');
        var div = $("<div class=\"form-group\" view-group=\"" + ID + "\"></div>");
        var label = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\">" + Label + "</label>");
        var inputD = $("<div class=\"col-xs-" + scales[1] + "\"></div>");
        var input = $("<input class=\"form-control\" name=\"" + Label + "\" id=\"" + ID + "\" value=\"" + value + "\">");
        label.attr("set-lan", "html:" + ID);
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
                            $(this).autocomplete("search", "");
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
            showCancelButton: true,
            confirmButtonColor: "#337ab7",
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

var pieChart = function (c, ID, ChartData) {
    c.highcharts({
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: ChartData.Title
        },
        colors: ['#337ab7', 'green', '#8bbc21', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        subtitle: {
            text: ChartData.SubTitle
        },
        series: ChartData.ChartDatas
    });
}
var lineChart = function (c, ID, ChartData) {
    var plot = [];
    var xAxis = [];
    var seriesdata = ChartData.ChartDatas;
    var charttypes = ChartData.ChartDatas[0].type;
    //X軸非時間類型ChartData.Plot.type == 1
    if (ChartData.Plot.type == 1) {
        xAxis = {
            labels: {
                overflow: 'justify'
            },
            title: {
                text: ChartData.XAxis.Title
            }
        };
        plot = {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: ChartData.Plot.pointStartIntdata
            }
        }
    }
        //X軸是時間類型
    else if (ChartData.Plot.type == 0) {
        xAxis = {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            },
            title: {
                text: ChartData.XAxis.Title
            }
        };
        //給定初始值類型ChartData.Plot.pointStartDateTime != "0001-01-01 00:00:00"
        if (ChartData.Plot.pointStartDateTime != "0001-01-01 00:00:00") {
            plot = {
                charttypes: {
                    dataLabels: {
                        enabled: true          // 开启数据标签

                    },
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: ChartData.Plot.pointInterval,
                    pointStart: new Date(ChartData.Plot.pointStartDateTime).getTime()
                }
            }
        }
            //鍵值類型;
        else {
            plot = {
                charttypes: {
                    dataLabels: {
                        enabled: true          // 开启数据标签

                    },
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    }
                }
            }
            var datainfo = [];
            for (var i = 0; i < ChartData.ChartDatas[0].data.length; i++) {
                var dataitem = [new Date(ChartData.ChartDatas[0].data[i][0]).getTime(), ChartData.ChartDatas[0].data[i][1]];
                datainfo.push(dataitem);
            }
            seriesdata[0].data = datainfo;
        }
    };

    c.highcharts({
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: ChartData.Title
        },
        xAxis: xAxis,
        yAxis: {
            title: {
                text: ChartData.YAxis.Title
            }
        },
        colors: ['#337ab7', 'green', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        tooltip: {
            //valueSuffix: ChartData.Tooltip
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        plotOptions: plot,
        subtitle: {
            text: ChartData.SubTitle
        },
        series: seriesdata
    });
}
var columnChart = function (c, ID, ChartData) {
    c.highcharts({
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: ChartData.Title
        },
        colors: ['#337ab7', 'green', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: {
            labels: {
                overflow: 'justify'
            },
            title: {
                text: ChartData.XAxis.Title
            }
        },
        yAxis: {
            title: {
                text: ChartData.YAxis.Title
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}' + ChartData.Tooltip + '</b> of total<br/>'
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },
        subtitle: {
            text: ChartData.SubTitle
        },
        series: ChartData.ChartDatas
    });
}


var OutputElements = function () {
    OutputElements.prototype.constructor = OutputElements;
    OutputElements.prototype.Chart = function (c, ID, ChartData, Scale) {
        var scales = Scale.split(':');
        var d = $("<div class=\"form-group panel panel-default\" view-group=\"" + ID + "\"></div>");
        //var l = $("<label for=\"" + ID + "\" class=\"col-xs-" + scales[0] + " control-label text-right\">" + ID + ":" + "</label>");
        var ctb_title = $("<div class=\"panel-heading\"><h3 class=\"panel-title\"><b style='font-size:22px; '>" + ID + "</b></h3></div>");
        var ctb_body = $("<div class=\"panel-body\"></div>");
        var p = $("<u id=\"" + ID + "\" class=\"form-control-static\"></u>");
        ctb_body.append(p);
        d.append(ctb_title, ctb_body);
        c.append(d);
        switch (ChartData.Type) {
            case "pieChart":
                pieChart(ctb_body, ID, ChartData);
                break;
            case "lineChart":
                lineChart(ctb_body, ID, ChartData);
                break;
            case "columnChart":
                columnChart(ctb_body, ID, ChartData);
                break;
            default: break;
        }
    };
    OutputElements.prototype.Alart = function (c, Msg, ObjType) {
        swal({
            title: "",
            text: Msg,
            confirmButtonColor: "#337ab7",
            type: ObjType
        }, function () { $(".SearchBox").toggle(); }
         );
    };
    OutputElements.prototype.Table = function (c, ID, RowsData, ColData, FixHight, FixColNum) {   //RowsData: e.Data.Outputs[i].Rows 表数据(数组)
        var ctb = $("<div class=\"panel panel-default\" style=\"margin-bottom:0px;\"></div>");
        var ctb_title;
        //console.log(ID);
        if (ID != "未定義Tittle") {
            ctb_title = $("<div class=\"panel-heading\"><h3 class=\"panel-title\"><b style='font-size:22px;'>" + ID + "</b><b set-lan='html:SearchResult' style='font-size:22px;'> 查询结果 :</b></h3></div>");
        } else {
            ctb_title = $("<div></div>");
        }

        var ctb_body = $("<div class=\"panel-body\" style=\"position:relative;padding-top:0px; padding-bottom:0px\" ></div>");
        var tb = $("<table id=\"" + ID + "\" view-group=\"" + ID + "\" class=\"table table-condensed\"  data-search=\"true\" data-show-toggle=\"true\" data-show-columns=\"true\" style=\"font-size:1.9rem;\" ></table>");
        //console.log(tb);
        //生成新的表头（新表头内容在旧表头配置中英文完成后填充） 20190802 add by gch
        var tit = $("<div class='tit'></div>");
        tit.css({
            position: "absolute",
            top: "0px",
            width: "100%",
            height: "52px",
            zIndex: "1",
            fontSize: "2.2rem !importent",
            fontWeight: "600",
            marginRight: "20px",
            //backgroundColor: "#337ab7",
            overflow: "hidden"
        });
        tb.append(tit);

        ctb_body.append(tb);
        ctb.append(ctb_title);
        ctb.append(ctb_body);
        c.append(ctb);

        //var c_h = c.css("height");
        //var t_h = ctb_title.css("height");
        var tb_h = Number(c.css("height").replace("px", "")) - Number(ctb_title.css("height").replace("px", "")) - 130;   //整屏高度
        tb_h = FixHight == true ? tb_h : null;    //後臺決定是否定高

        //console.log(tb_h, FixHight);
        var col = [];
        if (RowsData.length > 0) {
            var row = RowsData[0];
            col.push({     //添加序号 gch 2019/5/14 add
                field: "Number",
                title: "<label set-lan=" + "html:" + "Number" + ">" + "序號" + "</label>",// item,  
                align: 'left',
                valign: 'middle',
                sortable: false,
                switchable: true,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            });
            for (var item in row) {
                if (ColData.Contain(item)) {
                    var cell = {
                        field: item,
                        title: "<label set-lan=" + "html:" + item + ">" + item + "</label>",// item,  
                        align: 'left',
                        valign: 'middle',
                        sortable: false,
                        switchable: true,
                        formatter: function (value, row, index) {
                            var res = "";
                            switch (value.LinkType) {
                                case "Report":
                                    res = '<a class="J_menuItem" data-index="' + value.Value + '" href="javascript:;" url="/FunctionPage/Report/Report.html?ClassName=' + value.LinkData + '&Data=' + value.Value + '&RunFlag=1">' + value.Value + '</a>';
                                    break;
                                case "Link":
                                    res = '<a class="J_menuItem" data-index="' + value.Value + '" href="javascript:;" url="' + value.LinkData + '">' + value.Value + '</a>';
                                    break;
                                default:
                                    res = value.Value;
                            }
                            return res;
                        },
                        //CalcRowspan: function (value, row, index) {
                        //    return 'rowspan="' + value.RowSpan + '"';
                        //},
                        //CalcColspan: function (value, row, index) {
                        //    return 'colspan="' + value.ColSpan + '"';
                        //},
                        //cellStyle: function (value, row, index, field) {
                        //    if (value.RowSpan == 0 || value.ColSpan == 0) {
                        //        return {
                        //            css: {
                        //                display: "none"
                        //            }
                        //        }
                        //    } else {
                        //        return {
                        //            css: {
                        //                backgroundColor: "",
                        //                color: ""
                        //            }
                        //        };
                        //    }
                        //}
                    };
                    col.push(cell);
                }
            };
        };
        tb.bootstrapTable('destroy').bootstrapTable({
            //tb.bootstrapTable({
            pagination: true,
            striped: false,  //背景颜色相间
            cache: false,
            //fixedColumns: true, 
            //fixedNumber: 1, //固定列数
            height: tb_h,// tb_h,
            columns: col,
            data: RowsData,
            pageSize: 50,
            pageList: [50, 100, 200, 500, 1000, 2000, 5000],
            sidePagination: "client",
            onPageChange: function (number, size) {
                c.find(".J_menuItem").on("click", OnLinkClick);
                tb.find("td").css({
                    whiteSpace: "nowrap"   //不换行
                });
                changeTitleWidth(tb.find("tbody tr").eq(0), tit);
                if (FixColNum > 0 && tb_h) {
                    runFixedCol(tb.parent(), FixColNum, tb_h);
                }
            },
            onToggle: function (cardView) {
                c.find(".J_menuItem").on("click", OnLinkClick);
                tb.find("td").css({
                    whitespace: "nowrap",
                });
                changeTitleWidth(tb.find("tbody tr").eq(0), tit);
                if (FixColNum > 0 && tb_h) {
                    runFixedCol(tb.parent(), FixColNum, tb_h);
                }
            },
            onSearch: function (a,b) {
                //console.log(this, a, b);
                changeTitleWidth(tb.find("tbody tr").eq(0), tit);
                if (FixColNum > 0 && tb_h) {
                    runFixedCol(tb.parent(), FixColNum, tb_h);
                }
            },
            showExport: true,
            exportDataType: "all"
        });
        //console.log(tb.parent());    //当前$(".fixed-table-body")
        tb.find("td").css({
            whiteSpace: "nowrap",
        });
        setTimeout(function () {
            if (FixColNum > 0 && tb_h) {
                runFixedCol(tb.parent(), FixColNum, tb_h);
            }
        }, 0)
        
    };

};

var runFixedCol = function ($view,num,h) {    //(固定表格列 20190827 add by gch )num:要固定的列数 h：可视区高度
    var w = 0;
    var wArr = [];
    var $table = $view.find("tbody");

    $view.find(".fixed-box").remove();     //删除上一次的固定表身可视区
    $view.find(".tit .fixed-tit").remove();        //删除上一次的固定表头可视区

    $( Array.prototype.slice.call($table.find("tr").eq(0).find("td"), 0, num) ).each(function (index, td) {    //计算固定各列宽集合及总列宽
        var width = Number($(this).css("width").replace("px", ""));
        w += width;
        wArr.push(width);
    });

    var fixedBox = $("<div class='fixed-box'></div>");  //生成固定的可视区
    fixedBox.css({
        width: w + 'px',
        height: h - 15 - 47 + 'px',   //去掉表头，滚动条高度
        //backgroundColor: 'red',
        position: 'absolute',
        top: '47px',   //表头高度
        left: '0',
        overflow:'hidden'
    });
    var $trs = $table.find("tr");

    var colH = 0;         //表格每行高度（非常精确）
    if ($trs.length > 1) {
        colH = Number(getComputedStyle($trs[1]).height.replace("px", "")) + 0.02; //0.02 调误差（用计算属性算出表格每行高度（精确），再根据实际情况微调，保证每行同高）
    } else {
        if ($trs.find("td").length >= num) {       //兼容筛选情况（当查询到一条数据时，需要用到第一行表表高度，不能用计算属性）
            colH = Number($trs.eq(0).css("height").replace("px", ""));
        } else {    //兼容筛选情况（当没有查询到数据时，不需要定列，直接结束此函数）
            console.log("search null");
            return;
        }
    }
    
    var h = $trs.length * colH;     //计算表格总高

    var fixedContain = $("<div class='fixed-contain'></div>");   //填充固定可视区（固定的表格的容器）
    fixedContain.css({
        width: w + 'px',     //固定列总列宽
        height: h + 'px',     //表格总高
        background: '#fff', // 'linear-gradient(#fff,#000)',
        position:'absolute'
    });

    $trs.each(function (index, tr) {     //填充表格
        var fixedCol = $("<div></div>");     //填充表格行
        fixedCol.css({
            width:w + 'px',        //总列宽
            height: colH + 'px',     //每行表格高度
            whiteSpace: "nowrap",
            //boxSizing: 'border-box',
            //border: '1px solid #000'
        });
        (function (tr, fixedCol) {   //填充每行表格的每个单元格
            $.each(wArr, function (i, wid) {
                var fixedColTd = $("<div>" + $(tr).find("td").eq(i).text() + "</div>");
                fixedColTd.css({
                    width: wid + 'px',
                    height: '100%',
                    lineHeight: colH + 'px',
                    float: 'left',
                    boxSizing: 'border-box',
                    padding:'0px 10px',
                    border: '1px solid #ddd',
                    borderLeft: 'none',
                    borderTop:'none', 
                });
                fixedCol.append(fixedColTd);    //向每行表格塞入每个单元格
            });
        })(tr, fixedCol);
        fixedContain.append(fixedCol);    //向表格容器塞入每行表格
    });
    fixedBox.append(fixedContain);   //向固定可视区塞入表格容器
    $view.append(fixedBox);     //向总表可视区塞入固定可视区

    //固定title列
    var tit = $view.find(".tit");    //表头可视区
    var titC = $view.find(".vtit .tit-f");  //表头容器
    var titH = 52;
    var fixedTit = $("<div class='fixed-tit'></div>");
    fixedTit.css({
        width: w + 'px',
        height: titH + 'px',
        position: 'absolute',
        top: '0',
        left: '0',
        background:'red'
    });
    $.each(wArr, function (index,wid) {
        var fixedTh = $("<div class='fixed-th'>" + titC.eq(index).text() + "</div>");
        fixedTh.css({
            width: wid + 'px',
            height: '100%',
            float:'left',
            lineHeight: '52px',
            padding: "0px 8px",
            fontSize: "1.9rem",
            fontWeight: "600",
            boxSizing:'border-box',
            border: '1px solid #aaa',
            borderTop: 'none',
            borderLeft: 'none',
            background:'#ddd'
        });
        fixedTit.append(fixedTh);
    });
    tit.append(fixedTit);
}

var changeTitleWidth = function (tr, tit) {   //换页改变宽度
    tr.find("td").each(function (index) {
        tit.find(".tit-f").eq(index).css("width", getComputedStyle(this).width);
        
    });
}

var runFixedTitle = function () {
    $(".fixed-table-body").each(function () {   //表格可视区（包含滚动条的所有表格组件）
        (function (ele, tit) {
            var vtit = $("<div class='vtit'></div>");
            vtit.css({
                width: "5000px",
                height: "100%",
                backgroundColor: "#ddd",
                position: "relative",
            });
            var th = $(ele).find("thead tr th");
            $(ele).find("tbody tr").eq(0).find("td").each(function (index, td) {
                var titF = $("<div class='tit-f'>" + th.eq(index).text() + "</div>");
                titF.css({
                    width: getComputedStyle(td).width, // $(td).css("width"),
                    height: "100%",
                    lineHeight: "50px",
                    borderRight: "1px solid #aaa",
                    borderBottom: "1px solid #aaa",
                    padding: "0px 8px",
                    fontSize: "1.9rem",
                    fontWeight: "600",
                    backgroundColor: "#ddd",
                    whiteSpace: "nowrap",
                    float: "left"
                });
                vtit.append(titF);
            });
            tit.append(vtit);
            ele.onscroll = function (e) {
                var le = ele.scrollLeft;
                var t = ele.scrollTop;
                //console.log(e, tit, ele.scrollLeft);
                tit.find(".vtit").css("left", -le + "px");
                $(ele).find(".fixed-box").find(".fixed-contain").css("top", - t + 1 + 'px');
            }
        })(this, $(this).parent().find(".tit"));
    });
}

var setHeight = function (fn) {     //設置高度(目前没用)
    fn(getClientHeight());
    window.onresize = throttle(function (e) {
        //console.log(this, e, fn(getClientHeight()));
        fn(getClientHeight());
    }, 50);
    function throttle(fn, delay) {
        var timer;
        return function () {
            var _this = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(_this, args);
            }, delay);
        }
    }
    function getClientHeight() {
        var size = [];
        size.push(self.parent.document.documentElement.clientWidth);
        size.push(self.parent.document.documentElement.clientHeight);
        return size;
    }
}

var OnLinkClick = function (e) {
    // 获取标识数据
    self.parent.$.publishMoreTime("add_iframe", {
        name: $.trim($(this).text() + "_Report"),
        url: $(this).attr('url')
    });
    //console.log("click link", $.publishMoreTime);
    

    //var dataUrl = $(this).attr('url'),
    //    dataIndex = $(this).data('index'),    //取得该元素的 data-index 属性值
    //    menuName = $.trim($(this).text() + "_Report"),
    //    flag = true;
    ////2019/5/15 gch debug
    ////console.log($(self.parent.document).find(".J_menuTab"), self.parent.window.scrollToTab);

    //if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;


    //$(self.parent.document).find(".J_menuTab").each(function () {     //遍历所有的选项卡
    //    if ($(this).data('id') == dataUrl) {  // 选项卡菜单已存在
    //        if (!$(this).hasClass('active')) {    //当前选项卡处于未打开状态
    //            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');    //$(this).siblings('.J_menuTab')  ： 除当前元素的其他所有同级元素
    //            self.parent.window.scrollToTab(this);
    //            // 显示tab对应的内容区
    //            $(self.parent.document).find('.J_mainContent .J_iframe').each(function () {   //遍历所有的 iframe
    //                if ($(this).data('id') == dataUrl) {   //匹配到符合该选项卡的 iframe
    //                    $(this).show().siblings('.J_iframe').hide();    //显示该 iframe ,隐藏其他的
    //                    return false;
    //                }
    //            });
    //        }
    //        flag = false;
    //        return false;
    //    }
    //});

    //// 选项卡菜单不存在或链接地址为空
    //if (flag) {
    //    $(self.parent.document).find('.J_iframe').hide();
    //    var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
    //    $(self.parent.document).find('.J_menuTab').removeClass('active');
    //    // 添加选项卡对应的iframe
    //    var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
    //    $(self.parent.document).find('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
    //    // 添加选项卡
    //    $(self.parent.document).find('.J_menuTabs .page-tabs-content').append(str);
    //    self.parent.window.scrollToTab($(self.parent.document).find('.J_menuTab.active'));
    //}
    //return false;
};



//Cookie-function-start
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
};
//Cookie-function-end
var themes = {
    //"default": "../../css/plugins/bootstrapTable/bootstrap-table.min.css",
    //"cerulean": "../../css/plugins/bootswatch/bootstrap.min.cerulean.css",
    "cosmo": "../../css/plugins/bootswatch/bootstrap.min.cosmo.css",
    "cyborg": "../../css/plugins/bootswatch/bootstrap.min.cyborg.css",
    "Darkly": "../../css/plugins/bootswatch/bootstrap.min.Darkly.css",
    "Journal": "../../css/plugins/bootswatch/bootstrap.min.Journal.css",
    //"Litera": "../../css/plugins/bootswatch/bootstrap.min.Litera.css",
    "Lumen": "../../css/plugins/bootswatch/bootstrap.min.Lumen.css",
    "LUX": "../../css/plugins/bootswatch/bootstrap.min.LUX.css",
    //"Minty": "../../css/plugins/bootswatch/bootstrap.min.Minty.css",
    "Pulse": "../../css/plugins/bootswatch/bootstrap.min.Pulse.css",
    //"Sandsto": "../../css/plugins/bootswatch/bootstrap.min.Sandstone.css",
    "Simplex": "../../css/plugins/bootswatch/bootstrap.min.Simplex.css",
    "Sketchy": "../../css/plugins/bootswatch/bootstrap.min.Sketchy.css",
    "Slate": "../../css/plugins/bootswatch/bootstrap.min.Slate.css",
    //"Solar": "../../css/plugins/bootswatch/bootstrap.min.Solar.css",
    //"Spacela": "../../css/plugins/bootswatch/bootstrap.min.Spacelab.css",
    //"Superhe": "../../css/plugins/bootswatch/bootstrap.min.Superhero.css",
    "United": "../../css/plugins/bootswatch/bootstrap.min.United.css",
    "Yeti": "../../css/plugins/bootswatch/bootstrap.min.Yeti.css",
    "Flatly": "../../css/plugins/bootswatch/bootstrap.min.Flatly.css"
};
var themesheet = $('<link href="' + themes['default'] + '" rel="stylesheet" />');

function initStyleSelect() {

    var styleValues = getCookie("messtylename");
    var c = $("#StyleSelect");
    var s1 = $("<button type=\"button\" class=\"btn btn-default\" id=\"StyleLabel\">Style</button>");
    var s2 = $(" <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <span class=\"sr-only\">Toggle Dropdown</span></button>");
    c.append(s1, s2);
    var o = $(" <ul id=\"ss\" class=\"dropdown-menu badge-primary selected-row\">  </ul>");
    c.append(o);
    var sbtn = $("#ss");
    for (x in themes) {
        var l = $(" <li><a href=\"#\" data-theme=\"" + x + "\" class=\"theme-link\">" + x + "</a> </li>");
        sbtn.append(l);
    }
    themesheet.appendTo('head');
    $('.theme-link').click(function () {
        StyleChange($(this).attr('data-theme'));
        //var themeurl = themes[$(this).attr('data-theme')];
        //themesheet.attr('href', themeurl);
    });
    if (styleValues != null)
        StyleChange(styleValues);
    else
        StyleChange("Flatly");
}

function StyleChange(obj) {
    var themeurl = themes[obj];
    themesheet.attr('href', themeurl);
    var stylevalue = getCookie("messtylename");
    if (stylevalue != obj)
        setCookie("messtylename", obj, "d30");
    var stylelabel = $("#StyleLabel");
    stylelabel[0].innerHTML = obj;
    //switch (obj) {
    //case "锐利":
    //    var ca = $("#" + obj);
    //    removeTheme(obj);
    //    //addTheme("../../css/testcss/TableStyleTest_TableA.css", "锐利");
    //    addTheme("../../css/plugins/bootswatch/bootstrap.min.Darkly.css", "锐利");
    //    break;
    //case "柔和":
    //    removeTheme(obj);
    //    //addTheme("../../css/testcss/TableStyleTest_TableB.css", "柔和");
    //    addTheme("../../css/plugins/bootswatch/bootstrap.min.cosmo.css", "锐利");
    //    break;
    //default: break;
    //}
}

// 添加主题 --换另种方法

function addTheme(cssurl, themeid) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.id = themeid;  // 加上id方便后面好查找到进行删除
    link.rel = 'stylesheet';
    link.href = cssurl;
    document.getElementsByTagName("head")[0].appendChild(link);
    //save;
    var stylevalue = getCookie("messtylename");
    if (stylevalue != themeid)
        setCookie("messtylename", themeid, "d30");
}
// 删主题--换另种方法

function removeTheme(themeid) {
    $('#' + themeid).remove();
}