import jwt from "jsonwebtoken";

const createandsavecookies = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProd, // true in prod, false in local
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    
  });
  return token;
};

export default createandsavecookies;
