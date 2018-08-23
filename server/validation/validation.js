/**
 * @class ValidateData
 */
export default class ValidateData {
  /**
       * @method isNumber
       * @static
       * @description This handles number check
       * @param {id}
       *
       * @returns {Boolean} Boolean
       */
  static isNumber(id) {
    const parsedId = parseInt(id.trim(), 10);
    if (typeof parsedId !== 'number') {
      return false;
    }
    return true;
  }

  /**
       * @method isEmail
       * @static
       * @description This handles check
       * @param {email}
       *
       * @returns {Boolean} Boolean
       */
  static isEmail(email) {
    const emailPattern = /[^\s]*@[a-z0-9.-]*/i;
    if (emailPattern.test(email)) {
      return true;
    }
    return false;
  }

  /**
       * @method checkPassword
       * @static
       * @description This handles password check
       * @param {password}
       *
       * @returns {Boolean} Boolean
       */
  static checkPassword(password) {
    if (password.length > 4) {
      return true;
    }
    return false;
  }

  /**
       * @method checkId
       * @static
       * @description This id availability and type
       * @param {id}
       *
       * @returns {Boolean} Boolean
       */
  static checkId(id) {
    if (!id) {
      return null;
    }
    if (this.isNumber(id)) {
      return true;
    }
    return false;
  }
}
