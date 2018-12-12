//index.js
//获取应用实例
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    start: 0,
    end: 1,
    languages: util.getLanguages(),
    inputValue: '',
    detectionValue: '',
    translator: {},
    rawPlayFlag: true,
    resultFlag: true,
    americanFlag: true,
    britishFlag: true,
    detailedSettingDown: true,
    history: []
  },
  onLoad (option) {
    this.setData({
      start: option.start || 0,
      end: option.end || 1,
      history: wx.getStorageSync('history')||[]
    });
  },
  onInput(e){
    this.setData({
      inputValue: e.detail.value,
    });
    if(e.detail.value.length  === 0){
      this.setData({
        detectionValue: '',
        translator: {}
      });
    }
  },
  onCha(){
    this.setData({
      inputValue: '',
      detectionValue: '',
      translator: {}
    });
  },
  onConfirm(){
    const data = this.data;
    if(data.inputValue){
      api.translate(data.inputValue, {from: data.languages[data.start].code, to: data.languages[data.end].code})
          .then(res => {
            this.setData({'translator': res});
            if(data.start === 0){
              this.setData({ detectionValue: '检测到' + util.codeToValue(res.l.slice(0,res.l.indexOf('2')))});
            }
            let history = wx.getStorageSync('history')||[]
            history.unshift({ query: data.inputValue, translation: res.translation[0]})
            history.length = history.length > 15 ? 15 : history.length;
            this.setData({history: history});
            wx.setStorageSync('history', history)
          })
    }
  },
  onRawPlay(){
    const data = this.data.translator;
    if(data&&this.data.rawPlayFlag){
      const rawAudio = wx.createInnerAudioContext();
      rawAudio.src = data.speakUrl;
      rawAudio.onPlay( () => { this.setData({rawPlayFlag: false}) } );
      rawAudio.onEnded( () => { this.setData({rawPlayFlag: true}) } );
      rawAudio.play();
    }
  },
  onResult(){
    const data = this.data.translator;
    if(data&&this.data.resultFlag){
      const resultAudio = wx.createInnerAudioContext();
      resultAudio.src = data.tSpeakUrl;
      resultAudio.onPlay( () => { this.setData({resultFlag: false}) } );
      resultAudio.onEnded( () => { this.setData({resultFlag: true}) } );
      resultAudio.play();
    }
  },
  onAmerican(){
    const data = this.data.translator;
    if(data&&this.data.americanFlag){
      const americanAudio = wx.createInnerAudioContext();
      americanAudio.src = data.basic['us-speech'];
      americanAudio.onPlay( () => { this.setData({americanFlag: false}) } );
      americanAudio.onEnded( () => { this.setData({americanFlag: true}) } );
      americanAudio.play();
    }
  },
  onBritish(){
    const data = this.data.translator;
    if(data&&this.data.britishFlag){
      const britishAudio = wx.createInnerAudioContext();
      britishAudio.src = data.basic['uk-speech'];
      britishAudio.onPlay( () => { this.setData({britishFlag: false}) } );
      britishAudio.onEnded( () => { this.setData({britishFlag: true}) } );
      britishAudio.play();
    }
  },
  onCopy(){
    wx.setClipboardData({
      data: this.data.translator.translation[0],
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  onHistory(e){
    this.setData({
      inputValue: this.data.history[e.currentTarget.dataset.index].query
    });
    this.onConfirm();
  },
  onKillHistory(e){
    this.data.history.splice(e.currentTarget.dataset.index,1);
    wx.setStorageSync('history', this.data.history);
    this.setData({history: this.data.history});
  },
  onClearHistory(){
    this.data.history.length = 0;
    wx.setStorageSync('history', this.data.history);
    this.setData({history: this.data.history});
  },
  onSettingDown(){
    this.setData({detailedSettingDown: !this.data.detailedSettingDown});
  }
});
