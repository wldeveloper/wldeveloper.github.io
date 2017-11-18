import Swiper from 'swiper';
require('./css/swiper.css');
require('./css/bubble.css');
require('./css/code.css');
require('./css/cursor.css');
require('./css/full.css');
require('./css/stars.scss');
const love = require('./js/go.js');
window.onload = () => {
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
}
