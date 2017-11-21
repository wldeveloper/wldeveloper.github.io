import Swiper from 'swiper';
require('./css/loaders.css');
require('./css/swiper.css');
require('./css/bubble.css');
require('./css/code.css');
require('./css/cursor.css');
require('./css/full.css');
require('./css/stars.scss');
const love = require('./js/go.js');
window.onload = () => {
  // loading
  const loader = document.querySelector('.loader');
  const music = document.querySelector('.music');
  music.src = 'http://music.163.com/song/media/outer/url?id=474567580.mp3';
  if (wx) {
    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: []
    });
    wx.ready(function () {
      music.play();
    });
  };
  music.play();
  music.addEventListener('canplaythrough', () => {
    loader.style.display = 'none';
    const swiperH = new Swiper('.swiper-container-h', {
      autoplay: true,
      allowTouchMove: false,
      effect: 'cube',
    });
    const swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
      spaceBetween: 50,
      allowTouchMove: false,
      effect: 'slide',
    });
    // 事件
    swiperH.on('slideChange', function () {
      if (this.activeIndex === 1) {
        this.autoplay.stop();
        swiperV.autoplay.start();
      };
      if (this.isEnd) {
        this.autoplay.stop();
        love.go();
      };
    })
    swiperV.on('slideChange', function () {
      if (this.isEnd) {
        this.autoplay.stop();
        swiperH.autoplay.start();
      };
    });
  });
};
