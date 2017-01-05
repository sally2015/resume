var mongoClient = require('mongodb');
var ResInfo = require('./resinfo');

var DB = {
    db: null,
    filepath: 'public/test.pdf',
    connectDb: function(callback) {
        var This = this;

        console.log('------connecting db------');
        //不用localhost，用IP--不然，MongoError: failed to connect to server [localhost:27017] on first connect
        mongoClient.connect('mongodb://127.0.0.1:27017/resume', function(err, db) {
            This.db = db;

            if(err){
                console.log('连接db报错了');
                console.log(err);
                return;
            }

            console.log('------connected------');

            if (typeof callback === 'function') {
                callback(err, db);
            }
        });
    },
    save: function(data, callback) {
        console.log('-----------save-----------');
        // console.log(data)

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
        console.log(field);

        var currentTable = this.db.collection(table);

        currentTable.find(field).toArray(function(err, data) {
            console.log(data);
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
    /**
     * 添加表数据
     * @param {[type]}   table    哪个表
     * @param {[type]}   data     要存储的数据-JSON格式
     * @param {Function} callback 回调函数
     */
    add: function(table, data, callback) {
        console.log('-----------add-----------');
        // console.log(data)

        var options = JSON.parse(data);

        var currentTable = this.db.collection(table);

        //id自增，再插入数据
        currentTable.find().toArray(function(err, data) {
            options.id = data.length;

            var insertData = null;
            if (table === 't_user') { //用户表
                insertData = {
                    id: options.id,
                    username: options.username,
                    email: options.email,
                    pwd: options.pwd,
                    pid_resume: options.id
                };
            } else if (table === 't_resume') { //简历表
                insertData = {
                    id: options.id,
                    main: options.main,
                    header: options.header,
                    education: options.education,
                    project: options.project,
                    work: options.work,
                    profession: options.profession,
                    footer: options.footer
                };
            }

            currentTable.insert(insertData, function(err, data) {
                if (!err) {
                    callback({
                        status: ResInfo._200.status,
                        message: ResInfo._200.msg
                    });
                } else {
                    callback({
                        status: ResInfo._201.status,
                        message: ResInfo._201.msg
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
        // console.log(username)

        if (!this.userTable) {
            this.userTable = this.db.collection('t_user');
        }

        this.userTable.find({
            username: username
        }).toArray(function(err, data) {
            if (!data.length) {
                callback({
                    status: ResInfo._103.status,
                    message: ResInfo._103.msg
                });
            } else {
                callback({
                    status: ResInfo._200.status,
                    message: data[0]
                });
            }
        });
    },
    update: function(table, data, callback) {
        var currentTable = this.db.collection(table);

        currentTable.update({
            id: data.id
        }, {
            $set: {
                main: data.main,
                header: data.header,
                education: data.education,
                project: data.project,
                work: data.work,
                profession: data.profession,
                footer: data.footer
            }
        }, function(result) {
            callback({
                status: ResInfo._200.status,
                message: ResInfo._200.msg
            });
        })
    },
    /**
     * 根据cookie(username)来查询用户简历表的id
     */
    getUserResumeId: function(loginCookie, callback) {
        console.log('-----------getUserResumeId-----------');
        // console.log(loginCookie)

        loginCookie = decodeURIComponent(loginCookie);

        this.findUser(loginCookie, function(result) {
            if (result.status === 200) {
                callback({
                    status: ResInfo._200.status,
                    message: {
                        resumeId: result.message.pid_resume
                    }
                });
            } else {
                callback({
                    status: ResInfo._103.status,
                    message: ResInfo._103.msg
                });
            }
        });
    },
    /**
     * 通过id来获取简历的所有数据
     */
    getResumeAllDataById: function(id, callback) {
        console.log('-----------getResumeAllDataById-----------');

        if (!this.resumeTable) {
            this.resumeTable = this.db.collection('t_resume');
        }

        this.resumeTable.find({
            id: id
        }).toArray(function(err, data) {
            if (!data.length) {
                callback({
                    status: ResInfo._103.status,
                    message: ResInfo._103.msg
                });
            } else {
                callback({
                    status: ResInfo._200.status,
                    message: data[0]
                });
            }
        });
    }
};

module.exports = DB;
