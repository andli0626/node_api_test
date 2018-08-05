var api = require('../controller/api');

module.exports = function (app) {

  app.post('/wechat/getAccessToken', api.getAccessToken); // 获取AccessToken
  app.post('/wechat/getOpenId', api.getOpenId); // 获取OpenId
  app.post('/wechat/sendMessage', api.sendMessage); // 发送模板消息

};