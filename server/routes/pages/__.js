module.exports = {
	'/': {
		template:'home/__',
		callbacks: function(req, res, next) {
			next();
		}
	}
}