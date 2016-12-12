/**
* 请求状态信息
*/
var ResponseInfo = {
    _101:{
        status:101,
        msg:'用户已存在'
    },
    _102:{
        status:102,
        msg:'用户未登录'
    },
    _103:{
        status:103,
        msg:'用户不存在'
    },
    _104:{
        status:104,
        msg:'用户不存在'
    },
    _105:{
        status:105,
        msg:'密码错误'
    },
    _200:{
        status:200,
        msg:'success'
    },
    _201:{
        status:201,
        msg:'fail'
    }
};


module.exports = ResponseInfo;
