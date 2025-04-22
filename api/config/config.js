import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().integer().min(1024).max(65535).required().label('PORT').messages({
    'number.base': `"PORT" must be a number.`,
    'number.min': `"PORT" must be at least 1024 (reserved ports are not allowed).`,
    'number.max': `"PORT" must be less than or equal to 65535.`,
  }),
  MONGO_URI: Joi.string()
    .pattern(/^mongodb(\+srv)?:\/\/.+$/)
    .required()
    .label('MONGO_URI')
    .messages({
      'string.pattern.base': `"MONGO_URI" must be a valid MongoDB connection string starting with "mongodb://" or "mongodb+srv://".`,
    }),
  JWT_SECRET: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}:;"\'<>,.?/\\\\|\\[\\]])[A-Za-z\\d!@#$%^&*()_+\\-={}:;"\'<>,.?/\\\\|\\[\\]]{10,}$')
    )
    .required()
    .label('JWT_SECRET')
    .messages({
      'string.pattern.base': `"JWT_SECRET" must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Minimum length is 10 characters.`,
    }),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  console.error('❌Failed to validate environment variables: ');
  console.error(error.message);
  process.exit(1);
}

export const config = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
};
