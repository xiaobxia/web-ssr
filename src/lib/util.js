!function(e,t){var i="__DEFAULT",o=document.createElement("div"),n=function(t){this.options=e.extend(!0,{id:"__MUI_PREVIEWIMAGE",zoom:!0,header:'<span class="mui-preview-indicator"></span>',footer:""},t||{}),this.init(),this.initEvent()},r=n.prototype;r.init=function(){var t=this.options,i=document.getElementById(this.options.id);i||(o.innerHTML='<div id="{{id}}" class="mui-slider mui-preview-image mui-fullscreen"><div class="mui-preview-header">{{header}}</div><div class="mui-slider-group"></div><div class="mui-preview-footer mui-hidden">{{footer}}</div><div class="mui-preview-loading"><span class="mui-spinner mui-spinner-white"></span></div></div>'.replace(/\{\{id\}\}/g,this.options.id).replace("{{header}}",t.header).replace("{{footer}}",t.footer),document.body.appendChild(o.firstElementChild),i=document.getElementById(this.options.id)),this.element=i,this.scroller=this.element.querySelector(e.classSelector(".slider-group")),this.indicator=this.element.querySelector(e.classSelector(".preview-indicator")),this.loader=this.element.querySelector(e.classSelector(".preview-loading")),t.footer&&this.element.querySelector(e.classSelector(".preview-footer")).classList.remove(e.className("hidden")),this.addImages()},r.initEvent=function(){var t=this;e(document.body).on("tap","img[data-preview-src]",function(){return t.open(this),!1});var i=null,o=function(){!i&&(i=e.later(function(){t.loader.removeEventListener("tap",o),t.scroller.removeEventListener("tap",o),t.close()},300))};this.scroller.addEventListener("doubletap",function(){i&&(i.cancel(),i=null)}),this.element.addEventListener("webkitAnimationEnd",function(){t.element.classList.contains(e.className("preview-out"))?(t.element.style.display="none",t.element.classList.remove(e.className("preview-out")),t.element.classList.remove(e.className("preview-in")),i=null):(t.loader.addEventListener("tap",o),t.scroller.addEventListener("tap",o))}),this.element.addEventListener("slide",function(i){if(t.options.zoom){var o=t.element.querySelector(".mui-zoom-wrapper:nth-child("+(t.lastIndex+1)+")");o&&e(o).zoom().setZoom(1)}var n=i.detail.slideNumber;t.lastIndex=n,t.indicator&&(t.indicator.innerText=n+1+"/"+t.currentGroup.length),t._loadItem(n)})},r.addImages=function(e,t){this.groups={};var o=[];if((o=e?e===i?document.querySelectorAll("img[data-preview-src]:not([data-preview-group])"):document.querySelectorAll("img[data-preview-src][data-preview-group='"+e+"']"):document.querySelectorAll("img[data-preview-src]")).length)for(var n=0,r=o.length;n<r;n++)this.addImage(o[n])},r.addImage=function(e){var t=e.getAttribute("data-preview-group");t=t||i,this.groups[t]||(this.groups[t]=[]);var o=e.getAttribute("src");if(e.__mui_img_data&&e.__mui_img_data.src===o)this.groups[t].push(e.__mui_img_data);else{var n=e.getAttribute("data-preview-src");n||(n=o);var r={src:o,lazyload:o===n?"":n,loaded:o===n,sWidth:0,sHeight:0,sTop:0,sLeft:0,sScale:1,el:e};this.groups[t].push(r),e.__mui_img_data=r}},r.empty=function(){this.scroller.innerHTML=""},r._initImgData=function(i,o){if(!i.sWidth){var n=i.el;i.sWidth=n.offsetWidth,i.sHeight=n.offsetHeight;var r=e.offset(n);i.sTop=r.top,i.sLeft=r.left,i.sScale=Math.max(i.sWidth/t.innerWidth,i.sHeight/t.innerHeight)}o.style.webkitTransform="translate3d(0,0,0) scale("+i.sScale+")"},r._getScale=function(e,t){var i=e.width/t.width,o=e.height/t.height;return i<=o?e.height/(t.height*i):e.width/(t.width*o)},r._imgTransitionEnd=function(t){var i=t.target;i.classList.remove(e.className("transitioning")),i.removeEventListener("webkitTransitionEnd",this._imgTransitionEnd.bind(this))},r._loadItem=function(t,i){var o=this.scroller.querySelector(e.classSelector(".slider-item:nth-child("+(t+1)+")")),n=this.currentGroup[t],r=o.querySelector("img");if(this._initImgData(n,r),i){var s=this._getPosition(n);r.style.webkitTransitionDuration="0ms",r.style.webkitTransform="translate3d("+s.x+"px,"+s.y+"px,0) scale("+n.sScale+")",r.offsetHeight}if(!n.loaded&&r.getAttribute("data-preview-lazyload")){var a=this;a.loader.classList.add(e.className("active")),r.style.webkitTransitionDuration="0.5s",r.addEventListener("webkitTransitionEnd",a._imgTransitionEnd.bind(a)),r.style.webkitTransform="translate3d(0,0,0) scale("+n.sScale+")",this.loadImage(r,function(){n.loaded=!0,r.src=n.lazyload,a._initZoom(o,this.width,this.height),r.classList.add(e.className("transitioning")),r.addEventListener("webkitTransitionEnd",a._imgTransitionEnd.bind(a)),r.setAttribute("style",""),r.offsetHeight,a.loader.classList.remove(e.className("active"))})}else n.lazyload&&(r.src=n.lazyload),this._initZoom(o,r.width,r.height),r.classList.add(e.className("transitioning")),r.addEventListener("webkitTransitionEnd",this._imgTransitionEnd.bind(this)),r.setAttribute("style",""),r.offsetHeight;this._preloadItem(t+1),this._preloadItem(t-1)},r._preloadItem=function(t){var i=this.scroller.querySelector(e.classSelector(".slider-item:nth-child("+(t+1)+")"));if(i){var o=this.currentGroup[t];if(!o.sWidth){var n=i.querySelector("img");this._initImgData(o,n)}}},r._initZoom=function(t,i,o){if(this.options.zoom&&!t.getAttribute("data-zoomer")){if("IMG"===t.querySelector(e.classSelector(".zoom")).tagName){var n=this._getScale({width:t.offsetWidth,height:t.offsetHeight},{width:i,height:o});e(t).zoom({maxZoom:Math.max(n,1)})}else e(t).zoom()}},r.loadImage=function(e,t){var i=function(){t&&t.call(this)},o=new Image;o.onload=i,o.onerror=i,o.src=e.getAttribute("data-preview-lazyload")},r.getRangeByIndex=function(e,t){return{from:0,to:t-1}},r._getPosition=function(e){var i=e.sLeft-t.pageXOffset,o=e.sTop-t.pageYOffset;return{left:i,top:o,x:i-(t.innerWidth-e.sWidth)/2,y:o-(t.innerHeight-e.sHeight)/2}},r.refresh=function(i,o){this.currentGroup=o;for(var n=o.length,r=[],s=this.getRangeByIndex(i,n),a=s.from,l=s.to+1,c=i,d="",m="",u=(t.innerWidth,t.innerHeight,0);a<l;a++,u++){var h=o[a],p="";h.sWidth&&(p="-webkit-transform:translate3d(0,0,0) scale("+h.sScale+");transform:translate3d(0,0,0) scale("+h.sScale+")"),m='<div class="mui-slider-item mui-zoom-wrapper {{className}}"><div class="mui-zoom-scroller"><img src="{{src}}" data-preview-lazyload="{{lazyload}}" style="{{style}}" class="mui-zoom"></div></div>'.replace("{{src}}",h.src).replace("{{lazyload}}",h.lazyload).replace("{{style}}",p),a===i?(c=u,d=e.className("active")):d="",r.push(m.replace("{{className}}",d))}this.scroller.innerHTML=r.join(""),this.element.style.display="block",this.element.classList.add(e.className("preview-in")),this.lastIndex=c,this.element.offsetHeight,e(this.element).slider().gotoItem(c,0),this.indicator&&(this.indicator.innerText=c+1+"/"+this.currentGroup.length),this._loadItem(c,!0)},r.openByGroup=function(e,t){e=Math.min(Math.max(0,e),this.groups[t].length-1),this.refresh(e,this.groups[t])},r.open=function(e,t){this.isShown()||("number"==typeof e?(t=t||i,this.addImages(t,e),this.openByGroup(e,t)):(t=(t=e.getAttribute("data-preview-group"))||i,this.addImages(t,e),this.openByGroup(this.groups[t].indexOf(e.__mui_img_data),t)))},r.close=function(i,o){if(this.isShown()){this.element.classList.remove(e.className("preview-in")),this.element.classList.add(e.className("preview-out"));var n=this.scroller.querySelector(e.classSelector(".slider-item:nth-child("+(this.lastIndex+1)+")")).querySelector("img");if(n){n.classList.add(e.className("transitioning"));var r=this.currentGroup[this.lastIndex],s=this._getPosition(r),a=s.left,l=s.top;l>t.innerHeight||a>t.innerWidth||l<0||a<0?(n.style.opacity=0,n.style.webkitTransitionDuration="0.5s",n.style.webkitTransform="scale("+r.sScale+")"):(this.options.zoom&&e(n.parentNode.parentNode).zoom().toggleZoom(0),n.style.webkitTransitionDuration="0.5s",n.style.webkitTransform="translate3d("+s.x+"px,"+s.y+"px,0) scale("+r.sScale+")")}for(var c=this.element.querySelectorAll(e.classSelector(".zoom-wrapper")),d=0,m=c.length;d<m;d++)e(c[d]).zoom().destroy();e(this.element).slider().destroy()}},r.isShown=function(){return this.element.classList.contains(e.className("preview-in"))};var s=null;e.previewImage=function(e){return s||(s=new n(e)),s},e.getPreviewImage=function(){return s}}(mui,window),function(e,t){var i="."+e.className("zoom"),o="."+e.className("zoom-scroller"),n="pinchstart",r="pinch",s="pinchend";"ongesturestart"in t&&(n="gesturestart",r="gesturechange",s="gestureend"),e.Zoom=function(t,a){var l=this;l.options=e.extend(e.Zoom.defaults,a),l.wrapper=l.element=t,l.scroller=t.querySelector(o),l.scrollerStyle=l.scroller&&l.scroller.style,l.zoomer=t.querySelector(i),l.zoomerStyle=l.zoomer&&l.zoomer.style,l.init=function(){e.options.gestureConfig.pinch=!0,e.options.gestureConfig.doubletap=!0,l.initEvents()},l.initEvents=function(t){var i=t?"removeEventListener":"addEventListener",o=l.scroller;o[i](n,l.onPinchstart),o[i](r,l.onPinch),o[i](s,l.onPinchend),o[i](e.EVENT_START,l.onTouchstart),o[i](e.EVENT_MOVE,l.onTouchMove),o[i](e.EVENT_CANCEL,l.onTouchEnd),o[i](e.EVENT_END,l.onTouchEnd),o[i]("drag",l.dragEvent),o[i]("doubletap",l.doubleTapEvent)},l.dragEvent=function(e){(v||u)&&e.stopPropagation()},l.doubleTapEvent=function(e){l.toggleZoom(e.detail.center)},l.transition=function(e,t){return t=t||0,e.webkitTransitionDuration=t+"ms",l},l.translate=function(e,t,i){return t=t||0,i=i||0,e.webkitTransform="translate3d("+t+"px,"+i+"px,0px)",l},l.scale=function(e,t){return t=t||1,e.webkitTransform="translate3d(0,0,0) scale("+t+")",l},l.scrollerTransition=function(e){return l.transition(l.scrollerStyle,e)},l.scrollerTransform=function(e,t){return l.translate(l.scrollerStyle,e,t)},l.zoomerTransition=function(e){return l.transition(l.zoomerStyle,e)},l.zoomerTransform=function(e){return l.scale(l.zoomerStyle,e)};var c=1,d=1,m=!1,u=!1;l.onPinchstart=function(e){u=!0},l.onPinch=function(e){m||(l.zoomerTransition(0),m=!0),(c=(e.detail?e.detail.scale:e.scale)*d)>l.options.maxZoom&&(c=l.options.maxZoom-1+Math.pow(c-l.options.maxZoom+1,.5)),c<l.options.minZoom&&(c=l.options.minZoom+1-Math.pow(l.options.minZoom-c+1,.5)),l.zoomerTransform(c)},l.onPinchend=function(e){c=Math.max(Math.min(c,l.options.maxZoom),l.options.minZoom),l.zoomerTransition(l.options.speed).zoomerTransform(c),d=c,m=!1},l.setZoom=function(e){c=d=e,l.scrollerTransition(l.options.speed).scrollerTransform(0,0),l.zoomerTransition(l.options.speed).zoomerTransform(c)},l.toggleZoom=function(t,i){if("number"==typeof t&&(i=t,t=void 0),i=void 0===i?l.options.speed:i,c&&1!==c)c=d=1,l.scrollerTransition(i).scrollerTransform(0,0);else if(c=d=l.options.maxZoom,t){var o=e.offset(l.zoomer),n=o.top,r=o.left,s=(t.x-r)*c,a=(t.y-n)*c;this._cal(),s>=E&&s<=E+h?s=E-s+h/2:s<E?s=E-s+h/2:s>E+h&&(s=E+h-s-h/2),a>=b&&a<=b+p?a=b-a+p/2:a<b?a=b-a+p/2:a>b+p&&(a=b+p-a-p/2),s=Math.min(Math.max(s,w),E),a=Math.min(Math.max(a,T),b),l.scrollerTransition(i).scrollerTransform(s,a)}else l.scrollerTransition(i).scrollerTransform(0,0);l.zoomerTransition(i).zoomerTransform(c)},l._cal=function(){h=l.wrapper.offsetWidth,p=l.wrapper.offsetHeight,x=l.zoomer.offsetWidth,_=l.zoomer.offsetHeight;var e=x*c,t=_*c;w=Math.min(h/2-e/2,0),E=-w,T=Math.min(p/2-t/2,0),b=-T};var h,p,f,v,g,y,w,T,E,b,x,_,z,S,L,M,N,A,I,W={},Z={};return l.onTouchstart=function(t){f=!0,W.x=t.type===e.EVENT_START?t.targetTouches[0].pageX:t.pageX,W.y=t.type===e.EVENT_START?t.targetTouches[0].pageY:t.pageY},l.onTouchMove=function(t){if(t.preventDefault(),f){if(!v){h=l.wrapper.offsetWidth,p=l.wrapper.offsetHeight,x=l.zoomer.offsetWidth,_=l.zoomer.offsetHeight;var i=e.parseTranslateMatrix(e.getStyles(l.scroller,"webkitTransform"));z=i.x||0,S=i.y||0,l.scrollerTransition(0)}var o=x*c,n=_*c;o<h&&n<p||(w=Math.min(h/2-o/2,0),E=-w,T=Math.min(p/2-n/2,0),b=-T,Z.x=t.type===e.EVENT_MOVE?t.targetTouches[0].pageX:t.pageX,Z.y=t.type===e.EVENT_MOVE?t.targetTouches[0].pageY:t.pageY,v||m||!(Math.floor(w)===Math.floor(z)&&Z.x<W.x||Math.floor(E)===Math.floor(z)&&Z.x>W.x)?(v=!0,g=Z.x-W.x+z,y=Z.y-W.y+S,g<w&&(g=w+1-Math.pow(w-g+1,.8)),g>E&&(g=E-1+Math.pow(g-E+1,.8)),y<T&&(y=T+1-Math.pow(T-y+1,.8)),y>b&&(y=b-1+Math.pow(y-b+1,.8)),L||(L=Z.x),A||(A=Z.y),M||(M=e.now()),N=(Z.x-L)/(e.now()-M)/2,I=(Z.y-A)/(e.now()-M)/2,Math.abs(Z.x-L)<2&&(N=0),Math.abs(Z.y-A)<2&&(I=0),L=Z.x,A=Z.y,M=e.now(),l.scrollerTransform(g,y)):f=!1)}},l.onTouchEnd=function(e){if(e.touches.length||(u=!1),!f||!v)return f=!1,void(v=!1);f=!1,v=!1;var t=300,i=300,o=g+N*t,n=y+I*i;0!==N&&(t=Math.abs((o-g)/N)),0!==I&&(i=Math.abs((n-y)/I));var r=Math.max(t,i);g=o,y=n;var s=x*c,a=_*c;w=Math.min(h/2-s/2,0),E=-w,T=Math.min(p/2-a/2,0),b=-T,g=Math.max(Math.min(g,E),w),y=Math.max(Math.min(y,b),T),l.scrollerTransition(r).scrollerTransform(g,y)},l.destroy=function(){l.initEvents(!0),delete e.data[l.wrapper.getAttribute("data-zoomer")],l.wrapper.setAttribute("data-zoomer","")},l.init(),l},e.Zoom.defaults={speed:300,maxZoom:3,minZoom:1},e.fn.zoom=function(t){var i=[];return this.each(function(){var o=null,n=this.getAttribute("data-zoomer");n?o=e.data[n]:(n=++e.uuid,e.data[n]=o=new e.Zoom(this,t),this.setAttribute("data-zoomer",n)),i.push(o)}),1===i.length?i[0]:i}}(mui,window);function changeTitle(e){document.getElementsByTagName("body")[0];document.title=e;var t=document.createElement("iframe");t.setAttribute("src","/favicon.ico"),t.addEventListener("load",function(){setTimeout(function(){t.removeEventListener("load"),document.body.removeChild(t)},0)}),document.body.appendChild(t)}function setAdaptive(){var e=0;window.innerWidth?e=window.innerWidth:document.body&&document.body.clientWidth&&(e=document.body.clientWidth),document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientWidth&&(e=document.documentElement.clientWidth);var t=e/375,i=navigator.userAgent,o=i.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),n=i.match(/U3\/((\d+|\.){5,})/i),r=n&&parseInt(n[1].split(".").join(""),10)>=80,s=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),a=parseInt(window.devicePixelRatio||1,10);s||o&&o[1]>534||r||(a=1);var l=1/a,c=document.querySelector('meta[name="viewport"]');c||((c=document.createElement("meta")).setAttribute("name","viewport"),document.head.appendChild(c)),c.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+l+",maximum-scale="+l+",minimum-scale="+l),document.documentElement.style.fontSize=5*a*t+"px",document.documentElement.setAttribute("data-dpr",a),window.adaptive={winWidth:e,dpr:a,fontSize:5*a*t}}function load(e){var t;(t=document.createElement("iframe")).setAttribute("src",e),t.setAttribute("style","display:none;"),t.setAttribute("height","0px"),t.setAttribute("width","0px"),t.setAttribute("frameborder","0"),document.body.appendChild(t),t.parentNode.removeChild(t),t=null}function hasClass(e,t){if(!e||!t)return!1;if(-1!==t.indexOf(" "))throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function addClass(e,t){if(e){for(var i=e.className,o=(t||"").split(" "),n=0,r=o.length;n<r;n++){var s=o[n];s&&(e.classList?e.classList.add(s):hasClass(e,s)||(i+=" "+s))}e.classList||(e.className=i)}}function removeClass(e,t){if(e&&t){for(var i=t.split(" "),o=" "+e.className+" ",n=0,r=i.length;n<r;n++){var s=i[n];s&&(e.classList?e.classList.remove(s):hasClass(e,s)&&(o=o.replace(" "+s+" "," ")))}e.classList||(e.className=trim(o))}}function $(e,t){return(t||document).getElementById(e)}function $$(e,t){return(t||document).getElementsByTagName(e)}function $$$(e,t){return(t||document).getElementsByClassName(e)}var on=document.addEventListener?function(e,t,i){e&&t&&i&&e.addEventListener(t,i,!1)}:function(e,t,i){e&&t&&i&&e.attachEvent("on"+t,i)},off=document.removeEventListener?function(e,t,i){e&&t&&e.removeEventListener(t,i,!1)}:function(e,t,i){e&&t&&e.detachEvent("on"+t,i)},once=function(e,t,i){var o=function(){i&&i.apply(this,arguments),off(e,t,o)};on(e,t,o)};