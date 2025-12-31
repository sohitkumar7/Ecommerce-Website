import jwt from "jsonwebtoken";

const createandsavecookies = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,        
    sameSite: "none",      
    path: "/",             
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createandsavecookies;
