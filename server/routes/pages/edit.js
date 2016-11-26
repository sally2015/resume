module.exports = {
	'/': {
		callbacks: function(req, res, next) {
			res.routeHelper.viewData({
				tplData: {
					tplNum: "9999",
					users: "12345"
				}
				
			});
			next();
		}
	}
}