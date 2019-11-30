const router = require("express").Router();
const {findAll, create, findById, update, remove} = require("../../controllers/memberController");

// Matches with "/api/members"
router.route("/")
  .get(findAll)
  .post(create);

// Matches with "/api/members/:id"
router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);

module.exports = router;