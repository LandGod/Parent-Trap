const path = require("path");
const router = require("express").Router();
const eventRoutes = require("./events");
const householdRoutes = require("./household")

// Event routes
router.use("/events", eventRoutes);
router.use("/household", householdRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
