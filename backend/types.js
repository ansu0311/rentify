const zod = require("zod"); // Import zod module as zod

//Schema for taking New Sign Up
const createUser = zod.object({
  username: zod.string().email(),
firstName: zod.string(),
lastName: zod.string(),
password: zod.string(),
mobileNumber: zod.string(),
});

//Schema for checking Sign in
const signInUser = zod.object({
  username: zod.string().email(),
password: zod.string()
})

//Schema for checking Sign in
const updateUser = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const createProperty = zod.object({
name: zod.string(),
area: zod.string(),
no_of_bathrooms: zod.number(),
no_of_bedrooms: zod.number(),
hospital: zod.string().optional(),
college: zod.string().optional(),
marketplace:zod.string().optional(),
busstop: zod.string().optional(),
metro: zod.string().optional(),
railway: zod.string().optional(),
});

const updateProperty = zod.object({
  propertyId: zod.string(),
name: zod.string(),
area: zod.string(),
no_of_bathrooms: zod.number(),
no_of_bedrooms: zod.number(),
hospital: zod.string().optional(),
college: zod.string().optional(),
marketplace:zod.string().optional(),
busstop: zod.string().optional(),
metro: zod.string().optional(),
railway: zod.string().optional(),
});

const deleteProperty = zod.object({
  propertyId: zod.string(),});
//Exporting the Schemas
module.exports = { createUser, signInUser, updateUser, createProperty, updateProperty, deleteProperty };
