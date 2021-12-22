module.exports = (app) => {
  return {
    async index(ctx) {
      ctx.body = {
        name: await app.service.user.getName(),
        age: await app.service.user.getAge(),
        gender: app.service.user.getGender()
      };
    }
  };
};
