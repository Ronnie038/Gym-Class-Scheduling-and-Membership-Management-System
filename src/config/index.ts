import 'dotenv/config';
import httpStatus from 'http-status';

export { httpStatus };

export default {
	port: process.env.PORT || 5000,
	database_url: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	jwt_access_secret: process.env.JWT_SECRET,
	jwt_access_expires_in: process.env.JWT_EXPIRES_IN,
};
