import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

/**
 *
 * @returns {{
 *  userService: import("../services/back4app/UserService").UserService;
 *  currentUser: import("../models/User").User | null;
 *  setCurrentUser: (newUser: import("../models/User").User | null) => void;
 * }}
 */
export function useUserContext() {
  return useContext(UserContext);
}
