$(document).ready(function(){

$('.sticker-repl-main').click(function () {
    window.open('http://api.precog.com/ide/','_blank');
});

$('.sticker-repl-main-square').click(function () {
    window.open('http://api.precog.com/ide/','_blank');
});

$("#home-machine-learning").mouseleave(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-1");
    });

$("#home-machine-learning").mouseenter(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-1");
    });

$("#home-statistics").mouseleave(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-2");
    });

$("#home-statistics").mouseenter(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-2");
    });

$("#home-analytics").mouseleave(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-3");
    });

$("#home-analytics").mouseenter(function () {
      $("#background-header-image-holder").toggleClass("header-image-alt-3");
    });

$('#news-box-home-page').click(function () {
    window.open('news-and-events.html','_self');
});

$('#why-box-home-page').click(function () {
    window.open('why-precog.html','_self');
});

$('#com-box-home-page').click(function () {
    window.open('newsletter.html','_self');
});

$('#report-grid-link').click(function () {
    window.open('http://reportgrid.com/charts.html#pricing-anchor');
});

//INDEX GOODIES
$("#newsletter-close").click(function(){
      $("#goodie-screen").css({
        'display': 'none'
        }, {queue: false}
        );
    }
    );

  // HOW IT WORKS
  $(".capture-lg").mouseover(function(){
      $("#hiw-panel-slider").animate({
          'left': '0'
          }, {queue: false}
          );
      $(".hiw-menu-text-1 p").animate({
        'opacity': '1.0'
        }, {queue: false}
        );
      $(".hiw-menu-text-2 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-3 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-4 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".capture-lg").addClass("capture-lg-alt")
      $(".enrich-lg").removeClass("enrich-lg-alt")
      $(".analyze-lg").removeClass("analyze-lg-alt")
      $(".act-lg").removeClass("act-lg-alt")
      }
      );

  $(".enrich-lg").mouseover(function(){
      $("#hiw-panel-slider").animate({
          'left': '-1050'
          }, {queue: false}
          );
      $(".hiw-menu-text-1 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-2 p").animate({
        'opacity': '1.0'
        }, {queue: false}
        );
      $(".hiw-menu-text-3 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-4 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".capture-lg").removeClass("capture-lg-alt")
      $(".enrich-lg").addClass("enrich-lg-alt")
      $(".analyze-lg").removeClass("analyze-lg-alt")
      $(".act-lg").removeClass("act-lg-alt")
      }
      );

  $(".analyze-lg").mouseover(function(){
      $("#hiw-panel-slider").animate({
          'left': '-2100'
          }, {queue: false}
          );
      $(".hiw-menu-text-1 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-2 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-3 p").animate({
        'opacity': '1.'
        }, {queue: false}
        );
      $(".hiw-menu-text-4 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".capture-lg").removeClass("capture-lg-alt")
      $(".enrich-lg").removeClass("enrich-lg-alt")
      $(".analyze-lg").addClass("analyze-lg-alt")
      $(".act-lg").removeClass("act-lg-alt")
      }
      );

  $(".act-lg").mouseover(function(){
      $("#hiw-panel-slider").animate({
          'left': '-3150'
          }, {queue: false}
          );
      $(".hiw-menu-text-1 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-2 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-3 p").animate({
        'opacity': '.3'
        }, {queue: false}
        );
      $(".hiw-menu-text-4 p").animate({
        'opacity': '1.'
        }, {queue: false}
        );
      $(".capture-lg").removeClass("capture-lg-alt")
      $(".enrich-lg").removeClass("enrich-lg-alt")
      $(".analyze-lg").removeClass("analyze-lg-alt")
      $(".act-lg").addClass("act-lg-alt")
      }
      );

// HOW IT WORK CAPTURE
$(".hiw-pane").mouseover(function(){
      $(".hiw-text-pane").css({
        'display': 'none'
        }, {queue: false}
        );

      var id = $(this).attr("id").split("-").pop();

      $("#hiw-text-"+id).css({
        'display': 'block'
        }, {queue: false}
        );
    }
    );


//HOW IT WORKS ENRICH
$(".hiw-enrich-panel").mouseover(function(){
      $(".hiw-text-pane3").css({
        'display': 'none'
        }, {queue: false}
        );

      var idenrich = $(this).attr("id").split("-").pop();

      $("#hiw-enrich-"+idenrich).css({
        'display': 'block'
        }, {queue: false}
        );
    }
    );

// HOW IT WORK ANALYZE
$(".hiw-analyze-icon").mouseover(function(){
      $(".hiw-text-pane4").css({
        'display': 'none'
        }, {queue: false}
        );
      $(".analyze-script").css({
        'display': 'none'
        }, {queue: false}
        );

      var idanalyze = $(this).attr("id").split("-").pop();

      $("#hiw-analyze-"+idanalyze).css({
        'display': 'block'
        }, {queue: false}
        );
      $("#analyze-script-"+idanalyze).css({
        'display': 'block'
        }, {queue: false}
        );
    }
    );

// HOW IT WORK ACT
$(".hiw-act-app").mouseover(function(){
      $(".hiw-text-pane2").css({
        'display': 'none'
        }, {queue: false}
        );
      $(".hiw-act-app-pic").css({
        'display': 'none'
        }, {queue: false}
        );

      var idact = $(this).attr("id").split("-").pop();

      $("#hiw-act-"+idact).css({
        'display': 'block'
        }, {queue: false}
        );
      $("#hiw-act-app-pic-"+idact).css({
        'display': 'block'
        }, {queue: false}
        );
    }
    );

//WHY PRECOG
$("#why-dot-left").click(function(){
    $("#why-precog-slider").animate({
        'left': '0'
        }, {queue: false}
        );
    }
    );
$("#why-dot-middle").click(function(){
    $("#why-precog-slider").animate({
        'left': '-390'
        }, {queue: false}
        );
    }
    );
$("#why-dot-right").click(function(){
    $("#why-precog-slider").animate({
        'left': '-780'
        }, {queue: false}
        );
    }
    );

//JOBS
$("#scrolling-scroll-panel").mouseover(function(){
  $(".scrolling-right-panel-jobs").animate({
        'left': '-1230'
        }, 17500
        );
}
);

//DEVELOPER CENTER
$(".dev-center-api-docs").mouseover(function(){
      $(".dev-center-api-doc").css({
        'display': 'block'
        }, {queue: false}
        );
      }
    );

$("#dev-home-link").click(function(){
    $("#developer-body-slider").animate({
        'left': '0px'
        }, {queue: false}
        );
    $('html,body').animate({
    scrollTop: $("body").offset().top
    }, 500);
    $(".developer-section-sliding-panel").css({
        'height': '3280px'
        }, {queue: false}
        );
    }
    );

/*$("#dev-console-link").click(function(){
    $("#developer-body-slider").animate({
        'left': '-1240px'
        }, {queue: false}
        );
    $('html,body').animate({
    scrollTop: $("body").offset().top
    }, 500);
    $(".developer-section-sliding-panel").css({
        'height': '860px'
        }, {queue: false}
        );
    }
    );*/

$("#dev-queries-link").click(function(){
    $("#developer-body-slider").animate({
        'left': '-2480px'
        }, {queue: false}
        );
    $('html,body').animate({
    scrollTop: $("body").offset().top
    }, 500);
    $(".developer-section-sliding-panel").css({
        'height': 'auto'
        }, {queue: false}
        );
    }
    );

$("#dev-api-link").click(function(){
    $("#developer-body-slider").animate({
        'left': '-3720px'
        }, {queue: false}
        );
    $('html,body').animate({
    scrollTop: $("body").offset().top
    }, 500);
    $(".developer-section-sliding-panel").css({
        'height': '2840px'
        }, {queue: false}
        );
    }
    );

$("#dev-addons-link").click(function(){
    $("#developer-body-slider").animate({
        'left': '-4960px'
        }, {queue: false}
        );
    $('html,body').animate({
    scrollTop: $("body").offset().top
    }, 500);
    $(".developer-section-sliding-panel").css({
        'height': '380px'
        }, {queue: false}
        );
    }
    );

$(".console-execute-button").click(function(){
    $(".developer-section-sliding-panel").css({
        'height': 'auto'
        }, {queue: false}
        );
    }
    );

$(".in-body-links").click(function(){
  var adminLink = $(this).attr('id');
  var adminLinkUniform = adminLink.slice(-5);
  $('html,body').animate({
    scrollTop: $("#anchor-" + adminLinkUniform).offset().top
    }, 500);
});

$(function() {
    $.fn.scrollBottom = function() {
        return $(document).height() - this.scrollTop() - this.height();
    };

    var $el = $('#content-right-menu');
    var $window = $(window);

    $window.bind("scroll resize", function() {
        var gap = $window.height() - $el.height() - 10;
        var visibleFoot = 172 - $window.scrollBottom();
        var scrollTop = $window.scrollTop()

        if(scrollTop < 172 + 10){
            $el.css({
                top: (172 - scrollTop) + "px",
                bottom: "auto"
            });
        }else if (visibleFoot > gap) {
            $el.css({
                top: "auto",
                bottom: visibleFoot + "px"
            });
        } else {
            $el.css({
                top: 0,
                bottom: "auto"
            });
        }
    });
});

//PRICING
$(".body-pricing-difference").mouseover(function(){
      $(".body-pricing-difference-li").animate({
        'opacity': '1.0'
        }, {queue: false}
        );
      $(".body-pricing-difference ul").animate({
        'top': '180'
        }, {queue: false}
        );
    }
    );

//ABOUT
$(".about-employee").mouseenter(function(){
      $(".about-contact").animate({
        opacity: 1.0,
        top: 96
        }, {queue: false}
        );
    }
    );

$(".about-employee").mouseleave(function(){
      $(".about-contact").animate({
        opacity: 0.0,
        top: 110
        }, {queue: false}
        );
    }
    );

//NEWS AND EVENTS
$("#news-items-only").click(function(){
      $(".event-item").css({
        'display': 'none'
        }, {queue: false}
        );
      $(".news-item").css({
        'display': 'block'
        }, {queue: false}
        );
    }
    );

$("#event-items-only").click(function(){
      $(".event-item").css({
        'display': 'block'
        }, {queue: false}
        );
      $(".news-item").css({
        'display': 'none'
        }, {queue: false}
        );
    }
    );

})

// USTORE
var USTORE=(function(){var e,a,c,f,b,k,i,j,d;var g={setValue:function(l,m,n){if(e){if(n&&a){sessionStorage.setItem(l,m)}else{localStorage.setItem(l,m)}}else{if(c){if(n){i.setAttribute(l,m);i.save(d)}else{f.setAttribute(l,m);f.save(ieDb)}}}},getValue:function(m,n){var l="";if(e){if(n&&a){l=sessionStorage.getItem(m)}else{l=localStorage.getItem(m)}}else{if(c){if(n){i.load(d);l=i.getAttribute(m)}else{f.load(ieDb);l=f.getAttribute(m)}}}return l},deleteValue:function(l,m){if(e){this.setValue(l,null,m)}else{if(c){if(m){i.removeAttribute(l);i.save(d)}else{f.removeAttribute(l);f.save(ieDb)}}}},clearDB:function(l){if(e){if(l){sessionStorage.clear()}else{localStorage.clear()}}else{if(c){h.clearDB(l)}}}};var h={detectIE:function(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var l=new Number(RegExp.$1);if(l>=5.5&&l<=8){return true}}return false},init:function(){var n=document.createElement("meta");n.name="save";n.content="userdata";document.getElementsByTagName("head").item(0).appendChild(n);var m=new Date().getTime();var l=document.createElement("div");b="ie-db-"+m;ieDb="userStorage";l.setAttribute("id",b);body.appendChild(l);f=document.getElementById(b);f.style.behavior="url('#default#userData')";f.style.display="none";if(window.name===null||window.name===undefined||window.name===""){window.name="ie-sesh-db-"+m}j=window.name;d=j;l=document.createElement("div");l.setAttribute("id",j);f.appendChild(l);i=document.getElementById(j);i.style.behavior="url('#default#userData')";i.style.display="none"},clearDB:function(r){var m=new Date().getTime(),t=document.createElement("div"),l=r?i:f,p=r?d:ieDb,s=l.xmlDocument,n=s.firstChild.attributes,q,o=n.length;while(0<=--o){q=n[o];l.removeAttribute(q.nodeName)}l.save(p)}};return{init:function(){if(typeof(window.localStorage)==="object"){e=true;try{if(typeof(window.sessionStorage)==="object"){a=true}}catch(l){a=false}}else{if(h.detectIE()){c=true;h.init()}}},setValue:function(l,m){g.setValue(l,m,false)},setSessionValue:function(l,m){g.setValue(l,m,true)},getValue:function(l){return g.getValue(l,false)},getSessionValue:function(l){return g.getValue(l,true)},deleteValue:function(l){g.deleteValue(l,false)},deleteSessionValue:function(l){g.deleteValue(l,true)},clearLocalStorage:function(){g.clearDB(false)},clearSessionStorage:function(){g.clearDB(true)},clearDOMStorage:function(){g.clearDB(false);g.clearDB(true)}}})();

USTORE.init();

var JSON = JSON || { stringify : jQuery.toJSON, parse : jQuery.evalJSON },
    API = {};

(function() {
  var Util = {
    getConfiguration: function() {
      var findThisScript = function() {
        var scripts = document.getElementsByTagName('SCRIPT');

        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];
          var src = script.getAttribute('src');

          if (src && src.indexOf('default.js') != -1) {
            return script;
          }
        }

        return undefined;
      };

      return Util.parseQueryParameters(findThisScript().getAttribute('src'));
    },

    getPageConfiguration: function() {
      return Util.parseQueryParameters(window.location.href);
    },

    parseQueryParameters: function(url) {
      var index = url.indexOf('?');

      if (index < 0) return {};

      var query = url.substr(index + 1);

      var keyValuePairs = query.split('&');

      var parameters = {};

      for (var i = 0; i < keyValuePairs.length; i++) {
        var keyValuePair = keyValuePairs[i];

        var split = keyValuePair.split('=');

        var key = split[0];
        var value = '';

        if (split.length >= 2) {
          value = decodeURIComponent(split[1]);
        }

        parameters[key] = value;
      }

      return parameters;
    },

    addQueryParameters: function(url, query) {
      var suffix = url.indexOf('?') == -1 ? '?' : '&';

      var queries = [];

      for (var name in query) {
        var value = (query[name] || '').toString();

        queries.push(name + '=' + encodeURIComponent(value));
      }

      if (queries.length == 0) return url;
      else return url + suffix + queries.join('&');
    },

    getConsole: function(enabled) {
      var console = enabled ? window.console : undefined;
      if (!console) {
        console = {};

        console.log   = function() {}
        console.debug = function() {}
        console.info  = function() {}
        console.warn  = function() {}
        console.error = function() {}
      }

      return console;
    },

    createCallbacks: function(success, failure, msg) {
      var successFn = function(fn, msg) {
        if (fn) return fn;
        else return function(result) {
          if (result !== undefined) {
            API.Log.debug('Success: ' + msg + ': ' + JSON.stringify(result));
          }
          else {
            API.Log.debug('Success: ' + msg);
          }
        }
      }

      var failureFn = function(fn, msg) {
        if (fn) return fn;
        else return function(code, reason) {
          API.Log.error('Failure: ' + msg + ': code = ' + code + ', reason = ' + reason);
        }
      }

      return {
        success: successFn(success, msg),
        failure: failureFn(failure, msg)
      };
    },

    removeLeadingSlash: function(path) {
      if (path.length == 0) return path;
      else if (path.substr(0, 1) == '/') return path.substr(1);
      else return path;
    },

    removeTrailingSlash: function(path) {
      if (path.length == 0) return path;
      else if (path.substr(path.length - 1) == "/") return path.substr(0, path.length - 1);
      else return path;
    },

    removeDuplicateSlashes: function(path) {
      return path.replace(/[/]+/g, "/");
    },

    sanitizePath: function(path) {
      if (path === undefined) throw Error("path cannot be undefined");
      else return Util.removeDuplicateSlashes("/" + path + "/");
    },

    sanitizeProperty: function(property) {
      if (property === undefined) throw Error("Property cannot be undefined");
      else if (property.length == 0) return property;
      else if (property.substr(0, 1) == ".") return property;
      else return "." + property;
    },

    splitPathVar: function(pathVar) {
      if (pathVar.length == 0) return ["/", ""];
      if (pathVar.substr(0, 1) == ".") return ["/", pathVar]

      var index = pathVar.indexOf('/.');

      if (index <  0) return [Util.sanitizePath(pathVar), ""];

      return [Util.sanitizePath(pathVar.substr(0, index + 1)), pathVar.substr(index + 1)];
    },

    filter: function(c, f) {
      var result = c;

      if (c instanceof Array) {
        result = [];

        for (var i = 0; i < c.length; i++) {
          var e = c[i];

          if (f(e)) result.push(e);
        }
      }
      else if (c instanceof Object) {
        result = {};

        for (var key in c) {
          var value = c[key];

          if (f(key, value)) result[key] = value;
        }
      }

      return result;
    },

    normalizeTime: function(o, name) {
      if (name === undefined) {
        if (o instanceof Date) {
           return o.getUTCMilliseconds();
        }

        return o;
      }
      else {
        var time = o[name];

        if (time != null) {
          if (time instanceof Date) {
            o[name] = time.getUTCMilliseconds();
          }
          else if (time instanceof String) {
            o[name] = 0 + time
          }
        }

        return o[name];
      }
    },

    rangeHeaderFromStartEnd: function(options) {
      var headers = {};

      if (options.start !== undefined || options.end !== undefined) {
        var start = Util.normalizeTime(options.start) || ReportGrid.Time.Zero;
        var end   = Util.normalizeTime(options.end)   || ReportGrid.Time.Inf;

        headers.Range = 'time=' + start + '-' + end;
      }

      return headers;
    }
  }

  var Network = {
    doAjaxRequest: function(options) {
      var method   = options.method || 'GET';
      var query    = options.query || {};
      var path     = Util.addQueryParameters(options.path, query);
      var content  = options.content;
      var headers  = options.headers || {};
      var success  = options.success;
      var failure  = options.failure || function() {};

      API.Log.info('HTTP ' + method + ' ' + path + ': headers(' + JSON.stringify(headers) + '), content('+ JSON.stringify(content) + ')');

      var createNewXmlHttpRequest = function() {
        if (window.XMLHttpRequest) {
          return new XMLHttpRequest();
        }
        else {
          return new ActiveXObject("Microsoft.XMLHTTP");
        }
      }

      var request = createNewXmlHttpRequest();

      request.open(method, path);

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (request.status == 200) {
            if (request.responseText !== null && request.responseText.length > 0) {
              success(JSON.parse(this.responseText));
            }
            else {
              success(undefined);
            }
          }
          else {
            failure(request.status, request.statusText);
          }
        }
      }

      for (var name in headers) {
        var value = headers[name];

        request.setRequestHeader(name, value);
      }

      if (content !== undefined) {
        request.setRequestHeader('Content-Type', 'application/json');

        request.send(JSON.stringify(content));
      }
      else {
        request.send(null);
      }
    },

    doJsonpRequest: function(options) {
      var method   = options.method || 'GET';
      var query    = options.query || {};
      var path     = Util.addQueryParameters(options.path, query);
      var content  = options.content;
      var headers  = options.headers || {};
      var success  = options.success;
      var failure  = options.failure || function() {};

      API.Log.info('HTTP ' + method + ' ' + path + ': headers(' + JSON.stringify(headers) + '), content('+ JSON.stringify(content) + ')');

      var random   = Math.floor(Math.random() * 214748363);
      var funcName = 'ReportGridJsonpCallback' + random.toString();

      window[funcName] = function(content, meta) {
        if (meta.status.code === 200) {
          success(content);
        }
        else {
          failure(meta.status.code, meta.status.reason, content);
        }

        document.head.removeChild(document.getElementById(funcName));

        window[funcName] = undefined;
        try{
          delete window[funcName];
        }catch(e){}
      }

      var extraQuery = {};

      extraQuery.method   = method;

      for (_ in headers) { extraQuery.headers = JSON.stringify(headers); break; }

      extraQuery.callback = funcName;

      if (content !== undefined) {
        extraQuery.content = JSON.stringify(content);
      }

      var fullUrl = Util.addQueryParameters(path, extraQuery);

      var script = document.createElement('SCRIPT');

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src',  fullUrl);
      script.setAttribute('id',   funcName);

      // Workaround for document.head being undefined.
      if (! document.head)
        document.head = document.getElementsByTagName('head')[0];

      document.head.appendChild(script);
    },

    createHttpInterface: function(doRequest) {
      return {
        get: function(path, callbacks, query, headers) {
          doRequest(
            {
              method:   'GET',
              path:     path,
              headers:  headers,
              success:  callbacks.success,
              failure:  callbacks.failure,
              query:    query
            }
          );
        },

        put: function(path, content, callbacks, query, headers) {
          doRequest(
            {
              method:   'PUT',
              path:     path,
              content:  content,
              headers:  headers,
              success:  callbacks.success,
              failure:  callbacks.failure,
              query:    query
            }
          );
        },

        post: function(path, content, callbacks, query, headers) {
          doRequest(
            {
              method:   'POST',
              path:     path,
              content:  content,
              headers:  headers,
              success:  callbacks.success,
              failure:  callbacks.failure,
              query:    query
            }
          );
        },

        remove: function(path, callbacks, query, headers) {
          doRequest(
            {
              method:   'DELETE',
              path:     path,
              headers:  headers,
              success:  callbacks.success,
              failure:  callbacks.failure,
              query:    query
            }
          );
        }
      }
    }
  }

  API.PageConfig = Util.getPageConfiguration();
  API.Config = Util.getConfiguration();

  var onceMap = {};

  API.alertSafe = function(msg) {
    if (onceMap[msg] === undefined) {
      onceMap[msg] = true;

      alert(msg);
    }
  }

  API.Extend = function(object, extensions) {
    for (var name in extensions) {
      if (object[name] === undefined) {
        object[name] = extensions[name];
      }
    }
  }

  API.Bool = function(v) {
    return v === true || v === 1 || (v = (""+v).toLowerCase()) == "true" || v == "on" || v == "1";
  }

  var console = Util.getConsole(API.Bool(API.Config.enableLog));

  API.Log = {
    log:    function(text) { console.log(text);   },
    debug:  function(text) { console.debug(text); },
    info:   function(text) { console.info(text);  },
    warn:   function(text) { console.warn(text);  },
    error:  function(text) { console.error(text); }
  }

  API.Extend(API.Config,
    {
      useJsonp : "true",
      enableLog : "true"
    }
  );

  API.Http = {};

  API.Http.Ajax  = Network.createHttpInterface(Network.doAjaxRequest);
  API.Http.Jsonp = Network.createHttpInterface(Network.doJsonpRequest);

  API.Extend(API.Http, API.Bool(API.Config.useJsonp) ? API.Http.Jsonp : API.Http.Ajax);
})();