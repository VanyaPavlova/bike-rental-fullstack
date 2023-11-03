import { User } from "../../models/User";
import { users as sampleUsers } from "../../data/sampleData";

/**
 * @param {UserService} userService
 * @param {User[]} usersToAdd
 * @returns {Promise<PromiseSettledResult<Parse.User[]>}
 */
export async function addSampleUsers(userService, usersToAdd = sampleUsers) {
  console.log("Adding sample users...");
  return Promise.allSettled(
    usersToAdd.map(async (user) => {
      if (await userService.hasSeenUserWithEmail(user.email)) {
        return;
      }
      return userService.createUser(user);
    })
  );
}

export class UserService {
  /**
   * @type {import("parse")}
   */
  #parse;

  /**
   * @type {User | null}
   */
  #currentUser = null;

  #knownUserEmails = new Set();

  /**
   * @constructor
   * @param {import("parse")} parse
   */
  constructor(parse) {
    this.#parse = parse;
  }

  async hasSeenUserWithEmail(email) {
    if (this.#knownUserEmails.has(email)) return true;
    const user = await this.getUserByEmail(email);
    return user != null;
  }

  /**
   * @param {Parse.User} parseUser
   * @returns {User | undefined}
   */
  #fromParseUser(parseUser) {
    if (!parseUser) return undefined;
    return new User({
      id: parseUser.id,
      name: parseUser.get("name"),
      email: parseUser.get("username"),
      age: parseUser.get("age"),
      phone: parseUser.get("phone"),
      role: parseUser.get("role"),
      address: parseUser.get("address"),
      city: parseUser.get("city"),
      zipCode: parseUser.get("zipCode"),
    });
  }

  /**
   * @returns {User | undefined}
   */
  get currentUser() {
    return this.#fromParseUser(this.#parse.User.current());
  }

  /**
   * @returns {Promise<User>}
   */
  async signUp({ name, email, password }) {
    const parseUser = await this.#parse.User.signUp(
      email,
      password,
      {
        name,
        email,
        role: "user",
      },
      { useMasterKey: true }
    );
    const res = (this.#currentUser = this.#fromParseUser(parseUser));
    this.#knownUserEmails.add(res.email);
    console.log("Successfully signed up with:", {
      id: res.id,
      email: res.email,
    });
    return res;
  }

  /**
   * @returns {Promise<void>}
   */
  async resetPassword({ userId, email }) {
    if (!email) {
      const user = await this.#getUserById(userId);
      email = user.get("email");
    }

    await this.#parse.User.requestPasswordReset(email);
    console.log("Successfully reset password for user with email:", email);
    return;
  }

  /**
   * @returns {Promise<User>}
   */
  async logIn({ email: username, password }) {
    const user = await this.#parse.User.logIn(username, password, {
      useMasterKey: true,
    });
    const res = (this.#currentUser = this.#fromParseUser(user));
    console.log("Successfully logged in with:", {
      id: res.id,
      email: res.email,
    });
    return this.#currentUser;
  }

  /**
   * @returns {Promise<void>}
   */
  async logOut() {
    await this.#parse.User.logOut();
    console.log("Successfully logged out.");
    this.#currentUser = null;
    return;
  }

  createUncommittedUser(role) {
    const newUser = new User({
      id: randomId(),
      password: randomId(),
      role,
    });
    newUser.isNew = true;
    return newUser;
  }

  /**
   * @param {Partial<User>} userFields
   * @returns {Parse.User}
   */
  async createUser(userFields) {
    const parseUser = new this.#parse.User();
    this.#setParseUserFields(parseUser, userFields);
    await parseUser.save();
    this.#knownUserEmails.add(userFields.email);
    console.log(
      `Successfully created user with id ${
        parseUser.id
      } and email ${parseUser.get("email")}`
    );
    return this.#fromParseUser(parseUser);
  }

  /**
   * @param {string} userId
   * @param {Partial<User>} newFields
   * @returns {Promise<void>}
   */
  async updateUser(userId, newFields) {
    const parseUser = new this.#parse.User();
    parseUser.set("objectId", userId);
    this.#setParseUserFields(parseUser, newFields);
    await parseUser.save(null, { useMasterKey: true });
    console.log(`Successfully updated user with id ${userId}`);
  }

  /**
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    const user = new this.#parse.User();
    user.set("objectId", userId);
    await user.destroy({ useMasterKey: true });
    console.log("Successfully deleted user with id", userId);
  }

  async getUserByEmail(email) {
    const parseQuery = new this.#parse.Query("User");
    const parseUser = await parseQuery.equalTo("email", email).first();
    return parseUser;
  }

  async #getUserById(userId) {
    const parseQuery = new this.#parse.Query("User");
    const parseUser = await parseQuery.get(userId);
    return parseUser;
  }

  /**
   * @param {string} userId
   * @returns {Promise<User[]>}
   */
  async getUsersByRole(role) {
    const parseQuery = new this.#parse.Query("User");
    parseQuery.equalTo("role", role);
    const results = await parseQuery.find();
    return results.map((result) => this.#fromParseUser(result));
  }

  async getAllUsers() {
    const parseQuery = new this.#parse.Query("User");
    const results = await parseQuery.findAll();
    return results.map((result) => this.#fromParseUser(result));
  }

  /**
   * @param {import("parse").User} parseUser
   * @param {Partial<User>} userFields
   */
  #setParseUserFields(parseUser, userFields) {
    if (userFields.email) {
      parseUser.set("username", userFields.email);
      parseUser.set("email", userFields.email);
    }
    if (userFields.name) parseUser.set("name", userFields.name);
    if (userFields.password) parseUser.set("password", userFields.password);
    if (userFields.age) parseUser.set("age", userFields.age);
    if (userFields.phone) parseUser.set("phone", userFields.phone);
    if (userFields.role) parseUser.set("role", userFields.role);
    if (userFields.address) parseUser.set("address", userFields.address);
    if (userFields.city) parseUser.set("city", userFields.city);
    if (userFields.zipCode) parseUser.set("zipCode", userFields.zipCode);
  }
}

function randomId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return `${timestamp}xxxxxxxxxxxxxxxx`
    .replace(/[x]/g, function () {
      return ((Math.random() * 16) | 0).toString(16);
    })
    .toLowerCase();
}
