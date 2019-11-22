const router = require("express").Router();
const {findAll, create, findById, update, remove} = require("../../controllers/householdController");

// Matches with "/api/household"
router.route("/")
  .get(findAll)
  .post(create);

// Matches with "/api/household/:id"
router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);

module.exports = router;