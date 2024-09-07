import { loginUser, loginWithGoogle, logout, registerUser } from "./auth";

export const server = {
  //  Auth
  registerUser,
  logout,
  loginUser,
  loginWithGoogle
};
