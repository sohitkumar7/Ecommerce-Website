import  jwt, { decode } from "jsonwebtoken";
import User from "../models/Users";

const secureroute = async(req,res,next) => {
    try {
        
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({error: "No Token unauthorired Denied"})
        }

        const decoded =  jwt.verify(token,process.env.JWT_TOKEN)

        if(!decoded){
            return res.status(401).json({error:"Invalid token"})
        }

        const user = await User.findById(decoded.userid).select("-password")

        if(!user){
            return res.status(500).json("No User Found")
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in Secureroute",error);
        return res.status(500).json("Error in secureroute")
    }
}