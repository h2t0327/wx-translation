const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getLanguages = () => {
  return [
    {
      language: '自动检测',
      code: 'auto'
    },{
      language: '中文',
      code: 'zh-CHS'
    },{
      language: '日文',
      code: 'ja'
    },{
      language: '英文',
      code: 'EN'
    },{
      language: '韩文',
      code: 'ko'
    },{
      language: '法文',
      code: 'fr'
    },{
      language: '俄文',
      code: 'ru'
    },{
      language: '葡萄牙文',
      code: 'pt'
    },{
      language: '西班牙文',
      code: 'es'
    },{
      language: '越南文',
      code: 'vi'
    },{
      language: '德文',
      code: 'de'
    },{
      language: '阿拉伯文',
      code: 'ar'
    },{
      language: '印尼文',
      code: 'id'
    }
  ]
};

const codeToValue = (code) => {
  const value = {
    'zh-CHS': '中文',
    'ja': '日文',
    'EN': '英文',
    'ko': '韩文',
    'fr': '法文',
    'ru': '俄文',
    'pt': '葡萄牙文',
    'es': '西班牙文',
    'vi': '越南文',
    'de': '德文',
    'ar': '阿拉伯文',
    'id': '印尼文'
  };
  return value[code];
};

module.exports = {
  formatTime: formatTime,
  getLanguages: getLanguages,
  codeToValue: codeToValue
}
