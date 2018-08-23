import bcrypt from 'bcryptjs';

/**
 * @class PasswordUtility
 */
export default class PasswordUtility {
  /**
     * @method hashedPassword
     * @static
     * @description This hashes the password
     * @param password
     * @returns hashedPassword
     */
  static async hashPassword(password) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    return hashedPassword;
  }

  /**
     * @method verifyPassword
     * @static
     * @description This verifies the password
     * @param {Object} requestPassword
     * @param {Object} userPassword
     * @returns compareKey
     */
  static async verifyPassword(requestPassword, userPassword) {
    const compareKey = await bcrypt.compareSync(requestPassword, userPassword);
    return compareKey;
  }
}
