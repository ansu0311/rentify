const express = require("express"); // Import Express module as express

// import required sub-routers
const userRouter = require("./user");
const propertyRouter = require("./property");

const router = express.Router(); // Creates an Express router instance

// Mount sub-routers with appropriate base paths
router.use("/user", userRouter);
router.use("/property", propertyRouter);

module.exports = router;
