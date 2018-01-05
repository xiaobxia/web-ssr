/**
 * Created by xiaobxia on 2017/12/26.
 */
function changeTitle(title) {
  var body = document.getElementsByTagName('body')[0];
  document.title = title;
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "/favicon.ico");

  iframe.addEventListener('load', function () {
    setTimeout(function () {
      iframe.removeEventListener('load');
      document.body.removeChild(iframe);
    }, 0);
  });
  document.body.appendChild(iframe);
}

function setAdaptive() {
  var _baseFontSize = 10;
  //和width有关
  var winWidth = 0;
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth;
  }
  //通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winWidth = document.documentElement.clientWidth;
  }
  var _fontscale = winWidth / 375;
  var ua = navigator.userAgent;
  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  var dpr = parseInt((window.devicePixelRatio || 1), 10);
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  var scale = 1 / dpr;
  var metaEl = document.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    document.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  document.documentElement.style.fontSize = (_baseFontSize / 2 * dpr * _fontscale) + 'px';
  document.documentElement.setAttribute('data-dpr', dpr);
  window.adaptive = {
    winWidth: winWidth,
    dpr: dpr,
    fontSize: _baseFontSize / 2 * dpr * _fontscale
  };
}

function load(url) {
  var iFrame;
  iFrame = document.createElement("iframe");
  iFrame.setAttribute("src", url);
  iFrame.setAttribute("style", "display:none;");
  iFrame.setAttribute("height", "0px");
  iFrame.setAttribute("width", "0px");
  iFrame.setAttribute("frameborder", "0");
  document.body.appendChild(iFrame);
  iFrame.parentNode.removeChild(iFrame);
  iFrame = null;
}

function hasClass(el, cls) {
  //如果产生不对就返回
  if (!el || !cls) return false;
  //如果输入问空格
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  //["aa", "bb", value: "aa bb"]
  if (el.classList) {
    //判断是否在
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

//通过id
function $(id, oParent) {
  return (oParent || document).getElementById(id);
}
//获取tagName
function $$(tagName, oParent) {
  return (oParent || document).getElementsByTagName(tagName)
}
//通过类获取
function $$$(className, oParent) {
  return (oParent || document).getElementsByClassName(className)
}

var on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
var off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
var once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
