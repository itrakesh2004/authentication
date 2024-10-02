const express = require("express");
const { model,mongoose } = require("mongoose");

const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exists"],
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model("users",createSchema);