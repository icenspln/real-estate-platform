const z = require("zod");

const imageCreation = z.object({
  photos: z.array(z.file()),
});
const propertyCreation = z.object({
  type: z.string().max(50),
  quantity: z.number(),
  surface_area: z.number(),
  surface_area_unit: z.string().max(3),
  price: z.number(),
  price_unit: z.string(),
  country: z.string().max(20),
  state: z.string().max(20),
  district: z.string().max(20),
  address: z.string().max(255),
  description: z.string(),
  status: z.enum(["available", "sold", "pending"]),
  published: z.boolean(),
});

const propertyUpdate = z
  .object({
    type: z.string().max(50),
    quantity: z.number(),
    surface_area: z.number(),
    surface_area_unit: z.string().max(3),
    price: z.number(),
    price_unit: z.string(),
    country: z.string().max(20),
    state: z.string().max(20),
    district: z.string().max(20),
    address: z.string().max(255),
    description: z.string(),
    status: z.enum(["available", "sold", "pending"]),
    published: z.boolean(),
  })
  .partial();

const userCreation = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  username: z.string().max(40).optional(), // username is optional
  email: z.email().max(40),
  role: z.enum(["guest", "agent", "admin"]),
  password: z.string(),
});

const adminSignup = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  username: z.string().max(40).optional(), // username is optional
  email: z.email().max(40),
  role: z.literal("admin"),
  password: z.string(),
});

const authSignupSchema = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  username: z.string().max(40).optional(), // username is optional
  email: z.email().max(40),
  role: z.enum(["guest", "agent"]),
  password: z.string(),
});

const authLoginSchema = z.object({
  email: z.email().max(40),
  password: z.string(),
});

module.exports = {
  authLoginSchema,
  authSignupSchema,
  adminSignup,
  userCreation,
  propertyCreation,
  propertyUpdate,
  imageCreation,
};
