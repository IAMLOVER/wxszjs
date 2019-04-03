/*
 * 发送用户信息
 * parameter:{code, iv, encryptedData}
 */
import request from "./request"

const sendUserInfo = function(code, iv, encryptedData, fun) {
  request.request(false, path.basePath.supercardPath + "user/login", {
      "code": code,
      "iv": iv,
      "encryptedData": encryptedData
    },
    "POST",
    function(res) {
      var data = res.data;
      if (data.code == 200) {
        wx.setStorageSync("uToken", data.data) //设置userid缓存
        fun(data)
        console.log(wx.getStorageSync('uToken'))
        const datas = data.data;
      } else {
        wx.showToast({
          title: data.status,
          icon: 'none',
          duration: 2000
        })
      }
    }
  )
}
module.exports.sendUserInfo = sendUserInfo;