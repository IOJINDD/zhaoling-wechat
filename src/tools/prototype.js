/* eslint-disable */
function prototypeJS () {

  // getDate函数添加 时间格式方法
  Date.prototype.format = function (format) {
    var o = {
      'M+': this.getMonth() + 1, //month
      'd+': this.getDate(), //day
      'h+': this.getHours(), //hour
      'm+': this.getMinutes(), //minute
      's+': this.getSeconds(), //second
      'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
      'S': this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return format
  }

  /**
   * 给Array函数添加 批量设置boolean值为true的方法
   * obj - 需要改变的对象
   */
  Array.prototype.setTrue = function (obj) {
    for(let i in obj) {
      obj[i] = true
    }
    console.log(obj)
    return obj
  }

  /**
   * 给Array函数添加 批量设置boolean值为true的方法
   * obj - 需要改变的对象
   */
  Array.prototype.setFalse = function (obj) {
    for(let i in obj) {
      obj[i] = false
    }
    return obj
  }
}

export {
  prototypeJS
}
