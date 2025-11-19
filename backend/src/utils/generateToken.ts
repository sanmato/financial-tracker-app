// backend/src/utils/generateToken.ts
import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  //1. Get secret from env variables
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined in environment variables");
    throw new Error("Internal server error");
  }

  //2. Create the payload (data to be saved in the token)
  const payload = {
    userId: userId,
  };

  //3. Sign the token with the secret and set expiration
  return jwt.sign(payload, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
