import jwt from "jsonwebtoken"

const createandsavecookies = (userid,res) =>
{
    const token = jwt.sign({userid},process.env.JWT_TOKEN,{
        expiresIn:"10d"
    });

    res.cookie("jwt",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default createandsavecookies;