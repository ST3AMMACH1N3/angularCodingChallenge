const router = require("express").Router();
const {
  createUser,
  getUsers,
  editUser,
  bulkEditUsers,
  deleteUser
} = require("../../../controllers/userController");

router
  .route("/:id")
  .put(editUser)
  .delete(deleteUser);

router
  .route("/")
  .get(getUsers)
  .put(bulkEditUsers)
  .post(createUser);

module.exports = router;
