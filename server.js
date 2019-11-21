const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/parentTrap",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)
// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)
// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)
const HouseholdController = require("./controllers/householdController");

HouseholdController.findById(mongoose.Types.ObjectId("5dd6ea9f6c0c7213542d089f"))
.then((results) => console.log(results))
.catch((err) => {
  console.log('ERROR')
  console.log(err)
})
// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)
// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)
// DB TESTS (!!DELETE BEFORE PUSHING TO DEV!!)