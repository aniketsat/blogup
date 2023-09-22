const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // get the token from the cookie
  const accessToken = req.cookies.accessToken || "";

  // check if token exists
  if (!accessToken) {
    res.status(401);
    res.customErr = true;
    throw new Error("Not authorized");
  }

  // verify token
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    let user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // get the refresh token from the cookie
      const refreshToken = req.cookies.refreshToken || "";
      if (!refreshToken) {
        res.status(401);
        res.customErr = true;
        throw new Error("Not authorized");
      }

      // verify refresh token
      try {
        const decodeRefreshToken = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET
        );

        // generate new access token
        const newAccessToken = generateToken(
          decodeRefreshToken.id,
          process.env.JWT_ACCESS_TOKEN_SECRET,
          process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        );

        res.clearCookie("accessToken");
        // send new access token as cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
          secure: true,
        });

        // get user data
        const user = await User.findById(decodeRefreshToken.id).select(
          "-password"
        );
        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        res.customErr = true;
        throw new Error("Not authorized");
      }
    } else {
      res.status(401);
      res.customErr = true;
      throw new Error("Not authorized");
    }
  }
});

module.exports = { protect };
