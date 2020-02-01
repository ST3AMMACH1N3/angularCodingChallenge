const db = require("../models");

exports.createUser = (req, res) => {
  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => console.log(err));
};

exports.getUsers = (req, res) => {
  db.User.findAll()
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => console.log(dbUsers));
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  db.User.update(req.body, { where: { id } })
    .then(([numAffected, affected]) => {
      console.log(affected);
    })
    .catch(err => console.log(err));
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.User.destroy({ id })
    .then(numAffected => {
      console.log(numAffected);
    })
    .catch(err => console.log(err));
};
