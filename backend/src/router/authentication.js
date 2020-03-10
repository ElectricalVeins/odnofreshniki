import express from 'express';
import services from '../services';
import jwt, { util } from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants';
import { RefreshToken } from '../db/models';
import AuthenticationService from '../services/AuthenticationService.js';

const authenticationRouter = express.Router();
const verifyAsync = util.promisify(jwt.verify);
const decodeAsync = util.decode(jwt.decode);
const signAsync = util.sign(jwt.sign);

authenticationRouter.post('/sign_in', async (req, res, next) => {
	try {
		const data = await services.AuthenticationService.loginByEmail(req.body);
		res.send(data);
	} catch (e) {

	}
});
authenticationRouter.post('/sign_up', (req, res, next) => {

});
authenticationRouter.post('/refresh', async (req, res, next) => {
	try {
		const { body, headers: { authorization: accessToken } } = req;

		//jwt синхронный, если не предоставить колбэк. потому сделано promisify
		await verifyAsync(body, TOKEN_KEY);

		const payload = await decodeAsync(accessToken, TOKEN_KEY);

		const refreshToken = await RefreshToken.findOne({
			where: {
				userId: payload.userId,
				refreshToken: body,
			}
		});

		if (refreshToken) {
			const updatedRefreshToken = await refreshToken.update({
				refreshToken: await signAsync({}, TOKEN_KEY, {
					expiresIn: Math.floor(Date.now() / 1000) + (60 * 10)
				})
			});
			return res.send({
				refreshToken: updatedRefreshToken.refreshToken,
				accessToken: signAsync({}, TOKEN_KEY,)
			});
		}
		next(new Error('Auth Error'));
//из сервиса достать ошибка, что надо авторизироваться
	} catch (e) {

	}
});

export default authenticationRouter;