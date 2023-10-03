const User = require("../models/UserModel");
const cloudinary = require("cloudinary").v2;

// Create
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const image = req.files.photo;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password is required",
      });
    }

    const userIamge = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "UserImages",
    });

    const newUser = await User.create({
      image: userIamge.secure_url,
      name,
      email,
      password,
    });
    newUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating user ",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();

    return res.status(200).json({
      success: true,
      message: "Users found successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user data",
    });
  }
};

exports.singleUser = async(req, res)=>{
  try {
    const user = await User.findById(req.params._id);
    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user data",
    });
  }
}

exports.userImage = async(req, res)=>{
  try {
    const user = await User.findById(req.params._id);
    const userImg = user.image;
    return res.status(200).json({
      success: true,
      message: "User image found successfully",
      userImg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user image",
    });
  }
}

exports.deleteUser = async(req, res)=>{
  try {
    await User.findByIdAndDelete(req.params._id)
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
     
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting user data",
    });
  }
}


exports.updateUser = async(req, res)=>{
  try {
    const {name, password} = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params._id,{name, password})

    await updatedUser.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
     
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating user data",
    });
  }
}