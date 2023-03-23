import jwt from 'jsonwebtoken';
import  config  from "../Config";

// generate a JWT token for the various applications represented by the 'option' argument
const generateToken = (id, option) => {
	if (option === 'access') {
		return jwt.sign({ id }, config.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: 60 * 30,
		});
	} else if(option === 'refresh') {
		return jwt.sign({ id }, config.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: 60 * 60,
		});
	} 
};
export default generateToken;