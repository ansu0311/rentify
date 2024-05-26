const mongoose = require("mongoose");  // Import Express module as express
// Load credentials from a secure environment variable file (.env)
const { username, password } = require("./config");

// Connect to MongoDB using a connection string with credentials
mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.xxdaiuv.mongodb.net/`    
  );

  // Mongoose Schemas
const userSchema =new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    mobileNumber:{
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 10
    },
    favourite:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Accounts",
        required: true,
    },
    listings:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Property",
        required: true,
    }
});

// Mongoose Schemas
const propertySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    area:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    no_of_bedrooms:{
        type: Number,
        required: true,
    },
    no_of_bathrooms:{
        type: Number,
        required: true,
    },
    hospital:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    college:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    marketplace:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    busstop:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    metro:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    railway:{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    }
})

// Mongoose Models
const User = mongoose.model("UsersProperty", userSchema)
const Property = mongoose.model("Property",propertySchema)

module.exports = {
    User , Property 
}