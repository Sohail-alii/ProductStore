import type {Response, Request} from "express"
import * as queries from "../db/queries"
import { getAuth } from "@clerk/express"

export const createComment = async (res: Response, req: Request) => {
    try{
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({error: "Unauthourize"});

        const { productId } = req.params;
        const { content } = req.body;

        if (!content) return res.status(400).json({error: "comment content is required"})

        //verify product exit
        const product = await queries.getProductById(Array.isArray(productId) ? productId[0] : productId);
        if (!product) return res.status(404).json({error: "product not found"})

        const comment = await queries.createComment({
            content,
           productsId: Array.isArray(productId) ? productId[0] : productId,
            userId
        });

        return res.status(201).json(comment);
    } catch(error){
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
};

//Delete comment  ( protected owner only)
export const deleteComment = async (res: Response, req: Request) => {
    try{
    const {userId} = getAuth(req);
    if(!userId) return res.status(401).json({error: "Unauthourize"});

    const {commentId} = req.params;

    const existingComment = await queries.getCommentById(Array.isArray(commentId) ? commentId[0] : commentId);
    if(!existingComment) return res.status(404).json({error: "Comment not found"});

    if(existingComment.userId !== userId) {
        return res.status(403).json({error: "Forbidden. You can only delete your own comments"});
    }

    await queries.deleteComment(Array.isArray(commentId) ? commentId[0] : commentId);
    res.status(200).json({message: "Comment deleted successfully"});
}
    catch(error){
        console.error("Error deleting comment", error);
        res.status(500).json({error: "Failed to delete comment"});
    }
};