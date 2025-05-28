import user from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createandsavecookies from "../jwt/generatetoken.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const alreadyaccount = await user.findOne({ email });

    if (alreadyaccount) {
      return res
        .json({success: false, message: "User Already Exist"});
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newuser = new user({
      userName: userName,
      email: email,
      password: hashpassword,
    });

    await newuser.save();

    if (newuser) {
      createandsavecookies(newuser._id, res);
      res.status(200).json({
        success: true,
        message: "Register Successfully",
        User: {
          _id: newuser._id,
          email: newuser.email,
          usernmae: newuser.email,
          role:newuser.role
        },
      });
    }
  } catch (error) {
    console.log("error in register controller", error);
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const olduser = await user.findOne({ email });

    if (!olduser) {
      return res.json({
        success: false,
        message: "No User Found",
      });
    }

    const ismatch = await bcrypt.compare(password, olduser.password);

    if (!ismatch) {
      return res.json({
        success: false,
        message: "Incorrect Password ",
      });
    }

    createandsavecookies(user._id, res);
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
      User: {
        _id: olduser._id,
        email: olduser.email,
        usernmae: olduser.userName,
        role:olduser.role
      },
    });
  } catch (error) {
    console.log("error in login controller", error);
    return res.status(500).json({
      success: false,
      message: "Error occured in login controller",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      sucess: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("Error in logout controller");
    return res.status(500).json({
      success: false,
      message: "Error in logout",
    });
  }
};
