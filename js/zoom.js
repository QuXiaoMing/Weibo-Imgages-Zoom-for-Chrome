// @屈晓明 xm726@qq.com
// V 0.1.0
// 2016年7月18日

let windowHight = $(window).height();
let windowWidth = $(window).width();
let BoxIsShowed = false;
let zoomBox = $('<div"></div>').css({
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
let resetZoomBox = function () {
  let img = zoomBox.find('img');
  let imgHeight = img.height();
  let imgWidth = img.width();
  if (imgHeight > windowHight) {
    img.height(windowHight - 80);
  }
  zoomBox.css({
    'top': 0.5 * (45 + windowHight - img.height()),
    'height': img.height()
  })
}
let intZoomBox = function () {
  zoomBox.appendTo($('body'));
  console.log(zoomBox);
  console.log('div has appeded');
}
intZoomBox();
function getRealSrc (src) {
  // 缩略图地址 http://ww2.sinaimg.cn/orj480/718878b5jw1f5gqz9yy4hj20go0c8go5.jpg
  // 真实地址 http://ww2.sinaimg.cn/mw1024/718878b5jw1f5gqz9yy4hj20go0c8go5.jpg
  let str = ''
  let zoomBoxSHowed = false;
  if (src.indexOf('orj480') > 0) {
    str = src.replace('orj480', 'mw1024');
  }
  if (src.indexOf('thumb180' > 0)) {
    str = src.replace('thumb180', 'mw1024');
  }
  return str
}
let showZoomBox = function (realSrc) {
  zoomBox.find('img').attr('src', realSrc);
  zoomBox.show();
  resetZoomBox();
}
let hideZoomBox = function () {
  zoomBox.hide();
}
setTimeout(function () {
  let mediaBox = $('.media_box img').parent();
  mediaBox.mouseover(function () {
    if (!BoxIsShowed) {
      let src = $(this).find('img').attr('src');
      let realSrc = getRealSrc(src);
      showZoomBox(realSrc);
      BoxIsShowed = true;
    }
  }).mouseleave(function () {
    if (BoxIsShowed) {
      hideZoomBox();
      BoxIsShowed = false;
    }
  })
  // 更新 mediaBox
  setTimeout(arguments.callee, 1000);
}, 1000);
