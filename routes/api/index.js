const path = require("path");
const router = require("express").Router();
const eventRoutes = require("./event");
const householdRoutes = require("./household")
const memberRoutes = require("./member");

// Event routes
router.use("/event", eventRoutes);
router.use("/household", householdRoutes);
router.use("/member", memberRoutes);
// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;
