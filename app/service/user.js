module.exports = (app) => {
  return {
    // 获取数据库数据
    async getName() {
      const data = await app.model.user.findAll();
      return data[0].name;
    },
    // 异步
    async getAge() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(18);
        }, 500);
      });
    },
    // 同步
    getGender() {
      return 'man';
    }
  };
};
