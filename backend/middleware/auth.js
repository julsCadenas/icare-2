import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretToken = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token)
      return res
        .status(401)
        .json({ msg: "No auth token, access denied" });

    const verified = jwt.verify(token, secretToken);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    req.user = verified.id;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default auth;
