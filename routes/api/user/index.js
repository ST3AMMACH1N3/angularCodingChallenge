const router = require("express").Router();
const {
  createUser,
  getUsers,
  editUser,
  deleteUser
} = require("../../../controllers/userController");

router
  .route("/:id?")
  .get(getUsers)
  .post(createUser)
  .put(editUser)
  .delete(deleteUser);

module.exports = router;
