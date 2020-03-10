const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../db/models');
const { BadRequestError } = require('../utils/application_errors');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../constants');

const { promisify } = require('util');

const signToken = promisify(jwt.sign);

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
					accessToken: await this.genAccessToken(user),
					refreshToken: await this.genRefreshToken(user)
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
		};

		return signToken({
				...payload,
			}, TOKEN_KEY,
			{
				expiresIn: Math.floor(Date.now() / 1000) + (60 * 10)
			});

	}

	async genRefreshToken (user) {

		const refreshToken = await signToken({}, TOKEN_KEY,
			{
				expiresIn: Math.floor(Date.now() / 1000) + (60 * 10)
			});

		const tokens = await user.getRefreshTokens;
		if (tokens.length > 5) {

		}

		await user.createRefreshToken({
			refreshToken
		});

	}

	refreshTokens=async(refreshToken)=>{

	};

	async genTokenPair (user) {
		return {
			accessToken: await this.genAccessToken(user),
			refreshToken: await this.genRefreshToken(user)
		};
	}
}

export default new AuthenticationService();