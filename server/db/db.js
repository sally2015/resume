var mongoClient = require('mongodb');

var DB = {
    db : null,
    filepath : 'public/test.pdf',
    connectDb : function(callback) {
        var This = this;

        mongoClient.connect('mongodb://localhost:27017/resume', function(err, db) {
            This.db = db;

            if ( typeof callback === 'function') {
                callback(err, db);
            }
        });
    },
    save : function(data, callback) {
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
                id : options.id,
                main : options.main,
                header : options.header,
                education : options.education,
                project : options.project,
                work : options.work,
                profession : options.profession,
                footer : options.footer
            }, function(err, data) {
                if ( typeof callback === 'function') {
                    callback({
                        status : 200,
                        msg : 'insert success'
                    });
                }
            });
        });
    },
    get : function(data, callback) {
        console.log('-----------get-----------');

        if (!this.resumeTable) {
            this.resumeTable = this.db.collection('t_resume');
        }

        this.resumeTable.find().toArray(function(err, data) {
            if ( typeof callback === 'function') {
                callback(data.length ? data[data.length - 1] : 'no data...');
            }
        });
    }
};

module.exports = DB; 