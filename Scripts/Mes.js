//自定义js
client = null;
MesUI = null;

var Loading = function (flag) {
    if (flag) {
        $("#loadingScreen").show();
    }
    else {
        $("#loadingScreen").hide();
    }
};

$(document).ready(function () {
    $("#loadingScreen").show();
    try {
        client = new MesClient(function () {
            MesUI = new MesClientUI(client);
            if (client.Token != null && client.Token != undefined && client.Token != "") {
                ClientInit();
            } else {
                var tk = $.cookie($.MES.CK_TOKEN_NAME);
                if (tk && tk != null && tk != "null") {
                    client.SetToken(tk);
                    client.CheckToken(function (e) {
                        if (e.Status == "Pass") {
                            client.Token = tk;
                            setTimeout(ClientInit, 1000);
                        }
                        else {
                            $("#loadingScreen").hide();
                            $("#LoginLayer").show();
                            $("#wrapper").hide();
                        }
                    });
                } else {
                    $("#LoginLayer").show();
                    $("#loadingScreen").hide();
                    $("#wrapper").hide();
                }
            }
            client.GetBUList(function (e) {
                if (e.Status == "Pass") {
                    for (var i = 0; i < e.Data.length; i++) {
                        if (i == 0 && !$.cookie($.MES.CK_BU_NAME)) {
                            $.cookie($.MES.CK_BU_NAME, e.Data[i]);
                        }
                        var op = $("<option value=\"" + e.Data[i] + "\" " + ($.cookie($.MES.CK_BU_NAME) == e.Data[i] ? "selected" : "") + ">" + e.Data[i] + "</option>");
                        $("#txtBU").append(op);
                    }
                    $("#txtBU").change(function () {
                        $.cookie($.MES.CK_BU_NAME, this.value, { expires: 1, path: '/' });
                    });
                }
                else {
                    swal("Get BU Fail", e.Message, "error");
                }
            });
            client.GetLanguageList(function (event) {
                if (event.Status == "Pass") {
                    if (!$.cookie($.MES.CK_LAN_NAME)) {
                        $.cookie($.MES.CK_LAN_NAME, $.MES.DEFAULT_LAN);
                    }
                    else {
                        $.MES.DEFAULT_LAN = $.cookie($.MES.CK_LAN_NAME);
                    }
                    for (var lan in event.Data) {
                        var op = $("<option value=\"" + event.Data[lan] + "\" " + ($.MES.DEFAULT_LAN == event.Data[lan] ? "selected" : "") + ">" + lan + "</option>");
                        $("#txtLanguage").append(op);
                    }
                    $("#txtLanguage").change(function () {
                        $.cookie($.MES.CK_LAN_NAME, this.value, { expires: 1, path: '/' });
                        MesUI.SetLanguage("INDEX");
                    });
                }
                else {
                    swal("Get Language Fail", event.Message, "error");
                }
            });
            client.GetCodeName(function (e) {
                if(e.Status == "Pass"){
                    var $code = $(".code-img");
                    $code.css({
                        background: "url(../img/ValidCodePicture/" + e.Data + ")",
                        backgroundRepeat:"no-repeat",
                        backgroundSize: "100% 100%"
                    });
                }
            });
        });
    } catch (e) {
        swal("Connetion Fail", e.Message, "error");
    };    
    $("#txtUserName").on("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != "") {                
                $("#txtPassWord").select();
                $("#txtPassWord").focus();
            }
        }
    });
    $("#txtPassWord").on("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != "") {
                $("#txtCode").select();
                $("#txtCode").focus();
            }
        }
    });
    $("#txtCode").on("keypress", function (e) {
        if (e.keyCode == 13) {
            var u = $("#txtUserName").val();
            var p = $("#txtPassWord").val();
            var c = $("#txtCode").val();
            if (u == ""|| p=="") {
                if (u == "") {
                    $("#txtUserName").select();
                    $("#txtUserName").focus();
                }
                else if (p == "") {
                    $("#txtPassWord").select();
                    $("#txtPassWord").focus();
                }
            }
            else {
                $("#loadingScreen").show();
                $("#LoginLayer").hide();
                try {
                    client.Login(u, p, c, function (e) {
                        if (e.Status == "Pass") {
                            setTimeout(ClientInit, 1000);
                        }
                        else {
                            swal({
                                title: "Login Fail",
                                text: e.Message,
                                type: "error"
                            }, function () {
                                $("#txtUserName").select();
                                $("#txtUserName").focus();
                            });
                            $("#LoginLayer").show();
                            $("#loadingScreen").hide();
                        }
                    });
                } catch (e) {
                    swal({
                        title: "Login Fail",
                        text: e.Message,
                        type: "error"
                    }, function () {
                        $("#txtUserName").select();
                        $("#txtUserName").focus();
                    });
                    $("#LoginLayer").show();
                    $("#loadingScreen").hide();
                }
            }
        }
    });

    $(".change-code").on("click", function (e) {
        client.GetCodeName(function (e) {
            console.log(e);
            if(e.Status == "Pass"){
                var $code = $(".code-img");
                $code.css({
                    background: "url(../img/ValidCodePicture/"+ e.Data +")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%"
                });
                console.log($code);
            }
        });
    });
    $("[btn-login=true]").on('click', function (e) {
        $("#loadingScreen").show();
        $("#LoginLayer").hide();
        var u = $("#txtUserName").val();
        var p = $("#txtPassWord").val();
        var c = $("#txtCode").val();
        console.log(u,p,c);
        try {
            client.Login(u, p ,c , function (e) {
                console.log(e,u);
                if (e.Status == "Pass") {
                    setTimeout(ClientInit, 0);
                }
                else {
                    if (e.Data && e.Data.PWDChangeFrequency) {  //需要修改密码
                        swal({
                            type: "warning",
                            title: "Fail",
                            text: "您已经超过" + e.Data.PWDChangeFrequency + "天没修改密码,请修改密码后再登录！"
                        }, function () {
                            //console.log(this);
                            location.href = "PWDManage.html?EMP_NO=" + u ;
                        });
                    } else {
                        swal({
                            title: "Login Fail",
                            text: e.Message,
                            type: "error"
                        }, function () {
                            $("#txtUserName").select();
                            $("#txtUserName").focus();
                        });
                        $("#LoginLayer").show();
                        $("#loadingScreen").hide();
                    }

                }
            });
           
        }
        catch (e) {
            swal({
                    title: "Login Fail",
                    text: e.Message,
                    type: "error"
            }, function () {
                $("#txtUserName").select();
                $("#txtUserName").focus();
            });
            $("#LoginLayer").show();
            $("#loadingScreen").hide();
        }
    });
    $("[btn-logout=true]").on('click', function (e) {    //
        
        $("#wrapper").hide();
        $("#loadingScreen").show();
        $(".change-code").click();

        $("body").attr("class", "img-bg");

        //$("#wrapper").removeClass("win8-bg");
        //$("#wrapper").addClass("win8-bg-login");


        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
            $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
        client.Logout(function (e) {
            try {
                //if (e.Status == "Pass") {
                //    $("#LoginLayer").show();
                //    $("#loadingScreen").hide();
                //    $("#wrapper").hide();
                //}
                //else {
                //    swal("Logout Fail", e.Message, "error");
                //    $("#loadingScreen").hide();
                //    $("#wrapper").show();
                //}
            } catch (e) {

            }
            $.cookie("Token", null);
            $("#LoginLayer").show();
            $("#loadingScreen").hide();
            $("#wrapper").hide();
            $("#NavBlock").empty();
            $("#HiddenBlock").remove();
            /////////////////////////////////////////////////////////////高超辉2018/9/27改
            $("#txtPassWord")[0].value = "";  //密码框置空
            /////////////////////////////////////////////////////////////
            $("#txtUserName").val("");
            $("#txtCode").val("");
        });
    });
});

function ClientInit() {   //登录成功执行
    client.CallFunction("MESStation.GlobalConfig.GetCommonConfig", "DeleteValidCode", {}, function (e) {
        //console.log(e);
    });
    //console.log(112, $("body .win8-bg"));
    $("body").attr("class", "img-bg-login");

    $("#wrapper").removeClass("win8-bg").addClass("win8-bg-login").show();
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    //$("#wrapper").addClass("win8-bg-login");
    $("#LoginLayer").hide();
    $("#loadingScreen").hide();
    //$("#wrapper").show();
    //人员信息
    $("#userName_Show").text(client.UserInfo.EMP_NAME);
    $("#userLevel_Show").text(client.UserInfo.Department + "-" + (client.UserInfo.EMP_LEVEL == 9 ? "管理员" : "作业员"));
    var dbg = $("#debugSetting");
    if ($.MES.DEBUG) {
        dbg.val("on");
    }else {
        dbg.val("off");
    }
    dbg.on("change", function (e,k) {
        if (this.checked) {
            $.MES.DEBUG = true;
        }
        else {
            $.MES.DEBUG = false;
        }
    });
    
    // //菜单初始化
    // //MesUI.Menu($("#NavBlock"));
    $.publish("loadMenu");   //渲染主页入口

    var fav = $("#favoriteSetting");   //收藏标志按钮 2019/05/17 add by gch
    fav.on("change", function () {
        if (this.checked) {
            console.log("open");
            var collection = $(".collection");
            //var favNode = [];
            //var favLen = collection.length / 2;
            //for (var i = 0; i < favLen - 1; i++) {
            //    favNode.push(collection[i]);
            //}
            collection.css("display", "block");
        } else {
            console.log("close");
            var collection = $(".collection");
            //var favNode = [];
            //var favLen = collection.length / 2;
            //for (var i = 0; i < favLen - 1; i++) {
            //    favNode.push(collection[i]);
            //}
            collection.css("display", "none");
        }
    });
    
    //QuickStart
    $('#QuickStartInput').keyup(function (e) {
        $.unsubscribe("QuickStartInputFunction");
        $.subscribe("QuickStartInputFunction", function () {
            var k = $("#QuickStartInput").val();
            if (k != "") {
                MesUI.QuickStart({
                    Container: $("#QuickStart"),
                    Value: k,
                    Fields: [
                        "MENU_NAME",
                        "MENU_DESC"
                    ]
                });
                // 显示QuickStart页面
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == "QuickStartPage") {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });
            }
            else {
                //显示所有

                $(".J_menuTab").each(function () {
                    if ($(this).data('id') == "indexPage") {
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                            scrollToTab(this);
                            // 显示tab对应的内容区
                            $('.J_mainContent .J_iframe').each(function () {
                                if ($(this).data('id') == "indexPage") {
                                    $(this).show().siblings('.J_iframe').hide();
                                    return false;
                                }
                            });
                        } else {
                            $('.J_mainContent .J_iframe').each(function () {
                                if ($(this).data('id') == "indexPage") {
                                    $(this).show().siblings('.J_iframe').hide();
                                    return false;
                                }
                            });
                        }
                        return false;
                    }
                });
            }
        })
        setTimeout(function (e) {
            $.publish("QuickStartInputFunction");
        }, 500);
    });

    //预加载线别数据

    client.GetStationLine(function (e) {
        localStorage.setItem($.MES.CK_LINE_LIST, JSON.stringify(e.Data));
    });
    
    // MetsiMenu
    $('#side-menu').metisMenu();
    // 打开右侧边栏
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });
    // 右侧边栏使用slimscroll
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });
    // Small todo handler
    $('.check-link').click(function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    //固定菜单栏
    $(function () {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
            alwaysVisible: false
        });
    });

    // 菜单切换
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // 侧边栏高度
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();
    $(window).bind("load resize click scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
        MesUI.MenuRezise();
    });

    //侧边栏滚动
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });
    $('.full-height-scroll').slimScroll({
        height: '100%'
    });
    $('#side-menu>li').click(function () {
        if ($('body').hasClass('mini-navbar')) {
            NavToggle();
        }
    });
    $('#side-menu>li li a').click(function () {
        if ($(window).width() < 769) {
            NavToggle();
        }
    });
    $('.nav-close').click(NavToggle);

    //ios浏览器兼容性处理
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $('#content-main').css('overflow-y', 'auto');
    }
};

$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('mini-navbar');
        $('.navbar-static-side').fadeIn();
    }
});

function NavToggle() {
    $('.navbar-minimalize').trigger('click');
};

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        $('#side-menu').removeAttr('style');
    }
};

//主题设置
$(function () {

    // 顶部菜单固定
    $('#fixednavbar').click(function () {
        if ($('#fixednavbar').is(':checked')) {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            $("body").removeClass('boxed-layout');
            $("body").addClass('fixed-nav');
            $('#boxedlayout').prop('checked', false);

            if (localStorageSupport) {
                localStorage.setItem("boxedlayout", 'off');
            }

            if (localStorageSupport) {
                localStorage.setItem("fixednavbar", 'on');
            }
        } else {
            $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
            $("body").removeClass('fixed-nav');

            if (localStorageSupport) {
                localStorage.setItem("fixednavbar", 'off');
            }
        }
    });


    // 收起左侧菜单
    $('#collapsemenu').click(function () {
        if ($('#collapsemenu').is(':checked')) {
            $("body").addClass('mini-navbar');
            SmoothlyMenu();

            if (localStorageSupport) {
                localStorage.setItem("collapse_menu", 'on');
            }

        } else {
            $("body").removeClass('mini-navbar');
            SmoothlyMenu();

            if (localStorageSupport) {
                localStorage.setItem("collapse_menu", 'off');
            }
        }
    });

    if (localStorageSupport) {
        var collapse = localStorage.getItem("collapse_menu");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");

        if (collapse == 'on') {
            $('#collapsemenu').prop('checked', 'checked')
        }
        if (fixednavbar == 'on') {
            $('#fixednavbar').prop('checked', 'checked')
        }
        if (boxedlayout == 'on') {
            $('#boxedlayout').prop('checked', 'checked')
        }
    }

    if (localStorageSupport) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");

        var body = $('body');

        if (collapse == 'on') {
            if (!body.hasClass('body-small')) {
                body.addClass('mini-navbar');
            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }
    }
});

//判断浏览器是否支持html5本地存储
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
};


