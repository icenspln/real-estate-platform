const z = require("zod");

const authSignupSchema = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  username: z.string().max(40).optional(), // username is optional
  email: z.email().max(40),
  role: z.enum(["guest", "agent", "admin"]),
  password: z.string(),
});

const authLoginSchema = z.object({
  email: z.email().max(40),
  password: z.string(),
});

module.exports = { authLoginSchema, authSignupSchema };
