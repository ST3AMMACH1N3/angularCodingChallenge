const db = require("../models");

exports.createUser = (req, res) => {
  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};

exports.getUsers = (req, res) => {
  db.User.findAll()
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  db.User.update(req.body, { where: { id } })
    .then(([numAffected, affected]) => {
      res.json(affected);
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};

exports.bulkEditUsers = (req, res) => {
  const userFields = ["firstName", "lastName", "email", "phone"];
  const updated = req.body.map(item => {
    const { id, ...person } = item;
    if (id[0] === "f") {
      return { ...person };
    } else {
      return { id, ...person };
    }
  });
  db.User.bulkCreate(updated, {
    updateOnDuplicate: userFields,
    individualHooks: true
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        console.log("Duplicate ids updated");
        return res.json({ msg: "Duplicate ids updated" });
      }
      console.log(err);
      res.json({ msg: "Something went wrong" });
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.User.destroy({ where: { id } })
    .then(numAffected => {
      res.json(numAffected);
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};
