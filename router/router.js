const express = require("express");
const router= express.Router();

const {home,create,login,homelogin}= require("../controllers/userController.js");

router.get("/",home);
router.post("/create",create);
router.get("/login",homelogin);
router.post("/login",login);
module.exports=router;