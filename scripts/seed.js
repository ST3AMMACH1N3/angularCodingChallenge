const db = require("../models");
const data = require("./seedData");

db.sequelize
  .sync({ force: false })
  .then(() => {
    const promises = [];
    for (const key in data) {
      promises.push(db[key].bulkCreate(data[key], { individualHooks: true }));
    }
    return Promise.all(promises);
  })
  .then(() => {
    console.log("Models seeded");
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
