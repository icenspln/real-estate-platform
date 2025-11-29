const { ZodError } = require("zod");
const { logg } = require("../utils/helper.js");

const validate = (schema) => (req, res, next) => {
  try {
    const parsedPayload = schema.parse(req.body);
    // const result = schema.parse({
    //   body: req.body,
    //   query: req.query,array()
    //   params: req.params,
    // });

    req.body = parsedPayload;
    // req.query = result.query;
    // req.params = result.params;

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      logg(err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
      });
    }
    next(err);
  }
};

module.exports = validate;
