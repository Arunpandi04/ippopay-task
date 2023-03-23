import * as dotenv from 'dotenv'
dotenv.config();

const config = {
    DB_URL: process.env.DB_URL || 'mongodb+srv://arunpandi4:arunpandi4@cluster0.uie3z7v.mongodb.net/?retryWrites=true&w=majority',
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ||  "ACCESS",
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "ReFRESH",
    PORT: process.env.PORT || 5000
}

export default config