const koa = require("koa");
const Router = require("koa-router");
const {initRouter, initController, initService, initConfig, initSchedule} = require('./loader')

module.exports = class Egg {
   constructor() {
        // 创建app
        this.app = new koa();
        // 初始config
        initConfig(this);
        // 初始定时任务
       initSchedule();
        // 初始service
        this.service = initService(this);
        // 初始controller
        this.controller = initController(this);

        // 创建路由
        this.router = new Router();
        initRouter(this);
        this.app.use(this.router.routes());
    }


    start(port) {
        this.app.listen(port, () => {
            console.log('egg启动服务端口：' + port)
        });
    }
}
