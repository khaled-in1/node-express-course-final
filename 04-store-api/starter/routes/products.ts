import express from "express";
const router = express.Router();
import { getAllProducts, getAllProductsStatic } from "../controllers/products";

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export { router };
