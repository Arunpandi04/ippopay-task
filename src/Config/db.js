import  mongoose from "mongoose";
import  config  from "../Config";

/**
 * Initializes the db connection.
 */
const initializeDBConnection = async () => {
  try {
    if (config.DB_URL) {
      await mongoose
        .connect(config.DB_URL)
        .then(() => console.info('Database connection established'))
        .catch(err => console.error(err));
    } else {
      console.error('Database config values are empty');
      throw new Error('Database config values are empty');
    }
  } catch (err) {
    throw err;
  }
};

export default initializeDBConnection