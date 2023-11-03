import { users } from "../data/sampleData";
import { User } from "../models/User";

class UserService {
  constructor() {
    this._users = users.map((u) => new User(u));
    this._currentUser = null;
  }

  signIn({ email, password }) {
    let user = this._users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this._currentUser = user;
    }

    return user;
  }

  signUp({ name, email, password }) {
    let isUsernameTaken = this._users.find((u) => u.email === email)
      ? true
      : false;

    if (isUsernameTaken) {
      console.info("Username is already taken");
      return false;
    }

    let newUser = new User({
      id: Math.round(Math.random() * 1000),
      name,
      email,
      password,
    });

    this._users.push(newUser);

    return newUser;
  }

  addUser({ name, email, password, role }) {
    let isUsernameTaken = this._users.find((u) => u.email === email) != null;

    if (isUsernameTaken) {
      console.info("Username is already taken");
      return false;
    }

    let newUser = new User({
      id: Math.round(Math.random() * 1000),
      name,
      email,
      password,
      role,
    });

    this._users.push(newUser);

    return id;
  }

  updateUser(userId, { name, email, password }) {
    let user = this._users.find((u) => u.id === userId);

    if (!user) {
      console.info("User not found");
      return false;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    return user;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  getUsersByRole(role) {
    return this._users.filter((user) => user.role === role);
  }

  deleteUser(userId) {
    const userIndex = this._users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      console.info("User not found");
      return false;
    }

    this._users.splice(userIndex, 1);
    return true;
  }
}

export const userService = new UserService();
