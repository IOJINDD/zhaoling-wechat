const uris = {
  addLosePickInfo: '/api/add/lose/pick/info', // 发布失物信息
  listLosePickInfo: '/api/free/list/lose/pick/info', // 列出所有的失物招领信息
  selectByType: '/api/sysParame/select/by/type', // 根据参数类别查找系统参数
  showInfoDetail: '/api/show/info/detail',  // 个人获取详细的失物招领信息
  MultipartFile: '/api/upload', // -基础- 上传图片
  sendLoginVerifyCode: '/api/free/send/code', // -基础- 上传图片
  doubleCall: '/api/free/call', // 双向回呼
  listServiceStation: '/api/list/service/station', // 列出所有招领处
  showServiceStationDetail: '/api/show/service/station/detail', // 查看招领处详情
  login: '/api/login', // 用户-登陆
  logout: '/api/logout', // 用户-注销
  modifyPassword: '/api/modify/user/password', // 用户-修改密码
  getUserById: '/api/show/user/detail', // 用户-获取用户信息
  updateUser: '/api/update/user/info', // 用户-更新用户信息
  JsJdkParams: '/api/free/js/jdk', // 微信- 获取JsSDK签名
  delLosePickInfo: '/api/del/lose/pick/info', // 下架失物招领信息
  addCheckInfo: '/api/add/check/info', // -增加一条核查信息
  updateLosePickInfo: '/api/update/lose/pick/info', // 修改失物招领信息
  selfAllInfo: '/api/list/lose/pick/info', // 列出所有的失物招领信息（个人）
  LosePickInfoDto: '/api/claim/by/myself', // 查找我认领的信息
  addImg: '/api/add/img', // 修改信息上传图片
  delImg: '/api/del/img', // 修改信息删除图片
  getWeiXinOpenId: '/api/weixin/code', // 微信 - 获取openId
  wechatPay: '/api/free/wechat/pay', // 微信-微信支付接口
  getOneLosePickInfo: '/api/find/one/lose/pick/info', // 查看详细的失物招领信息
  listThanksEmail: '/api/list/thanks/email', // 列出所有感谢信
  addThanksEmail: '/api/thanks/email', // 发送感谢信
  rewardForInfo: '/api/reward/for/info', // 追加悬赏
  fastList: '/api/free/fast/list', // 快捷认领
  applyToRefund: '/api/apply/to/Refund', // 用户申请退款
  cardReportLoss: '/api/free/card/report/loss', // 证件挂失
  findReportLoss: '/api/free/find/report/loss', // 挂失记录查询
  applyServiceStation: '/api/free/apply/service/station', // 挂失记录查询
  getPayment: '/api/payment/zhima-score?', // 获取芝麻信用
  currentUserEntity: '/api/current/user' // 获取登录信息
}
export default uris
