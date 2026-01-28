import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController"

const router = Router();

// POST /api/comment/:productId => create new comment ( protected )
router.post("/:productId", requireAuth(),  commentController.createComment)

// DELETE /api/comment/:productId => delete  comment ( protected )
router.delete("/:commentId", requireAuth(),  commentController.deleteComment)

export default router;