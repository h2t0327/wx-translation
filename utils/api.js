import md5 from './md5.min.js'

const appKey = '7168818295b4a584'
const key = 'jfdntptZOXksyuj9wuD6LyQJ4fI0iFO6'

function translate(q, { from = 'auto', to = 'zh-CHS' } = { from: 'auto', to: 'zh-CHS' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appKey}${q}${salt}${key}`)
    let voice = 0;
    wx.request({
      url: 'https://openapi.youdao.com/api',
      data: {
        q,
        from,
        to,
        appKey,
        salt,
        sign,
        voice
      },
      success(res) {
        if (res.data && res.data.query) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate