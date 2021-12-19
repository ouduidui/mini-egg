module.exports = {
    interval:'*/3 * * * * *',
    handler(){
        console.log('定时任务 三秒执⾏一次'+ new Date())
    }
}
