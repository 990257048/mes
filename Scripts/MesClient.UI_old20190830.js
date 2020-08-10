var MesClientUI = function (client) {
    this.client = client;
    MesClientUI.prototype.SetLanguage = function (Page_Name,fun) {   //fun：用于配置中英文后的操作 20190802 modify by gch  (查询报表配置中英文有调用)
        var lan = $.cookie($.MES.CK_LAN_NAME);
        var PCKN = lan + "_" + Page_Name;
        this.client.GetLanguage(lan, Page_Name, function (event) {
            if (event.Status == "Pass") {
                var data = event.Data;
                $('[set-lan]').each(function () {
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
                if(fun){
                    fun(data);
                }
            }
            else {
                swal("Get language fail", event.Message, "error");
            }
        });
    };



    MesClientUI.prototype.MenuRezise = function () {
        var maxheight = 0;
        var li = $("#NavBlock .navblockShow>li>a>span.glyphicon-class");
        for (var i = 0; i < li.length; i++) {
            if (maxheight <= li.eq(i).height()) {
                maxheight = li.eq(i).height();
            }
        }
        $("#NavBlock .navblockShow>li").css('height', parseInt(maxheight + 91) + 'px');
    };
    MesClientUI.prototype.Menu = function (c) {      //登录成功，生成菜单   2019/05/07 Modify by gch(菜单整改)  
        var _this = this;
        var allMenuTip = {};
        function MenuMake(n, c, d) {
            //console.log(d);
            var ul = $("<ul class=\"bs-glyphicons-list " + (n == "0" ? " navblockShow" : " navblockHidden") + "\" data-navid=\"" + n + "\"></ul>");
            for (var i = 0; i < d.length; i++) {
                var li = $("<li style=\"background:" + d[i].STYLE_NAME + "; position:relative; \"></li>");
                var a;
                var span1;
                if (/glyphicon/g.test(d[i].CLASS_NAME)) {
                    span1 = $("<span class=\"glyphicon glyphicon-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                }
                if (/fa/g.test(d[i].CLASS_NAME)) {
                    span1 = $("<span class=\"fa fa-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                }

                var span2 = $("<span class=\"glyphicon-class\" set-lan=" + "html:" + d[i].MENU_NAME.replace(/\b (\w)/g, function ($, $1) { return $1.toUpperCase() }) + ">" + d[i].MENU_NAME + "</span>");     //20190507 modify by gch
                //if (d[i].MENU_ITEM.length > 0) {   //父级模块
                if (d[i].PAGE_PATH == "#") {
                    a = $("<a href=\"#\" class=\"J_menuParent\"></a>");
                    a.append(span1);
                    a.append(span2);
                    li.append(a);
                    MenuMake(d[i].ID, li, d[i].MENU_ITEM);
                }
                else {         //该模块是个页面
                    a = $("<a href=\"" + (d[i].PAGE_PATH ? d[i].PAGE_PATH : "FunctionPage/404.html") + "\" class=\"J_menuItem\" " + (d[i].PAGE_PATH ? "data-index=\"" + d[i].MENU_NAME + "\"" : "") + "></a>");
                    //加收藏按钮
                    var ii = $("<i class='collection glyphicon glyphicon-heart ' style='position:absolute; top:2%; right:4%; width:20px; height:20px; font-size:20px; cursor:pointer; z-index:10000; '></i>");
                    if (d[i].FavoriteFlag) {
                        //ii.css("color", "red");
                        ii.attr("favorite",true);
                    } else {
                        ii.attr("favorite", false);
                        //ii.css("color", "#ddd");
                    }
                    li.append(ii);
                    a.append(span1);
                    a.append(span2);
                    li.append(a);
                }
                ul.append(li);
            }
            c.append(ul);
        };
        function menuItem() {
            // 获取标识数据
            var dataUrl = $(this).attr('href'),
                dataIndex = $(this).data('index'),
                menuName = $.trim($(this).text()),
                flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;

            // 选项卡菜单已存在
            $('.J_menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                        scrollToTab(this);
                        // 显示tab对应的内容区
                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.J_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });

            // 选项卡菜单不存在
            if (flag) {
                $('.J_iframe').hide();
                var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
                $('.J_menuTab').removeClass('active');
                // 添加选项卡对应的iframe
                var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
                // 添加选项卡
                $('.J_menuTabs .page-tabs-content').append(str);
                scrollToTab($('.J_menuTab.active'));
            }
            //改子页面比例
            return false;
        };
        function menuShowItem() {   //打开父级菜单执行  2019/05/20 modify by gch (添加菜单的实时性)
            //$("#NavBlock") 菜单的容器
            //this.nextElementSibling 该父级菜单下的所有菜单（ul结构）
            //this.nextElementSibling.outerHTML 变字符串
            //this.parentElement.parentNode  与该父级菜单同级的所有菜单（ul 结构）
            //console.log($(this.nextElementSibling), $("#NavBlock"), this.nextElementSibling, this.nextElementSibling.outerHTML, this.parentElement.parentNode);   // this.nextElementSibling.outerHTML
            
            //旧的

            //$(this.nextElementSibling).removeClass('navblockHidden');
            //$(this.nextElementSibling).addClass('bs-glyphicons-list');
            //$(this.nextElementSibling).addClass('navblockShow');
            //$("#NavBlock").attr('data-parent', this.parentElement.parentNode.getAttribute('data-navid'));
            //$("#NavBlock").html(this.nextElementSibling.outerHTML);
            //$('#NavBlock').children('.navblockHidden').remove();
            //menuTip($(".J_menuItem"), $('.J_menuParent'), allMenuTip);    //菜单提示
            //addEvent();           //收藏按钮绑定事件
            //$('.J_menuItem').on('click', menuItem);
            //$('.J_menuParent').on('click', menuShowItem);
            //MesClientUI.prototype.MenuRezise();

            //新的
            //1.打开父级菜单  [更新當前位置]
            //2.根据该父级菜单的MENU_NAME(set-lan属性)获取该父级菜单下的所有直接子模块的配置数据（[]）
            //3.根据子模块的配置数据生成子模块的html结构（li,li,li...）
            //3.把原来的ul（用来装子模块结构的）置空，替换成新生成的子模块结构。
            //4.显示子模块
            //5.重新配置语言
            //6.添加菜单提示
            //7.收藏按钮绑定事件
            //8.根据是否开启收藏功能控制收藏按钮的显隐性

            var __this = this;
            //更新當前位置
            //var menuText = $(this).find("span").eq(1).text();
            //var icon = $(this).find("span").eq(0).attr("class");
            ////console.log(icon);
            //var position = $("#position");
            //var i = $("<i> > </i>");
            //var b;
            //if(/glyphicon-lg/.test(icon)){
            //    icon = icon.replace(/glyphicon-lg/g, "");
            //    b = $("<b class=\"" + icon + "\">" + " " + "</b>");
            //}
            //if (/fa-lg/.test(icon)) {
            //    icon = icon.replace(/fa-lg/g, "");
            //    b = $("<b class=\"" + icon + "\">" + " " + "</b>");
            //}
            //b.css({
            //    paddingRight:"8px"
            //});
            //var s = $("<span>" + menuText + "</span>");
            //position.append(i,b,s);

            var menuName = $(this).find("span").eq(1).attr("set-lan").split(":")[1];
            var menu_son_ul = $(this.nextElementSibling);
            //var sons_id = menu_son_ul.attr("data-navid");
            menu_son_ul.html("");
            _this.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", { MENU_NAME: menuName }, function (e) {
                //console.log(e);
                if (e.Status == "Pass") {
                    //更新當前位置
                    var menuText = $(__this).find("span").eq(1).text();
                    var icon = $(__this).find("span").eq(0).attr("class");
                    //console.log(icon);
                    var position = $("#position");
                    var i = $("<i> > </i>");
                    var b;
                    if (/glyphicon-lg/.test(icon)) {
                        icon = icon.replace(/glyphicon-lg/g, "");
                        b = $("<b class=\"" + icon + "\">" + " " + "</b>");
                    }
                    if (/fa-lg/.test(icon)) {
                        icon = icon.replace(/fa-lg/g, "");
                        b = $("<b class=\"" + icon + "\">" + " " + "</b>");
                    }
                    b.css({
                        paddingRight: "8px"
                    });
                    var s = $("<span>" + menuText + "</span>");
                    position.append(i, b, s);



                    var wrap = $("<div></div>");
                    var menu_son_li;
                    MenuMake(0, wrap, e.Data);
                    //替换掉该父级菜单下的所有子节点（li结构），相当于替换了所有的子模块
                    menu_son_li = wrap.find("ul").children();    //新的子级模块（li结构）
                    menu_son_ul.append(menu_son_li);
                    ///////////-----原有的start-----///////////
                    menu_son_ul.removeClass('navblockHidden');
                    menu_son_ul.addClass('bs-glyphicons-list');
                    menu_son_ul.addClass('navblockShow');
                    $("#NavBlock").attr('data-parent', __this.parentElement.parentNode.getAttribute('data-navid'));
                    $("#NavBlock").html(__this.nextElementSibling.outerHTML);
                    $('#NavBlock').children('.navblockHidden').remove();
                    setLanguage("menu", $('#NavBlock'));                  //重新配置语言
                    menuTip($(".J_menuItem"), $('.J_menuParent'), allMenuTip);    //菜单提示
                    addEvent();           //收藏按钮绑定事件
                    //console.log($("#favoriteSetting")[0].checked);    //是否开启收藏功能
                    //默认显示收藏按钮
                    if (!$("#favoriteSetting")[0].checked) {      //未开启收藏功能
                        $(".collection").css("display","none");    //隐藏收藏按钮
                    }
                    $('.J_menuItem').on('click', menuItem);
                    $('.J_menuParent').on('click', menuShowItem);
                    MesClientUI.prototype.MenuRezise();
                    ///////////-----原有的end-----///////////
                }
            });
            
        };
        function turnback() {   //点击返回按钮执行
            //console.log($("#NavBlock"));
            var position_con = $("#position").children();
            console.log($("#position"));
            if (position_con.length > 2) {
                $("#position span").last().remove();
                $("#position b").last().remove();
                $("#position i").last().remove();
            }
            var parentid = $("#NavBlock").attr('data-parent');   
            var ul = $("div.hidden ul[data-navid='" + parentid + "']");
            $("#NavBlock").html(ul[0].outerHTML);            //ul[0]: 上一级（点击返回按钮后）的所有模块（ul > li,li,li...） 
            $('#NavBlock').children().removeClass('navblockHidden');
            $('#NavBlock').children().addClass('bs-glyphicons-list');
            $('#NavBlock').children().addClass('navblockShow');
            if (parentid != "root") {
                $("#NavBlock").attr('data-parent', ul.parent().parent().attr('data-navid'));
            }
            $('#NavBlock').children('.navblockHidden').remove();

            _this.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetSubMenu", { MENU_NAME: parentid }, function (e) {  //如果parentid是0要返回所有主菜单配置数据
                if (e.Status == "Pass") {
                    //console.log(e.Data);
                    var currentPage_lis = $("#NavBlock.NavBlock").eq(0).children().children();
                    $.each(e.Data, function (index,liO) {
                        if (liO["PAGE_PATH"] != "#") {      //该模块是个页面
                            var favorite = currentPage_lis.eq(index).find("i");
                            //console.log(currentPage_lis.eq(index).find("i"), currentPage_lis.eq(index).find("i").attr("favorite"));
                            if (liO["FavoriteFlag"]) {
                                if (favorite.attr("favorite") == "false") {
                                    favorite.attr("favorite", true);
                                }
                            } else {
                                if (favorite.attr("favorite") == "true") {
                                    favorite.attr("favorite", false);
                                }
                            }
                        }
                    });
                    //-------------end-------------//
                }
            });


            setLanguage("menu", $('#NavBlock'));                  //重新配置语言
            menuTip($(".J_menuItem"), $('.J_menuParent'), allMenuTip);
            addEvent();
            if (!$("#favoriteSetting")[0].checked) {      //未开启收藏功能
                $(".collection").css("display", "none");    //隐藏收藏按钮
            }
            $('.J_menuItem').on('click', menuItem);
            $('.J_menuParent').on('click', menuShowItem);
            MesClientUI.prototype.MenuRezise();
            setLanguage("menu", c);
        };
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
        function menuTip($1, $2,Tips) {
            var allMenu = $1;
            [].push.apply(allMenu, $2);
            var timer;   
            //var allMenu = [].concat.apply($(".J_menuItem"), $('.J_menuParent'));   //concat不行
            //console.log($(allMenu));
            $(allMenu).on("mouseenter", function () {
                var _this = this;
                //console.log($(_this).find("span").eq(1).attr("set-lan"));
                var tip = Tips[$(_this).find("span").eq(1).attr("set-lan") ? $(_this).find("span").eq(1).attr("set-lan").split(":")[1] : "notMenu"];
                //console.log($(_this).find("span").eq(1).attr("set-lan").split(":")[1],Tips);
                timer = setTimeout(function () {
                    if (tip == undefined) {
                        createTip("undefined");
                    } else {
                        createTip(tip);
                    }
                },1000);
                function createTip(tipMsg) {
                    var len = tipMsg.length;
                    var showContent = "<p style='line-height:33px;'> " + tipMsg + "</p>";
                    layerIndex = layer.open({
                        type: 4,
                        title: "tip",
                        skin: "layui-layer-lan",
                        content: [showContent, $(_this)],   //CheckLabel.html
                        area: [len * 26 + 30 + "px", '40px'], //['80%', '80%']
                    });
                }
            });
            $(allMenu).on("mouseleave", function () {
                //console.log("mouseout");
                if(timer != undefined){
                    clearTimeout(timer);
                }
                layer.closeAll();
            });
        }
        function addEvent() {   //收藏按钮绑定事件
            $('.collection').off('click');
            $('.collection').on('click', function () {
                var setLanName = $(this).parents("li").find("span").eq(1).attr("set-lan").split(":")[1];
                var emp_no = _this.client.UserInfo.EMP_NO;
                var __this = this;
                if ($(__this).attr("favorite") == "true") {    //if (this.style.color == "red") {
                    _this.client.CallFunction("MESStation.Config.FavoriteMenuConfig", "EditFavoriteMenu", { EMP_NO: emp_no, MENU_NAME: setLanName, EDIT_FLAG: 0 }, function (e) {
                        if(e.Status == "Pass"){ // Pass
                            //$(__this).css("color", "#ddd");
                            $(__this).attr("favorite", false);
                        }
                    });
                } else {
                    _this.client.CallFunction("MESStation.Config.FavoriteMenuConfig", "EditFavoriteMenu", { EMP_NO: emp_no, MENU_NAME: setLanName, EDIT_FLAG: 1 }, function (e) {
                        if (e.Status == "Pass") { // Pass
                            //console.log($(__this));
                            //$(__this).css("color", "red");
                            $(__this).attr("favorite", true);
                        }
                    });
                }
            });
        }
        this.client.GetMenu(function (e) {
            if (e.Status == "Pass") {
                if (Storage != undefined) {
                    localStorage.MenuData = JSON.stringify(e.Data);
                }
                //console.log(e.Data);
                MenuMake("0", c, e.Data);
                //favInit();
                //function favInit() {   //默认关闭收藏功能
                //    console.log($("#favoriteSetting"));
                //    $(".collection").css("display", "none");
                //    $("#favoriteSetting").val("off");
                //}
                var h = $("<div id=\"HiddenBlock\" class=\"hidden\"></div>");
                h.html(c[0].outerHTML);
                c.after(h);
                //通过遍历给菜单项加上data-index属性
                $(".J_menuItem").each(function (index) {
                    if (!$(this).attr('data-index')) {
                        $(this).attr('data-index', index);
                    }
                });
                //配置多语言
                setLanguage("menu", c);
                //获取菜单提示
                _this.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetAllMenuTips", {}, function (e) {
                    //console.log(e);
                    if (e.Status == "Pass") {
                        var allTip = {};
                        $.each(e.Data, function (i,row) {
                            var prop = row["MENU_NAME"].replace(/\b (\w)/g, function ($, $1) { return $1.toUpperCase() });
                            var val = row["MENU_DESC"];
                            allTip[prop] = val;
                        });
                        allMenuTip = allTip;
                        //添加菜单描述（提示）
                        menuTip($(".J_menuItem"), $('.J_menuParent'), allMenuTip);
                    }
                });
                $('.J_menuItem').on('click', menuItem);
                $('.J_menuParent').on('click', menuShowItem);
                //收藏按钮绑定事件
                addEvent();
                MesClientUI.prototype.MenuRezise();
            }
            else {
                swal("Get Menu Fail", e.Message, "error");
            }
            $('#back').on('click', turnback);
        });
    }; 
    MesClientUI.prototype.MenuModify = function (c) {
        MenuMake = function (n, c, d) {
            var ul = $("<ul class=\"bs-glyphicons-list " + (n == "0" ? " navblockShow" : " navblockHidden") + " \" data-navid=\"" + n + "\"></ul>");
            for (var i = 0; i < d.length; i++) {
                var li = $("<li class=\"tf-parent\" style=\"background-color:" + d[i].STYLE_NAME + " !important\"></li>");
                var spanClose = $("<span class=\"glyphicon glyphicon-remove close-menu\" data-menuid=\"" + d[i].ID + "\"></span>");
                var spanEdit = $("<span class=\"glyphicon glyphicon-wrench edit-menu\" data-menuid=\"" + d[i].ID + "\"></span>");
                li.append(spanClose);
                li.append(spanEdit);
                var a;
                var span1;
                if (/glyphicon/g.test(d[i].CLASS_NAME)) {
                    span1 = $("<span class=\"glyphicon glyphicon-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                }
                if (/fa/g.test(d[i].CLASS_NAME)) {
                    span1 = $("<span class=\"fa fa-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                }
                //var span1 = $("<span class=\"glyphicon glyphicon-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                var span2 = $("<span class=\"glyphicon-class\">" + d[i].MENU_NAME + "</span>");
                a = $("<a href=\"#\" class=\"J_menuParent\"></a>");
                a.append(span1);
                a.append(span2);
                li.append(a);
                MenuMake(d[i].ID, li, d[i].MENU_ITEM);
                ul.append(li);
            }
            var NewLi = $("<li class=\"bg-10 unSortable\" data-parent-menu=\"" + n + "\">");
            var NewSpan1 = $("<span class=\"glyphicon glyphicon-lg glyphicon-plus\" aria-hidden=\"true\"></span>");
            var NewSpan2 = $("<span class=\"glyphicon-class\">New Module</span>");
            NewLi.append(NewSpan1);
            NewLi.append(NewSpan2);
            ul.append(NewLi);
            c.append(ul);
        }
        /*新建保存菜单模块方法*/
        function SaveModule() {
            var parentid = $("#MenuLi").attr("data-parent-menu");
            var Menu_Name = $("#MenuTitleShow").text();
            var IconClass = $("#MenuIconShow").attr("class");
            IconClass = IconClass.substr(IconClass.lastIndexOf(" "));
            var BGColor = $("#MenuLi").css("background-color");
            var pagePath = $("#MenuPage").val();
            var LanguageTag = $("#MenuTag").val();
            var Desc = $("#MenuDesc").val();
            var EMP_NO = self.parent.client.UserInfo.EMP_NO;
            var data = { PARENT_CODE: parentid, MENU_NAME: Menu_Name, CLASS_NAME: IconClass, STYLE_NAME: BGColor, PAGE_PATH: pagePath, MENU_DESC: Desc, LANGUAGE_ID: LanguageTag, EDIT_EMP: EMP_NO };
            self.parent.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "CreatMenu", data, function (e) {
                if (e.Status == "Pass") {
                    var li = $("<li class=\"tf-parent\" style=\"background-color:" + BGColor + " !important\"></li>");
                    var spanClose = $("<span class=\"glyphicon glyphicon-remove close-menu\" data-menuid=\"" + e.Data.ID + "\"></span>");
                    var spanEdit = $("<span class=\"glyphicon glyphicon-wrench edit-menu\" data-menuid=\"" + e.Data.ID + "\"></span>");
                    li.append(spanClose);
                    li.append(spanEdit);
                    var a;
                    var span1 = $("<span class=\"glyphicon glyphicon-lg " + IconClass + "\" aria-hidden=\"true\"></span>");
                    var span2 = $("<span class=\"glyphicon-class\">" + Menu_Name + "</span>");
                    a = $("<a href=\"#\" class=\"J_menuParent\"></a>");
                    a.append(span1);
                    a.append(span2);
                    li.append(a);
                    var ul = $("<ul class=\"bs-glyphicons-list navblockHidden\" data-navid=\"" + e.Data.ID + "\"></ul>");
                    var NewLi = $("<li class=\"bg-10 unSortable\" data-parent-menu=\"" + e.Data.ID + "\">");
                    var NewSpan1 = $("<span class=\"glyphicon glyphicon-lg glyphicon-plus\" aria-hidden=\"true\"></span>");
                    var NewSpan2 = $("<span class=\"glyphicon-class\">New Module</span>");
                    NewLi.append(NewSpan1);
                    NewLi.append(NewSpan2);
                    ul.append(NewLi);
                    li.append(ul);
                    var selector = "[data-navid=" + parentid + "]>.unSortable";
                    $(selector).before(li);
                    init();
                    $("#ModuleEidter").modal('hide');
                }
                else {
                    swal("Add Module Fail", e.Message, "error");
                }
            });
        }
        /*更新现有菜单模块方法*/
        function UpdateModule() {
            var parentid = $("#MenuLi").attr("data-parent-menu");
            var ID = $("#MenuLi").attr("data-navid");
            var Menu_Name = $("#MenuTitle").val();
            var IconClass = $("#MenuIconShow").attr("class");
            IconClass = IconClass.substr(IconClass.lastIndexOf(" "));
            var BGColor = $("#MenuLi").css("background-color");
            var pagePath = $("#MenuPage").val();
            var LanguageTag = $("#MenuTag").val();
            var Desc = $("#MenuDesc").val();
            var EMP_NO = self.parent.client.UserInfo.EMP_NO;
            var data = { ID: ID, PARENT_CODE: parentid, MENU_NAME: Menu_Name, CLASS_NAME: IconClass, STYLE_NAME: BGColor, PAGE_PATH: pagePath, MENU_DESC: Desc, LANGUAGE_ID: LanguageTag, EDIT_EMP: EMP_NO };
            self.parent.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "UpdateMenu", data, function (e) {
                if (e.Status == "Pass") {
                    $("#ModuleEidter").modal('hide');
                    swal("Save OK!", e.Message, "success");
                }
                else {
                    swal("Error", e.Message, "error");
                }
            });
        }
        /*更改排序*/
        function SortModule(e, u) {
            var thisUL = $("#NavBlock .navblockShow");
            var parentid = thisUL.attr("data-navid");
            var idArr = [];
            thisUL.children("li:not(.unSortable)").each(function () {
                idArr.push(this.firstChild.getAttribute("data-menuid"));
            });
            var selectorH = "#HiddenBlock [data-navid=" + parentid + "]";
            var selectorS = "#NavBlock [data-navid=" + parentid + "]";
            self.parent.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "OrderbyMenu", { PARENTID: parentid, MENUIDS: idArr }, function (e) {
                if (e.Status == "Pass") {
                    $(selectorH).html($(selectorS)[0].innerHTML);
                }
                else {
                    swal("Error", e.Message, "error", function () {
                        $(selectorS).html($(selectorH)[0].innerHTML);
                        init();
                    });
                }
            });
        }
        /*显示下级子菜单*/
        function menuShowItem() {
            $(this.nextElementSibling).removeClass('navblockHidden');
            $(this.nextElementSibling).addClass('bs-glyphicons-list');
            $(this.nextElementSibling).addClass('navblockShow');
            $("#NavBlock").attr('data-parent', this.parentElement.parentNode.getAttribute('data-navid'));
            $("#NavBlock").html(this.nextElementSibling.outerHTML);
            $('#NavBlock').children('.navblockHidden').remove();
            init();
        }
        /*菜单返回上层*/
        function turnback() {
            
            var parentid = $("#NavBlock").attr('data-parent');
            var ul = $("#HiddenBlock ul[data-navid='" + parentid + "']");
            $("#NavBlock").html(ul[0].outerHTML);
            $('#NavBlock').children().removeClass('navblockHidden');
            $('#NavBlock').children().addClass('bs-glyphicons-list');
            $('#NavBlock').children().addClass('navblockShow');
            if (parentid != "0") {
                $("#NavBlock").attr('data-parent', ul.parent().parent().attr('data-navid'));
            }
            $('#NavBlock').children('.navblockHidden').remove();
            init();
        }
        /*菜单模块右上角删除*/
        function menuDelete() {
            var id = this.getAttribute("data-menuid");
            swal({
                title: "Notes",
                text: "Do you want to delete the menu?",
                inputValue: id,
                showCancelButton: true,
                showConfirmButton: true
            }, function (isConfirm) {
                if (isConfirm) {
                    self.parent.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "DeletetMenu", { ID: this.inputValue }, function (e) {
                        if (e.Status == "Pass") {
                            var selector = "[data-menuid=" + e.Data + "]";
                            $(selector).parent().remove();
                        }
                        else {
                            swal("Error", e.Message, "error");
                        }
                    });
                }
            });
        }
        /*菜单模块右上角编辑*/
        function menuEdit() {
            var id = this.getAttribute("data-menuid");
            self.parent.client.CallFunction("MESStation.GlobalConfig.SystemMenuConfig", "GetMenuInformation", { MenuId: id }, function (e) {
                if (e.Status == "Pass") {
                    $("#MenuLi").attr("data-navid", e.Data.ID);
                    $("#MenuLi").attr("data-parent-menu");
                    $("#MenuTitleShow").text(e.Data.MENU_NAME);
                    $("#MenuTitle").val(e.Data.MENU_NAME);
                    if (/glyphicon/g.test(e.Data.CLASS_NAME)) {
                        $("#MenuIconShow").attr("class", "glyphicon glyphicon-lg " + e.Data.CLASS_NAME);
                    }
                    if (/fa/g.test(e.Data.CLASS_NAME)) {
                        $("#MenuIconShow").attr("class", "fa fa-lg " + e.Data.CLASS_NAME);
                    }
                    //$("#MenuIconShow").attr("class", "glyphicon glyphicon-lg " + e.Data.CLASS_NAME);
                    $("#MenuLi").css("background-color", e.Data.STYLE_NAME + " !important");
                    $("#BGColor").ClassyColor().destroy();
                    $('#BGColor').ClassyColor({
                        colorSpace: "rgba",
                        color: e.Data.STYLE_NAME,
                        staticComponents: true,
                        label: true,
                        dispalyColor: "css"
                    }).on("newcolor", function (e) {
                        $("#MenuLi").css("background-color", $('#BGColor').ClassyColor().toCssString());
                    });
                    $("#MenuPage").val(e.Data.PAGE_PATH);
                    $("#MenuTag").val(e.Data.LANGUAGE_ID);
                    $("#MenuDesc").val(e.Data.MENU_DESC);
                    $("#ModuleEidter").modal({
                        data: id,
                        Show: true
                    });
                }
                else {
                    swal("Get Menu Info", e.Message, "error");
                }
            });            
            $("#submitNewModule").off('click');
            $("#submitNewModule").on('click', UpdateModule);
        }
        /*新建菜单模块触发弹窗*/
        function NewMenuItem() {
            var id = this.getAttribute("data-parent-menu");
            $("#MenuLi").attr("data-parent-menu", id);
            $("#MenuTitleShow").text("");
            $("#MenuTitle").val("");
            $("#MenuLi").css("background-color", "#49a9e3 !important");
            $("#BGColor").ClassyColor().destroy();
            $('#BGColor').ClassyColor({
                color: "#49a9e3",
                colorSpace: "rgba",
                staticComponents: true,
                label: true,
                dispalyColor: "css"
            }).on("newcolor", function (e) {
                $("#MenuLi").css("background-color", $('#BGColor').ClassyColor().toCssString());
            });
            $("#MenuPage").val("");
            $("#MenuTag").val("");
            $("#MenuDesc").val("");
            $("#ModuleEidter").modal({
                keyboard: true,
                Show: true
            });
            $("#submitNewModule").off('click');
            $("#submitNewModule").on('click', SaveModule);
        }
        function init() {
            $('#NavBlock .J_menuParent').off('click');
            $("#NavBlock .close-menu").off('click');
            $("#NavBlock .edit-menu").off('click');
            $("#NavBlock [data-parent-menu]").off('click');

            $('#NavBlock .J_menuParent').on('click', menuShowItem);
            $("#NavBlock .close-menu").on('click', menuDelete);
            $("#NavBlock .edit-menu").on('click', menuEdit);
            $("#NavBlock [data-parent-menu]").on('click', NewMenuItem);
            /*菜单拖动排序*/
            $(".bs-glyphicons-list").sortable({
                update: SortModule,
                items: "li:not(.unSortable)"
            }).disableSelection();
        }
        this.client.GetMenu(function (e) {
            if (e.Status == "Pass") {
                MenuMake("0", c, e.Data);
                var h = $("<div id=\"HiddenBlock\" class=\"hidden\"></div>");
                h.html(c[0].innerHTML);
                c.after(h);
                init();
            }
            else {
                swal("Get Menu Fail", e.Message, "error");
            }
        });
        $('#back').on('click', turnback);
    };
    MesClientUI.prototype.QuickStart = function (o) {
        if (Storage != undefined) {
            var str = localStorage.MenuData;
            var M = JSON.parse(str);
            var arr = $.MES.getQuickStart({ Data: M, Value: o.Value, Fields: o.Fields });
            o.Container.empty();
            $("#QuickStartHid").remove();
            function MenuMake(n, c, d) {
                var ul = $("<ul class=\"bs-glyphicons-list " + (n == "0" ? " navblockShow" : " navblockHidden") + "\" data-navid=\"" + n + "\"></ul>");
                for (var i = 0; i < d.length; i++) {
                    var li = $("<li style=\"background-color:" + d[i].STYLE_NAME + " !important\"></li>");
                    var a;
                    //var span1 = $("<span class=\"glyphicon glyphicon-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                    var span1;
                    if (/glyphicon/g.test(d[i].CLASS_NAME)) {
                        span1 = $("<span class=\"glyphicon glyphicon-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                    }
                    if (/fa/g.test(d[i].CLASS_NAME)) {
                        span1 = $("<span class=\"fa fa-lg " + (d[i].CLASS_NAME ? d[i].CLASS_NAME : "glyphicon-cog") + "\" aria-hidden=\"true\"></span>");
                    }
                    var span2 = $("<span class=\"glyphicon-class\">" + d[i].MENU_NAME + "</span>");
                    if (d[i].MENU_ITEM.length > 0) {
                        a = $("<a href=\"#\" class=\"J_menuParent\"></a>");
                        a.append(span1);
                        a.append(span2);
                        li.append(a);
                        MenuMake(d[i].ID, li, d[i].MENU_ITEM);
                    }
                    else {
                        a = $("<a href=\"" + (d[i].PAGE_PATH ? d[i].PAGE_PATH : "FunctionPage/404.html") + "\" class=\"J_menuItem\" " + (d[i].PAGE_PATH ? "data-index=\"" + d[i].MENU_NAME + "\"" : "") + "></a>");
                        a.append(span1);
                        a.append(span2);
                        li.append(a);
                    }
                    ul.append(li);
                }
                c.append(ul);
            };
            function menuItem() {
                // 获取标识数据
                var dataUrl = $(this).attr('href'),
                    dataIndex = $(this).data('index'),
                    menuName = $.trim($(this).text()),
                    flag = true;
                if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;

                // 选项卡菜单已存在
                $('.J_menuTab').each(function () {
                    if ($(this).data('id') == dataUrl) {
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                            scrollToTab(this);
                            // 显示tab对应的内容区
                            $('.J_mainContent .J_iframe').each(function () {
                                if ($(this).data('id') == dataUrl) {
                                    $(this).show().siblings('.J_iframe').hide();
                                    return false;
                                }
                            });
                        }
                        flag = false;
                        return false;
                    }
                });

                // 选项卡菜单不存在
                if (flag) {
                    $('.J_iframe').hide();
                    var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
                    $('.J_menuTab').removeClass('active');
                    // 添加选项卡对应的iframe
                    var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                    $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
                    // 添加选项卡
                    $('.J_menuTabs .page-tabs-content').append(str);
                    scrollToTab($('.J_menuTab.active'));
                }
                return false;
            };
            function menuShowItem() {
                $(this.nextElementSibling).removeClass('navblockHidden');
                $(this.nextElementSibling).addClass('bs-glyphicons-list');
                $(this.nextElementSibling).addClass('navblockShow');
                $("#QuickStart").attr('data-parent', this.parentElement.parentNode.getAttribute('data-navid'));
                $("#QuickStart").html(this.nextElementSibling.outerHTML);
                $('#QuickStart').children('.navblockHidden').remove();
                init();
            };
            function turnback() {
                var parentid = $("#QuickStart").attr('data-parent');
                var ul = $("#QuickStartHid ul[data-navid='" + parentid + "']");
                $("#QuickStart").html(ul[0].outerHTML);
                $('#QuickStart').children().removeClass('navblockHidden');
                $('#QuickStart').children().addClass('bs-glyphicons-list');
                $('#QuickStart').children().addClass('navblockShow');
                if (parentid != "root") {
                    $("#QuickStart").attr('data-parent', ul.parent().parent().attr('data-navid'));
                }
                $('#QuickStart').children('.navblockHidden').remove();
                $('#QuickStart .J_menuItem').on('click', menuItem);
                $('#QuickStart .J_menuParent').on('click', menuShowItem);
            };
            function init() {
                $('#QuickStart .J_menuItem').off('click');
                $('#QuickStart .J_menuParent').off('click');
                $('#QuickStart .J_menuItem').on('click', menuItem);
                $('#QuickStart .J_menuParent').on('click', menuShowItem);
            }
            MenuMake("0", o.Container, arr);
            var h = $("<div id=\"QuickStartHid\" class=\"hidden\"></div>");
            h.html(o.Container[0].outerHTML);
            o.Container.after(h);
            //通过遍历给菜单项加上data-index属性
            $(".J_menuItem").each(function (index) {
                if (!$(this).attr('data-index')) {
                    $(this).attr('data-index', index);
                }
            });
            init();
            $('#Qback').on('click', turnback);
        }
    };
};


