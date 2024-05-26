const express = require("express"); // Import Express module as express
const jwt = require("jsonwebtoken"); // Import JsonWebToken module as jwt

// Import Zod object Schema to check recieved data has required details before conducting the process
const { createProperty, updateProperty, deleteProperty } = require("../types");
const { authMiddleware } = require("../middleware"); // Import Authentication middleware
const { Property, User } = require("../db"); // Import Databases from config file
const mongoose = require("mongoose"); // Import Mongoose module as mongoose

const router = express.Router(); // Creates an Express router instance

// This route returns the logged in user's balance
// The `authMiddleware` function handles the authentication checks before proceeding.
router.post("/create", authMiddleware, async (req, res) => {
  // check if the inputs are correct
  const { success } = createProperty.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "You have sent Wrong Input format",
    });
    return;
  }

  // extract authorization key from the request header
  const authKey = req.headers.authorization;
  // Spliting the authorization key as the format is  {Bearer: key} and we need the key part
  const token = authKey.split(" ")[1];
  // decode the token ton extract the user_id
  const decoded = jwt.decode(token);

  //create new user
  const property = await Property.create({
    userId: decoded.userId,
    name: req.body.name,
    area: req.body.area,
    no_of_bathrooms: req.body.no_of_bathrooms,
    no_of_bedrooms: req.body.no_of_bedrooms,
    hospital: req.body.hospital ? req.body.hospital : null,
    college: req.body.college ? req.body.college : null,
    marketplace: req.body.marketplace ? req.body.marketplace : null,
    busstop: req.body.busstop ? req.body.busstop : null,
    metro: req.body.metro ? req.body.metro : null,
    railway: req.body.railway ? req.body.railway : null,
  });

  const user = await User.findOne({
    _id: decoded.userId,
});

const userListing = user.listings
userListing.push(property._id);

await User.updateOne({ _id: req.userId }, 
  {listings:userListing});

  res.json({
    message: "property listed successfully",
    property: property._id,
  });
});

// This route is used to update user data in the database
router.put("/update", authMiddleware, async function (req, res) {

  //check for the input data is valid
  const parsedPayload = updateProperty.safeParse(req.body);
  if (!parsedPayload) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }

  // update the data for the user
  await Property.updateOne({ _id: req.body.propertyId }, req.body);

  res.status(200).json({
    message: "Updated successfully",
  });
});

router.put("/delete", authMiddleware, async function (req, res) {

  //check for the input data is valid
  const parsedPayload = deleteProperty.safeParse(req.body);
  if (!parsedPayload) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }

  // update the data for the user
  await Property.deleteOne({ _id: req.body.propertyId });

  
  // extract authorization key from the request header
  const authKey = req.headers.authorization;
  // Spliting the authorization key as the format is  {Bearer: key} and we need the key part
  const token = authKey.split(" ")[1];
  // decode the token ton extract the user_id
  const decoded = jwt.decode(token);

  
  const user = await User.findOne({
    _id: decoded.userId,
});

const userListing = user.listings.filter((e)=> e != req.body.propertyId)

await User.updateOne({ _id: req.userId }, 
  {listings:userListing});

  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/:propertyId", authMiddleware, async (req, res) => {

  const property = await Property.findOne({_id: req.params.propertyId
  });

  if (!property) {
    res.status(411).json({
      message: "property not found",
    });
    return;
  }
  
  res.json({
    message: "property listed successfully",
    property: property,
  });
});

module.exports = router;
