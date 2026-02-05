const router = require("express").Router();
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { signup, login } = require("../controllers/auth.controller");

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "LECTURER", "STUDENT"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

module.exports = router;