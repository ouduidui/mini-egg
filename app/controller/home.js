module.exports = (app) => {
	return {
		index(ctx) {
			ctx.body = 'HelloWorld';
		},
		about(ctx) {
			ctx.body = '关于页面';
		}
	};
};
