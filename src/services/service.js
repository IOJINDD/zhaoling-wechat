import urls from './uris.js'

/**
 * @param {string} params - 解析的数据
 */
function _DataToFormdata (params) {
  let formData = new FormData()
  for (let name in params) {
    formData.append(name, params[name])
  }
  return formData
}

// 发布失物信息
function addLosePickInfo (params) {
  return this.$http.post(urls.addLosePickInfo, params)
    .then((resp) => {
      console.log(resp)
      return resp.data
    })
}

// 列出所有的失物招领信息
function listLosePickInfo (params, pageNum, pageSize) {
  return this.$http.post(urls.listLosePickInfo + '/' + pageNum + '/' + pageSize, params)
    .then((resp) => {
      return resp.data
    })
}

// 根据参数类别查找系统参数
function selectByType (params) {
  return this.$http.post(urls.selectByType, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * @param {*} params - 图片文件
 * @param {*} type - 发布物品类别
 * @param {*} pickOrLose - 招领（PICK）/失物(LOSE)
 */
function MultipartFile (params, type) {
  let formData = _DataToFormdata({
    image: params
  })
  return this.$http.post(urls.MultipartFile + '/' + type, formData)
    .then((resp) => {
      return resp.data
    })
}

// 个人获取详细的失物招领信息
function showInfoDetail (params) {
  return this.$http.get(urls.showInfoDetail + '/' + params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 获取验证码
 * @param {String} mobilePhone - 手机号码
 * @param {String} type - 验证码类别
 */
function sendLoginVerifyCode (mobilePhone, type) {
  return this.$http.get(urls.sendLoginVerifyCode + '/' + mobilePhone + '/' + type)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 双向呼叫
 * @param {*} phone - 主叫号码
 * @param {*} losePickInfoId - 失物招领Id
 */
function doubleCall (phone, losePickInfoId) {
  return this.$http.get(urls.doubleCall + '/' + phone + '/' + losePickInfoId)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 列出所有招领处
 * @param {*} params  - 搜索参数
 * @param {*} pageNo  - 当前页数
 * @param {*} pageSize - 请求页数（）
 */
function listServiceStation (params, pageNo, pageSize) {
  return this.$http.post(urls.listServiceStation + '/' + pageNo + '/' + pageSize, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 查看招领处的详细信息
 * @param {*} id - 招领处id
 */
function showServiceStationDetail (id) {
  return this.$http.get(urls.showServiceStationDetail + '/' + id)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 登录
 * @param {Object} params - private String mobilePhone;private String code;
 */
function login (params) {
  return this.$http.post(urls.login, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 注销
 */
function logout () {
  return this.$http.get(urls.logout)
    .then((resp) => {
      return resp.data
    })
}

/**
 * -用户-获得用户详细信息
 * @param {*} id - 用户id
 */
function getUserById (id) {
  return this.$http.get(urls.getUserById + '/' + id)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 用户-更新用户信息
 * @param {OBJECT} params - 更新数据
 */
function updateUser (params) {
  return this.$http.post(urls.updateUser, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 *-微信- 获取JsSDK签名
 * @param {OBJECT} params - url
 */
function JsJdkParams (param) {
  return this.$http.post(urls.JsJdkParams, param)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 列出所有的失物招领信息（个人）
 * @param {*} params  - 搜索参数
 * @param {*} pageNo  - 当前页数
 * @param {*} pageSize - 请求页数（）
 */
function selfAllInfo (params, pageNo, pageSize) {
  return this.$http.post(urls.selfAllInfo + '/' + pageNo + '/' + pageSize, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 【接口】-
 * @param {*} id - 失物招领表id
 */
function delLosePickInfo (id) {
  return this.$http.get(urls.delLosePickInfo + '/' + id)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 修改失物招领信息
 * @param {*} params - 保存参数
 */
function updateLosePickInfo (params) {
  return this.$http.post(urls.updateLosePickInfo, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 增加一条核查信息
 * @param {*} params - 保存参数
 */
function addCheckInfo (params) {
  return this.$http.post(urls.addCheckInfo, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * -查找我认领的信息
 */
function LosePickInfoDto () {
  return this.$http.get(urls.LosePickInfoDto)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 修改信息上传图片
 * @param {*} params - 文件参数
 * @param {*} type - PUBLISH 或者 CLAIM
 * @param {*} losePickInfoId - 招领id
 */
function addImg (params, type, losePickInfoId) {
  let formData = _DataToFormdata({
    image: params
  })
  return this.$http.post(urls.addImg + '/' + type + '/' + losePickInfoId, formData)
    .then((resp) => {
      return resp.data
    })
}

/**
 *  修改信息删除图片
 * @param {Object} path - 删除图片的路径
 */
function delImg (path) {
  return this.$http.post(urls.delImg, path)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 查看详细的失物招领信息
 * @param {string} id - 信息id
 */
function getOneLosePickInfo (id) {
  return this.$http.get(urls.getOneLosePickInfo + '/' + id)
    .then((resp) => {
      return resp.data
    })
}

/**
 * -微信 - 获取openId
 * @param {string} wxCode - 信息wxCode
 */
function getWeiXinOpenId (wxCode) {
  return this.$http.get(urls.getWeiXinOpenId + '/' + wxCode + '/wxcode')
    .then((resp) => {
      return resp.data
    })
}

/**
 * -微信-微信支付接口
 * @param {OBJECT} params - 相关参数
 *
 */
function wechatPay (params) {
  return this.$http.post(urls.wechatPay, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 招领处自助申请
 * @param {*} params - 相关参数
 */
function applyServiceStation (params) {
  return this.$http.post(urls.applyServiceStation, params)
    .then((resp) => {
      return resp.data
    })
}
/**
 *  列出所有感谢信
 * @param {*} pageNO - 当前页码
 * @param {*} pageSize  - 请求页数
 * @param {*} stationId - 招领处id
 */
function listThanksEmail (pageNO, pageSize, stationId) {
  return this.$http.get(urls.listThanksEmail + '/' + pageNO + '/' + pageSize + '/' + stationId)
    .then((resp) => {
      return resp.data
    })
}

/**
 *  发送感谢信
 * @param {*} params ：

    private Long serviceStation;

    private String content;

    private String authCode;

    private String phone;

    private String sex;
 */
function addThanksEmail (params) {
  return this.$http.post(urls.addThanksEmail, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * - 追加悬赏
 * @param {*} params - id, awardBonus
 */
function rewardForInfo (params) {
  return this.$http.post(urls.rewardForInfo, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * - 快捷认领
 * @param {*} params - 分页搜索参数
 */
function fastList (params) {
  return this.$http.post(urls.fastList, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 证件挂失
 * @param {*} params - 提交参数
 */
function cardReportLoss (params) {
  return this.$http.post(urls.cardReportLoss, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 挂失记录查询
 * @param {*} params - 搜索参数
 */
function findReportLoss (params) {
  return this.$http.post(urls.findReportLoss, params)
    .then((resp) => {
      return resp.data
    })
}

function currentUserEntity () {
  return this.$http.get(urls.currentUserEntity)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 用户申请退款
 * params - id
 */
function applyToRefund (params) {
  return this.$http.post(urls.applyToRefund, params)
    .then((resp) => {
      return resp.data
    })
}

/**
 * 用户修改密码
 * @param {*} params - 所需参数
 */
function modifyPassword (params) {
  return this.$http.post(urls.modifyPassword, params)
  .then((resp) => {
    return resp.data
  })
}

/**
 *  获取芝麻信用
 * @param {*} name - 姓名
 * @param {*} certNo - 证件号
 */
function getPayment (name, certNo) {
  return this.$http.get(urls.getPayment + 'name=' + encodeURI(encodeURI(name)) + '&certNo=' + certNo)
  .then((resp) => {
    return resp.data
  })
}

export {
  addLosePickInfo,
  listLosePickInfo,
  selectByType,
  showInfoDetail,
  MultipartFile,
  sendLoginVerifyCode,
  doubleCall,
  listServiceStation,
  showServiceStationDetail,
  login,
  getUserById,
  updateUser,
  JsJdkParams,
  selfAllInfo,
  delLosePickInfo,
  updateLosePickInfo,
  addCheckInfo,
  LosePickInfoDto,
  addImg,
  delImg,
  getOneLosePickInfo,
  logout,
  getWeiXinOpenId,
  wechatPay,
  listThanksEmail,
  addThanksEmail,
  rewardForInfo,
  currentUserEntity,
  fastList,
  cardReportLoss,
  findReportLoss,
  applyToRefund,
  applyServiceStation,
  modifyPassword,
  getPayment
}
