const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect("mongodb://localhost:27017/Humans",{useNewUrlParser:true},(errs)=>console.log(errs?errs:"db guggi"));


const HumanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Customers aren't gonna buy some sort of mysterious product...will they?"],
        minlength: [3, "Gee willikers; a name like that? Ya just can't bit into it; 3+ please"]
    },
    age: {
        type: Number,
        min: [0, "The quantity must be at least 0"],
        required: [true, "Quantity required matey, c'mon...Number 0 or higher please."]
    },
    haircolor: {
        type: Number,
        min: [0, "The price must be 0 at a minimum"],
        required: [true, "What no price? What is this? Number 0 or higher please."]
    }
},{timestamps:true},{_id: false});


const Humans = mongoose.model("humans", HumanSchema);
// ProductSchema.plugin(uniqueValidator, { message: 'Error, {PATH} already in the database' });
module.exports = Humans;