var request = require('request');

// POST请求：获取AccessToken
exports.getAccessToken = function (req, res) {

    console.log("输入参数：" + JSON.stringify(req.body).toString());

    var appid = req.body.appid; // appid
    var secret = req.body.secret; // secret

    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                "status": "success",
                "msg": response.body
            });
            console.log("getAccessToken成功！");
        } else {
            res.json({
                "status": "fail",
                "msg": ""
            });
            console.log("getAccessToken失败！");
        }
    })

}

// POST请求：获取openid
exports.getOpenId = function (req, res) {

    console.log("输入参数：" + JSON.stringify(req.body).toString());

    var code = req.body.code; // code(只能请求一次)，通过wx.login获取
    var appid = req.body.appid; // appid
    var secret = req.body.secret; // secret

    var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code";

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                "status": "success",
                "msg": response.body
            });
            console.log("getOpenId成功！");
        } else {
            res.json({
                "status": "fail",
                "msg": ""
            });
            console.log("getOpenId失败！");
        }
    })

}

// POST请求：发送模板消息
exports.sendMessage = function (req, res) {

    // 发送条件
    // 1.accesstoken
    // 2.目标用户openid
    // 3.模板消息ID
    // 4.提交表单id（一次一个，有效期7天，与用户是绑定的）

    console.log("输入参数：" + JSON.stringify(req.body).toString());

    var accesstoken = "12_L0xIq7go-187bTtf3EKHWlCWOijKOiB-Wb1U9ALRgRGlf-TXrPR7X1UFII-jS66L0wVQ8CY-WZOmAKEikq_2lngT57hAhpuNdWSfAfIz6zPba3WGu8zXNdNuLcJn3i17AtuJSWOPMN7IH17pGXPgAAALCU";
    var url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + accesstoken;

    // 发送POST请求
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                "status": "success",
                "msg": response.body
            });
            console.log("发送消息成功！");
        } else {
            res.json({
                "status": "fail",
                "msg": ""
            });
            console.log("发送消息失败！");
        }
    });

}