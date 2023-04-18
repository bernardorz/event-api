import * as dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRATION_IN_MILLISECONDS = Number(
  process.env.TOKEN_EXPIRATION_IN_MILLISECONDS,
);

export { TOKEN_SECRET, TOKEN_EXPIRATION_IN_MILLISECONDS };
