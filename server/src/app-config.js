import dotenv from 'dotenv'
import debugLib from 'debug'
import joi from 'joi'

// read configuration file
if (process.env.NODE_ENV == null) {
  const config = dotenv.config()

  if (config.error) {
    throw config.error
  }
}

if (process.env.NODE_ENV !== 'test') {
  // validate configuration
  const envVarsSchema = joi.object({
    // node environment; determines if running in development, production or testing
    NODE_ENV: joi.string()
      .valid(['development', 'production', 'test', 'staging', 'qa'])
      .required(),
    // host name for server listening
    HOST: joi.string()
      .required(),
    // port to listen to
    PORT: joi.number().integer()
      .required(),
    // url for this instance
    BASE_URL: joi.string()
      .required(),
    // verbosity and debug level
    DEBUG: joi.string()
      .default('*'),
    // database
    POSTGRES_URL: joi.string()
      .required(),
    // if postgres ssl is to be enabled
    POSTGRES_SSL: joi.boolean()
      .truthy('TRUE')
      .truthy('true')
      .truthy('1')
      .truthy(1)
      .falsy('FALSE')
      .falsy('false')
      .falsy('0')
      .falsy(0)
      .default(false),
    EMS_SCHEMA: joi.string()
      .default('stockroom')
      .required(),
    AUTH_SECRET: joi.string()
      .required(),
    SALT_WORK_FACTOR: joi.number().integer()
      .required()
  }).unknown()
    .required()

  const {error} = joi.validate(process.env, envVarsSchema)
  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }
}

// set debug verbosity
debugLib.enable(process.env.DEBUG)
