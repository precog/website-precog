(function (){
var service = "http://demo.precog.io/v1/vfs/?tokenId=1BF2FA96-8817-4C98-8BCB-BEC6E86CB3C2";

function track(line, success)
{
  _gaq.push(['_trackEvent', 'REPL', line, success ? "successful" : "failure"]);
}

function _console(id, query)
{
  var console = $('#'+id),
    scroll = function() { console.animate({ scrollTop: console.prop("scrollHeight") }, 250); };
    controller = console.console({
    promptLabel: 'quirrel> ',
    continuedPromptLabel: '       | ',
    commandValidate:function(line){
      scroll();
      return true;
    },
    commandHandle:function(line,report){
      controller.continuedPrompt = true;
      scroll();
      return;
    },
    execute:function(line, handler){
      if(line === "") return false;
      API.Http.Jsonp.get(service, {
        success : function(data) {
          track(line, true);
          handler({ msg : JSON.stringify(data), className : 'success'});
          scroll();
        },
        failure : function(_, message, content) {
          var msg;
          if(content instanceof Array)
          {
            var lines = [];
            for(var i = 0; i < content.length; i++)
            {
              var o = content[i];
                  line = "line " + o.lineNum + ", column "+ o.colNum + ": " + o.message + "\n" + o.line + "\n";
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
          track(line, false);
          handler({ msg : msg, className : 'error'});
          scroll();
        }
      },
      {
        q : line
      });
      scroll();
      return true;
    },
    promptHistory:true,
    autofocus:true
  //  animateScroll:true,
  });

  if(query)
    controller.feed(query);

  return controller;
}

window.buildConsole = function(id, query)
{
  $(document).ready(function(){
    var controller = _console(id, query);
    $('#'+id+'-execute-button').click(function() {
      controller.trigger();
    });
  });
};


buildConsole('console');

})();
