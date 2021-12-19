module.exports = {
    sequelize: {
        dialect:'mysql',
        host:'localhost',
        database:'test',
        username:'root',
        password:'123456'
    },
    middleware: ['logger']
}
