const util = require('../../utils/util.js')

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    start: {
      type: 'number',
      value: 0
    },
    end: {
      type: 'number',
      value: 1
    },
    detectionValue: {
      type: 'string',
      value: ''
    },
    inputValue: {
      type: 'string',
      value: ''
    }
  },
  data: {
    // 这里是一些组件内部数据
    languageArr: util.getLanguages()
  },
  methods: {
    // 这里是一个自定义方法
    onClick(e) {
      const data = this.properties;
      wx.navigateTo({
        url: `../../pages/select/select?type=${e.currentTarget.dataset.type}&start=${data.start}&end=${data.end}&inputValue=${data.inputValue}`
      })
    }
  }
})