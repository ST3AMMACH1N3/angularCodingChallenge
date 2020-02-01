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
  db.User.bulkCreate(req.body, {
    updateOnDuplicate: ["firstName", "lastName", "email", "phone"]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.User.destroy({ id })
    .then(numAffected => {
      res.end();
    })
    .catch(err => {
      res.json({ msg: "Something went wrong" });
      console.log(err);
    });
};
