import { Router } from "express";
import * as productContoller from "../controllers/productController"
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productContoller.getAllProducts)

// GET /api/products/my => Get current user products (protected)
router.get("/my", requireAuth(),  productContoller.getMyProducts)

// GET /api/products/:id => Get product by id (public)
router.get("/:id",  productContoller.getProductById)

// POST /api/products/ => create new product ( protected )
router.post("/", requireAuth(),  productContoller.createProduct)

// PUT /api/products/:id => updated product (protect owner only)
router.put("/:id", requireAuth(),  productContoller.updateProduct)

// DELETE /api/products/:id => delete  product (protect owner only)
router.delete("/:id", requireAuth(),  productContoller.deleteProduct)

export default router;