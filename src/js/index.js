/**
 * Created by xiaobxia on 2017/12/20.
 */
//图片滚动
mui.init({
  swipeBack: true //启用右滑关闭功能
});
var slider = mui("#slider");
document.querySelector("#slider").addEventListener('slide', function (event) {
  document.querySelector('#slider-number-index').innerHTML = event.detail.slideNumber + 1;
}, false);
//图片放大
mui.previewImage();

mui('.mui-scroll-wrapper').scroll({
  scrollY: false, //是否竖向滚动
  scrollX: true, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: false, //是否显示滚动条
  deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});

var $likeBtn = $('like-btn');
var $likeIcon = $('like-icon');
on($likeBtn, 'click', function () {
  mui.ajax('/user/attention', {
    data: {
      businessNum,
      businessType: '小区',
      userId,
      sysType: '1',
      attentionState: attentionState === '0' ? '1' : '0'
    },
    dataType: 'json',//服务器返回json格式数据
    type: 'get',//HTTP请求类型
    success: function (data) {
      console.log(data);
      if (data.success === true) {
        if (attentionState === '0') {
          attentionState = '1';
          addClass($likeIcon, 'active');
        } else if (attentionState === '1') {
          attentionState = '0';
          removeClass($likeIcon, 'active');
        }
      }
    }
  });
});


mui('body').on('tap','a',function(){
  if (hasClass(this, 'link-a')) {
    document.location.href=this.href;
  }
});


