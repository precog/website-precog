$(document).ready(function(){
    var serviceUrl = API.PageConfig.analyticsService || API.Config.analyticsService || "http://play2012v1.precog.io/v1/vfs/",
        tokenId    = API.PageConfig.tokenId || API.Config.tokenId || "1BF2FA96-8817-4C98-8BCB-BEC6E86CB3C2",
        service    = serviceUrl + "?tokenId=" + tokenId;

    editor = ace.edit("ide");
    editor.commands.addCommand({
        name: 'executeQuery',
        bindKey: {
            win: 'Shift-Return',
            mac: 'Shift-Return|Command-Return',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
          executeQuery();
        }
    });
    editor.setTheme("ace/theme/pastel_on_dark");
    editor.setShowPrintMargin(false);
    var QuirrelMode = require("ace/mode/quirrel").Mode;
    editor.getSession().setMode(new QuirrelMode());
    editor.resize();

    var output = $("#ide-output");

    var displayOutput = function(text, cls)
    {
      output.html('<div class="msg '+cls+'">'+text+'</div>');
    };
    var success = function(response) {
      displayOutput(response, "success");
    };

    var error = function(message) {
      displayOutput(message, "error");
    };

    var executeQuery = function()
    {
      editor.setReadOnly(true);
      displayOutput("loading...", "warning");
      var content = editor.getSession().getValue();

      API.Http.Jsonp.get(service, {
        success : function(data) {
          editor.setReadOnly(false);
          success(JSON.stringify(data));
        },
        failure : function(_, message, content) {
          editor.setReadOnly(false);
          var msg;
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
            msg = message;
          }
          error(msg);
        }
      },
      {
        q : content
      });
    };
    $('#console-execute-button').click(executeQuery);
});
