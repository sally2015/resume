var DB = require('./db');
var ResInfo = require('./resinfo');

/**
 * resume表
 */
var Resume = {
    /**
     * 增加简历信息
     */
    add: function(data, callback) {
        var This = this;

        if (!data) {
            callback({
                status: ResInfo._107.status,
                message: ResInfo._107.msg
            });
            return;
        }

        //先检查数据是否已存在
        DB.isExist('t_resume', {
            id: data.id
        }, function(result) {
            console.log('已存在？-->>' + result.exist);
            if (result.exist) {
                This.update(data, function(result) {
                    callback({
                        status: ResInfo._200.status,
                        message: ResInfo._200.msg
                    });
                });
            } else {
                DB.add('t_resume', JSON.stringify(data), function(result) {
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
     * 更新简历表
     */
    update: function(data, callback) {
        DB.update('t_resume', data, function(result) {
            callback(result);
        });
    },
    /**
     * 通过id来获取简历的所有数据
     */
    getAllDataById: function(id, callback) {
        DB.getResumeAllDataById(id, function(result) {
            callback(result);
        })
    }
};

module.exports = Resume;
