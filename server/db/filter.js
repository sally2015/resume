var Session = require('./session');
var ResInfo = require('./resinfo');

/**
 * filter
 */
var Filter = {
    checkLogin: function(req, res) {
        if (!req.cookies.username) {
            res.send({
                status: ResInfo._102.status,
                message: ResInfo._102.msg
            });
            return false;
        }

        if (!Session.isEqual(req)) {
            console.log('session is not equal...');
            res.send({
                status: ResInfo._104.status,
                message: ResInfo._104.msg
            });
            return false;
        }

        return true;
    }
};


module.exports = Filter;
