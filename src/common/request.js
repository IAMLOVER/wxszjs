/*
 *@ request请求
 *@ parameter:{isloading, url, data, method, fun}
 */
const request = function(isloading, url, data, method, fun) {
  if (isloading) {
    wepy.showLoading({
      mask: true,
      title: '加载中',
    })
  }
  const requestTask = wepy.request({
    url: url,
    data: data,
    method: method,
    //  responseType:"json",
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function(res) {
      if (res.statusCode == 200) {
        fun(res)
        if (isloading) {
          setTimeout(function() {
            wepy.hideLoading()
          }, 1500)
        }
      }
    },
    fail: function(res) {
      if (isloading) {
        wepy.hideLoading()
      }
      if (res.errMsg != 'request:fail ') {
        if (res.data.status == 404) {
          wepy.showToast({
            title: "可能你的网络有问题哦，稍后再试试吧",
            icon: 'none',
            duration: 2000
          })
        }
      }
      //console.log("扫码："+JSON.stringify(res))
    },
    complete: function(res) {
      // console.log(res)
      wepy.getNetworkType({
        success: function(res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          const networkType = res.networkType;
          if (networkType == '5g' || networkType == '4g' || networkType == '3g' || networkType == 'wifi') {
          } else if (networkType == '2g') {
            
          } else if (networkType == 'none' || networkType == 'unknown') {

          } else {
            wepy.showToast({
              title: "可能你的网络有问题哦，稍后再试试吧",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  })
}
module.exports.request = request;