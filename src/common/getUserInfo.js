/*
     *@ request请求
     *@ parameter:{that, fun}
*/
import sendUserInfo from "./sendUserInfo"
const getUserInfo_ = function (that,fun){
     if(!that) return false;
     wx.login({    //登陆
       success: function (res) {
        //  console.log(res);
         if (res.code) {
           let code = res.code;
          //  console.log(code);
           that.setData({
             code:code
           })
           wx.getSetting({     //查看是否授权
             success: function (res) {
              //  console.log(res);
               if (res.authSetting['scope.userInfo']) {
                 // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                 wx.showLoading({
                   title: '正在加载...'
                 })
                 that.setData({
                   model: false
                 })
                 wx.getUserInfo({
                   success: function (res) {
                     let iv = res.iv;
                     let encryptedData = res.encryptedData;
                     sendUserInfo.sendUserInfo(code, iv, encryptedData, function () {
                       var uToken = wx.getStorageSync("uToken");
                       if (uToken) {
                        fun&&fun();
                        wx.hideLoading();
                       }
                     })
                   }
                 })
               } else {    //没有授权
                //  that.setData({   //弹窗
                //    model:true
                //  })
               }
             }
           })
         } else {
           wx.showToast({
             title: "小程序登录失败!" + res.errMsg,
             icon: 'none',
             duration: 2000
           })
         }
       }
     })
}
module.exports.getUserInfo_ = getUserInfo_;

