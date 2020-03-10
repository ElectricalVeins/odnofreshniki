import ApplicationError from './ApplicationError.js';

class AuthorizationError extends ApplicationError {
	constructor () {
		super( 'The request requires user authentication.', 401 );
	}
}

export default AuthorizationError;