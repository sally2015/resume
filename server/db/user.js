var DB = require('./db');
var ResInfo = require('./resinfo');

/**
 * user表
 */
var User = {
    /**
     * 通过用户名来查询用户信息
     */
    getByUsername: function(username, callback) {
        if (!username) {
            callback({
                status: ResInfo._106.status,
                message: ResInfo._106.msg
            });
            return;
        }

        DB.findUser(username, function(result) {
            callback(result);
        });
    },
    /**
     * 增加用户信息
     */
    add: function(data, callback) {
        if (!data || !data.username || !data.email || !data.pwd) {
            callback({
                status: ResInfo._107.status,
                message: ResInfo._107.msg
            });
            return;
        }

        //先通过email字段检查用户是否已存在
        DB.isExist('t_user', {
            email: data.email
        }, function(result) {
            console.log('用户已存在？-->>' + result.exist);
            if (result.exist) {
                callback({
                    status: ResInfo._101.status,
                    message: ResInfo._101.msg
                });
            } else {
                DB.add('t_user', JSON.stringify(data), function(result) {
                    if (result.status === 200) {
                        callback({
                            status: ResInfo._200.status,
                            message: ResInfo._200.msg
                        });
                    } else {
                        callback({
                            status: ResInfo._103.status,
                            message: ResInfo._103.msg
                        });
                    }
                });
            }
        });
    },
    /**
     * 通过用户名来查询简历id
     */
    getResumeId: function(username, callback) {
        if (!username) {
            callback({
                status: ResInfo._106.status,
                message: ResInfo._106.msg
            });
            return;
        }

        DB.findUser(username, function(result) {
            // console.log('============');
            // console.log(result);
            callback({
                status: ResInfo._200.status,
                message: {
                    resumeId: result.message.pid_resume
                }
            });
        });
    }
};

module.exports = User;
