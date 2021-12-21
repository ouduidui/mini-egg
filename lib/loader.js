const fs = require('fs');
const path = require('path');

/**
 * 加载文件夹内容
 * @param dir {string} 路径名称
 * @param cb {function} 回调函数
 * */
function load(dir, cb) {
	// 获取文件夹绝对路径
	const url = path.resolve(__dirname, dir);
	// 读取文件夹的内容
	const files = fs.readdirSync(url);
	// 遍历文件夹内容
	files.forEach((filename) => {
		const file = require(url + '/' + filename);
		// 调用回调函数，传入两个参数：filename、 file
		cb(filename.replace('.js', ''), file);
	});
}

/**
 * 初始化路由
 * @param app {Egg} Egg实例
 * */
function initRouter(app) {
	let routes = require('../app/router');
	routes(app);
}

/**
 * 初始化Controller
 * @param app {Egg} Egg实例
 * */
function initController(app) {
	const controllers = {};
	load('../app/controller', (filename, controller) => {
		controllers[filename] = controller(app);
	});
	return controllers;
}

/**
 * 初始化Service
 * @param app {Egg} Egg实例
 * */
function initService(app) {
	const services = {};
	load('../app/service', (filename, service) => {
		services[filename] = service(app);
	});
	return services;
}

/**
 * 初始化config
 * @param app {Egg} Egg实例
 * */
function initConfig(app) {
	const config = require('../config');
	// 遍历config
	Object.keys(config).forEach((key) => {
		if (key === 'sequelize') {
			// 连接数据库
			const Sequelize = require('sequelize');
			const sequelize = new Sequelize(config[key]);

			// 加载模型
			app.model = {};
			load('../app/model', (filename, model) => {
				app.model[filename] = model({
					Sequelize,
					model: sequelize
				});
			});
		} else if (key === 'middleware') {
			// 中间件
			config[key].forEach((mid) => {
				const midPath = path.resolve(__dirname, '../app/middleware', mid);
				app.app.use(require(midPath));
			});
		}
	});
}

/**
 * 初始化定时任务
 * */
function initSchedule() {
	const schedule = require('node-schedule');
	load('../app/schedule', (filename, scheduleConfig) => {
		schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
	});
}

module.exports = {
	initRouter,
	initController,
	initService,
	initConfig,
	initSchedule
};
