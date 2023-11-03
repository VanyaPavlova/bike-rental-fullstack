/**
 * Represents a User.
 */
export class User {
  /**
   * @constructor
   * @param {Object} options - object containing the user's properties.
   * @param {number} options.id - The id of the user.
   * @param {string} options.name - The model of the user.
   * @param {string} options.email - The email of the user.
   * @param {string} options.password - The password of the user.
   * @param {number} options.age - The age of the user.
   * @param {string} options.phone - The phone of the user.
   * @param {string} options.role - The access of the user.
   * @param {string} options.address - The address of the user.
   * @param {string} options.city - The city of the user.
   * @param {number} options.zipCode - The zipCode of the user.
   */
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.email = options.email;
    this.password = options.password;
    this.age = options.age;
    this.phone = options.phone;
    this.role = options.role;
    this.address = options.address;
    this.city = options.city;
    this.zipCode = options.zipCode;
  }
}
