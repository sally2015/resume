var mongoClient = require('mongodb');

var DB = {
    db: null,
    filepath: 'public/test.pdf',
    connectDb: function(callback) {
        var This = this;

        mongoClient.connect('mongodb://localhost:27017/resume', function(err, db) {
            This.db = db;

            if (typeof callback === 'function') {
                callback(err, db);
            }
        });
    },
    save: function(data, callback) {
        console.log('-----------save-----------');
        console.log(data)

        var This = this;
        var options = JSON.parse(data);

        if (!this.resumeTable) {
            this.resumeTable = this.db.collection('t_resume');
        }

        //id自增
        this.resumeTable.find().toArray(function(err, data) {
            options.id = data.length;

            This.resumeTable.insert({
                id: options.id,
                main: options.main,
                header: options.header,
                education: options.education,
                project: options.project,
                work: options.work,
                profession: options.profession,
                footer: options.footer
            }, function(err, data) {
                if (typeof callback === 'function') {
                    callback({
                        status: 200,
                        message: 'insert success'
                    });
                }
            });
        });
    },
    get: function(data, callback) {
        console.log('-----------get-----------');

        if (!this.resumeTable) {
            this.resumeTable = this.db.collection('t_resume');
        }

        this.resumeTable.find().toArray(function(err, data) {
            if (typeof callback === 'function') {
                callback(data.length ? data[data.length - 1] : 'no data...');
            }
        });
    },
    /**
     * 根据表字段查找表数据
     * table：查找的表
     * field：表字段名和值的对象
     */
    isExist: function(table, field, callback) {
        console.log('-----------isExist-----------');

        var currentTable = this.db.collection(table);

        currentTable.find(field).toArray(function(err, data) {
            if (data.length === 0) {
                callback({
                    exist: false
                });
            } else {
                callback({
                    exist: true
                });
            }
        });
    },
    saveRegister: function(data, callback) {
        console.log('-----------saveRegister-----------');
        console.log(data)

        var This = this;
        var options = JSON.parse(data);

        if (!this.userTable) {
            this.userTable = this.db.collection('t_user');
        }

        //id自增
        this.userTable.find().toArray(function(err, data) {
            options.id = data.length;

            This.userTable.insert({
                id: options.id,
                username: options.username,
                email: options.email,
                pwd: options.pwd,
                pid_resume: options.id
            }, function(err, data) {
                if (typeof callback === 'function') {
                    callback({
                        status: 200,
                        message: 'success'
                    });
                }
            });
        });
    },
    /**
     * 根据用户名，查询用户信息
     */
    findUser: function(username, callback) {
        console.log('-----------findUser-----------');
        console.log(username)

        if (!this.userTable) {
            this.userTable = this.db.collection('t_user');
        }

        this.userTable.find({
            username: username
        }).toArray(function(err, data) {
            if (!data.length) {
                callback({
                    status: 201,
                    message: '用户不存在'
                });
            } else {
                callback({
                    status: 200,
                    message: 'success',
                    userInfo: data[0]
                });
            }
        });
    },
    /**
     * 根据cookie(username)来查询用户简历表的id
     */
    getUserResumeId: function(loginCookie, callback) {
        console.log('-----------getUserResumeId-----------');
        console.log(loginCookie)

        loginCookie = decodeURIComponent(loginCookie);

        this.findUser(loginCookie, function(result) {
            if (result.status === 200) {
                callback({
                    status: 200,
                    id: result.userInfo.pid_resume
                });
            } else {
                callback({
                    status: 102,
                    message: '用户不存在'
                });
            }
        });
    }
};

module.exports = DB;
