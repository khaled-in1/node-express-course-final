import express from "express";
const router = express.Router();
import { authenticationMiddleware as authMiddleware } from "../middleware/auth";

const { dashboard, login } = require("../controllers/main").default;

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

export { router };
