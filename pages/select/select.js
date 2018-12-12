//select.js
const util = require('../../utils/util.js')

Page({
  data: {
    type: '',
    languageArr: util.getLanguages(),
    value: 0
  },
  onLoad(option) {
    this.setData({
      type: option.type,
      start: option.start,
      end: option.end,
      value: option.type === 'start' ? option.start : option.end
    });
  },
  onClick(e){
    const index = e.currentTarget.dataset.index;
    if((index == 0 && this.data.type === 'end')) return;
    this.setData({
      value: index,
      start: this.data.type === 'start' ?  index : this.data.start,
      end: this.data.type === 'end' ?  index : this.data.end
    });

    setTimeout(() => {
      wx.reLaunch({
        url: `../../pages/index/index?start=${this.data.start}&end=${this.data.end}`
      })
    },100);
  }
});
