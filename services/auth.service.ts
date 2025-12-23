import prisma from "../configs/prisma";
import { LoginModel } from "../schemas/app.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (data: LoginModel) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const passwordChecked = await bcrypt.compare(data.password, user.password);
  if (!passwordChecked) {
    throw new Error("Password not match");
  }
  const { password, ...rest } = user;

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
    expiresIn: "7d",
  });
  if (!accessToken) {
    throw new Error("Access token not created");
  }
  return {
    ...rest,
    token: {
      accessToken,
      expired: "7d",
    },
  };
};
