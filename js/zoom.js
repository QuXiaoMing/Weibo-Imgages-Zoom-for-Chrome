// @屈晓明 xm726@qq.com
// V 0.1.0
// 2016年7月18日

var windowHight = $(window).height();
var windowWidth = $(window).width();
// console.log(windowHight,windowWidth);
var BoxIsShowed = false;
var zoomBox = $('<div id="qxm"></div>').css({
  'position': 'fixed',
  'pointer-events': 'none',
  'display': 'none',
  'top': '50%',
  'bottom': '50%',
  'left': '50%',
  'border': ' 1px solid #fff',
  'background-color': '#fff',
  'z-index': '999'
});
$('<img>').attr('src', ' ').appendTo(zoomBox);
var resetZoomBox = function () {
  var img = zoomBox.find('img');
  var imgHeight = img.height();
  var imgWidth = img.width();  
  if (imgHeight > windowHight) {
    img.height(windowHight - 80);
    console.log(imgHeight, windowHight)
  }
  zoomBox.css({
    'top': 0.5 * (45 + windowHight - img.height()),
    'height': img.height()
  })
}
var intZoomBox = function () {
  zoomBox.appendTo($('body'));
  console.log(zoomBox);
  console.log('div has appeded');
}
intZoomBox();
function getRealSrc(src) {
  // 缩略图地址 http://ww2.sinaimg.cn/orj480/718878b5jw1f5gqz9yy4hj20go0c8go5.jpg
  // 真实地址 http://ww2.sinaimg.cn/mw1024/718878b5jw1f5gqz9yy4hj20go0c8go5.jpg
  var str = ''
  var zoomBoxSHowed = false;
  if (src.indexOf('orj480') > 0) {
    str = src.replace('orj480', 'mw1024');
  }
  if (src.indexOf('thumb180' > 0)) {
    str = src.replace('thumb180', 'mw1024');
  }
  return str
}
var showZoomBox = function (realSrc) {
  zoomBox.find('img').attr('src', realSrc);
  zoomBox.show();
  resetZoomBox();
  console.log('div has show');
}
var hideZoomBox = function () {
  zoomBox.hide();
  console.log('div has hide');
}
setTimeout(function () {
  //processing 
  //   console.log('setTimeouBagin');
  mediaBox = $('.media_box img').parent();
  mediaBox.mouseover(function () {
    if (!BoxIsShowed) {
      var src = $(this).find('img').attr('src');
      var realSrc = getRealSrc(src);
      console.log($(this).offset().top, $(this).offset().left) //       console.log(src);
      //       console.log(realSrc);      
      showZoomBox(realSrc);
      BoxIsShowed = true;
    }
  }
  ).mouseleave(function () {
    if (BoxIsShowed) {
      hideZoomBox();
      BoxIsShowed = false;
    }
  }
  ) //   console.log('setTimeouEnd');
  setTimeout(arguments.callee, 1000);
}, 1000);
