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
  // music.src = 'http://wldevelop.com/audio/fly.mp3';
  music.addEventListener('canplay', () => {
    loader.style.display = 'none';
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
    } else {
      music.play();
    };
    const swiperH = new Swiper('.swiper-container-h', {
      autoplay: true,
      allowTouchMove: false,
      effect: 'cube',
      // pagination: {
      //   el: '.swiper-pagination-h',
      //   clickable: true,
      // },
    });
    const swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
      spaceBetween: 50,
      allowTouchMove: false,
      effect: 'slide',
      // pagination: {
      //   el: '.swiper-pagination-v',
      //   clickable: true,
      // },
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
        // document.querySelector('.swiper-pagination-h').style.display = 'none';
      };
    })
    swiperV.on('slideChange', function () {
      if (this.isEnd) {
        this.autoplay.stop();
        swiperH.autoplay.start();
      };
    })
  })
}
