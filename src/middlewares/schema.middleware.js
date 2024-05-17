/**
 * Middleware function to validate request data against a schema.
 *
 * @param {Joi.Schema} schema - The Joi schema to validate the data against.
 * @param {string} property - The property name in the request object that contains the data to be validated.
 * @returns {Function} - The middleware function that performs the validation.
 */
export function schemaMiddleware(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      console.log(error);
      return res.status(400).json({ message: 'INVALID_DATA' });
    }

    next();
  };
}
