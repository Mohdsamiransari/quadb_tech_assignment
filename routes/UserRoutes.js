const express = require('express');
const router = express.Router();

// import Car Controllers
const { getUser, createUser, singleUser, deleteUser, updateUser, userImage } = require('../controllers/UserControllers');

// routes for car
router.post("/newUser",createUser)
router.get("/users",getUser)
router.get("/singleUser/:_id",singleUser)
router.delete("/deleteUser/:_id",deleteUser)
router.put("/updateUser/:_id", updateUser)
router.get("/userImg/:_id", userImage)


module.exports = router;