const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../db/models');
const { BadRequestError } = require('../utils/application_errors');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../constants');

const util=require('util');

const signToken = Promise.promisify();

class AuthenticationService {

  async loginByEmail (credentials) {
    const user = await User.findOne({
                                      where: { email: credentials.email }
                                    });
    if (user) {
      if (this.comparePasswords(credentials.password, user.password)) {

        const preparedUser = user.get();
        delete preparedUser.password;

        const tokens = {
          accessToken: this.genAccessToken(),
          refreshToken: this.genRefreshToken()
        };

        return {
          tokenPair: tokens,
          user: preparedUser
        };
      }
    }
    throw new BadRequestError('Who are you?');
  }

  async comparePasswords (password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  async genAccessToken (user) {

    const payload = {
      userId: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 10)
    };

    return jwt.sign({
                      ...payload,
                    }, TOKEN_KEY);

  }

  async genRefreshToken (user) {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
    };

    const refreshTokenValue = jwt.sign({
                                         ...payload,
                                       }, TOKEN_KEY);

  }
}

export default new AuthenticationService();