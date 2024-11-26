import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verified.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token has expired. Please log in again." });
    }
    res.status(403).json({ message: "Invalid Token!" });
  }
};

