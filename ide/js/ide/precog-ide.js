(function() {
    // UTILITIES
    var doc = document,
        extend = $.extend,
        initialFolder = location.href.match(/\//g).length,
        skinRegex = /kendo\.\w+(\.min)?\.css/i,
        animation = {
            show: {
                effects: "fadeIn",
                duration: 300,
                show: true
            },
            hide: {
                effects: "fadeOut",
                duration: 300
            }
        };
    var _loadCss = document.createStyleSheet ? function(css) { document.createStyleSheet(css) } : function(css) { $("head").append($("<link rel='stylesheet' href='"+css+"' type='text/css' media='screen' />")); }
    var loadCss = function(css) {
        if("string" == typeof css) css = [css];
        for(var i=0;i<css.length;i++)
            _loadCss(css[i]);
    };
    var _getSyncScript = function(url)
    {
        $.ajax({
            url: url,
            dataType: "script",
            async : false,
            cache : true
        });
    };
    var loadSyncScript = function(scripts) {
        if("string" == typeof scripts) scripts = [scripts];
        for(var i=0;i<scripts.length;i++) {
            _getSyncScript(scripts[i]);
        }
    };

    // load mandatory css/scripts
    loadCss(["css/kendoui/kendo.common.min.css", "css/kendoui/kendo.default.min.css", "css/ide/typography.css", "css/ide/controls.css"]);
    //"http://api.reportgrid.com/js/precog.js"
    loadSyncScript(["http://api.reportgrid.com/js/precog.js", "js/kendoui/kendo.web.min.js", "js/ace/ace.js", "js/ace/mode-quirrel-uncompressed.js"]);


    var changeIdeTheme = function(skinName) {
        var kendoLinks = $("link[href*='kendo.']", doc.getElementsByTagName("head")[0]),
            commonLink = kendoLinks.filter("[href*='kendo.common']"),
            skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
            currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
            extension = /\.less$/.test(skinLink.attr("href")) ? ".less" : ".css",
            url = currentFolder + commonLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1" + extension),
            exampleElement = $("#example");

        function replaceTheme() {
            var oldSkinName = $(doc).data("kendoSkin"),
                newLink;

            if ($.browser.msie) {
                newLink = $(doc.createStyleSheet(url));
            } else {
                newLink = skinLink.eq(0).clone().attr("href", url);
                skinLink.eq(0).before(newLink);
            }

            skinLink.remove();

            if (extension === ".less") {
                $("head style[id^='less']").remove();
                less.sheets = [newLink[0]];
                less.refresh(true);
            }

            if (exampleElement.length) {
                exampleElement[0].style.cssText = exampleElement[0].style.cssText;
            }

            $(doc).data("kendoSkin", skinName);
            $(doc.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
        }

        replaceTheme();
    };

    var uid = 0;

    var editorContext = function(el, config, editors) {
        function changeEditorTheme(theme)
        {
            for(var i=0;i<editors.length;i++)
            {
                editors[i].changeTheme(theme);
            }
        }

        function htmlMainMenu()
        {
            return '<ul>'
                +'<li>config'
                +'<ul>'
                +'<li class="k-state-focused">layout theme:</li>'
                +'<li data-layout-theme="default" class="layout-theme k-state-selected">default</li>'
                +'<li data-layout-theme="black" class="layout-theme">black</li>'
                +'<li data-layout-theme="blueopal" class="layout-theme">blue opal</li>'
                +'<li data-layout-theme="metro" class="layout-theme">metro</li>'
                +'<li data-layout-theme="silver" class="layout-theme">silver</li>'

                +'<li class="k-state-focused">editor theme:</li>'
                +'<li data-editor-theme="default" class="editor-theme k-state-selected">default</li>'
                +'<li data-editor-theme="chrome" class="editor-theme">chrome</li>'
                +'<li data-editor-theme="cobalt" class="editor-theme">cobalt</li>'
                +'<li data-editor-theme="crimson_editor" class="editor-theme">crimson editor</li>'
                +'<li data-editor-theme="dawn" class="editor-theme">dawn</li>'
                +'<li data-editor-theme="dreamweaver" class="editor-theme">dreamweaver</li>'
                +'<li data-editor-theme="eclipse" class="editor-theme">eclipse</li>'
                +'<li data-editor-theme="idle_fingers" class="editor-theme">idle fingers</li>'
                +'<li data-editor-theme="kr_theme" class="editor-theme">kr theme</li>'
                +'<li data-editor-theme="merbivore_soft" class="editor-theme">merbivore soft</li>'
                +'<li data-editor-theme="merbivore" class="editor-theme">merbivore</li>'
                +'<li data-editor-theme="mono_industrial" class="editor-theme">mono industrial</li>'
                +'<li data-editor-theme="monokai" class="editor-theme">monokai</li>'
                +'<li data-editor-theme="pastel_on_dark" class="editor-theme">pastel on dark</li>'
                +'<li data-editor-theme="solarized_dark" class="editor-theme">solarized dark</li>'
                +'<li data-editor-theme="solarized_light" class="editor-theme">solarized light</li>'
                +'<li data-editor-theme="textmate" class="editor-theme">textmate</li>'
                +'<li data-editor-theme="tomorrow_night" class="editor-theme">tomorrow night</li>'
                +'<li data-editor-theme="tomorrow" class="editor-theme">tomorrow</li>'
                +'<li data-editor-theme="twilight" class="editor-theme">twilight</li>'
                +'<li data-editor-theme="vibrant_ink" class="editor-theme">vibrant ink</li>'
                +'</ul>'
                +'</ul>'
                ;
        }

        function htmlMainBar() {
            return '<div class="pg-left-bar">Precog IDE</div>'
                + '<div class="pg-right-bar">'+htmlMainMenu()+'</div>'
            ;
        }
        var mainbar = el.append('<div class="pg-main-bar k-widget k-reset k-header">'+htmlMainBar()+'</div>');
        mainbar.find('.pg-right-bar ul').kendoMenu();
        mainbar.find('.pg-right-bar ul .layout-theme').click(function() {
            var theme = $(this).attr('data-layout-theme');
            $('.pg-right-bar ul .layout-theme').removeClass('k-state-selected');
            $(this).addClass('k-state-selected');
            changeIdeTheme(theme);
        });
        mainbar.find('.pg-right-bar ul .editor-theme').click(function() {
            var theme = $(this).attr('data-editor-theme');
            $('.pg-right-bar ul .editor-theme').removeClass('k-state-selected');
            $(this).addClass('k-state-selected');
            changeEditorTheme(theme);
        });
        var editorContainers = el.append('<div class="pg-editors"></div>').find(".pg-editors");
        el.kendoSplitter({
            panes : [
                {scrollable:false,collapsible:false,resizable:false,size:"35px"},
                {scrollable:false,collapsible:false,resizable:false}
            ],
            orientation : "vertical"
        });
        return {
            createEditorContainer : function() {
                var container = editorContainers.append('<div class="pg-editor-container"></div>').find(".pg-editor-container:last");

                return container;
            }
        };
    };

    var editor = function(el, config) {
        var lastResult, queryStartTime, queryLastExecutionTime = 2000;
        var progressBar = function(elementSelector, percent) {
            if (!$(elementSelector).hasClass("pg-progress"))
            {
                $(elementSelector).addClass("pg-progress");
                $(elementSelector).append("<span class='k-slider-track' />");
                $(elementSelector).find(".k-slider-track").width("100%").append("<span class='k-slider-selection' />");
            }

            if (percent)
                $(elementSelector).find(".k-slider-selection").width((percent * 100) + "%");
        };
        function displayResults(data)
        {
            lastResult = data;
            endQuery();
            displayData();
        }

        function displayData()
        {
            if(!lastResult)
                return;
            var out = el.find('.pg-output');
            switch(config.outputType)
            {
                case "json":
                    out.html('<div class="pg-json ace_editor ace-tm k-scrollable">'+JSON.stringify(lastResult, null, config.tabWidth)+'</div>');
                    break;
                case "table":
                    var columns = [], data = lastResult, fields = {};
                    if("object" == typeof lastResult[0])
                    {
                        for(key in data[0])
                        {
                            columns.push({ field : key, title : key });
                            fields[key] = { type : typeof data[0][key] };
                        }
                    } else {
                        var field = sess.getValue().trim().split("\n").pop();
                        if(!(/^[a-z0-9]+$/i).exec(field))
                            field = "value";
                        columns.push({ title : field, field : field });
                        fields.value = { type : typeof data[0] }
                        data = data.map(function(v) {
                            var o = {};
                            o[field] = v;
                            return o;
                        });
                    }
                    $(out.html('<table></table>').find("table")).kendoGrid({
                        columns : columns,
                        dataSource : {
                            schema : { model : { fields : fields } },
                            data : data,
                            pageSize: 20
                        },
                        groupable: columns.length > 1,
                        filterable : true,
                        scrollable: true,
                        sortable: true,
                        pageable: true
                    });
                    break;
            }
        }

        function displayError(message, content)
        {
            endQuery();
            var msg = "";
            if(content instanceof Array)
            {
                var lines = [];
                for(var i = 0; i < content.length; i++)
                {
                    var o = content[i];
                    line = o.message + "\nline " + o.lineNum + ", column "+ o.colNum + ": " + o.detail + "\n" + o.line + "\n";
                    for(var j = 1; j < o.colNum; j++)
                        line += " ";
                    line += "^";
                    lines.push(line);
                }
                msg = lines.join("\n");
            } else if(content) {
                msg = "" + content;
            } else {
                msg = "error code " + message;
            }
            var out = el.find('.pg-output');
            out.html('<div class="ace_editor ace-tm"><div class="ace_line"><div class="ace_invalid">'+msg.split("\n").join('</div></div><div class="ace_line"><div class="ace_invalid">')+'</div></div></div>');
        }

        function executeQuery()
        {
            var query = aceui.getSession().getValue();
            startQuery();
            Precog.query(query, displayResults, displayError);
        }

        function setCode(code)
        {
            sess.setValue(code);
        }

        function updateCursor() {
            var pos = aceui.getCursorPosition();
            el.find(".pg-line").text(pos.row+1);
            el.find(".pg-column").text(pos.column+1);
        }

        function updateTextStats() {
            var text = sess.getValue();
            el.find(".pg-words").text(text.split(/\b[a-z0-9]+?\b/gi).length-1);
            el.find(".pg-characters").text(text.length);
        }

        function startQuery() {
            var html = el.find('.pg-execution-time').html('<span class="pg-bar"></span>').find('.pg-bar');
            queryStartTime = +new Date();
            function clamp(v) {
                return v < 0 ? 0 : v > 1 ? 1 : v;
            }
            var first = true, kill = setInterval(function() {
                if(!first && html.children().length == 0)
                {
                    clearTimeout(kill);
                    return;
                }
                first = false;
                progressBar(html, clamp((+new Date() - queryStartTime) / queryLastExecutionTime));
            }, 15);
        }

        function endQuery() {
            queryLastExecutionTime = +new Date() - queryStartTime;
            el.find('.pg-execution-time').html("execution: " + (Math.round(queryLastExecutionTime / 10) / 100) + " sec.");
        }

        var delayedUpdateTextStats = (function() {
            var kill;
            return function() {
                if(kill) clearTimeout(kill);
                kill = setTimeout(updateTextStats, 250);
            };
        })();

        function setTabSize(size, force)
        {
            if(!(force || sess.getTabSize() != size)) return;
            config.tabWidth = size;
            sess.setTabSize(size);
            el.find('.tab-width').removeClass('k-state-selected').each(function() {
                if(size == parseInt($(this).attr("data-tab-width")))
                    $(this).addClass('k-state-selected');
            })
            el.find(".pg-tab-width").text(size);
        }

        function setSoftTabs(toggle, force)
        {
            if(!(force || sess.getUseSoftTabs() != toggle)) return;
            config.indentUsingSpaces = toggle;
            sess.setUseSoftTabs(toggle);
            var spaces = []; for(var i=0;i<config.tabWidth;i++) spaces.push(" "); spaces = spaces.join("");
            if(toggle)
            {
//                aceui.replaceAll(spaces, { needle : "\t" });
                el.find('.softTabs').addClass("k-state-selected");
            } else {
//                aceui.replaceAll("\t", { needle : spaces });
                el.find('.softTabs').removeClass("k-state-selected");
            }
        }

        function htmlStatusBar()
        {
            return '<ul>'
                +'<li class="">tabs: <span class="pg-tab-width">'+config.tabWidth+'</span>'
                    +'<ul>'
                    +'<li class="softTabs">indent using spaces</li>'
                    +'<li data-tab-width="1" class="tab-width">tab width: 1</li>'
                    +'<li data-tab-width="2" class="tab-width k-state-selected">tab width: 2</li>'
                    +'<li data-tab-width="3" class="tab-width">tab width: 3</li>'
                    +'<li data-tab-width="4" class="tab-width">tab width: 4</li>'
                    +'<li data-tab-width="5" class="tab-width">tab width: 5</li>'
                    +'<li data-tab-width="6" class="tab-width">tab width: 6</li>'
                    +'<li data-tab-width="7" class="tab-width">tab width: 7</li>'
                    +'<li data-tab-width="8" class="tab-width">tab width: 8</li>'
                    +'</ul>'
                +'</li>'
                +'<li class="k-state-disabled k-state-default">line <span class="pg-line">1</span>, column <span class="pg-column">1</span></li>'
                +'<li class="k-state-disabled k-state-default">words <span class="pg-words">1</span>, characters <span class="pg-characters">1</span></li>'
                +'<li class="k-state-disabled k-state-default"><span class="pg-execution-time"></span></li>'
                +'</ul>';
        }

        function htmlOutputBar()
        {
            return '<div class="pg-left-bar"></div>'
                + '<div class="pg-right-bar"><a href="#" class="pg-output-control k-button" data-output-type="table"><span class="k-sprite"></span>table</a><a href="#" class="pg-output-control k-button" data-output-type="json"><span class="k-sprite"></span>json</a></div>'
            ;
        }


        var id = '__precog__ide_'+ (++uid),
            sid = "#" + id;
        el.addClass("k-content");
        el.html('<div id="'+id+'"><div class="pg-idecontainer" style="overflow:hidden"><div class="pg-ide"></div><a class="pg-runner k-button" href="#"><span class="k-sprite k-icon k-arrow-down"></span>run</a></div><div class="pg-output-panes"><div class="pg-output-toolbar k-widget k-reset k-header">'+htmlOutputBar()+'</div><div class="pg-output"></div><div class="pg-statusbar">'+htmlStatusBar()+'</div></div></div>');
        el.find(sid).height(el.height());
        el.find(".pg-statusbar ul").css("z-index", 1000).kendoMenu({ direction: "top right" });
        // adjust arrow
        el.find('.pg-statusbar .k-arrow-down').each(function() {
            $(this).removeClass('k-arrow-down').addClass('k-arrow-up');
        });
        // wire tab width event
        el.find('.tab-width').click(function() {
            setTabSize(parseInt($(this).attr("data-tab-width")));
        });
        // wire soft tabs
        el.find('.softTabs').click(function() {
            setSoftTabs(!config.indentUsingSpaces);
        });
        // wire output controls
        el.find('.pg-output-control.k-button').click(function() {
            el.find('.pg-output-control.k-button .k-sprite').removeClass('k-icon k-insert');
            $(this).find('.k-sprite').addClass('k-icon k-insert');
            config.outputType = $(this).attr("data-output-type");
            displayData();
        }).each(function() {
            if($(this).attr("data-output-type") == config.outputType)
                $(this).find('.k-sprite').addClass("k-icon k-insert");
        });
        // wire execute button
        el.find('.pg-runner').click(executeQuery);

        var aceui = ace.edit(el.find(".pg-ide").get(0));
        aceui.commands.addCommand({
            bindKey: {
                win: 'Shift-Return',
                mac: 'Shift-Return|Command-Return',
                sender: 'editor|cli'
            },
            exec: executeQuery
        });
        aceui.setShowPrintMargin(false);
        var sess = aceui.getSession();
        sess.setMode(new (require("ace/mode/quirrel").Mode)());
        sess.getSelection().on("changeCursor", updateCursor);
        sess.on("change", delayedUpdateTextStats);

        el.find(sid).kendoSplitter({
            panes: [
                {collapsible:false, min:"100px",scrollable:false,resizable:true},
//                {collapsible:false, min:"30px",max:"30px",size:"30px",scrollable:false,resizable:true},
                {collapsible:false, min:"100px", size:"50%",scrollable:false}
//                {collapsible:false, size:"30px",scrollable:false,resizable:false}
            ],
            orientation : config.orientation,
            resize: (function() {
                var kill;
                return function(){
                    if(kill) clearTimeout(kill);
                    kill = setTimeout(function() {
                        var cont = el.find(".pg-idecontainer");
                        el.find(".pg-ide").width(cont.width()).height(cont.height());
                        aceui.resize();
                        displayData(); // TODO: dirty trick to resize the table
                    }, 100);
                }
            })()
        });
        el.find(sid + " .pg-output-panes").kendoSplitter({
            panes : [
                {collapsible:false, size:"35px",scrollable:false,resizable:false},
                {collapsible:false, scrollable:false,resizable:false},
                {collapsible:false, size:"28px",scrollable:false,resizable:false}
            ],
            orientation : "vertical",
        });

        setTabSize(config.tabWidth, true);
        if(config.code)
            setCode(config.code);
        setSoftTabs(config.indentUsingSpaces, true);

        updateCursor();
        updateTextStats();

        // TODO: WEAK SOLUTION
        setTimeout(function() {
            if(config.disableClientCache)
            {
                window.Precog.cache.disable();
            } else {
                window.Precog.cache.enable();
            }
        }, 250);

        return {
            changeTheme : function(name) {
                if(name && 'default' != name) {
                    loadSyncScript("js/ace/theme-"+name+".js");
                    aceui.setTheme("ace/theme/" + name);
                } else {
                    aceui.setTheme();
                }
            },

            // DEBUG
            ace : function() { return aceui; }
        };
    }

    var PrecogIDE =  {
        create : function(el, config) {
            el = $(el);
            el.addClass('pg-precog-ide');
            config = config || {};
            var editors = [];

            var context = editorContext(el, config, editors);

            config.editors = config.editors || [];
            var len = config.editors.length;
            if(len < 1) len = 1;
            for(var i=0; i<len; i++)
            {
                var c = config.editors[i];
                if(!c) c = {};
                c.tabWidth = c.tabWidth || 2;
                c.indentUsingSpaces = "undefined" != typeof c.indentUsingSpaces ? c.indentUsingSpaces :  true;
                c.orientation = c.orientation || "vertical";
                c.disableClientCache = c.disableClientCache || true;
                c.code = c.code || "customers := //customers\norders := //orders\nfractionForUser('userId) :=\n\tcustomers' := customers where customers.userId = 'userId\n\torders' := orders where orders.userId = 'userId\n\tcustomers' ~ orders'\n\torders.total / customers.income\nfractionForUser";
                c.outputType = c.outputType || "table";

                editors.push(editor(context.createEditorContainer(), c));
            }
            return {
                editors : editors
            };
        },
        changeTheme: changeIdeTheme
    };

    window["PrecogIDE"] = PrecogIDE;
})();