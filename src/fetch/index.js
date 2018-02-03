import axios from 'axios'
import {appKey, appId, dev, baseURL} from '../config/config'

// 封装请求 及 配置
const fetch = function(url, options) {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers = {
    "Content-Type": "application/json",
    "x-qingful-appid": appId,
    "x-qingful-appkey": appKey,
    "x-qingful-dev": dev,
    'token': localStorage.getItem('token')
  };
  return new Promise((resolve, reject) => {
    axios(url ,options)
      .then(response => {
        resolve(response.data);
      }, err => {
        if (err.response.status == 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          window.location.reload()
        }
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}


export default {
  // login
  login(params) {
    return fetch('public/table/admin/fetch?where=username,' + params.username + '&where=password,' + params.password)
  },
  // 获取登陆者信息
  getUserInfo(params) {
    return fetch('userInfo/table/admin/fetchAll')
  },

  //图片上传 获取
  getImg(params) {
    return fetch('home/table/file/fetchPage' + params)
  }, 
  getImgCount(params) {
    return fetch('home/table/file/fetchAll?count=id')
  },
  saveImg(params) {
    return fetch('home/table/file/add', params)
  }, 


  // home
  getNewOrder(params) {
    return fetch('admin/table/order/fetchAll?where=status,0&limit=5000')
  },
  getUsers(params) {
    return fetch('admin/table/user/fetchAll?limit=5000')
  },
  getOrders(params) {
    if (!params) params = '';
    return fetch('admin/table/order/fetchAll?limit=5000&orderBy=id,asc' + params)
  },
  getProducts(params) {
    if (!params) params = '';
    return fetch('home/table/product/fetchAll?orderBy=id,asc&limit=5000' + params)
  },
  getProductsPage(params) {
    return fetch('home/table/product/fetchPage' + params + 'orderBy=id,asc')
  },
  getProdCount(params) {
    return fetch('home/table/product/fetchAll?count=id')
  },

  // settings
  // 商城
  getConfig(params) {
    return fetch('home/table/config/fetch')
  },
  postConfig(params) {
    return fetch('home/table/config/add', params)
  },
  // 支付
  getPayment(params) {
     return fetch('home/table/payment/fetchAll?orderBy=id,asc')
  },
  postPayment(params) {
    return fetch('home/table/payment/add', params)
  },
  // 快递
  getDelivery(params) {
     return fetch('home/table/delivery/fetchAll?orderBy=id,asc')
  },
  postDelivery(params) {
     return fetch('home/table/delivery/add', params)
  },
  // 地址设置
  getLocaltion(params) {
    return fetch('home/table/location/fetchAll')
  },
  postLocaltion(params) {
    return fetch('home/table/location/add', params)
  },

  //短信配置
  getSms(params)  {
    return fetch('home/table/sms/fetch')
  },
  postSms(params)  {
    return fetch('home/table/sms/add', params)
  },
  // 邮件配置
  getMail(params)  {
    return fetch('home/table/mail/fetch')
  },
  postMail(params)  {
    return fetch('home/table/mail/add', params)
  },




  // wxset
  // 微信配置
  getWxset(params)  {
    return fetch('home/table/wx_config/fetch')
  },
  postWxset(params)  {
    return fetch('home/table/wx_config/add', params)
  },
  // 微信菜单
  getWxmenu(params)  {
    return fetch('home/table/wx_menu/fetchAll')
  },
  deleteWxmenu(params)  {
    return fetch('home/table/wx_menu/delete?where=id,' + params)
  },
  postWxmenu(params)  {
    return fetch('home/table/wx_menu/add', params)
  },
  // 自定义回复
  getWxReply(params)  {
    return fetch('home/table/wx_reply/fetchAll?orderBy=id,asc')
  },
  deleteWxReply(params)  {
    return fetch('home/table/wx_reply/delete?whereIn=id,' + params)
  },
  postWxReply(params)  {
    return fetch('home/table/wx_reply/add', params)
  },
  //模版消息
  getWxTpl(params)  {
    return fetch('home/table/wx_tplmsg/fetchAll?orderBy=id,asc')
  },
  postTpl(params)  {
    return fetch('home/table/wx_tplmsg/add', params)
  },
  // 微信多客服设置
  getKefu(params)  {
    return fetch('admin/table/wx_kefu/fetch')
  },
  postKefu(params)  {
    return fetch('admin/table/wx_kefu/add', params)
  },
  // 微信打印机
  getPrint(params)  {
    return fetch('admin/table/wx_print/fetch')
  },
  postPrint(params)  {
    return fetch('admin/table/wx_print/add', params)
  },



  // content
  // 文章分类
  getClass(params) {
    return fetch('admin/table/article_category/fetchAll?limit=150&orderBy=id,asc')
  },
  postClass(params) {
    return fetch('admin/table/article_category/add', params)
  },
  // 文章表
  getArtList(params) {
    if (!params) params = ''; 
    return fetch('admin/table/article/fetchAll?limit=150&orderBy=id,asc' + params)
  },
  postArtList(params) {
    return fetch('admin/table/article/add', params)
  },
  // 广告位置
  getAdsPosition(params) {
    return fetch('home/table/adsPosition/fetchAll?limit=150&orderBy=id,asc')
  },
  postAdsPosition(params) {
    return fetch('home/table/adsPosition/add', params)
  },
  // 广告列表
  getAds(params) {
    return fetch('home/table/ads/fetchAll?limit=150&orderBy=id,asc')
  },
  postAds(params) {
    return fetch('home/table/ads/add', params)
  },


  // shop
  // 菜单管理
  getMenu(params) {
    return fetch('home/table/product_category/fetchAll?limit=150&orderBy=id,asc')
  },
  postMenu(params) {
    return fetch('home/table/product_category/add', params)
  },
  deleteMenu(params) {
    return fetch('home/table/product_category/delete?whereIn=id,' + params)
  },
  // 标签管理
  getTag(params) {
    return fetch('home/table/product_label/fetchAll?limit=150&orderBy=id,asc')
  },
  postTag(params) {
    return fetch('home/table/product_label/add', params)
  },
  deleteTag(params) {
    return fetch('home/table/product_label/delete?whereIn=id,' + params)
  },
  // SKU管理
  getSku(params) {
    return fetch('admin/table/sku/fetchAll?limit=150&orderBy=id,asc')
  },
  postSku(params) {
    return fetch('admin/table/sku/add', params)
  },
  // 商品管理
  postProduct(params) {
    return fetch('admin/table/product/add', params)
  },
  // 用户评论
  getComment(params) {
    return fetch('home/table/product_comment/fetchAll?limit=150&orderBy=id,asc')
  },
  postComment(params) {
    return fetch('home/table/product_comment/add', params)
  },
  deleteComment(params) {
    return fetch('home/table/product_comment/delete?whereIn=id,' + params)
  },
  // 反馈管理
  getFeedback(params) {
    return fetch('home/table/feedback/fetchAll?limit=150&orderBy=id,asc')
  },


  // order
  // 订单列表
  postOrders(params) {
    return fetch('admin/table/order/add', params)
  },
  getDetail(params) {
    return fetch('admin/table/order_detail/fetchAll?limit=5000&orderBy=id,asc')
  },


  // 缺货登记

  // 售后类型
  getFeedbackType(params) {
    return fetch('admin/table/order_feedback_type/fetchAll?limit=5000&orderBy=id,asc')
  },
  postFeedbackType(params) {
    return fetch('admin/table/order_feedback_type/add', params)
  },
  // 售后列表
  getPrdEx(params) {
    return fetch('admin/table/product_exchange/fetchAll?limit=5000&orderBy=id,asc')
  },
  postPrdEx(params) {
    return fetch('admin/table/product_exchange/add', params)
  },



  // graph 报表
  getFinance(params) {
    return fetch('home/table/trade/fetchAll?limit=150')
  },
  getUser(params) {
    return fetch('admin/table/user/fetch?where=id,' + params)
  },
  // 充值记录
  getRecord(params) {
    return fetch('home/table/trade/fetchAll?where=type,1&limit=150')
  },


  // user
  // 管理员用户组
  getAdminGroup(params) {
    return fetch('admin/table/auth_group/fetchAll?orderBy=id,asc')
  },
  postAdminGroup(params) {
    return fetch('admin/table/auth_group/add', params)
  },
  deleteAdminGroup(params) {
    return fetch('admin/table/auth_group/delete?where=id,' + params)
  },
  getAdminRule(params) {
    return fetch('admin/table/auth_rule/fetchAll?&limit=150&orderBy=id,asc')
  },
  // 管理员列表
  getAdmin(params) {
    return fetch('admin/table/admin/fetchAll?limit=150&orderBy=id,asc')
  },
  postAdmin(params) {
    return fetch('admin/table/admin/add', params)
  },
  deleteAdmin(params) {
    return fetch('admin/table/admin/delete?where=id,' + params)
  },
  // 用户列表
  // getUsers 获取用户
  postUsers(params) {
    return fetch('admin/table/user/add', params)
  },
  // 会员等级
  getUserLevel(params) {
      return fetch('home/table/user_level/fetchAll?limit=150&orderBy=id,asc')
    },
  postUserLevel(params) {
    return fetch('home/table/user_level/add', params)
  },
  // 消息中心
  getUserMsg(params) {
      return fetch('home/table/user_msg/fetchAll?limit=150&orderBy=id,asc')
    },
  postUserMsg(params) {
    return fetch('home/table/user_msg/add', params)
  },
  // 提现管理
  getUsrtx(params) {
    return fetch('home/table/user_tx/fetchAll?limit=150&orderBy=id,asc')
  },
  postUsrtx(params) {
    return fetch('home/table/user_tx/add', params)
  },



  // model
  // 费用模版
  getFeeTpl(params) {
    return fetch('home/table/fee_tpl/fetchAll?limit=150&orderBy=id,asc')
  },
  postFeeTpl(params) {
    return fetch('home/table/fee_tpl/add', params)
  },


}