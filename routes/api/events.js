const router = require("express").Router();
const {findAll, findAllPopulated, create, findById, update, remove} = require("../../controllers/eventController");

// Matches with "/api/events"
router.route("/")
  .get(findAll)
  .post(create);

// Matches with "/api/events/members"
router.route("/members")
  .get(findAllPopulated);


// Matches with "/api/events/:id"
router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);

module.exports = router;