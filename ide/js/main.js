requirejs.config({
    paths: {
          "ui"     : "libs/jquery/ui"
        , "util"   : "app/util"
        , "jlib"   : "libs/jquery"
        , "config" : "app/config"
        , "editor" : "libs/editor"
        , "ace"    : "libs/editor/ace"
    }
});

require([
      "app/util/config"
    , "app/layout"
    , "app/editors"
    , "app/bar-main"
    , "app/bar-editor"
    , "app/bar-status"
    , "app/theme"
    , "editor/editor.ace"
    , "app/editorsync"
    , "app/output"
    , "app/folders"
    , "app/support"
    , "util/precog"
],

function(config, createLayout, editors, buildBarMain, buildBarEditor, buildBarStatus, theme, buildEditor, sync, buildOutput, buildFolders, buildSupport, precog) {
    precog.cache.disable();

    var layout = createLayout(config.get("ioPanesVertical"));

    layout.container.hide();

    buildBarMain(layout.getBarMain());
    buildBarEditor(layout.getBarEditor());

    $(theme).on("changed", function() {
        // refreshes the panes layout after theme changing
//        setTimeout(function(){
//            $(document.window).trigger("refresh");
            layout.refresh();
//        }, 1000);
    });

    $(theme).on("change", function(e, name) {
        config.set("theme", name);
    });

    var editor = buildEditor(layout.getCodeEditor(), config.get("ioPanesVertical"));
    editor.setTabSize(config.get("tabSize"));
    editor.setUseSoftTabs(config.get("softTabs"));

    $(layout).on("resizeCodeEditor", function() {
        editor.resize();
    });

    $(layout).on("ioOrientationChanged", function(_, vertical) {
        config.set("ioPanesVertical", vertical);
        editor.orientButton(vertical);
    });

    $(theme).on("change", function(e, name) {
        editor.setTheme(theme.getEditorTheme(name, editor.engine()));
    });

    $(editor).on("useSoftTabsChanged", function(_, value) {
//console.log("useSoftTabsChanged " + value);
        config.set("softTabs", value);
    });

    $(editor).on("tabSizeChanged", function(_, value) {
//console.log("tabSizeChanged " + value);
        config.set("tabSize", value);
    });

    var status = buildBarStatus(layout.getStatusBar(), editor, layout);

    var output = buildOutput(layout.getOutput(), editors); // TODO editors should not be passed here

    var support = buildSupport(layout.getSupport());

    support.addPanel("tutorial", "https://quirrel.precog.com/tutorial.html");
    support.addPanel("reference", "https://quirrel.precog.com/reference.html");
    support.addPanel("IRC channel", "https://webchat.freenode.net/?channels=quirrel&uio=Mz1mYWxzZSY5PXRydWU32");

//    support.addPanel("live support", "http://widget.mibbit.com/?settings=3e7a9e32a26494b80748cfe11f66e956&server=irc.mibbit.net&channel=%23precog_test_channel");
//    support.addPanel("wsirc", "http://wsirc.mobi/mobileChat.aspx?username=u_******&server=binary.ipocalypse.net%3A6667&channel=%23quirrel&autojoin=true&color=%23eeeeee&dark=false");
//    support.addPanel("freenode", "http://webchat.freenode.net?randomnick=1&channels=quirrel&uio=Mz1mYWxzZSY5PXRydWU32");

    $(layout).on("resizeCodeEditor", function() {
        output.resize();
        support.resize();
    });

    $(output).on("syntaxError", function(_, pos) {
        editor.highlightSyntax(pos.line - 1, pos.column - 1, pos.text, "error");
    });

    $(output).on("requestCursorChange", function(_, pos) {
        editor.setCursorPosition(pos.line - 1, pos.column - 1);
    });

    $(output).on("typeChanged", function(_, type) {
        editors.setOutputType(type);
    });

    $(precog).on("execute", function(_, data, lastExecution) {
        status.startRequest();
    });

    $(precog).on("completed", function(_, data) {
        status.endRequest(true);
        output.set(data);
        editors.setOutputResult(data);
    });
    $(precog).on("failed", function(_, data) {
        status.endRequest(false);
        output.set(data, "error");
        editors.setOutputResult(data);
    });
    $(editor).on("execute", function(_, code) {
        precog.query(code);
    });

    $(editors).on("activated", function(_, index) {
        var result  = editors.getOutputResult(),
            type    = editors.getOutputType(),
            options = editors.getOutputOptions();
//console.log("LOADED OPTIONS " + JSON.stringify(options));
        output.set(result, type, options);
    });

    sync(editor, editors, config);

    var folders = buildFolders(layout.getSystem());

    $(folders).on("querypath", function(e, path) {
        editors.add({ code : "/" + path });
        editors.activate(editors.count()-1);
        editor.triggerExecute();
    });

    editors.load();
    if(!editors.count()) editors.add();
    setTimeout(function() {
        editors.activate(0); // prevents bug in safari

        $(output).on("optionsChanged", function(_, options) {
//console.log("SAVING OPTIONS " + JSON.stringify(options));
            editors.setOutputOptions(options);
        });

        theme.set(config.get("theme", "franco"));

        config.monitor.bind("theme", function(e, name) {
            theme.set(name);
        });

        config.monitor.bind("softTabs", function(_, value) {
//console.log("from config softTabs " + value);
            editor.setUseSoftTabs(value);
        });

        config.monitor.bind("tabSize", function(_, value) {
//console.log("from config tabSize " + value);
            editor.setTabSize(value);
        });
    }, 15)

    layout.container.show();
});